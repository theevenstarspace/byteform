import type { ByteStreamReader } from "../byte-stream-reader";
import type { ByteStreamWriter } from "../byte-stream-writer";
import { createSchema } from "./schema";

function assertSafeInteger(value: number): void {
  if (!Number.isSafeInteger(value)) {
    throw new Error("Value must be a safe integer");
  }
}

function asSafeNumber(value: bigint): number {
  const asNumber = Number(value);
  if (!Number.isSafeInteger(asNumber)) {
    throw new Error("Decoded value is outside safe integer range");
  }
  return asNumber;
}

function writeULEB128(writer: ByteStreamWriter, value: number): void {
  assertSafeInteger(value);
  if (value < 0) {
    throw new Error("Value must be non-negative");
  }

  let remaining = BigInt(value);
  do {
    let byte = Number(remaining & 0x7fn);
    remaining >>= 7n;
    if (remaining !== 0n) {
      byte |= 0x80;
    }
    writer.writeUint8(byte);
  } while (remaining !== 0n);
}

function readULEB128(reader: ByteStreamReader): number {
  let result = 0n;
  let shift = 0n;
  let byte: number;
  do {
    byte = reader.readUint8();
    result |= BigInt(byte & 0x7f) << shift;
    shift += 7n;
  } while (byte & 0x80);
  return asSafeNumber(result);
}

function writeILEB128(writer: ByteStreamWriter, value: number): void {
  assertSafeInteger(value);
  let remaining = BigInt(value);
  while (true) {
    let byte = Number(remaining & 0x7fn);
    remaining >>= 7n;

    const signBitSet = (byte & 0x40) !== 0;
    const shouldStop =
      (remaining === 0n && !signBitSet) || (remaining === -1n && signBitSet);

    if (!shouldStop) {
      byte |= 0x80;
    }

    writer.writeUint8(byte);

    if (shouldStop) {
      return;
    }
  }
}

function readILEB128(reader: ByteStreamReader): number {
  let result = 0n;
  let shift = 0n;
  let byte = 0;
  do {
    byte = reader.readUint8();
    result |= BigInt(byte & 0x7f) << shift;
    shift += 7n;
  } while (byte & 0x80);

  if (byte & 0x40) {
    result |= -1n << shift;
  }
  return asSafeNumber(result);
}

/**
 * @see [LEB128](https://en.wikipedia.org/wiki/LEB128)
 * A type that represents an unsigned LEB128 integer.
 * @group Available Types
 */
export const uLEB128 = createSchema<number>({
  write: writeULEB128,
  read: readULEB128,
});

/**
 * @see [LEB128](https://en.wikipedia.org/wiki/LEB128)
 * A type that represents a signed LEB128 integer.
 * @group Available Types
 */
export const iLEB128 = createSchema<number>({
  write: writeILEB128,
  read: readILEB128,
});

/**
 * Type alias for {@link uLEB128}.
 * @group Available Types
 */
export const uVar = uLEB128;

/**
 * Type alias for {@link iLEB128}.
 * @group Available Types
 */
export const iVar = iLEB128;
