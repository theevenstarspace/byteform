import type { ByteStreamReader } from "../byte-stream-reader";
import type { ByteStreamWriter } from "../byte-stream-writer";
import type { Schema } from "./schema";

type DiscriminatorValue = string | number | bigint | symbol | boolean;

type VariantDefinition<D extends DiscriminatorValue> = readonly [
  D,
  Schema<Record<string, unknown>>
];

type VariantValue<
  K extends string,
  D extends DiscriminatorValue,
  TVariant extends VariantDefinition<D>
> = TVariant extends readonly [infer TVariantDiscriminator, Schema<infer TPayload>]
  ? TVariantDiscriminator extends D
    ? TPayload extends Record<string, unknown>
      ? Omit<TPayload, K> & { [P in K]: TVariantDiscriminator }
      : never
    : never
  : never;

type DiscriminatedUnionValue<
  K extends string,
  D extends DiscriminatorValue,
  TVariants extends readonly VariantDefinition<D>[]
> = {
  [I in keyof TVariants]: VariantValue<K, D, TVariants[I]>;
}[number];

/**
 * A type that represents a discriminated union.
 * @group Types
 *
 * @typeParam K - The discriminator key in the resulting union object.
 * @typeParam D - The discriminator value type.
 * @typeParam TVariants - The variant definitions tuple.
 */
export class DiscriminatedUnion<
  K extends string,
  D extends DiscriminatorValue,
  TVariants extends readonly VariantDefinition<D>[]
> implements Schema<DiscriminatedUnionValue<K, D, TVariants>>
{
  /**
   * A lookup map for schemas by discriminator value.
   */
  private readonly _variants = new Map<D, Schema<Record<string, unknown>>>();

  /**
   * Creates a new discriminated union type.
   * @param discriminatorKey - Object key that stores the discriminator value.
   * @param discriminatorSchema - Schema for reading and writing discriminator values.
   * @param variants - Variant pairs in the format: [discriminatorValue, payloadSchema].
   */
  public constructor(
    private readonly discriminatorKey: K,
    private readonly discriminatorSchema: Schema<D>,
    variants: TVariants
  ) {
    for (const [discriminatorValue, variantSchema] of variants) {
      if (this._variants.has(discriminatorValue)) {
        throw new Error(
          `Duplicate discriminator variant: ${String(discriminatorValue)}`
        );
      }

      this._variants.set(discriminatorValue, variantSchema);
    }
  }

  /**
   * Writes the discriminated union to the buffer.
   * @param writer - The buffer writer.
   * @param value - The discriminated union value to write.
   */
  public write(
    writer: ByteStreamWriter,
    value: DiscriminatedUnionValue<K, D, TVariants>
  ): void {
    let discriminatorValue: D | undefined;
    let variantSchema: Schema<Record<string, unknown>> | undefined;

    for (const [candidateDiscriminator, candidateVariantSchema] of this._variants) {
      if (candidateDiscriminator === value[this.discriminatorKey]) {
        discriminatorValue = candidateDiscriminator;
        variantSchema = candidateVariantSchema;
        break;
      }
    }

    if (discriminatorValue === undefined || !variantSchema) {
      throw new Error(
        `Unknown discriminator variant: ${String(value[this.discriminatorKey])}`
      );
    }

    this.discriminatorSchema.write(writer, discriminatorValue);
    variantSchema.write(writer, value);
  }

  /**
   * Reads the discriminated union from the buffer.
   * @param reader - The buffer reader.
   * @returns The discriminated union value read from the buffer.
   */
  public read(reader: ByteStreamReader): DiscriminatedUnionValue<K, D, TVariants> {
    const discriminatorValue = this.discriminatorSchema.read(reader);
    const variantSchema = this._variants.get(discriminatorValue);

    if (!variantSchema) {
      throw new Error(
        `Unknown discriminator variant: ${String(discriminatorValue)}`
      );
    }

    const payload = variantSchema.read(reader);

    return {
      ...payload,
      [this.discriminatorKey]: discriminatorValue,
    } as DiscriminatedUnionValue<K, D, TVariants>;
  }
}
