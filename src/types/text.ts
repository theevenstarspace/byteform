import type { BufferReader } from "../buffer-reader";
import type { BufferWriter } from "../buffer-writer";
import type { BaseType } from "./base";

// https://nodejs.org/api/globals.html#textencoder
const Encoder = new TextEncoder();
const Decoder = new TextDecoder();

export class Text implements BaseType<string> {
  private stringBuffer: Uint8Array;

  public constructor(maxByteLength: number = 256) {
    this.stringBuffer = new Uint8Array(maxByteLength);
  }

  public write(value: string, writer: BufferWriter) {
    const res = Encoder.encodeInto(value, this.stringBuffer);

    if (res.read !== value.length) {
      throw new RangeError(`Failed to encode string, only ${res.read} symbols out of ${value.length} were encoded. Using a new instance of Text type with a larger maxByteLength might help.`);
    }

    writer.writeUint32(res.written);
    writer.writeBytes(this.stringBuffer, res.written);
  }

  public read(reader: BufferReader): string {
    const length = reader.readUint32();
    const offset = reader.position;
    reader.skip(length);

    return Decoder.decode(reader.subarray(offset, offset + length));
  }
}

export const text = new Text();
