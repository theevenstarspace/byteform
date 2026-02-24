import { ByteStreamReader, ByteStreamWriter, type Schema } from "../../src";

export function writeAndRead<T>(
  schema: Schema<T>,
  value: T,
  bufferByteLength: number = 1024
): T {
  const writer = new ByteStreamWriter(bufferByteLength);
  schema.write(writer, value);
  const buffer = writer.commit();
  const reader = new ByteStreamReader(buffer);
  return schema.read(reader);
}
