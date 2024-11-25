import type { BufferReader } from "../buffer-reader";
import type { BufferWriter } from "../buffer-writer";
import type { BaseType } from "./base";

type StructTypes<T> = {
  [K in keyof T]: BaseType<T[K]>;
}

/**
 * A type that represents a structure of multiple fields. Similar to an object in JavaScript.
 * @group Types
 * 
 * @typeParam T - The type of the structure where each key is a field name and the value is the type of the field.
 */
export class Struct<T> implements BaseType<T> {
  /**
   * The entries of the structure.
   */
  private entries: [string, BaseType<unknown>][] = [];

  /**
   * Creates a new structure type.
   * @param entries - The entries of the structure where each key is a field name and the value is the type of the field.
   */
  public constructor(entries: StructTypes<T>) {
    this.entries = Object.entries(entries);
  }

  /**
   * Writes the structure to the buffer.
   * @param value - The structure to write.
   * @param writer - The buffer writer.
   */
  public write(value: T, writer: BufferWriter): void {
    for (const [key, type] of this.entries) {
      type.write(value[key], writer);
    }
  }

  /**
   * Reads the structure from the buffer.
   * @param reader - The buffer reader.
   * @returns The structure read from the buffer.
   */
  public read(reader: BufferReader): T {
    const value = {} as T;

    for (const [key, type] of this.entries) {
      value[key] = type.read(reader);
    }

    return value;
  }
}