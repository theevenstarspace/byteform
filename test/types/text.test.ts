import { ByteStreamWriter, ByteStreamReader, Text, text } from "../../src";

describe("Text Browser", () => {
  it("should write and read a string", () => {
    const writer = new ByteStreamWriter(1024);
    text.write(writer, "Hello, World!");
    const buffer = writer.commit();

    const reader = new ByteStreamReader(buffer);
    expect(text.read(reader)).toBe("Hello, World!");
  });

  it("should throw an error if the string is too long", () => {
    const writer = new ByteStreamWriter(512);

    // The default Text maxByteLength is 256
    expect(() => text.write(writer, "a".repeat(512))).toThrow(RangeError);
  });

  it("should not throw an error with a custom Text type", () => {
    const writer = new ByteStreamWriter(512);

    const customText = new Text(512);
    expect(() => customText.write(writer, "a".repeat(384))).not.toThrow();
  });
});
