import { ByteStreamWriter, ByteStreamReader, Str } from "../../src";

describe("Str", () => {
  it("should write and read a string", () => {
    const writer = new ByteStreamWriter(1024);

    const str = new Str(16);
    str.write(writer, "Hello, World!");
    const buffer = writer.commit();

    const reader = new ByteStreamReader(buffer);
    expect(str.read(reader)).toBe("Hello, World!");
  });

  it("should write a string larger than initial buffer size", () => {
    const writer = new ByteStreamWriter(4, { maxByteLength: 64 });
    const str = new Str(16);

    str.write(writer, "Hello, World!");
    const buffer = writer.commit();

    const reader = new ByteStreamReader(buffer);
    expect(str.read(reader)).toBe("Hello, World!");
  });

  it("should throw an error if the string is too long", () => {
    const writer = new ByteStreamWriter(256);
    const str = new Str(1024);

    expect(() => str.write(writer, "a".repeat(512))).toThrow(RangeError);
  });

  it("should throw an error if byte length is less than 0", () => {
    expect(() => new Str(-1)).toThrow(RangeError);
  });

  it("should throw an error if byte length is equal to 0", () => {
    expect(() => new Str(0)).toThrow(RangeError);
  });

  it("should throw an error if byte length is equal to Infinity", () => {
    expect(() => new Str(Infinity)).toThrow(RangeError);
  });
});
