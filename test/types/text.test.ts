import { BufferWriter, BufferReader, Text, text } from "../../src";

describe("Text Browser", () => {
  it("should write and read a string", () => {
    const writer = new BufferWriter(1024);
    text.write("Hello, World!", writer);
    const buffer = writer.commit();

    const reader = new BufferReader(buffer);
    expect(text.read(reader)).toBe("Hello, World!");
  });

  it("should throw an error if the string is too long", () => {
    const writer = new BufferWriter(512);

    // The default Text maxByteLength is 256
    expect(() => text.write("a".repeat(512), writer)).toThrow(RangeError);
  });

  it("should not throw an error with a custom Text type", () => {
    const writer = new BufferWriter(512);

    const customText = new Text(512);
    expect(() => customText.write("a".repeat(384), writer)).not.toThrow();
  });
});
