import {
  BufferReader, BufferWriter,

  u8, i8,
  u16le, u16be, i16le, i16be, u16, i16,
  u32le, u32be, i32le, i32be, u32, i32,
  u64le, u64be, i64le, i64be, u64, i64,
  f32le, f32be, f32,
  f64le, f64be, f64
} from "../../src";

const writer = new BufferWriter(8);
const reader = new BufferReader(writer.buffer);

const beginWrite = () => writer.seek(0);
const beginRead = () => reader.seek(0);

describe("Numbers", () => {
  it("should write and read an u8", () => {
    beginWrite();
    u8.write(42, writer);
    beginRead();
    expect(u8.read(reader)).toBe(42);
  });

  it("should write and read an i8", () => {
    beginWrite();
    i8.write(-42, writer);
    beginRead();
    expect(i8.read(reader)).toBe(-42);
  });

  it("should write and read an u16le", () => {
    beginWrite();
    u16le.write(42, writer);
    beginRead();
    expect(u16le.read(reader)).toBe(42);
  });

  it("should write and read an u16be", () => {
    beginWrite();
    u16be.write(42, writer);
    beginRead();
    expect(u16be.read(reader)).toBe(42);
  });

  it("should write and read an i16le", () => {
    beginWrite();
    i16le.write(-42, writer);
    beginRead();
    expect(i16le.read(reader)).toBe(-42);
  });

  it("should write and read an i16be", () => {
    beginWrite();
    i16be.write(-42, writer);
    beginRead();
    expect(i16be.read(reader)).toBe(-42);
  });

  it("should write and read an u16", () => {
    beginWrite();
    u16.write(42, writer);
    beginRead();
    expect(u16.read(reader)).toBe(42);
  });

  it("should write and read an i16", () => {
    beginWrite();
    i16.write(-42, writer);
    beginRead();
    expect(i16.read(reader)).toBe(-42);
  });

  it("should write and read an u32le", () => {
    beginWrite();
    u32le.write(42, writer);
    beginRead();
    expect(u32le.read(reader)).toBe(42);
  });

  it("should write and read an u32be", () => {
    beginWrite();
    u32be.write(42, writer);
    beginRead();
    expect(u32be.read(reader)).toBe(42);
  });

  it("should write and read an i32le", () => {
    beginWrite();
    i32le.write(-42, writer);
    beginRead();
    expect(i32le.read(reader)).toBe(-42);
  });

  it("should write and read an i32be", () => {
    beginWrite();
    i32be.write(-42, writer);
    beginRead();
    expect(i32be.read(reader)).toBe(-42);
  });

  it("should write and read an u32", () => {
    beginWrite();
    u32.write(42, writer);
    beginRead();
    expect(u32.read(reader)).toBe(42);
  });

  it("should write and read an i32", () => {
    beginWrite();
    i32.write(-42, writer);
    beginRead();
    expect(i32.read(reader)).toBe(-42);
  });

  it("should write and read an u64le", () => {
    beginWrite();
    u64le.write(42n, writer);
    beginRead();
    expect(u64le.read(reader)).toBe(42n);
  });

  it("should write and read an u64be", () => {
    beginWrite();
    u64be.write(42n, writer);
    beginRead();
    expect(u64be.read(reader)).toBe(42n);
  });

  it("should write and read an i64le", () => {
    beginWrite();
    i64le.write(-42n, writer);
    beginRead();
    expect(i64le.read(reader)).toBe(-42n);
  });

  it("should write and read an i64be", () => {
    beginWrite();
    i64be.write(-42n, writer);
    beginRead();
    expect(i64be.read(reader)).toBe(-42n);
  });

  it("should write and read an u64", () => {
    beginWrite();
    u64.write(42n, writer);
    beginRead();
    expect(u64.read(reader)).toBe(42n);
  });

  it("should write and read an i64", () => {
    beginWrite();
    i64.write(-42n, writer);
    beginRead();
    expect(i64.read(reader)).toBe(-42n);
  });

  it("should write and read a f32le", () => {
    beginWrite();
    f32le.write(42.5, writer);
    beginRead();
    expect(f32le.read(reader)).toBe(42.5);
  });

  it("should write and read a f32be", () => {
    beginWrite();
    f32be.write(42.5, writer);
    beginRead();
    expect(f32be.read(reader)).toBe(42.5);
  });

  it("should write and read a f32", () => {
    beginWrite();
    f32.write(42.5, writer);
    beginRead();
    expect(f32.read(reader)).toBe(42.5);
  });

  it("should write and read a f64le", () => {
    beginWrite();
    f64le.write(42.42, writer);
    beginRead();
    expect(f64le.read(reader)).toBe(42.42);
  });

  it("should write and read a f64be", () => {
    beginWrite();
    f64be.write(42.42, writer);
    beginRead();
    expect(f64be.read(reader)).toBe(42.42);
  });

  it("should write and read a f64", () => {
    beginWrite();
    f64.write(42.42, writer);
    beginRead();
    expect(f64.read(reader)).toBe(42.42);
  });
});
