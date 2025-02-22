import * as typedArray from './typedArray';
import { List } from './list';
import { arrayBuffer } from './arrayBuffer';
import { text } from './text';
import type { Schema } from '../schema';

export const bu = {
  list: <T>(...args: ConstructorParameters<typeof List<T>>): List<T> => new List<T>(...args),
  text: (): Readonly<Schema<string>> => text,

  arrayBuffer: (): Readonly<Schema<ArrayBuffer>> => arrayBuffer,

  u8Array: (): Readonly<Schema<Uint8Array>> => typedArray.u8Array,
  i8Array: (): Readonly<Schema<Int8Array>> => typedArray.i8Array,
  u16Array: (): Readonly<Schema<Uint16Array>> => typedArray.u16Array,
  i16Array: (): Readonly<Schema<Int16Array>> => typedArray.i16Array,
  u32Array: (): Readonly<Schema<Uint32Array>> => typedArray.u32Array,
  i32Array: (): Readonly<Schema<Int32Array>> => typedArray.i32Array,
  u64Array: (): Readonly<Schema<BigUint64Array>> => typedArray.u64Array,
  i64Array: (): Readonly<Schema<BigInt64Array>> => typedArray.i64Array,
  f32Array: (): Readonly<Schema<Float32Array>> => typedArray.f32Array,
  f64Array: (): Readonly<Schema<Float64Array>> => typedArray.f64Array,
};