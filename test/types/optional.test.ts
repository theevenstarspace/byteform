import { ByteStreamWriter, ByteStreamReader, Optional, Struct, f64 } from "../../src";

const vec3 = new Struct({
  x: f64,
  y: f64,
  z: f64,
});

const vec3OrNull = new Optional(vec3);

describe("optional", () => {
  it("should write and read a real value", () => {
    const writer = new ByteStreamWriter(1024);
    vec3OrNull.write(writer, {
      x: 1.5,
      y: 2.4,
      z: 3.6,
    });

    const reader = new ByteStreamReader(writer.buffer);
    const value = vec3OrNull.read(reader);

    expect(value).toEqual({
      x: 1.5,
      y: 2.4,
      z: 3.6,
    });
  });

  it("should write and read a real value with stream methods", () => {
    const writer = new ByteStreamWriter(1024);
    writer.writeSchema(vec3OrNull, {
      x: 1.5,
      y: 2.4,
      z: 3.6,
    });

    const reader = new ByteStreamReader(writer.buffer);
    const value = reader.readSchema(vec3OrNull);

    expect(value).toEqual({
      x: 1.5,
      y: 2.4,
      z: 3.6,
    });
  });

  it("should write and read a null value", () => {
    const writer = new ByteStreamWriter(1024);
    vec3OrNull.write(writer, null);

    const reader = new ByteStreamReader(writer.buffer);
    const value = vec3OrNull.read(reader);

    expect(value).toEqual(null);
  });

  it("should write and read a null value with stream methods", () => {
    const writer = new ByteStreamWriter(1024);
    writer.writeSchema(vec3OrNull, null);

    const reader = new ByteStreamReader(writer.buffer);
    const value = reader.readSchema(vec3OrNull);

    expect(value).toEqual(null);
  });
});