import type { ByteStreamReader } from "../byte-stream-reader";
import type { ByteStreamWriter } from "../byte-stream-writer";
import type { Schema } from "./schema";

/**
 * @see [TextEncoder](https://nodejs.org/api/globals.html#textencoder)
 * Since TextEncoder and TextDecoder are defined globally in Node.js starting from version 11.0.0, we are going to specify it as the minimum supported version.
 */

/**
 * TextEncoder instance to encode strings to bytes.
 */
const Encoder = new TextEncoder();

/**
 * TextDecoder instance to decode strings from bytes.
 */
const Decoder = new TextDecoder();

/**
 * A type that represents a string of text.
 * @group Types
 */
export class Text implements Schema<string> {
  /**
   * The intermediate buffer to store the encoded string before writing it to the buffer.
   */
  private stringBuffer: Uint8Array;

  /**
   * Creates a new text type.
   * @param maxByteLength - The maximum byte length of the encoded string
   */
  public constructor(maxByteLength: number = 256) {
    this.stringBuffer = new Uint8Array(maxByteLength);
  }

  /**
   * Writes the string to the buffer.
   * @param writer - The buffer writer.
   * @param value - The string to write.
   */
  public write(writer: ByteStreamWriter, value: string): void {
    const res = Encoder.encodeInto(value, this.stringBuffer);

    if (res.read !== value.length) {
      throw new RangeError(`Failed to encode string, only ${res.read} symbols out of ${value.length} were encoded. Using a new instance of Text type with a larger maxByteLength might help.`);
    }

    writer.writeUint32(res.written);
    writer.writeBytes(this.stringBuffer, res.written);
  }

  /**
   * Reads the string from the buffer.
   * @param reader - The buffer reader.
   * @returns The string read from the buffer.
   */
  public read(reader: ByteStreamReader): string {
    const length = reader.readUint32();
    const offset = reader.position;
    reader.skip(length);

    return Decoder.decode(reader.subarray(offset, offset + length));
  }
}

/**
 * A type that represents a string of text with a maximum byte length of 256.
 * @group Available Types
 */
export const text = new Text();
