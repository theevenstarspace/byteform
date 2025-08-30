import { ByteStream } from "./byte-stream";
import type { TypedArray } from "./byte-stream";
import type { InferSchemaType, SchemaLike } from "./types/schema-like";

/**
 * The resize strategy for buffer resizing.
 * @group Other
 */
export type ResizeStrategy = 'exponential' | 'additive' | 'hybrid';

/**
 * The options for buffer resizing.
 * @group Other
 */
export interface ResizeOptions {
  /**
   * The maximum byte length of the buffer.
   * @default undefined
   */
  maxByteLength?: number;

  /**
   * The resize strategy.
   * @default 'exponential'
   */
  strategy: ResizeStrategy;

  /**
   * The resize factor for exponential resizing.
   * @default 2
   */
  factor: number;

  /**
   * The resize increment for additive resizing in bytes.
   * @default 256
   */
  increment: number;
}

/**
 * The function signature for buffer resizing.
 */
type ResizeFn = (buffer: ArrayBuffer, options: ResizeOptions) => void;

/**
 * The exponential resizing strategy.
 */
const ExponentialResize: ResizeFn = (buffer, { factor }) => {
  const newByteLength = Math.min(Math.round(buffer.byteLength * factor), buffer.maxByteLength);
  buffer.resize(newByteLength);
};

/**
 * The additive resizing strategy.
 */
const AdditiveResize: ResizeFn = (buffer, { increment }) => {
  const newByteLength = Math.min(buffer.byteLength + increment, buffer.maxByteLength);
  buffer.resize(newByteLength);
};

/**
 * The hybrid resizing strategy.
 */
const HybridResize: ResizeFn = (buffer, { factor, increment }) => {
  const newByteLength = Math.min(buffer.byteLength + Math.max(increment, Math.round(buffer.byteLength * (factor - 1))), buffer.maxByteLength);
  buffer.resize(newByteLength);
};

const ResizeStrategies: Record<ResizeStrategy, ResizeFn> = {
  exponential: ExponentialResize,
  additive: AdditiveResize,
  hybrid: HybridResize
};

/**
 * The default options for buffer resizing.
 */
const defaultOptions: ResizeOptions = {
  strategy: 'exponential',
  factor: 2,
  increment: 256
};

const validateBuffer = (buffer: ArrayBufferLike): ArrayBuffer => {
  if (SharedArrayBuffer && buffer instanceof SharedArrayBuffer) {
    throw new TypeError('SharedArrayBuffer writing is not supported');
  }

  return buffer as ArrayBuffer;
};

/**
 * A class that provides methods for writing binary data to a buffer.
 * @group Streams
 */
export class ByteStreamWriter extends ByteStream {
  /**
   * The underlying buffer.
   */
  protected declare _buffer: ArrayBuffer;

  /**
   * The options for buffer resizing.
   */
  protected _options: ResizeOptions;

  /**
   * The function for resizing the buffer.
   */
  protected _resizeFn: ResizeFn;

  /**
   * Creates a new buffer writer.
   * @param byteLength - The initial byte length of the buffer
   * @param options - The options for buffer resizing
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if the initial buffer size is invalid or the maxByteLength is less than the initial buffer size
   */
  public constructor(byteLength: number, options?: Partial<ResizeOptions>);

  /**
   * Creates a new buffer writer.
   * @param buffer - The buffer to write to
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if the initial buffer size is invalid or the maxByteLength is less than the initial buffer size
   */
  public constructor(buffer: ArrayBufferLike);

  /**
   * Creates a new buffer writer.
   * @param typedArray - The TypedArray to use an underlying buffer for writing
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if the initial buffer size is invalid or the maxByteLength is less than the initial buffer size
   */
  public constructor(typedArray: TypedArray);

  public constructor(target: number | ArrayBufferLike | TypedArray, options: Partial<ResizeOptions> = {}) {
    const targetOptions = { ...defaultOptions, ...options };

    if (typeof target === 'number') {
      const byteLength = target;

      if (byteLength <= 0) {
        throw new Error(`Invalid initial buffer size: ${byteLength}`);
      }

      const buffer = new ArrayBuffer(byteLength, { maxByteLength: targetOptions.maxByteLength });

      super(buffer);
    } else if (ArrayBuffer.isView(target)) {
      super(validateBuffer(target.buffer));
    } else {
      super(validateBuffer(target));
    }

    this._options = targetOptions;
    this._resizeFn = ResizeStrategies[targetOptions.strategy];
  }

