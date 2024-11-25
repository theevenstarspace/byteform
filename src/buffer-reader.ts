import { BufferView } from "./buffer-view";

/**
 * A class that provides methods to read data from a buffer.
 * @group Decoding
 */
export class BufferReader extends BufferView {
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
}