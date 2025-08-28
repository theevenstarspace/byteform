import type { ByteStreamReader } from "../byte-stream-reader";
import type { ByteStreamWriter } from "../byte-stream-writer";
import { u32 } from "./numbers";
import type { Schema } from "./schema";

/**
 * A type that represents a mapping of keys to values. Similar to a Map in JavaScript.
 * @group Types
 *
 * @typeParam K - The type of the keys in the mapping.
 * @typeParam V - The type of the values in the mapping.
 */
export class Mapping<K, V> implements Schema<Map<K, V>> {
  /**
   * Creates a new mapping type.
   * @param keySchema - The schema for the keys in the mapping.
   * @param valueSchema - The schema for the values in the mapping.
   * @param sizeSchema - The schema for the size of the mapping.
   */
  public constructor(
    private readonly keySchema: Schema<K>,
    private readonly valueSchema: Schema<V>,
    private readonly sizeSchema: Schema<number> = u32
  ) {}

  public read(reader: ByteStreamReader): Map<K, V> {
    const map = new Map<K, V>();
    const count = reader.readSchema(this.sizeSchema);
    for (let i = 0; i < count; i++) {
      const key = this.keySchema.read(reader);
      const value = this.valueSchema.read(reader);
      map.set(key, value);
    }
    return map;
  }

  public write(writer: ByteStreamWriter, value: Map<K, V>): void {
    writer.writeSchema(this.sizeSchema, value.size);
    for (const [key, val] of value.entries()) {
      this.keySchema.write(writer, key);
      this.valueSchema.write(writer, val);
    }
  }
}
