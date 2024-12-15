import { createSchema } from "./schema";

/**
 * A type that represents an unsigned 8-bit integer.
 * @group Available Types
 */
export const u8 = createSchema<number>({
  write: (writer, value) => writer.writeUint8(value),
  read: (reader) => reader.readUint8(),
});

/**
 * A type that represents a signed 8-bit integer.
 * @group Available Types
 */
export const i8 = createSchema<number>({
  write: (writer, value) => writer.writeInt8(value),
  read: (reader) => reader.readInt8(),
});

/**
 * A type that represents an unsigned 16-bit integer (little-endian).
 * @group Available Types
 */
export const u16le = createSchema<number>({
  write: (writer, value) => writer.writeUint16(value, true),
  read: (reader) => reader.readUint16(true),
});

/**
 * A type that represents an unsigned 16-bit integer (big-endian).
 * @group Available Types
 */
export const u16be = createSchema<number>({
  write: (writer, value) => writer.writeUint16(value),
  read: (reader) => reader.readUint16(),
});

/**
 * A type that represents a signed 16-bit integer (little-endian).
 * @group Available Types
 */
export const i16le = createSchema<number>({
  write: (writer, value) => writer.writeInt16(value, true),
  read: (reader) => reader.readInt16(true),
});

/**
 * A type that represents a signed 16-bit integer (big-endian).
 * @group Available Types
 */
export const i16be = createSchema<number>({
  write: (writer, value) => writer.writeInt16(value),
  read: (reader) => reader.readInt16(),
});

/**
 * A type that represents an unsigned 32-bit integer (little-endian).
 * @group Available Types
 */
export const u32le = createSchema<number>({
  write: (writer, value) => writer.writeUint32(value, true),
  read: (reader) => reader.readUint32(true),
});

/**
 * A type that represents an unsigned 32-bit integer (big-endian).
 * @group Available Types
 */
export const u32be = createSchema<number>({
  write: (writer, value) => writer.writeUint32(value),
  read: (reader) => reader.readUint32(),
});

/**
 * A type that represents a signed 32-bit integer (little-endian).
 * @group Available Types
 */
export const i32le = createSchema<number>({
  write: (writer, value) => writer.writeInt32(value, true),
  read: (reader) => reader.readInt32(true),
});

/**
 * A type that represents a signed 32-bit integer (big-endian).
 * @group Available Types
 */
export const i32be = createSchema<number>({
  write: (writer, value) => writer.writeInt32(value),
  read: (reader) => reader.readInt32(),
});

/**
 * A type that represents an unsigned 64-bit integer (little-endian).
 * @group Available Types
 */
export const u64le = createSchema<bigint>({
  write: (writer, value) => writer.writeUint64(value, true),
  read: (reader) => reader.readUint64(true),
});

/**
 * A type that represents an unsigned 64-bit integer (big-endian).
 * @group Available Types
 */
export const u64be = createSchema<bigint>({
  write: (writer, value) => writer.writeUint64(value),
  read: (reader) => reader.readUint64(),
});

/**
 * A type that represents a signed 64-bit integer (little-endian).
 * @group Available Types
 */
export const i64le = createSchema<bigint>({
  write: (writer, value) => writer.writeInt64(value, true),
  read: (reader) => reader.readInt64(true),
});

/**
 * A type that represents a signed 64-bit integer (big-endian).
 * @group Available Types
 */
export const i64be = createSchema<bigint>({
  write: (writer, value) => writer.writeInt64(value),
  read: (reader) => reader.readInt64(),
});

/**
 * A type that represents a 32-bit floating-point number (little-endian).
 * @group Available Types
 */
export const f32le = createSchema<number>({
  write: (writer, value) => writer.writeFloat32(value, true),
  read: (reader) => reader.readFloat32(true),
});

/**
 * A type that represents a 32-bit floating-point number (big-endian).
 * @group Available Types
 */
export const f32be = createSchema<number>({
  write: (writer, value) => writer.writeFloat32(value),
  read: (reader) => reader.readFloat32(),
});

/**
 * A type that represents a 64-bit floating-point number (little-endian).
 * @group Available Types
 */
export const f64le = createSchema<number>({
  write: (writer, value) => writer.writeFloat64(value, true),
  read: (reader) => reader.readFloat64(true),
});

/**
 * A type that represents a 64-bit floating-point number (big-endian).
 * @group Available Types
 */
export const f64be = createSchema<number>({
  write: (writer, value) => writer.writeFloat64(value),
  read: (reader) => reader.readFloat64(),
});

/**
 * Type alias for {@link u16be}. Which is an unsigned 16-bit integer (big-endian).
 * @group Available Types
 */
export const u16 = u16be;

/**
 * Type alias for {@link i16be}. Which is a signed 16-bit integer (big-endian).
 * @group Available Types
 */
export const i16 = i16be;

/**
 * Type alias for {@link u32be}. Which is an unsigned 32-bit integer (big-endian).
 * @group Available Types
 */
export const u32 = u32be;

/**
 * Type alias for {@link i32be}. Which is a signed 32-bit integer (big-endian).
 * @group Available Types
 */
export const i32 = i32be;

/**
 * Type alias for {@link u64be}. Which is an unsigned 64-bit integer (big-endian).
 * @group Available Types
 */
export const u64 = u64be;

/**
 * Type alias for {@link i64be}. Which is a signed 64-bit integer (big-endian).
 * @group Available Types
 */
export const i64 = i64be;

/**
 * Type alias for {@link f32be}. Which is a 32-bit floating-point number (big-endian).
 * @group Available Types
 */
export const f32 = f32be;

/**
 * Type alias for {@link f64be}. Which is a 64-bit floating-point number (big-endian).
 * @group Available Types
 */
export const f64 = f64be;
