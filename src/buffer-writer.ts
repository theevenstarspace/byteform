import { BufferView } from "./buffer-view";

type ResizeStrategy = 'exponential' | 'additive' | 'hybrid';

export interface ResizeOptions {
  maxByteLength?: number;
  strategy: ResizeStrategy;
  factor: number; // multiplier
  increment: number; // bytes
}

type ResizeFn = (buffer: ArrayBuffer, options: ResizeOptions) => void;

const ExponentialResize: ResizeFn = (buffer, { factor }) => {
  const newByteLength = Math.min(Math.round(buffer.byteLength * factor), buffer.maxByteLength);
  buffer.resize(newByteLength);
};

const AdditiveResize: ResizeFn = (buffer, { increment }) => {
  const newByteLength = Math.min(buffer.byteLength + increment, buffer.maxByteLength);
  buffer.resize(newByteLength);
};

const HybridResize: ResizeFn = (buffer, { factor, increment }) => {
  const newByteLength = Math.min(buffer.byteLength + Math.max(increment, Math.round(buffer.byteLength * (factor - 1))), buffer.maxByteLength);
  buffer.resize(newByteLength);
};

const ResizeStrategies: Record<ResizeStrategy, ResizeFn> = {
  exponential: ExponentialResize,
  additive: AdditiveResize,
  hybrid: HybridResize
};

const defaultOptions: ResizeOptions = {
  strategy: 'exponential',
  factor: 2,
  increment: 1024
};

export class BufferWriter extends BufferView {
  protected _options: ResizeOptions;
  protected _resizeFn: ResizeFn;

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

  public get capacity(): number {
    return this._buffer.byteLength;
  }

  public get remaining(): number {
    return this._buffer.byteLength - this._offset;
  }

  public reset(): void {
    this._offset = 0;
  }

  public commit(): ArrayBuffer {
    return this._buffer.slice(0, this._offset);
  }

  public commitUint8Array(): Uint8Array {
    return this._u8.slice(0, this._offset);
  }

  public toUint8Array(): Uint8Array {
    return new Uint8Array(this._buffer, 0, this._offset);
  }

  public writeUint8(value: number): void {
    this.reserve(1);
    this._view.setUint8(this._offset, value);
    this._offset += 1;
  }

  public writeInt8(value: number): void {
    this.reserve(1);
    this._view.setInt8(this._offset, value);
    this._offset += 1;
  }

  public writeUint16(value: number, littleEndian: boolean = false): void {
    this.reserve(2);
    this._view.setUint16(this._offset, value, littleEndian);
    this._offset += 2;
  }

  public writeInt16(value: number, littleEndian: boolean = false): void {
    this.reserve(2);
    this._view.setInt16(this._offset, value, littleEndian);
    this._offset += 2;
  }

  public writeUint32(value: number, littleEndian: boolean = false): void {
    this.reserve(4);
    this._view.setUint32(this._offset, value, littleEndian);
    this._offset += 4;
  }

  public writeInt32(value: number, littleEndian: boolean = false): void {
    this.reserve(4);
    this._view.setInt32(this._offset, value, littleEndian);
    this._offset += 4;
  }

  public writeInt64(value: bigint, littleEndian: boolean = false): void {
    this.reserve(8);
    this._view.setBigInt64(this._offset, value, littleEndian);
    this._offset += 8;
  }

  public writeUint64(value: bigint, littleEndian: boolean = false): void {
    this.reserve(8);
    this._view.setBigUint64(this._offset, value, littleEndian);
    this._offset += 8;
  }

  public writeFloat32(value: number, littleEndian: boolean = false): void {
    this.reserve(4);
    this._view.setFloat32(this._offset, value, littleEndian);
    this._offset += 4;
  }

  public writeFloat64(value: number, littleEndian: boolean = false): void {
    this.reserve(8);
    this._view.setFloat64(this._offset, value, littleEndian);
    this._offset += 8;
  }

  public writeBytes(src: Uint8Array, byteLength?: number): void {
    const length = byteLength ?? src.byteLength;
    this.reserve(length);
    for (let i = 0; i < length; i++) {
      this._u8[this._offset++] = src[i];
    }
  }
}
