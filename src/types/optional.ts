import type { ByteStreamReader } from "../byte-stream-reader";
import type { ByteStreamWriter } from "../byte-stream-writer";
import type { Schema } from "./schema";

/**
 * A type that represents an optional value.
 * @group Types
 * 
 * @typeParam T - The type of the value that can be optional.
 */
export class Optional<T> implements Schema<T | null> {
  /**
   * Schema type that is responsible for encoding and decoding a value of type T.
   */
  private _schema: Schema<T>;

  /**
   * Creates a new Optional type.
   * @param schema - The schema that describes the type of the value that can be optional.
   */
  public constructor(schema: Schema<T>) {
    this._schema = schema;
  }

  /**
   * Writes the Schema to the buffer.
   * @param writer - The buffer writer.
   * @param value - The Schema value to write, or null.
   */
  public write(writer: ByteStreamWriter, value: T | null): void {
    writer.writeUint8(value ? 1 : 0);
    if (value) {
      writer.writeSchema(this._schema, value);
    }
  }

  /**
   * Reads the Schema from the buffer.
   * @param reader - The buffer reader.
   * @returns The Schema read from the buffer or null.
   */
  public read(reader: ByteStreamReader): T | null {
    const hasValue = reader.readUint8() === 1;
    if (hasValue) {
      return reader.readSchema(this._schema);
    }

    return null;
  }
}