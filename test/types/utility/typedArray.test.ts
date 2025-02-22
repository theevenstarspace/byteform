import { ByteStreamWriter, ByteStreamReader, bu} from "../../../src";

const CONTENT = [1, 2, 3, 4, 5, 6, 7, 8];
const BI_CONTENT = [1n, 2n, 3n, 4n, 5n, 6n, 7n, 8n];

const u8Array = bu.u8Array();
const i8Array = bu.i8Array();
const u16Array = bu.u16Array();
const i16Array = bu.i16Array();
const u32Array = bu.u32Array();
const i32Array = bu.i32Array();
const u64Array = bu.u64Array();
const i64Array = bu.i64Array();
const f32Array = bu.f32Array();
const f64Array = bu.f64Array();

describe("TypedArray", () => {
  it("should write and read an Uint8Array", () => {
    const writer = new ByteStreamWriter(1024);
    u8Array.write(writer, new Uint8Array(CONTENT));
    const buffer = writer.commit();

    const reader = new ByteStreamReader(buffer);
    const result = u8Array.read(reader);

    expect(result).toBeInstanceOf(Uint8Array);
    expect(result).toEqual(new Uint8Array(CONTENT));
  });

  it("should write and read an Int8Array", () => {
    const writer = new ByteStreamWriter(1024);
    i8Array.write(writer, new Int8Array(CONTENT));
    const buffer = writer.commit();

    const reader = new ByteStreamReader(buffer);
    const result = i8Array.read(reader);

    expect(result).toBeInstanceOf(Int8Array);
    expect(result).toEqual(new Int8Array(CONTENT));
  });

  it("should write and read an Uint16Array", () => {
    const writer = new ByteStreamWriter(1024);
    u16Array.write(writer, new Uint16Array(CONTENT));
    const buffer = writer.commit();

    const reader = new ByteStreamReader(buffer);
    const result = u16Array.read(reader);

    expect(result).toBeInstanceOf(Uint16Array);
    expect(result).toEqual(new Uint16Array(CONTENT));
  });

  it("should write and read an Int16Array", () => {
    const writer = new ByteStreamWriter(1024);
    i16Array.write(writer, new Int16Array(CONTENT));
    const buffer = writer.commit();

    const reader = new ByteStreamReader(buffer);
    const result = i16Array.read(reader);

    expect(result).toBeInstanceOf(Int16Array);
    expect(result).toEqual(new Int16Array(CONTENT));
  });

  it("should write and read an Uint32Array", () => {
    const writer = new ByteStreamWriter(1024);
    u32Array.write(writer, new Uint32Array(CONTENT));
    const buffer = writer.commit();

    const reader = new ByteStreamReader(buffer);
    const result = u32Array.read(reader);

    expect(result).toBeInstanceOf(Uint32Array);
    expect(result).toEqual(new Uint32Array(CONTENT));
  });

  it("should write and read an Int32Array", () => {
    const writer = new ByteStreamWriter(1024);
    i32Array.write(writer, new Int32Array(CONTENT));
    const buffer = writer.commit();

    const reader = new ByteStreamReader(buffer);
    const result = i32Array.read(reader);

    expect(result).toBeInstanceOf(Int32Array);
    expect(result).toEqual(new Int32Array(CONTENT));
  });

  it("should write and read an Uint64Array", () => {
    const writer = new ByteStreamWriter(1024);
    u64Array.write(writer, new BigUint64Array(BI_CONTENT));
    const buffer = writer.commit();

    const reader = new ByteStreamReader(buffer);
    const result = u64Array.read(reader);

    expect(result).toBeInstanceOf(BigUint64Array);
    expect(result).toEqual(new BigUint64Array(BI_CONTENT));
  });

  it("should write and read an Int64Array", () => {
    const writer = new ByteStreamWriter(1024);
    i64Array.write(writer, new BigInt64Array(BI_CONTENT));
    const buffer = writer.commit();

    const reader = new ByteStreamReader(buffer);
    const result = i64Array.read(reader);

    expect(result).toBeInstanceOf(BigInt64Array);
    expect(result).toEqual(new BigInt64Array(BI_CONTENT));
  });

  it("should write and read an Float32Array", () => {
    const writer = new ByteStreamWriter(1024);
    f32Array.write(writer, new Float32Array(CONTENT));
    const buffer = writer.commit();

    const reader = new ByteStreamReader(buffer);
    const result = f32Array.read(reader);

    expect(result).toBeInstanceOf(Float32Array);
    expect(result).toEqual(new Float32Array(CONTENT));
  });

  it("should write and read an Float64Array", () => {
    const writer = new ByteStreamWriter(1024);
    f64Array.write(writer, new Float64Array(CONTENT));
    const buffer = writer.commit();

    const reader = new ByteStreamReader(buffer);
    const result = f64Array.read(reader);

    expect(result).toBeInstanceOf(Float64Array);
    expect(result).toEqual(new Float64Array(CONTENT));
  });

  it("should throw an error if the array is too long", () => {
    const writer = new ByteStreamWriter(256);

    expect(() => u8Array.write(writer, new Uint8Array(512))).toThrow(RangeError);
  });
});
