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
  const result = schema.read(reader);
  // make sure the reader has read the whole buffer
  expect(reader.position).toBe(buffer.length);
  return result;
}
