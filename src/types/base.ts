import type { BufferReader } from "../buffer-reader";
import type { BufferWriter } from "../buffer-writer";

/**
 * Base type for all data types.
 * @group Helpers
 * 
 * @typeParam T - The type of the data to encode and decode.
 */
export interface BaseType<T = unknown> {
  /**
   * Writes the value to the buffer.
   * @param value - The value to write.
   * @param writer - The buffer writer.
   */
  write(value: T, writer: BufferWriter): void;

  /**
   * Reads the value from the buffer.
   * @param reader - The buffer reader.
   * @returns The value read from the buffer.
   */
  read(reader: BufferReader): T;
}

/**
 * Infer the data type from a schema.
 * @group Helpers
 * 
 * @typeParam T - The schema to infer the data type from.
 */
export type InferBaseType<T> = T extends BaseType<infer U> ? U : never;

/**
 * Utility function to create a type descriptor.
 * @group Helpers
 * 
 * @param descriptor - The type descriptor.
 * @typeParam T - The type of the schema.
 * @returns The schema type.
 */
export const createType = <T>(descriptor: BaseType<T>): Readonly<BaseType<T>> => descriptor;
