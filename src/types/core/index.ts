import * as numbers from './numbers';
import { Struct } from './struct';
import { Cstr } from './cstr';
import type { Schema } from '../schema';

export const b = {
  struct: <T>(...args: ConstructorParameters<typeof Struct<T>>): Struct<T> => new Struct<T>(...args),
  cstr: (byteLength: number): Cstr => new Cstr(byteLength),

  u8: (): Readonly<Schema<number>> => numbers.u8,
  i8: (): Readonly<Schema<number>> => numbers.i8,
  u16: (): Readonly<Schema<number>> => numbers.u16le,
  i16: (): Readonly<Schema<number>> => numbers.i16le,
  u32: (): Readonly<Schema<number>> => numbers.u32le,
  i32: (): Readonly<Schema<number>> => numbers.i32le,
  u64: (): Readonly<Schema<bigint>> => numbers.u64le,
  i64: (): Readonly<Schema<bigint>> => numbers.i64le,
  f32: (): Readonly<Schema<number>> => numbers.f32le,
  f64: (): Readonly<Schema<number>> => numbers.f64le,

  u16be: (): Readonly<Schema<number>> => numbers.u16be,
  i16be: (): Readonly<Schema<number>> => numbers.i16be,
  u32be: (): Readonly<Schema<number>> => numbers.u32be,
  i32be: (): Readonly<Schema<number>> => numbers.i32be,
  u64be: (): Readonly<Schema<bigint>> => numbers.u64be,
  i64be: (): Readonly<Schema<bigint>> => numbers.i64be,
  f32be: (): Readonly<Schema<number>> => numbers.f32be,
  f64be: (): Readonly<Schema<number>> => numbers.f64be,

  u16le: (): Readonly<Schema<number>> => numbers.u16le,
  i16le: (): Readonly<Schema<number>> => numbers.i16le,
  u32le: (): Readonly<Schema<number>> => numbers.u32le,
  i32le: (): Readonly<Schema<number>> => numbers.i32le,
  u64le: (): Readonly<Schema<bigint>> => numbers.u64le,
  i64le: (): Readonly<Schema<bigint>> => numbers.i64le,
  f32le: (): Readonly<Schema<number>> => numbers.f32le,
  f64le: (): Readonly<Schema<number>> => numbers.f64le,
};