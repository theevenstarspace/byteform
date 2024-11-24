import { BinaryEncoder, BufferWriter, List, u32 } from "../src";

describe("BinaryEncoder", () => {
  it("should encode and decode a value", () => {
    const encoder = new BinaryEncoder(new BufferWriter(32));
    encoder.encode(new List(u32), [1, 2, 3]);

    const buffer = encoder.commit();

    expect(buffer.byteLength).toBe(16); // 4 for the length, 12 for content
  });

  it("should reset the writer", () => {
    const encoder = new BinaryEncoder(new BufferWriter(32));
    encoder.encode(new List(u32), [1, 2, 3]);
    encoder.reset();

    const buffer = encoder.commit();

    expect(buffer.byteLength).toBe(0);
  });

  it("should return a Uint8Array", () => {
    const encoder = new BinaryEncoder(new BufferWriter(32));
    encoder.encode(new List(u32), [1, 2, 3]);

    const buffer = encoder.commitUint8Array();

    expect(buffer.byteLength).toBe(16);
  });

  it("should return a valid Uint8Array reference", () => {
    const encoder = new BinaryEncoder(new BufferWriter(32));
    encoder.encode(new List(u32), [1, 2, 3]);

    const buffer = encoder.toUint8Array();

    expect(buffer.buffer).toBe(encoder.writer.buffer);
  });

  it("create should return a new instance", () => {
    const encoder = BinaryEncoder.create(32, { maxByteLength: 64 });

    expect(encoder.writer.capacity).toBe(32);
    expect(encoder.writer.buffer.maxByteLength).toBe(64);
  });

});