import { ByteStreamWriter, ByteStreamReader, text } from "../../src";

describe("Text Browser", () => {
  it("should write and read a string", () => {
    const writer = new ByteStreamWriter(1024);
    text.write(writer, "Hello, World!");
    const buffer = writer.commit();

    const reader = new ByteStreamReader(buffer);
    expect(text.read(reader)).toBe("Hello, World!");
  });

  it("should write a string larger than initial buffer sizde", () => {
    const writer = new ByteStreamWriter(4, { maxByteLength: 64 });

    text.write(writer, "Hello, World!");
    const buffer = writer.commit();

    const reader = new ByteStreamReader(buffer);
    expect(text.read(reader)).toBe("Hello, World!");
  });

  it("should throw an error if the string is too long", () => {
    const writer = new ByteStreamWriter(256);

    expect(() => text.write(writer, "a".repeat(512))).toThrow(RangeError);
  });
});