  /**
   * Reserves space in the buffer.
   * @param byteLength - The number of bytes to reserve
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if the buffer is not resizable and the reserved space exceeds the buffer capacity
   */
  public reserve(byteLength: number): void {
    while (this.remaining < byteLength) {
      if (!this._buffer.resizable) {
        const expectedByteLength = this._offset + byteLength;
        // Range error since this function is only called during writing to the buffer
        throw new RangeError(`Buffer is not resizable. Expected ${expectedByteLength} bytes, got ${this._buffer.byteLength}`);
      }

      if (this._buffer.byteLength === this._buffer.maxByteLength) {
        // Range error since this function is only called during writing to the buffer
        throw new RangeError(`Buffer has reached its maximum capacity of ${this._buffer.maxByteLength} bytes`);
      }

      this._resizeFn(this._buffer, this._options);
    }
  };

  /**
   * Returns the underlying buffer
   */
  public override get buffer(): ArrayBuffer {
    return this._buffer;
  }

  /**
   * The current capacity of the buffer.
   */
  public get capacity(): number {
    return this._buffer.byteLength;
  }

  /**
   * The remaining space in the buffer in bytes.
   */
  public get remaining(): number {
    return this._buffer.byteLength - this._offset;
  }

  /**
   * Resets the buffer offset to zero, allowing to write from the beginning.
   */
  public reset(): void {
    this._offset = 0;
  }

  /**
   * Commits the buffer.
   * @returns The Uint8Array containing the written data
   */
  public commit(): Uint8Array<ArrayBuffer> {
    return this._u8.slice(0, this._offset);
  }

  /**
   * Converts the buffer to a Uint8Array.
   * @returns The Uint8Array containing the written data
   */
  public toUint8Array(): Uint8Array<ArrayBuffer> {
    return new Uint8Array(this._buffer, 0, this._offset);
  }

  /**
   * Writes an unsigned 8-bit integer to the buffer.
   * @param value - The value to write
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if buffer is full and not resizable or has reached its maximum capacity
   */
  public writeUint8(value: number): void {
    this.reserve(1);
    this._view.setUint8(this._offset, value);
    this._offset += 1;
  }

  /**
   * Writes a signed 8-bit integer to the buffer.
   * @param value - The value to write
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if buffer is full and not resizable or has reached its maximum capacity
   */
  public writeInt8(value: number): void {
    this.reserve(1);
    this._view.setInt8(this._offset, value);
    this._offset += 1;
  }

  /**
   * Writes an unsigned 16-bit integer to the buffer.
   * @param value - The value to write
   * @param littleEndian - Whether the integer is little-endian
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if buffer is full and not resizable or has reached its maximum capacity
   */
  public writeUint16(value: number, littleEndian: boolean = false): void {
    this.reserve(2);
    this._view.setUint16(this._offset, value, littleEndian);
    this._offset += 2;
  }

  /**
   * Writes a signed 16-bit integer to the buffer.
   * @param value - The value to write
   * @param littleEndian - Whether the integer is little-endian
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if buffer is full and not resizable or has reached its maximum capacity
   */
  public writeInt16(value: number, littleEndian: boolean = false): void {
    this.reserve(2);
    this._view.setInt16(this._offset, value, littleEndian);
    this._offset += 2;
  }

  /**
   * Writes an unsigned 32-bit integer to the buffer.
   * @param value - The value to write
   * @param littleEndian - Whether the integer is little-endian
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if buffer is full and not resizable or has reached its maximum capacity
   */
  public writeUint32(value: number, littleEndian: boolean = false): void {
    this.reserve(4);
    this._view.setUint32(this._offset, value, littleEndian);
    this._offset += 4;
  }

  /**
   * Writes a signed 32-bit integer to the buffer.
   * @param value - The value to write
   * @param littleEndian - Whether the integer is little-endian
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if buffer is full and not resizable or has reached its maximum capacity
   */
  public writeInt32(value: number, littleEndian: boolean = false): void {
    this.reserve(4);
    this._view.setInt32(this._offset, value, littleEndian);
    this._offset += 4;
  }

  /**
   * Writes an unsigned 64-bit integer to the buffer.
   * @param value - The value to write
   * @param littleEndian - Whether the integer is little-endian
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if buffer is full and not resizable or has reached its maximum capacity
   */
  public writeInt64(value: bigint, littleEndian: boolean = false): void {
    this.reserve(8);
    this._view.setBigInt64(this._offset, value, littleEndian);
    this._offset += 8;
  }

  /**
   * Writes an unsigned 64-bit integer to the buffer.
   * @param value - The value to write
   * @param littleEndian - Whether the integer is little-endian
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if buffer is full and not resizable or has reached its maximum capacity
   */
  public writeUint64(value: bigint, littleEndian: boolean = false): void {
    this.reserve(8);
    this._view.setBigUint64(this._offset, value, littleEndian);
    this._offset += 8;
  }

