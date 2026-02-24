import type { Schema } from "../../src";
import {
  ByteStreamWriter,
  uVar,
  iVar,
  ByteStreamReader,
  iLEB128,
  uLEB128,
} from "../../src";
import { writeAndRead } from "./utils";

function testVarInt(
  name: string,
  schema: Schema<number>,
  cases: { value: number; buffer: number[] }[]
): void {
  describe(name, () => {
    for (const { value, buffer } of cases) {
      it(`should encode ${value} as ${buffer}`, () => {
        const writer = new ByteStreamWriter(buffer.length);
        schema.write(writer, value);
        const writtenBuffer = writer.commit();
        expect(writtenBuffer).toEqual(new Uint8Array(buffer));
      });
      it(`should decode ${buffer} as ${value}`, () => {
        const reader = new ByteStreamReader(new Uint8Array(buffer));
        expect(schema.read(reader)).toBe(value);
        expect(reader.position).toBe(buffer.length);
      });
      it(`should write and read ${value}`, () => {
        const result = writeAndRead(schema, value);
        expect(result).toBe(value);
      });
    }
  });
}

const unsignedCases = [
  { value: 0, buffer: [0] },
  { value: 42, buffer: [42] },
  { value: 127, buffer: [127] },
  { value: 128, buffer: [0x80, 1] },
  { value: 129, buffer: [0x81, 1] },
  { value: 255, buffer: [0xff, 1] },
  { value: 256, buffer: [0x80, 2] },
  { value: 0xffff, buffer: [0xff, 0xff, 3] },
  { value: 624485, buffer: [0xe5, 0x8e, 0x26] },
] satisfies { value: number; buffer: number[] }[];

const signedCases = [
  { value: 0, buffer: [0] },
  { value: 1, buffer: [1] },
  { value: 63, buffer: [63] },
  { value: 64, buffer: [0xc0, 0x00] },
  { value: 127, buffer: [0xff, 0x00] },
  { value: -1, buffer: [0x7f] },
  { value: -63, buffer: [0x41] },
  { value: -64, buffer: [0x40] },
  { value: -65, buffer: [0xbf, 0x7f] },
  { value: -128, buffer: [0x80, 0x7f] },
  { value: -129, buffer: [0xff, 0x7e] },
  { value: -123456, buffer: [0xc0, 0xbb, 0x78] },
] satisfies { value: number; buffer: number[] }[];

describe("varint aliases", () => {
  it("uVar should alias uLEB128", () => {
    expect(uVar).toBe(uLEB128);
  });
  it("iVar should alias iLEB128", () => {
    expect(iVar).toBe(iLEB128);
  });
});

testVarInt("uLEB128", uLEB128, unsignedCases);
testVarInt("uVar", uVar, unsignedCases);
testVarInt("iLEB128", iLEB128, signedCases);
testVarInt("iVar", iVar, signedCases);
