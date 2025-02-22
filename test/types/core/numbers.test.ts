import { ByteStreamReader, ByteStreamWriter, b } from "../../../src";

const writer = new ByteStreamWriter(8);
const reader = new ByteStreamReader(writer.buffer);

const beginWrite = (): void => writer.seek(0);
const beginRead = (): void => reader.seek(0);

const u8 = b.u8();
const i8 = b.i8();
const u16le = b.u16le();
const u16be = b.u16be();
const i16le = b.i16le();
const i16be = b.i16be();
const u16 = b.u16();
const i16 = b.i16();
const u32le = b.u32le();
const u32be = b.u32be();
const i32le = b.i32le();
const i32be = b.i32be();
const u32 = b.u32();
const i32 = b.i32();
const u64le = b.u64le();
const u64be = b.u64be();
const i64le = b.i64le();
const i64be = b.i64be();
const u64 = b.u64();
const i64 = b.i64();
const f32le = b.f32le();
const f32be = b.f32be();
const f32 = b.f32();
const f64le = b.f64le();
const f64be = b.f64be();
const f64 = b.f64();

describe("Numbers", () => {
  it("should write and read an u8", () => {
    beginWrite();
    u8.write(writer, 42);
    beginRead();
    expect(u8.read(reader)).toBe(42);
  });

  it("should write and read an i8", () => {
    beginWrite();
    i8.write(writer, -42);
    beginRead();
    expect(i8.read(reader)).toBe(-42);
  });

  it("should write and read an u16le", () => {
    beginWrite();
    u16le.write(writer, 42);
    beginRead();
    expect(u16le.read(reader)).toBe(42);
  });

  it("should write and read an u16be", () => {
    beginWrite();
    u16be.write(writer, 42);
    beginRead();
    expect(u16be.read(reader)).toBe(42);
  });

  it("should write and read an i16le", () => {
    beginWrite();
    i16le.write(writer, -42);
    beginRead();
    expect(i16le.read(reader)).toBe(-42);
  });

  it("should write and read an i16be", () => {
    beginWrite();
    i16be.write(writer, -42);
    beginRead();
    expect(i16be.read(reader)).toBe(-42);
  });

  it("should write and read an u16", () => {
    beginWrite();
    u16.write(writer, 42);
    beginRead();
    expect(u16.read(reader)).toBe(42);
  });

  it("should write and read an i16", () => {
    beginWrite();
    i16.write(writer, -42);
    beginRead();
    expect(i16.read(reader)).toBe(-42);
  });

  it("should write and read an u32le", () => {
    beginWrite();
    u32le.write(writer, 42);
    beginRead();
    expect(u32le.read(reader)).toBe(42);
  });

  it("should write and read an u32be", () => {
    beginWrite();
    u32be.write(writer, 42);
    beginRead();
    expect(u32be.read(reader)).toBe(42);
  });

  it("should write and read an i32le", () => {
    beginWrite();
    i32le.write(writer, -42);
    beginRead();
    expect(i32le.read(reader)).toBe(-42);
  });

  it("should write and read an i32be", () => {
    beginWrite();
    i32be.write(writer, -42);
    beginRead();
    expect(i32be.read(reader)).toBe(-42);
  });

  it("should write and read an u32", () => {
    beginWrite();
    u32.write(writer, 42);
    beginRead();
    expect(u32.read(reader)).toBe(42);
  });

  it("should write and read an i32", () => {
    beginWrite();
    i32.write(writer, -42);
    beginRead();
    expect(i32.read(reader)).toBe(-42);
  });

  it("should write and read an u64le", () => {
    beginWrite();
    u64le.write(writer, 42n);
    beginRead();
    expect(u64le.read(reader)).toBe(42n);
  });

  it("should write and read an u64be", () => {
    beginWrite();
    u64be.write(writer, 42n);
    beginRead();
    expect(u64be.read(reader)).toBe(42n);
  });

  it("should write and read an i64le", () => {
    beginWrite();
    i64le.write(writer, -42n);
    beginRead();
    expect(i64le.read(reader)).toBe(-42n);
  });

  it("should write and read an i64be", () => {
    beginWrite();
    i64be.write(writer, -42n);
    beginRead();
    expect(i64be.read(reader)).toBe(-42n);
  });

  it("should write and read an u64", () => {
    beginWrite();
    u64.write(writer, 42n);
    beginRead();
    expect(u64.read(reader)).toBe(42n);
  });

  it("should write and read an i64", () => {
    beginWrite();
    i64.write(writer, -42n);
    beginRead();
    expect(i64.read(reader)).toBe(-42n);
  });

  it("should write and read a f32le", () => {
    beginWrite();
    f32le.write(writer, 42.5);
    beginRead();
    expect(f32le.read(reader)).toBe(42.5);
  });

  it("should write and read a f32be", () => {
    beginWrite();
    f32be.write(writer, 42.5);
    beginRead();
    expect(f32be.read(reader)).toBe(42.5);
  });

  it("should write and read a f32", () => {
    beginWrite();
    f32.write(writer, 42.5);
    beginRead();
    expect(f32.read(reader)).toBe(42.5);
  });

  it("should write and read a f64le", () => {
    beginWrite();
    f64le.write(writer, 42.42);
    beginRead();
    expect(f64le.read(reader)).toBe(42.42);
  });

  it("should write and read a f64be", () => {
    beginWrite();
    f64be.write(writer, 42.42);
    beginRead();
    expect(f64be.read(reader)).toBe(42.42);
  });

  it("should write and read a f64", () => {
    beginWrite();
    f64.write(writer, 42.42);
    beginRead();
    expect(f64.read(reader)).toBe(42.42);
  });
});
