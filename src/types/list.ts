import type { ByteStreamReader } from "../byte-stream-reader";
import type { ByteStreamWriter } from "../byte-stream-writer";
import type { Schema } from "./schema";

/**
 * A type that represents a list of items of a specific type. Similar to an array in JavaScript.
 * @group Types
 * 
 * @typeParam T - The type of the items in the list.
 */
export class List<T> implements Schema<T[]> {
  /**
   * The type of the items in the list.
   */
  private _of: Schema<T>;

  /**
   * Creates a new list type.
   * @param of - The type of the items in the list.
   */
  public constructor(of: Schema<T>) {
    this._of = of;
  }

  /**
   * Gets the base type of the items in the list.
   */
  public get of(): Schema<T> {
    return this._of;
  }

  /**
   * Writes the list to the buffer.
   * @param writer - The buffer writer.
   * @param value - An array of items to write.
   */
  public write(writer: ByteStreamWriter, value: T[]): void {
    writer.writeUint32(value.length);

    for (const item of value) {
      this._of.write(writer, item);
    }
  }

  /**
   * Reads the list from the buffer.
   * @param reader - The buffer reader.
   * @returns An array of items read from the buffer.
   */
  public read(reader: ByteStreamReader): T[] {
    const length = reader.readUint32();
    const value = new Array(length);

    for (let i = 0; i < length; i++) {
      value[i] = this._of.read(reader);
    }

    return value;
  }
}