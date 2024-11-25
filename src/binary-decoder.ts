import { BufferReader } from "./buffer-reader";
import type { BaseType, InferBaseType } from "./types";

/**
 * A class that provides methods for decoding binary data.
 * @group Decoding
 */
export class BinaryDecoder {
  /**
   * The buffer reader.
   */
  public readonly reader: BufferReader;

  /**
   * Creates a new binary decoder.
   * @param writer - The buffer reader
   */
  public constructor(writer: BufferReader) {
    this.reader = writer;
  }

  /**
   * Creates a new binary decoder from an ArrayBuffer.
   * @param buffer - The ArrayBuffer to decode
   * @returns The new binary decoder instance
   */
  public static fromArrayBuffer(buffer: ArrayBuffer): BinaryDecoder {
    return new BinaryDecoder(new BufferReader(buffer));
  }

  /**
   * Decodes a value from the buffer.
   * @param schema - The schema of the value to decode
   * @returns The decoded value
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if the byte size of the readable schema is larger than the buffer size
   */
  public decode<T extends BaseType>(schema: T): InferBaseType<T> {
    return schema.read(this.reader) as InferBaseType<T>;
  }
}