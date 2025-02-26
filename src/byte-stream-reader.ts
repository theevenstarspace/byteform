import type { TypedArray, TypedArrayConstructor } from "./byte-stream";
import { ByteStream } from "./byte-stream";
import type { InferSchemaType, SchemaLike } from "./types/schema-like";

/**
 * A class that provides methods to read data from a buffer.
 * @group Streams
 */
export class ByteStreamReader extends ByteStream {
  /**
   * Reads an unsigned 8-bit integer from the buffer.
   * @returns Read value
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if the buffer is out of bounds
   */
  public readUint8(): number {
    return this._view.getUint8(this._offset++);
  }

  /**
   * Reads a signed 8-bit integer from the buffer.
   * @returns Read value
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if the buffer is out of bounds
   */
  public readInt8(): number {
    return this._view.getInt8(this._offset++);
  }

  /**
   * Reads an unsigned 16-bit integer from the buffer.
   * @param littleEndian - Whether the integer is little-endian
   * @returns Read value
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if the buffer is out of bounds
   */
  public readUint16(littleEndian: boolean = false): number {
    const value = this._view.getUint16(this._offset, littleEndian);
    this._offset += 2;
    return value;
  }

  /**
   * Reads a signed 16-bit integer from the buffer.
   * @param littleEndian - Whether the integer is little-endian
   * @returns Read value
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if the buffer is out of bounds
   */
  public readInt16(littleEndian: boolean = false): number {
    const value = this._view.getInt16(this._offset, littleEndian);
    this._offset += 2;
    return value;
  }

  /**
   * Reads an unsigned 32-bit integer from the buffer.
   * @param littleEndian - Whether the integer is little-endian
   * @returns Read value
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if the buffer is out of bounds
   */
  public readUint32(littleEndian: boolean = false): number {
    const value = this._view.getUint32(this._offset, littleEndian);
    this._offset += 4;
    return value;
  }

  /**
   * Reads a signed 32-bit integer from the buffer.
   * @param littleEndian - Whether the integer is little-endian
   * @returns Read value
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if the buffer is out of bounds
   */
  public readInt32(littleEndian: boolean = false): number {
    const value = this._view.getInt32(this._offset, littleEndian);
    this._offset += 4;
    return value;
  }

  /**
   * Reads an unsigned 64-bit integer from the buffer.
   * @param littleEndian - Whether the integer is little-endian
   * @returns Read value
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if the buffer is out of bounds
   */
  public readInt64(littleEndian: boolean = false): bigint {
    const value = this._view.getBigInt64(this._offset, littleEndian);
    this._offset += 8;
    return value;
  }

  /**
   * Reads a signed 64-bit integer from the buffer.
   * @param littleEndian - Whether the integer is little-endian
   * @returns Read value
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if the buffer is out of bounds
   */
  public readUint64(littleEndian: boolean = false): bigint {
    const value = this._view.getBigUint64(this._offset, littleEndian);
    this._offset += 8;
    return value;
  }

  /**
   * Reads a 32-bit floating point number from the buffer.
   * @param littleEndian - Whether the number is little-endian
   * @returns Read value
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if the buffer is out of bounds
   */
  public readFloat32(littleEndian: boolean = false): number {
    const value = this._view.getFloat32(this._offset, littleEndian);
    this._offset += 4;
    return value;
  }

  /**
   * Reads a 64-bit floating point number from the buffer.
   * @param littleEndian - Whether the number is little-endian
   * @returns Read value
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if the buffer is out of bounds
   */
  public readFloat64(littleEndian: boolean = false): number {
    const value = this._view.getFloat64(this._offset, littleEndian);
    this._offset += 8;
    return value;
  }

  /**
   * Reads a set of bytes from the buffer.
   * @returns An Uint8Array containing the read bytes
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if the buffer is out of bounds
   */
  public readBytes(byteLength: number): Uint8Array {
    const value = new Uint8Array(byteLength);
    for (let i = 0; i < byteLength; i++) {
      value[i] = this._u8[this._offset++];
    }
    return value;
  }

  /**
   * Reads a set of bytes from the buffer without copying.
   * @returns An Uint8Array containing the read bytes
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if the buffer is out of bounds
   * 
   * @remarks 
   * The returned Uint8Array shares the same memory as the buffer.
   * Use with caution, as modifying the Uint8Array will also modify the buffer.
   */
  public readBytesUnsafe(byteLength: number): Uint8Array {
    const value = new Uint8Array(this._buffer, this._offset, byteLength);
    this._offset += byteLength;
    return value;
  }

  /**
   * Reads an ArrayBuffer from the buffer.
   * @returns The read ArrayBuffer
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if the buffer is out of bounds
   */
  public readArrayBuffer(byteLength: number): ArrayBuffer {
    return this.readBytes(byteLength).buffer as ArrayBuffer;
  }

  /**
   * Reads a TypedArray from the buffer.
   * @param TypedArray - The TypedArray constructor to use
   * @param elements - The number of elements to read
   * @returns The read TypedArray
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if the buffer is out of bounds
   */
  public readTypedArray<T extends TypedArray>(TypedArray: TypedArrayConstructor<T>, elements: number): T {
    return new TypedArray(this.readArrayBuffer(TypedArray.BYTES_PER_ELEMENT * elements));
  }

  /**
   * Reads a schema from the buffer.
   * @param schema - The schema to read
   * @returns The value read from the buffer
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if the buffer is out of bounds
   */
  public readSchema<T extends SchemaLike>(schema: T): InferSchemaType<T> {
    return schema.read(this) as InferSchemaType<T>;
  }
}