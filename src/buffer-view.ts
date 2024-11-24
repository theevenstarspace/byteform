/**
 * Base class for reading and writing binary data.
 */
export class BufferView {
  protected _buffer: ArrayBuffer;

  protected _view: DataView;
  protected _u8: Uint8Array;

  protected _offset: number;

  public constructor(buffer: ArrayBuffer) {
    this._buffer = buffer;
    this._view = new DataView(buffer);
    this._u8 = new Uint8Array(buffer);
    this._offset = 0;
  }

  public subarray(start: number, end: number): Uint8Array {
    return new Uint8Array(this._buffer, start, end - start);
  }

  public seek(offset: number): void {
    if (offset < 0 || offset > this._buffer.byteLength) {
      throw new RangeError(`BufferView offset is out of bounds: ${offset}, expected a value in a [0, ${this._buffer.byteLength}] range`);
    }

    this._offset = offset;
  }

  public skip(offset: number): void {
    this.seek(this._offset + offset);
  }

  public get buffer(): ArrayBuffer {
    return this._buffer;
  }

  public get view(): DataView {
    return this._view;
  }

  public get position(): number {
    return this._offset;
  }
}