import benny from 'benny';
import { cleanup, getOptions } from '../utils';
import type { Summary } from "benny/lib/internal/common-types";

const STRING_TO_ENCODE = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
const STRING_BYTE_LENGTH = 56;

const BUFFER_SIZE = 256;
const STREAM_OFFSET = 128;

const BUFFER = new ArrayBuffer(BUFFER_SIZE);

const encoder = new TextEncoder();
encoder.encodeInto(STRING_TO_ENCODE, new Uint8Array(BUFFER, STREAM_OFFSET));

export const StringDecoding = (): Promise<Summary> => benny.suite(
  'String Decoding',

  benny.add('TextDecoder', () => {
    const buffer = new ArrayBuffer(BUFFER_SIZE);
    const decoder = new TextDecoder();

    return (): void => {
      decoder.decode(new Uint8Array(buffer, STREAM_OFFSET, STRING_BYTE_LENGTH));
    };
  }),

  benny.add('Manual utf8', () => {
    const buffer = new Uint8Array(BUFFER_SIZE);

    return (): void => {
      let result = '';
      let position = STREAM_OFFSET;

      while (position < STREAM_OFFSET + STRING_BYTE_LENGTH) {
        const byte = buffer[position++];

        if (byte < 0x80) {
          result += String.fromCharCode(byte);
        } else if ((byte & 0xe0) === 0xc0) {
          result += String.fromCharCode(((byte & 0x1f) << 6) | (buffer[position++] & 0x3f));
        } else if ((byte & 0xf0) === 0xe0) {
          result += String.fromCharCode(((byte & 0x0f) << 12) | ((buffer[position++] & 0x3f) << 6) | (buffer[position++] & 0x3f));
        } else {
          const surrogate = (((byte & 0x07) << 18) | ((buffer[position++] & 0x3f) << 12) | ((buffer[position++] & 0x3f) << 6) | (buffer[position++] & 0x3f)) - 0x10000;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          result += String.fromCharCode(0xd800 + (surrogate >> 10), 0xdc00 + (surrogate & 0x3ff));
        }
      }
    };
  }),

  benny.cycle(),
  benny.complete(cleanup),

  benny.save(getOptions('js', 'string-decoding')),
);