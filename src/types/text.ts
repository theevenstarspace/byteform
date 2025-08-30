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
 * A type that represents a variable-length string.
 * @group Types
 */
class Text implements Schema<string> {
  /**
   * Writes the string to the buffer.
   * @param writer - The buffer writer.
   * @param value - The string to write.
   */
  public write(writer: ByteStreamWriter, value: string): void {
    try {
      writer.reserve(4 + (value.length * 3)); // Reserve space for the encoded string
    } catch (e) {
      throw new RangeError(`Failed to write text: ${e.message}`);
    }

    const res = Encoder.encodeInto(value, new Uint8Array(writer.buffer, writer.position + 4));

    // This should never happen since we reserved enough space
    // if (res.read !== value.length) {
    //   throw new Error("Failed to encode text");
    // }

    writer.writeUint32(res.written); // Write the length of the encoded string
    writer.skip(res.written); // Skip the encoded string
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
