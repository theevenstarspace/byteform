import { BufferView } from "./buffer-view";

export class BufferReader extends BufferView {
  public readUint8(): number {
    return this._view.getUint8(this._offset++);
  }

  public readInt8(): number {
    return this._view.getInt8(this._offset++);
  }

  public readUint16(littleEndian: boolean = false): number {
    const value = this._view.getUint16(this._offset, littleEndian);
    this._offset += 2;
    return value;
  }

  public readInt16(littleEndian: boolean = false): number {
    const value = this._view.getInt16(this._offset, littleEndian);
    this._offset += 2;
    return value;
  }

  public readUint32(littleEndian: boolean = false): number {
    const value = this._view.getUint32(this._offset, littleEndian);
    this._offset += 4;
    return value;
  }

  public readInt32(littleEndian: boolean = false): number {
    const value = this._view.getInt32(this._offset, littleEndian);
    this._offset += 4;
    return value;
  }

  public readInt64(littleEndian: boolean = false): bigint {
    const value = this._view.getBigInt64(this._offset, littleEndian);
    this._offset += 8;
    return value;
  }

  public readUint64(littleEndian: boolean = false): bigint {
    const value = this._view.getBigUint64(this._offset, littleEndian);
    this._offset += 8;
    return value;
  }

  public readFloat32(littleEndian: boolean = false): number {
    const value = this._view.getFloat32(this._offset, littleEndian);
    this._offset += 4;
    return value;
  }

  public readFloat64(littleEndian: boolean = false): number {
    const value = this._view.getFloat64(this._offset, littleEndian);
    this._offset += 8;
    return value;
  }

  public readBytes(byteLength: number): Uint8Array {
    const value = new Uint8Array(byteLength);
    for (let i = 0; i < byteLength; i++) {
      value[i] = this._u8[this._offset++];
    }
    return value;
  }

  public readBytesUnsafe(byteLength: number): Uint8Array {
    const value = new Uint8Array(this._buffer, this._offset, byteLength);
    this._offset += byteLength;
    return value;
  }
}