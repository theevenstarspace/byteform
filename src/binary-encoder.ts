import type { ResizeOptions } from "./buffer-writer";
import { BufferWriter } from "./buffer-writer";
import type { BaseType, InferBaseType } from "./types";

/**
 * A class that provides methods for encoding binary data.
 * @group Encoding
 */
export class BinaryEncoder {
  /**
   * The buffer writer.
   */
  public readonly writer: BufferWriter;

  /**
   * Creates a new binary encoder.
   * @param writer - The buffer writer
   */
  public constructor(writer: BufferWriter) {
    this.writer = writer;
  }

  /**
   * Creates a new binary encoder from a buffer writer.
   * @param byteLength - The initial byte length of the buffer
   * @param options - {@link BufferWriter} options
   * @returns The new binary encoder instance
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if the initial buffer size is invalid or the maxByteLength is less than the initial buffer size
   */
  public static create(byteLength: number, options: Partial<ResizeOptions> = {}): BinaryEncoder {
    return new BinaryEncoder(new BufferWriter(byteLength, options));
  }

  /**
   * Resets the buffer writer.
   */
  public reset(): void {
    this.writer.reset();
  }

  /**
   * Encodes a value to the buffer.
   * @param schema - The schema of the value to encode
   * @param value - The value to encode
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if the value is invalid or the value size is larger than the buffer maximum size
   */
  public encode<T extends BaseType>(schema: T, value: InferBaseType<T>): void {
    schema.write(value, this.writer);
  }

  /**
   * Commits the buffer as an ArrayBuffer.
   * @returns The ArrayBuffer containing the encoded data
   */
  public commit(): ArrayBuffer {
    return this.writer.commit();
  }

  /**
   * Commits the buffer as an Uint8Array.
   * @returns The Uint8Array containing the encoded data
   */
  public commitUint8Array(): Uint8Array {
    return this.writer.commitUint8Array();
  }

  /**
   * Converts the buffer to an Uint8Array.
   * @returns The Uint8Array containing the encoded data
   */
  public toUint8Array(): Uint8Array {
    return this.writer.toUint8Array();
  }
}