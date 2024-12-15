export type TypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array;


/**
 * Base class for reading and writing binary data.
 * @group Helpers
 */
export class ByteStream {
  /**
   * The underlying buffer.
   */
  protected _buffer: ArrayBufferLike;

  /**
   * The DataView instance to read data from the buffer.
   */
  protected _view: DataView;

  /**
   * The Uint8Array instance to read data from the buffer.
   */
  protected _u8: Uint8Array;

  /**
   * The current offset in the buffer in bytes.
   */
  protected _offset: number;

  /**
   * Creates a new buffer view.
   * @param buffer - The ArrayBuffer/SharedArrayBuffer to read/write data from/to
   */
  public constructor(buffer: ArrayBufferLike);

  /**
   * Creates a new buffer view.
   * @param typedArray - The TypedArray to read/write data from/to
   */
  public constructor(typedArray: TypedArray);

  public constructor(target: ArrayBufferLike | TypedArray) {
    if (ArrayBuffer.isView(target)) {
      this._buffer = target.buffer;
      this._offset = target.byteOffset;
    } else {
      this._buffer = target;
      this._offset = 0;
    }
    
    this._view = new DataView(this._buffer);
    this._u8 = new Uint8Array(this._buffer);
  }

  /**
   * Returns a subarray of the buffer.
   * @param start - The start offset in bytes
   * @param end - The end offset in bytes
   * @returns The subarray
   * 
   * @remarks
   * The returned Uint8Array shares the same memory as the buffer.
   */
  public subarray(start: number, end: number): Uint8Array {
    return new Uint8Array(this._buffer, start, end - start);
  }

  /**
   * Seeks to a specific offset in the buffer.
   * @param position - The offset to seek to
   * @throws RangeError if the position is out of bounds
   */
  public seek(position: number): void {
    if (position < 0 || position > this._buffer.byteLength) {
      throw new RangeError(`BufferView offset is out of bounds: ${position}, expected a value in a [0, ${this._buffer.byteLength}] range`);
    }

    this._offset = position;
  }

  /**
   * Skips a number of bytes in the buffer.
   * @param offset - The number of bytes to skip
   * @throws RangeError if the offset is out of bounds
   */
  public skip(offset: number): void {
    this.seek(this._offset + offset);
  }

  /**
   * Returns the underlying buffer
   */
  public get buffer(): ArrayBufferLike {
    return this._buffer;
  }

  /**
   * Returns the underlying DataView instance
   */
  public get view(): DataView {
    return this._view;
  }

  /**
   * Returns the current offset in the buffer in bytes.
   */
  public get position(): number {
    return this._offset;
  }
}