import { BufferReader } from "./buffer-reader";
import type { BaseType, InferBaseType } from "./types";

export class BinaryDecoder {
  public readonly reader: BufferReader;

  public constructor(writer: BufferReader) {
    this.reader = writer;
  }

  public static fromArrayBuffer(buffer: ArrayBuffer): BinaryDecoder {
    return new BinaryDecoder(new BufferReader(buffer));
  }

  public decode<T extends BaseType>(schema: T): InferBaseType<T> {
    return schema.read(this.reader) as InferBaseType<T>;
  }
}