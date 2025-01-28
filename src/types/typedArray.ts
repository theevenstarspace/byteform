import type { TypedArray } from "../byte-stream";
import type { Schema } from "./schema";
import { createSchema } from "./schema";

/**
 * A type that represents an unsigned 8-bit integer array.
 * @group Available Types
 */
export const u8Array = createSchema<Uint8Array>({
  write: (writer, value) => {
    writer.writeUint32(value.byteLength);
    writer.writeBytes(value);
  },
  read: (reader) => {
    const length = reader.readUint32();
    return reader.readBytes(length);
  }
});

const createArraySchema = <T extends TypedArray>(TypedArray: new (buffer: ArrayBufferLike) => T): Readonly<Schema<T>> => {
  return createSchema<T>({
    write: (writer, value) => {
      writer.writeUint32(value.byteLength);
      writer.writeBytes(new Uint8Array(value.buffer));
    },
    read: (reader) => {
      const length = reader.readUint32();
      return new TypedArray(reader.readBytes(length).buffer);
    }
  });
};

/**
 * A type that represents a signed 8-bit integer array.
 * @group Available Types
 */
export const i8Array = createArraySchema(Int8Array);

/**
 * A type that represents an unsigned 16-bit integer array.
 * @group Available Types
 */
export const u16Array = createArraySchema(Uint16Array);

/**
 * A type that represents a signed 16-bit integer array.
 * @group Available Types
 */
export const i16Array = createArraySchema(Int16Array);

/**
 * A type that represents an unsigned 32-bit integer array.
 * @group Available Types
 */
export const u32Array = createArraySchema(Uint32Array);

/**
 * A type that represents a signed 32-bit integer array.
 * @group Available Types
 */
export const i32Array = createArraySchema(Int32Array);

/**
 * A type that represents a 32-bit floating point array.
 * @group Available Types
 */
export const f32Array = createArraySchema(Float32Array);

/**
 * A type that represents a 64-bit floating point array.
 * @group Available Types
 */
export const f64Array = createArraySchema(Float64Array);

/**
 * A type that represents a 64-bit signed integer array.
 * @group Available Types
 */
export const i64Array = createArraySchema(BigInt64Array);

/**
 * A type that represents a 64-bit unsigned integer array.
 * @group Available Types
 */
export const u64Array = createArraySchema(BigUint64Array);