  /**
   * Writes a 32-bit float to the buffer.
   * @param value - The value to write
   * @param littleEndian - Whether the float is little-endian
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if buffer is full and not resizable or has reached its maximum capacity
   */
  public writeFloat32(value: number, littleEndian: boolean = false): void {
    this.reserve(4);
    this._view.setFloat32(this._offset, value, littleEndian);
    this._offset += 4;
  }

  /**
   * Writes a 64-bit float to the buffer.
   * @param value - The value to write
   * @param littleEndian - Whether the float is little-endian
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if buffer is full and not resizable or has reached its maximum capacity
   */
  public writeFloat64(value: number, littleEndian: boolean = false): void {
    this.reserve(8);
    this._view.setFloat64(this._offset, value, littleEndian);
    this._offset += 8;
  }

  /**
   * Writes bytes to the buffer.
   * @param src - The source buffer to write
   * @param byteLength - The number of bytes to write
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if buffer is full and not resizable or has reached its maximum capacity
   */
  public writeBytes(src: Uint8Array, byteLength?: number): void {
    const length = byteLength ?? src.byteLength;
    this.reserve(length);
    for (let i = 0; i < length; i++) {
      this._u8[this._offset++] = src[i];
    }
  }

  /**
   * Writes an ArrayBuffer to the buffer.
   * @param value - The ArrayBuffer to write
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if buffer is full and not resizable or has reached its maximum capacity
   */
  public writeArrayBuffer(value: ArrayBuffer): void {
    this.writeBytes(new Uint8Array(value));
  }

  /**
   * Writes a TypedArray to the buffer.
   * @param value - The TypedArray to write
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if buffer is full and not resizable or has reached its maximum capacity
   */
  public writeTypedArray<T extends TypedArray>(value: T): void {
    this.writeBytes(new Uint8Array(value.buffer));
  }

  /**
   * Writes a string to the buffer.
   * @param value - The string to write
   * @param byteLength - The number of bytes to write
   * @returns The number of characters written
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if buffer is full and not resizable or has reached its maximum capacity
   */
  public writeString(value: string, byteLength: number): number {
    if (byteLength <= 0) {
      throw new RangeError(`Invalid byteLength: ${byteLength}. Expected a positive number.`);
    }

    if (!Number.isFinite(byteLength)) {
      throw new RangeError(`Invalid byteLength: Infinity. Expected a finite number.`);
    }

    this.reserve(byteLength);

    const buffer = new Uint8Array(this.buffer, this._offset, byteLength);
    let offset = 0;

    let index = 0;
    // for (let i = 0; i < value.length; i++) {
    while (index < value.length) {
      const char = value.charCodeAt(index);

      if (char < 0x80) {
        if (offset + 1 > byteLength) break; // Prevent overflow

        buffer[offset++] = char;
      } else if (char < 0x800) {
        if (offset + 2 > byteLength) break; // Prevent overflow

        buffer[offset++] = 0xc0 | (char >> 6);
        buffer[offset++] = 0x80 | (char & 0x3f);
      } else if (char < 0xd800 || char >= 0xe000) {
        if (offset + 3 > byteLength) break; // Prevent overflow


        buffer[offset++] = 0xe0 | (char >> 12);
        buffer[offset++] = 0x80 | ((char >> 6) & 0x3f);
        buffer[offset++] = 0x80 | (char & 0x3f);
      } else {
        if (offset + 4 > byteLength) break; // Prevent overflow

        index++;
        // Surrogate pair:
        // UTF-16 encodes 0x10000-0x10FFFF by subtracting 0x10000 and
        // splitting the 20 bits of 0x0-0xFFFFF into two halves
        const surrogate = 0x10000 + (((char & 0x3ff) << 10) | (value.charCodeAt(index) & 0x3ff));
        buffer[offset++] = 0xf0 | (surrogate >> 18);
        buffer[offset++] = 0x80 | ((surrogate >> 12) & 0x3f);
        buffer[offset++] = 0x80 | ((surrogate >> 6) & 0x3f);
        buffer[offset++] = 0x80 | (surrogate & 0x3f);
      }

      index++;
    }

    // Null-terminate, if necessary
    if (offset < byteLength) {
      buffer[offset++] = 0;
    }

    this.skip(byteLength);

    return index;
  }

  /**
   * Writes a schema to the buffer.
   * @param schema - The schema to write
   * @param value - The schema value to write
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if buffer is full and not resizable or has reached its maximum capacity
   */
  public writeSchema<T extends SchemaLike>(schema: T, value: InferSchemaType<T>): void {
    schema.write(this, value);
  }
}
