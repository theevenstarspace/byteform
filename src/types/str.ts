import type { ByteStreamReader } from "../byte-stream-reader";
import type { ByteStreamWriter } from "../byte-stream-writer";
import type { Schema } from "./schema";

/**
 * A type that represents a fixed-length string.
 * @group Types
 */
export class Str implements Schema<string> {

  public constructor(public readonly byteLength: number) {
    if (byteLength <= 0) {
      throw new RangeError(`Invalid byte length: ${byteLength}, expected a positive number`);
    }

    if (!Number.isFinite(byteLength)) {
      throw new RangeError(`Invalid byte length: Infinity, expected a finite number`);
    }
  }

  /**
   * Writes the string to the buffer.
   * @param writer - The buffer writer.
   * @param value - The string to write.
   */
  public write(writer: ByteStreamWriter, value: string): void {
    writer.writeString(value, this.byteLength);
  }

  /**
   * Reads the string from the buffer.
   * @param reader - The buffer reader.
   * @returns The string read from the buffer.
   */
  public read(reader: ByteStreamReader): string {
    return reader.readString(this.byteLength);
  }
}
