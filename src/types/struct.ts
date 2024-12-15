import type { ByteStreamReader } from "../byte-stream-reader";
import type { ByteStreamWriter } from "../byte-stream-writer";
import type { Schema } from "./schema";

type StructTypes<T> = {
  [K in keyof T]: Schema<T[K]>;
}

/**
 * A type that represents a structure of multiple fields. Similar to an object in JavaScript.
 * @group Types
 * 
 * @typeParam T - The type of the structure where each key is a field name and the value is the type of the field.
 */
export class Struct<T> implements Schema<T> {
  /**
   * The entries of the structure.
   */
  private entries: [string, Schema<unknown>][] = [];

  /**
   * Creates a new structure type.
   * @param entries - The entries of the structure where each key is a field name and the value is the type of the field.
   */
  public constructor(entries: StructTypes<T>) {
    this.entries = Object.entries(entries);
  }

  /**
   * Writes the structure to the buffer.
   * @param writer - The buffer writer.
   * @param value - The structure to write.
   */
  public write(writer: ByteStreamWriter, value: T): void {
    for (const [key, type] of this.entries) {
      type.write(writer, value[key]);
    }
  }

  /**
   * Reads the structure from the buffer.
   * @param reader - The buffer reader.
   * @returns The structure read from the buffer.
   */
  public read(reader: ByteStreamReader): T {
    const value = {} as T;

    for (const [key, type] of this.entries) {
      value[key] = type.read(reader);
    }

    return value;
  }
}