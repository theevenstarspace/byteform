import { createSchema } from "../schema";

/**
 * A type that represents an ArrayBuffer.
 * @group Available Types
 */
export const arrayBuffer = createSchema<ArrayBuffer>({
  write: (writer, value) => {
    writer.writeUint32(value.byteLength);
    writer.writeBytes(new Uint8Array(value));
  },
  read: (reader) => {
    const length = reader.readUint32();
    return reader.readBytes(length).buffer as ArrayBuffer;
  }
});