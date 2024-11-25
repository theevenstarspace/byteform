import type { BufferReader } from "../buffer-reader";
import type { BufferWriter } from "../buffer-writer";
import type { BaseType } from "./base";

/**
 * A type that represents a list of items of a specific type. Similar to an array in JavaScript.
 * @group Types
 * 
 * @typeParam T - The type of the items in the list.
 */
export class List<T> implements BaseType<T[]> {
  /**
   * The type of the items in the list.
   */
  private _of: BaseType<T>;

  /**
   * Creates a new list type.
   * @param of - The type of the items in the list.
   */
  public constructor(of: BaseType<T>) {
    this._of = of;
  }

  /**
   * Gets the base type of the items in the list.
   */
  public get of(): BaseType<T> {
    return this._of;
  }

  /**
   * Writes the list to the buffer.
   * @param value - An array of items to write.
   * @param writer - The buffer writer.
   */
  public write(value: T[], writer: BufferWriter): void {
    writer.writeUint32(value.length);

    for (const item of value) {
      this._of.write(item, writer);
    }
  }

  /**
   * Reads the list from the buffer.
   * @param reader - The buffer reader.
   * @returns An array of items read from the buffer.
   */
  public read(reader: BufferReader): T[] {
    const length = reader.readUint32();
    const value = new Array(length);

    for (let i = 0; i < length; i++) {
      value[i] = this._of.read(reader);
    }

    return value;
  }
}