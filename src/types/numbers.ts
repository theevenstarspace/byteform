import { createType } from "./base";

export const u8 = createType<number>({
  write: (value, writer) => writer.writeUint8(value),
  read: (reader) => reader.readUint8(),
});

export const i8 = createType<number>({
  write: (value, writer) => writer.writeInt8(value),
  read: (reader) => reader.readInt8(),
});

export const u16le = createType<number>({
  write: (value, writer) => writer.writeUint16(value, true),
  read: (reader) => reader.readUint16(true),
});

export const u16be = createType<number>({
  write: (value, writer) => writer.writeUint16(value),
  read: (reader) => reader.readUint16(),
});

export const i16le = createType<number>({
  write: (value, writer) => writer.writeInt16(value, true),
  read: (reader) => reader.readInt16(true),
});

export const i16be = createType<number>({
  write: (value, writer) => writer.writeInt16(value),
  read: (reader) => reader.readInt16(),
});

export const u32le = createType<number>({
  write: (value, writer) => writer.writeUint32(value, true),
  read: (reader) => reader.readUint32(true),
});

export const u32be = createType<number>({
  write: (value, writer) => writer.writeUint32(value),
  read: (reader) => reader.readUint32(),
});

export const i32le = createType<number>({
  write: (value, writer) => writer.writeInt32(value, true),
  read: (reader) => reader.readInt32(true),
});

export const i32be = createType<number>({
  write: (value, writer) => writer.writeInt32(value),
  read: (reader) => reader.readInt32(),
});

export const u64le = createType<bigint>({
  write: (value, writer) => writer.writeUint64(value, true),
  read: (reader) => reader.readUint64(true),
});

export const u64be = createType<bigint>({
  write: (value, writer) => writer.writeUint64(value),
  read: (reader) => reader.readUint64(),
});

export const i64le = createType<bigint>({
  write: (value, writer) => writer.writeInt64(value, true),
  read: (reader) => reader.readInt64(true),
});

export const i64be = createType<bigint>({
  write: (value, writer) => writer.writeInt64(value),
  read: (reader) => reader.readInt64(),
});

export const f32le = createType<number>({
  write: (value, writer) => writer.writeFloat32(value, true),
  read: (reader) => reader.readFloat32(true),
});

export const f32be = createType<number>({
  write: (value, writer) => writer.writeFloat32(value),
  read: (reader) => reader.readFloat32(),
});

export const f64le = createType<number>({
  write: (value, writer) => writer.writeFloat64(value, true),
  read: (reader) => reader.readFloat64(true),
});

export const f64be = createType<number>({
  write: (value, writer) => writer.writeFloat64(value),
  read: (reader) => reader.readFloat64(),
});

export const u16 = u16be;
export const i16 = i16be;
export const u32 = u32be;
export const i32 = i32be;
export const u64 = u64be;
export const i64 = i64be;
export const f32 = f32be;
export const f64 = f64be;
