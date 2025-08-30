import type { ByteStreamReader } from "../byte-stream-reader";
import type { ByteStreamWriter } from "../byte-stream-writer";
import { createSchema } from "./schema";

function fastDivideBy128(value: number): number {
  // Fast path for common case
  if (value <= 0x7fffffff && value >= -0x80000000) {
    return value >> 7;
  }
  // Fallback for edge cases (big int)
  return Math.trunc(value / 128);
}

/**
 * Split a number into a base-128 representation (little-endian)
 */
function numberToBase128Digits(value: number): number[] {
  const digits: number[] = [];
  while (value > 127) {
    digits.push(value & 0x7f);
    value = fastDivideBy128(value);
  }
  digits.push(value);
  return digits;
}

/**
 * Combine base-128 digits into a number
 */
function base128DigitsToNumber(
  digits: number[],
  bigEndian: boolean = false
): number {
  let value = 0;
  for (const digit of bigEndian ? digits : digits.toReversed()) {
    value = value * 128 + digit;
  }
  return value;
}

/**
 * Read bytes into an array, highest bit of each byte is used as a continuation bit, result does not include the continuation bit
 */
function readWithContinuationBit(
  reader: ByteStreamReader
): [number, ...number[]] {
  let byte = reader.readUint8();
  const digits: [number, ...number[]] = [byte & 0x7f];
  while (byte & 0x80) {
    byte = reader.readUint8();
    digits.push(byte & 0x7f);
  }
  return digits;
}

/**
 * Write bytes from an array, highest bit of each byte is used as a continuation bit, the last byte does not have the continuation bit
 */
function writeWithContinuationBit(
  writer: ByteStreamWriter,
  digits: number[]
): void {
  for (let i = 0; i < digits.length - 1; i++) {
    const digit = digits[i];
    writer.writeUint8(digit | 0x80);
  }
  const lastDigit = digits[digits.length - 1];
  writer.writeUint8(lastDigit);
}

function writeVarIntUnsigned(
  writer: ByteStreamWriter,
  value: number,
  bigEndian: boolean = false
): void {
  if (value < 0) {
    throw new Error("Value must be non-negative");
  }
  const digits = numberToBase128Digits(value);
  if (bigEndian) {
    digits.reverse();
  }
  writeWithContinuationBit(writer, digits);
}

function writeVarIntSigned(
  writer: ByteStreamWriter,
  value: number,
  bigEndian: boolean = false
): void {
  const negative = value < 0;
  value = Math.abs(value);

  let digits: number[];
  if (bigEndian) {
    digits = numberToBase128Digits(value);
    digits.reverse();
    if (digits[0] & 0x40) {
      // No room for sign bit - prepend a zero
      digits.unshift(0);
    }
  } else {
    // Smallest 6 bits are the lowest digit, only 6 because of the sign bit
    const lowestDigit = value % 64;
    digits = numberToBase128Digits((value - lowestDigit) / 64);
    if (digits[0] === 0) {
      digits[0] = lowestDigit;
    } else {
      digits.unshift(lowestDigit);
    }
  }

  if (negative) {
    digits[0] |= 0x40;
  }
  writeWithContinuationBit(writer, digits);
}

function readVarIntUnsigned(
  reader: ByteStreamReader,
  bigEndian: boolean = false
): number {
  const digits = readWithContinuationBit(reader);
  return base128DigitsToNumber(digits, bigEndian);
}

function readVarIntSigned(
  reader: ByteStreamReader,
  bigEndian: boolean = false
): number {
  const digits = readWithContinuationBit(reader);
  const negative = digits[0] & 0x40;
  digits[0] &= 0x3f;
  let value: number;
  if (bigEndian) {
    value = base128DigitsToNumber(digits, true);
  } else {
    const [lowestDigit, ...rest] = digits;
    value = base128DigitsToNumber(rest, false);
    value = value * 64 + lowestDigit;
  }
  return negative ? -value : value;
}

/**
 * A type that represents an unsigned variable-length integer.
 * @group Available Types
 */
export const uVarInt = createSchema<number>({
  write: (writer, value) => writeVarIntUnsigned(writer, value),
  read: (reader) => readVarIntUnsigned(reader),
});

/**
 * A type that represents a signed variable-length integer.
 * @group Available Types
 */
export const iVarInt = createSchema<number>({
  write: (writer, value) => writeVarIntSigned(writer, value),
  read: (reader) => readVarIntSigned(reader),
});
