import type { ByteStreamReader } from "../byte-stream-reader";
import type { ByteStreamWriter } from "../byte-stream-writer";
import type { SchemaLike } from "./schema-like";

/**
 * Base schema interface for all data types.
 * @group Helpers
 * 
 * @typeParam T - The type of the data to encode and decode.
 */
export type Schema<T = unknown> = SchemaLike<T, ByteStreamReader, ByteStreamWriter>;

/**
 * Utility function to create a type descriptor.
 * @group Helpers
 * 
 * @param descriptor - The type descriptor.
 * @typeParam T - The type of the schema.
 * @returns The schema type.
 */
export const createSchema = <T>(descriptor: Schema<T>): Readonly<Schema<T>> => descriptor;