import type { ByteStreamReader } from "../../byte-stream-reader";
import type { ByteStreamWriter } from "../../byte-stream-writer";
import type { Schema } from "../schema";

/**
 * A type that represents a string of text.
 * @group Types
 */
export class Cstr implements Schema<string> {
  private _byteLength: number;

  /**
   * Creates a new string type.
   * @param byteLength - The maximum byte length of the string.
   */
  public constructor(byteLength: number) {
    this._byteLength = byteLength;
  }

  public get byteLength(): number {
    return this._byteLength;
  }

  /**
   * Writes the string to the buffer.
   * @param writer - The buffer writer.
   * @param value - The string to write.
   */
  public write(writer: ByteStreamWriter, value: string): void {
    writer.writeString(value, this._byteLength);
  }

  /**
   * Reads the string from the buffer.
   * @param reader - The buffer reader.
   * @returns The string read from the buffer.
   */
  public read(reader: ByteStreamReader): string {
    return reader.readString(this._byteLength);
  }
}
