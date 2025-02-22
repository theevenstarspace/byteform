import type { TypedArray, TypedArrayConstructor } from "./byte-stream";
import { ByteStream } from "./byte-stream";
import type { InferSchemaType, SchemaLike } from "./types/schema-like";

// const textDecoder = new TextDecoder();

/**
 * A class that provides methods to read data from a buffer.
 * @group Streams
 */
export class ByteStreamReader extends ByteStream {
  // private _textDecoder: TextDecoder;

  // public constructor(...args: ConstructorParameters<typeof ByteStream>) {
  //   super(...args);

  //   this._textDecoder = new TextDecoder();
  // }

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

  // private findNullTerminatorOffset(byteLength?: number): number {
  //   const end = this._offset + (byteLength ?? this._buffer.byteLength);
  //   for (let i = this._offset; i < end; i++) {
  //     if (this._u8[i] === 0) {
  //       return i - this._offset;
  //     }
  //   }

  //   return end - this._offset;
  //   // return -1;
  // }

  public readString(byteLength?: number): string {
    let result = '';
    let position = this._offset;

    const end = byteLength ? (position + byteLength) : this._buffer.byteLength;
    const buffer = this._u8;

    while (position <= end) {
      const byte = buffer[position++];

      if (byte === 0) {
        break;
      }

      if (byte < 0x80) {
        result += String.fromCharCode(byte);
      } else if ((byte & 0xe0) === 0xc0) {
        result += String.fromCharCode(((byte & 0x1f) << 6) | (buffer[position++] & 0x3f));
      } else if ((byte & 0xf0) === 0xe0) {
        result += String.fromCharCode(((byte & 0x0f) << 12) | ((buffer[position++] & 0x3f) << 6) | (buffer[position++] & 0x3f));
      } else {
        const surrogate = (((byte & 0x07) << 18) | ((buffer[position++] & 0x3f) << 12) | ((buffer[position++] & 0x3f) << 6) | (buffer[position++] & 0x3f)) - 0x10000;
         
        result += String.fromCharCode(0xd800 + (surrogate >> 10), 0xdc00 + (surrogate & 0x3ff));
      }
    }

    if (byteLength) {
      this._offset += byteLength;
    } else {
      this._offset = position;
    }

    return result;
  }

  // public readString(byteLength?: number): string {
  //   const nullOffset = this.findNullTerminatorOffset(byteLength);
  //   if (nullOffset < 1) {
  //     throw new RangeError("Failed to read string: no null terminator found");
  //   }
  //   // if (stringEnd === -1) {
  //   //   throw new RangeError("Failed to read string: no null terminator found");
  //   // }

  //   // const value = textDecoder.decode(this._u8.subarray(this._offset, this._offset + nullOffset));
  //   const value = textDecoder.decode(new Uint8Array(this._buffer, this._offset, nullOffset));
  //   this._offset += nullOffset + 1;
  //   return value;
  // }

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