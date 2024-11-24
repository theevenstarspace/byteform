import type { BufferReader } from "../buffer-reader";
import type { BufferWriter } from "../buffer-writer";
import type { BaseType } from "./base";

type StructTypes<T> = {
  [K in keyof T]: BaseType<T[K]>;
}

export class Struct<T> implements BaseType<T> {
  private entries: [string, BaseType<unknown>][] = [];

  public constructor(entries: StructTypes<T>) {
    this.entries = Object.entries(entries);
  }

  public write(value: T, writer: BufferWriter) {
    for (const [key, type] of this.entries) {
      type.write(value[key], writer);
    }
  }

  public read(reader: BufferReader): T {
    const value = {} as T;

    for (const [key, type] of this.entries) {
      value[key] = type.read(reader);
    }

    return value;
  }
}