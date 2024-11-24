import type { BufferReader } from "../buffer-reader";
import type { BufferWriter } from "../buffer-writer";
import type { BaseType } from "./base";

export class List<T> implements BaseType<T[]> {
  private _of: BaseType<T>;

  public constructor(of: BaseType<T>) {
    this._of = of;
  }

  public get of() {
    return this._of;
  }

  public write(value: T[], writer: BufferWriter) {
    writer.writeUint32(value.length);

    for (const item of value) {
      this._of.write(item, writer);
    }
  }

  public read(reader: BufferReader): T[] {
    const length = reader.readUint32();
    const value = new Array(length);

    for (let i = 0; i < length; i++) {
      value[i] = this._of.read(reader);
    }

    return value;
  }
}