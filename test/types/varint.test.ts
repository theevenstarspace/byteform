import {
  ByteStreamWriter,
  uVarInt,
  iVarInt,
  ByteStreamReader,
} from "../../src";

describe("uVarInt", () => {
  for (const { value, buffer } of [
    { value: 0, buffer: [0] },
    { value: 42, buffer: [42] },
    { value: 127, buffer: [127] },
    { value: 128, buffer: [0x80, 1] },
    { value: 129, buffer: [0x81, 1] },
    { value: 255, buffer: [0xff, 1] },
    { value: 256, buffer: [0x80, 2] },
    { value: 0xffff, buffer: [0xff, 0xff, 3] },
    {
      value: Number.MAX_SAFE_INTEGER,
      buffer: [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 15],
    },
  ]) {
    it(`should encode ${value} as ${buffer}`, () => {
      const writer = new ByteStreamWriter(buffer.length);
      uVarInt.write(writer, value);
      const writtenBuffer = writer.commit();
      expect(writtenBuffer).toEqual(new Uint8Array(buffer));
    });
    it(`should decode ${buffer} as ${value}`, () => {
      const reader = new ByteStreamReader(new Uint8Array(buffer));
      expect(uVarInt.read(reader)).toBe(value);
      expect(reader.position).toBe(buffer.length);
    });
  }
});

describe("iVarInt", () => {
  for (const { value, buffer } of [
    { value: 0, buffer: [0] },
    { value: 1, buffer: [1] },
    { value: 63, buffer: [63] },
    { value: 64, buffer: [0x80, 1] },
    { value: -63, buffer: [0x40 | 63] },
    { value: -1, buffer: [0x40 | 1] },
    { value: -64, buffer: [0x40 | 0x80, 1] },
    { value: -65, buffer: [0x40 | 0x81, 1] },
    { value: -128, buffer: [0x40 | 0x80, 2] },
    { value: -129, buffer: [0x40 | 0x81, 2] },
    { value: -255, buffer: [0x40 | 0x80 | 0x3f, 3] },
    { value: 0x7fff, buffer: [0x80 | 0x3f, 0xff, 3] },
    { value: -0x7fff, buffer: [0x40 | 0x80 | 0x3f, 0xff, 3] },
    {
      value: Number.MAX_SAFE_INTEGER,
      buffer: [191, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 31],
    },
    {
      value: Number.MIN_SAFE_INTEGER,
      buffer: [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 31],
    },
  ]) {
    it(`should encode ${value} as ${buffer}`, () => {
      const writer = new ByteStreamWriter(buffer.length);
      iVarInt.write(writer, value);
      const writtenBuffer = writer.commit();
      expect(writtenBuffer).toEqual(new Uint8Array(buffer));
    });
    it(`should decode ${buffer} as ${value}`, () => {
      const reader = new ByteStreamReader(new Uint8Array(buffer));
      expect(iVarInt.read(reader)).toBe(value);
      expect(reader.position).toBe(buffer.length);
    });
  }
});
