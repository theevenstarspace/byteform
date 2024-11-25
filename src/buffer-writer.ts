import { BufferView } from "./buffer-view";

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

/**
 * A class that provides methods for writing binary data to a buffer.
 * @group Encoding
 */
export class BufferWriter extends BufferView {
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
  public constructor(byteLength: number, options: Partial<ResizeOptions> = {}) {
    if (byteLength <= 0) {
      throw new Error(`Invalid initial buffer size: ${byteLength}`);
    }

    const targetOptions = { ...defaultOptions, ...options };
    const buffer = new ArrayBuffer(byteLength, { maxByteLength: targetOptions.maxByteLength });

    super(buffer);

    this._options = targetOptions;
    this._resizeFn = ResizeStrategies[targetOptions.strategy];
  }

  /**
   * Reserves space in the buffer.
   * @param byteLength - The number of bytes to reserve
   * @throws {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError | RangeError} if the buffer is not resizable and the reserved space exceeds the buffer capacity
   */
  protected reserve(byteLength: number): void {
    if (this.remaining < byteLength) {
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
   * @returns The ArrayBuffer containing the written data
   */
  public commit(): ArrayBuffer {
    return this._buffer.slice(0, this._offset);
  }

  /**
   * Commits the buffer as a Uint8Array.
   * @returns The Uint8Array containing the written data
   */
  public commitUint8Array(): Uint8Array {
    return this._u8.slice(0, this._offset);
  }

  /**
   * Converts the buffer to a Uint8Array.
   * @returns The Uint8Array containing the written data
   */
  public toUint8Array(): Uint8Array {
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
   * @param src - The source buffer to write from
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
}
