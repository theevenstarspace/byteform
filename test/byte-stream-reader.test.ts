import { ByteStreamReader, ByteStreamWriter } from "../src";

describe("ByteStreamReader", () => {
  it("should read uint8", () => {
    const buffer = new ArrayBuffer(1);
    const view = new Uint8Array(buffer);
    view[0] = 42;

    const reader = new ByteStreamReader(buffer);
    expect(reader.readUint8()).toBe(42);
  });

  it("should read int8", () => {
    const buffer = new ArrayBuffer(1);
    const view = new Int8Array(buffer);
    view[0] = -42;

    const reader = new ByteStreamReader(buffer);
    expect(reader.readInt8()).toBe(-42);
  });

  it("should read uint16", () => {
    const writer = new ByteStreamWriter(2);
    writer.writeUint16(42);

    const reader = new ByteStreamReader(writer.buffer);
    expect(reader.readUint16()).toBe(42);
  });

  it("should read int16", () => {
    const writer = new ByteStreamWriter(2);
    writer.writeInt16(-42);

    const reader = new ByteStreamReader(writer.buffer);
    expect(reader.readInt16()).toBe(-42);
  });

  it("should read uint32", () => {
    const writer = new ByteStreamWriter(4);
    writer.writeUint32(42);

    const reader = new ByteStreamReader(writer.buffer);
    expect(reader.readUint32()).toBe(42);
  });

  it("should read int32", () => {
    const writer = new ByteStreamWriter(4);
    writer.writeInt32(-42);

    const reader = new ByteStreamReader(writer.buffer);
    expect(reader.readInt32()).toBe(-42);
  });

  it("should read uint64", () => {
    const writer = new ByteStreamWriter(8);
    writer.writeUint64(42n);

    const reader = new ByteStreamReader(writer.buffer);
    expect(reader.readUint64()).toBe(42n);
  });

  it("should read int64", () => {
    const writer = new ByteStreamWriter(8);
    writer.writeInt64(-42n);

    const reader = new ByteStreamReader(writer.buffer);
    expect(reader.readInt64()).toBe(-42n);
  });

  it("should read float32", () => {
    const writer = new ByteStreamWriter(4);
    writer.writeFloat32(42.5);

    const reader = new ByteStreamReader(writer.buffer);
    expect(reader.readFloat32()).toBe(42.5);
  });

  it("should read float64", () => {
    const writer = new ByteStreamWriter(8);
    writer.writeFloat64(42.42);

    const reader = new ByteStreamReader(writer.buffer);
    expect(reader.readFloat64()).toBe(42.42);
  });

  it("should read a string", () => {
    const array = new Uint8Array([
      72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 0,
      128, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ]);

    const reader = new ByteStreamReader(array.buffer);
    const str = reader.readString();
    const u8 = reader.readUint8();

    expect(str).toBe("Hello World");
    expect(u8).toBe(128);
  });

  it("should read a fixed string", () => {
    const array = new Uint8Array([
      72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 0,
      128, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ]);

    const reader = new ByteStreamReader(array.buffer);
    const str = reader.readString(12);
    const u8 = reader.readUint8();

    expect(str).toBe("Hello World");
    expect(u8).toBe(128);
  });

  it("should read bytes", () => {
    const writer = new ByteStreamWriter(4);
    writer.writeUint32(42, true);

    const reader = new ByteStreamReader(writer.buffer);
    expect(reader.readBytes(4)).toEqual(new Uint8Array([42, 0, 0, 0]));

    reader.seek(0);
    expect(reader.readBytes(4).buffer).not.toBe(writer.buffer);
  });

  it("should read bytes unsafe", () => {
    const writer = new ByteStreamWriter(4);
    writer.writeUint32(42, true);

    const reader = new ByteStreamReader(writer.buffer);
    expect(reader.readBytesUnsafe(4)).toEqual(new Uint8Array([42, 0, 0, 0]));

    reader.seek(0);
    expect(reader.readBytesUnsafe(4).buffer).toBe(writer.buffer);
  });

  it("should read ArrayBuffer", () => {
    const writer = new ByteStreamWriter(4);
    writer.writeArrayBuffer(new Uint8Array([1, 2, 3, 4]).buffer);

    const reader = new ByteStreamReader(writer.buffer);
    const result = reader.readArrayBuffer(4);

    expect(result).toBeInstanceOf(ArrayBuffer);
    expect(result.byteLength).toEqual(4);
    expect(new Uint8Array(result)).toEqual(new Uint8Array([1, 2, 3, 4]));
  });

  it("should read TypedArray", () => {
    const writer = new ByteStreamWriter(8);
    writer.writeTypedArray(new Uint16Array([1, 2, 3, 4]));

    const reader = new ByteStreamReader(writer.buffer);
    const result = reader.readTypedArray(Uint16Array, 4);

    expect(result).toBeInstanceOf(Uint16Array);
    expect(result).toEqual(new Uint16Array([1, 2, 3, 4]));
  });
});