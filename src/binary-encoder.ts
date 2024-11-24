import { BufferWriter } from "./buffer-writer";
import type { BaseType, InferBaseType } from "./types";

export class BinaryEncoder {
  public readonly writer: BufferWriter;

  public constructor(writer: BufferWriter) {
    this.writer = writer;
  }

  public static create(...params: ConstructorParameters<typeof BufferWriter>): BinaryEncoder {
    return new BinaryEncoder(new BufferWriter(...params));
  }

  public reset(): void {
    this.writer.reset();
  }

  public encode<T extends BaseType>(schema: T, value: InferBaseType<T>): void {
    schema.write(value, this.writer);
  }

  public commit(): ArrayBuffer {
    return this.writer.commit();
  }

  public commitUint8Array(): Uint8Array {
    return this.writer.commitUint8Array();
  }

  public toUint8Array(): Uint8Array {
    return this.writer.toUint8Array();
  }
}