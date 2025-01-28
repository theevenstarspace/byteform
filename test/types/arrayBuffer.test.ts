import { ByteStreamWriter, ByteStreamReader, arrayBuffer } from "../../src";

describe("ArrayBuffer", () => {
  it("should write and read an ArrayBuffer", () => {
    const writer = new ByteStreamWriter(1024);
    arrayBuffer.write(writer, new ArrayBuffer(16));
    const buffer = writer.commit();

    const reader = new ByteStreamReader(buffer);
    const result = arrayBuffer.read(reader);

    expect(result).toBeInstanceOf(ArrayBuffer);
    expect(result.byteLength).toBe(16);
  });

  it("should write and read an ArrayBuffer with content", () => {
    const writer = new ByteStreamWriter(1024);
    const content = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
    arrayBuffer.write(writer, content.buffer);
    const buffer = writer.commit();

    const reader = new ByteStreamReader(buffer);
    const result = arrayBuffer.read(reader);

    expect(result).toBeInstanceOf(ArrayBuffer);
    expect(new Uint8Array(result)).toEqual(content);
  });
});
