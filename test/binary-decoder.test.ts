import { BinaryDecoder, BufferReader, BufferWriter, List, u32 } from "../src";

describe("BinaryDecoder", () => {
  it("should decode a value", () => {
    const writer = new BufferWriter(32);
    writer.writeUint32(3);
    writer.writeUint32(1);
    writer.writeUint32(2);
    writer.writeUint32(3);

    const decoder = new BinaryDecoder(new BufferReader(writer.commit()));
    const list = decoder.decode(new List(u32));

    expect(list).toEqual([1, 2, 3]);
  });

  it("fromArrayBuffer should return a new instance", () => {
    const writer = new BufferWriter(32);
    writer.writeUint32(3);
    writer.writeUint32(1);
    writer.writeUint32(2);
    writer.writeUint32(3);

    const decoder = BinaryDecoder.fromArrayBuffer(writer.commit());
    const list = decoder.decode(new List(u32));

    expect(list).toEqual([1, 2, 3]);
  });
});
