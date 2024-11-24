import type { BufferReader } from "../buffer-reader";
import type { BufferWriter } from "../buffer-writer";

export interface BaseType<T = unknown> {
  write(value: T, writer: BufferWriter): void;
  read(reader: BufferReader): T;
}

export type InferBaseType<T> = T extends BaseType<infer U> ? U : never;

export const createType = <T>(descriptor: BaseType<T>): Readonly<BaseType<T>> => descriptor;
