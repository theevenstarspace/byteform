import { ByteStreamWriter, ByteStreamReader } from "../src";

describe("String", () => {
  it("should write and read a string", () => {
    const writer = new ByteStreamWriter(1024);
    const written = writer.writeString("Hello, World!", 16);
    const buffer = writer.commit();

    const reader = new ByteStreamReader(buffer);
    expect(reader.readString(16)).toBe("Hello, World!");
    expect(written).toBe(13);
  });

  it("should write and read a string with 2-byte characters", () => {
    const writer = new ByteStreamWriter(1024);
    writer.writeString("©ö", 16);
    const buffer = writer.commit();

    const reader = new ByteStreamReader(buffer);
    expect(reader.readString(16)).toBe("©ö");
  });

  it("should write and read a string with 3-byte characters", () => {
    const writer = new ByteStreamWriter(1024);
    writer.writeString("你好", 16);
    const buffer = writer.commit();

    const reader = new ByteStreamReader(buffer);
    expect(reader.readString(16)).toBe("你好");
  });

  it("should write and read a string with 4-byte characters", () => {
    const writer = new ByteStreamWriter(1024);
    writer.writeString("😊👍", 16);
    const buffer = writer.commit();

    const reader = new ByteStreamReader(buffer);
    expect(reader.readString(16)).toBe("😊👍");
  });

  it("should write and read a string with a various byte lengths", () => {
    const writer = new ByteStreamWriter(1024);
    writer.writeString("A©你好😊", 20);
    const buffer = writer.commit();

    const reader = new ByteStreamReader(buffer);
    expect(reader.readString(20)).toBe("A©你好😊");
  });

  it("should write and read a string with a limited length", () => {
    const writer = new ByteStreamWriter(1024);
    const w1 = writer.writeString("Hi", 1); // 1-byte per symbol
    const w2 = writer.writeString("©", 1); // 2-byte symbol
    const w3 = writer.writeString("你", 1); // 3-byte symbol
    const w4 = writer.writeString("😊", 1); // 4-byte symbol
    const buffer = writer.commit();

    const reader = new ByteStreamReader(buffer);

    expect(reader.readString(1)).toBe("H"); // 1-byte fits
    expect(reader.readString(1)).toBe(""); // 2-byte does not fit
    expect(reader.readString(1)).toBe(""); // 3-byte does not fit
    expect(reader.readString(1)).toBe(""); // 4-byte does not fit

    expect(w1).toBe(1); // 1 character written
    expect(w2).toBe(0); // 0 characters written
    expect(w3).toBe(0); // 0 characters written
    expect(w4).toBe(0); // 0 characters written
  });

  it("should write and read a zero length string", () => {
    const writer = new ByteStreamWriter(1024);
    writer.writeString("", 10);
    const buffer = writer.commit();

    const reader = new ByteStreamReader(buffer);
    expect(reader.readString(10)).toBe("");
  });

  it("should correctly fit within the buffer", () => {
    const writer = new ByteStreamWriter(1024);
    writer.writeString("Hello World!", 16);
    writer.writeFloat64(3.14);
    const buffer = writer.commit();

    const reader = new ByteStreamReader(buffer);
    expect(reader.readString(16)).toBe("Hello World!");
    expect(reader.readFloat64()).toBe(3.14);
  });

  it("should read empty string when length is 0", () => {
    const writer = new ByteStreamWriter(1024);
    writer.writeString("Hello World!", 16);
    writer.writeFloat64(3.14);
    const buffer = writer.commit();

    const reader = new ByteStreamReader(buffer);
    expect(reader.readString(0)).toBe("");
  });

  it("should throw reading when length is less than 0", () => {
    const writer = new ByteStreamWriter(1024);
    writer.writeString("Hello World!", 16);
    const buffer = writer.commit();

    const reader = new ByteStreamReader(buffer);
    expect(() => reader.readString(-2)).toThrow(RangeError);
  });

  it("should throw writing when length is 0", () => {
    const writer = new ByteStreamWriter(1024);
    expect(() => writer.writeString("Hello World!", 0)).toThrow(RangeError);
  });

  it("should throw writing when length is Infinity", () => {
    const writer = new ByteStreamWriter(1024);
    expect(() => writer.writeString("Hello World!", Infinity)).toThrow(RangeError);
  });
});
