import { BufferWriter } from "../src";

describe("BufferWriter", () => {
  it("should create a buffer writer", () => {
    const writer = new BufferWriter(16);
    expect(writer.buffer.byteLength).toBe(16);
    expect(writer.position).toBe(0);
  });

  it("should throw an error when creating a buffer writer with an invalid size", () => {
    expect(() => new BufferWriter(0)).toThrow(Error);
  });

  it("should resize the buffer", () => {
    const writer = new BufferWriter(16, { maxByteLength: 32 });

    writer.writeBytes(new Uint8Array(16)); // position = 16
    expect(writer.buffer.byteLength).toBe(16);
    writer.writeBytes(new Uint8Array(16)); // position = 32
    expect(writer.buffer.byteLength).toBe(32);
  });

  it("should resize the buffer with an exponentiall strategy", () => {
    const writer = new BufferWriter(16, { maxByteLength: 32, strategy: "exponential", factor: 2 });

    writer.writeBytes(new Uint8Array(16)); // position = 16
    expect(writer.buffer.byteLength).toBe(16);
    writer.writeBytes(new Uint8Array(16)); // position = 32
    expect(writer.buffer.byteLength).toBe(32);
  });

  it("should resize the buffer with an additive strategy", () => {
    const writer = new BufferWriter(16, { maxByteLength: 32, strategy: "additive", increment: 16 });

    writer.writeBytes(new Uint8Array(16)); // position = 16
    expect(writer.buffer.byteLength).toBe(16);
    writer.writeBytes(new Uint8Array(16)); // position = 32
    expect(writer.buffer.byteLength).toBe(32);
  });

  it("should resize the buffer with a hybrid strategy", () => {
    const writer = new BufferWriter(16, { maxByteLength: 32, strategy: "hybrid", factor: 2, increment: 16 });

    writer.writeBytes(new Uint8Array(16)); // position = 16
    expect(writer.buffer.byteLength).toBe(16);
    writer.writeBytes(new Uint8Array(16)); // position = 32
    expect(writer.buffer.byteLength).toBe(32);
  });

  it("should return valid capacity", () => {
    const writer = new BufferWriter(16);
    expect(writer.capacity).toBe(16);
  });

  it("should return valid remaining capacity", () => {
    const writer = new BufferWriter(16);
    expect(writer.remaining).toBe(16);

    writer.writeUint8(42);
    expect(writer.remaining).toBe(15);
  });

  it("begin should reset the position", () => {
    const writer = new BufferWriter(16);
    writer.writeUint8(42);
    writer.begin();
    expect(writer.position).toBe(0);
  });

  it("commit should return a valid buffer", () => {
    const writer = new BufferWriter(16);

    writer.writeUint8(42); // write 1 byte
    const buffer = writer.commit();

    expect(buffer).toBeInstanceOf(ArrayBuffer);
    expect(buffer.byteLength).toBe(1);
  });

  it("commitUint8Array should return a valid typed buffer", () => {
    const writer = new BufferWriter(16);

    writer.writeUint8(42); // write 1 byte
    const buffer = writer.commitUint8Array();

    expect(buffer).toBeInstanceOf(Uint8Array);
    expect(buffer.byteLength).toBe(1);
  });

  it("toUint8Array should return a valid typed buffer", () => {
    const writer = new BufferWriter(16);

    writer.writeUint8(42); // write 1 byte
    const buffer = writer.toUint8Array();

    expect(buffer).toBeInstanceOf(Uint8Array);
    expect(buffer.byteLength).toBe(1);
  });

  it("writing out of bounds should throw an error", () => {
    const writer = new BufferWriter(16);
    expect(() => writer.writeUint8(42)).not.toThrow();

    writer.begin();
    writer.writeBytes(new Uint8Array(16));

    expect(() => writer.writeUint8(42)).toThrow(RangeError);
  });

  it("writing out of bounds should throw an error with a resizable buffer", () => {
    const writer = new BufferWriter(8, { maxByteLength: 16 });
    expect(() => writer.writeBytes(new Uint8Array(16))).not.toThrow();

    writer.begin();
    writer.writeBytes(new Uint8Array(16));

    expect(() => writer.writeUint8(42)).toThrow(RangeError);
  });

  it("should write a uint8", () => {
    const writer = new BufferWriter(1);
    writer.writeUint8(42);
    const buffer = writer.commit();
    const view = new DataView(buffer);
    expect(view.getUint8(0)).toBe(42);
  });

  it("should write an int8", () => {
    const writer = new BufferWriter(1);
    writer.writeInt8(42);
    const buffer = writer.commit();
    const view = new DataView(buffer);
    expect(view.getInt8(0)).toBe(42);
  });

  it("should write a uint16", () => {
    const writer = new BufferWriter(2);
    writer.writeUint16(42);
    const buffer = writer.commit();
    const view = new DataView(buffer);
    expect(view.getUint16(0)).toBe(42);
  });

  it("should write an int16", () => {
    const writer = new BufferWriter(2);
    writer.writeInt16(-42);
    const buffer = writer.commit();
    const view = new DataView(buffer);
    expect(view.getInt16(0)).toBe(-42);
  });

  it("should write a uint32", () => {
    const writer = new BufferWriter(4);
    writer.writeUint32(42);
    const buffer = writer.commit();
    const view = new DataView(buffer);
    expect(view.getUint32(0)).toBe(42);
  });

  it("should write an int32", () => {
    const writer = new BufferWriter(4);
    writer.writeInt32(-42);
    const buffer = writer.commit();
    const view = new DataView(buffer);
    expect(view.getInt32(0)).toBe(-42);
  });

  it("should write a uint64", () => {
    const writer = new BufferWriter(8);
    writer.writeUint64(42n);
    const buffer = writer.commit();
    const view = new DataView(buffer);
    expect(view.getBigUint64(0)).toBe(42n);
  });

  it("should write an int64", () => {
    const writer = new BufferWriter(8);
    writer.writeInt64(-42n);
    const buffer = writer.commit();
    const view = new DataView(buffer);
    expect(view.getBigInt64(0)).toBe(-42n);
  });

  it("should write a float32", () => {
    const writer = new BufferWriter(4);
    writer.writeFloat32(42.42);
    const buffer = writer.commit();
    const view = new DataView(buffer);
    expect(view.getFloat32(0)).toBeCloseTo(42.42);
  });

  it("should write a float64", () => {
    const writer = new BufferWriter(8);
    writer.writeFloat64(42.42);
    const buffer = writer.commit();
    const view = new DataView(buffer);
    expect(view.getFloat64(0)).toBeCloseTo(42.42);
  });

  it("should write bytes", () => {
    const writer = new BufferWriter(3);
    writer.writeBytes(new Uint8Array([1, 2, 3]));
    const buffer = writer.commit();
    const view = new DataView(buffer);
    expect(view.getUint8(0)).toBe(1);
    expect(view.getUint8(1)).toBe(2);
    expect(view.getUint8(2)).toBe(3);
  });

  it("should write bytes with optional byteLength", () => {
    const writer = new BufferWriter(3);
    writer.writeBytes(new Uint8Array([1, 2, 3, 4, 5, 6]), 2);
    const buffer = writer.commit();
    const view = new DataView(buffer);
    expect(view.getUint8(0)).toBe(1);
    expect(view.getUint8(1)).toBe(2);
    expect(view.byteLength).toBe(2);
  });

});
