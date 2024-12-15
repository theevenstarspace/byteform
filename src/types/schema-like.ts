import type { ByteStream } from "../byte-stream";

/**
 * Base interface for schema-like objects.
 * @group Helpers
 * 
 * @typeParam T - The type of the data to encode and decode.
 * @typeParam Reader - The type of the reader to use.
 * @typeParam Writer - The type of the writer to use.
 */
export interface SchemaLike<
  T = unknown,
  Reader extends ByteStream = ByteStream,
  Writer extends ByteStream = ByteStream
> {
  read(reader: Reader): T;
  write(writer: Writer, value: T): void;
}

/**
 * Infer the data type from a schema.
 * @group Helpers
 * 
 * @typeParam T - The schema to infer the data type from.
 */
export type InferSchemaType<T> = T extends SchemaLike<infer U> ? U : never;
