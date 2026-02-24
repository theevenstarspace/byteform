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
    const buffer = new Uint8Array(BUFFER, STREAM_OFFSET, STRING_BYTE_LENGTH);
    const decoder = new TextDecoder();

    return (): void => {
      decoder.decode(buffer);
    };
  }),

  benny.add('Manual utf8', () => {
    const buffer = new Uint8Array(BUFFER, STREAM_OFFSET, STRING_BYTE_LENGTH);

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

  benny.add('Manual utf8 from array', () => {
    const buffer = new Uint8Array(BUFFER, STREAM_OFFSET, STRING_BYTE_LENGTH);

    return (): void => {
      const codes: number[] = [];
      let position = STREAM_OFFSET;

      while (position < STREAM_OFFSET + STRING_BYTE_LENGTH) {
        const byte = buffer[position++];

        if (byte < 0x80) {
          codes.push(byte);
        } else if ((byte & 0xe0) === 0xc0) {
          codes.push(((byte & 0x1f) << 6) | (buffer[position++] & 0x3f));
        } else if ((byte & 0xf0) === 0xe0) {
          codes.push(((byte & 0x0f) << 12) | ((buffer[position++] & 0x3f) << 6) | (buffer[position++] & 0x3f));
        } else {
          const surrogate = (((byte & 0x07) << 18) | ((buffer[position++] & 0x3f) << 12) | ((buffer[position++] & 0x3f) << 6) | (buffer[position++] & 0x3f)) - 0x10000;
          codes.push(0xd800 + (surrogate >> 10), 0xdc00 + (surrogate & 0x3ff));
        }
      }

      String.fromCharCode(...codes);
    };
  }),

  benny.add('Manual from u32 char codes', () => {
    const u32buffer = new Uint32Array(STRING_BYTE_LENGTH);
    for (let i = 0; i < STRING_BYTE_LENGTH; i++) {
      u32buffer[i] = STRING_TO_ENCODE.charCodeAt(i);
    }

    return (): void => {
      String.fromCharCode(...u32buffer);
    };
  }),

  benny.add('Manual from u16 char codes', () => {
    const u16buffer = new Uint16Array(STRING_BYTE_LENGTH);
    for (let i = 0; i < STRING_BYTE_LENGTH; i++) {
      u16buffer[i] = STRING_TO_ENCODE.charCodeAt(i);
    }

    return (): void => {
      String.fromCharCode(...u16buffer);
    };
  }),

  benny.add('Manual from u32 char codes concat', () => {
    const u32buffer = new Uint32Array(STRING_BYTE_LENGTH);
    for (let i = 0; i < STRING_BYTE_LENGTH; i++) {
      u32buffer[i] = STRING_TO_ENCODE.charCodeAt(i);
    }

    return (): void => {
      let result = '';
      for (let i = 0; i < u32buffer.length; i++) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        result += String.fromCharCode(u32buffer[i]);
      }
    };
  }),

  benny.add('Manual from u16 char codes concat', () => {
    const u16buffer = new Uint16Array(STRING_BYTE_LENGTH);
    for (let i = 0; i < STRING_BYTE_LENGTH; i++) {
      u16buffer[i] = STRING_TO_ENCODE.charCodeAt(i);
    }

    return (): void => {
      let result = '';
      for (let i = 0; i < u16buffer.length; i++) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        result += String.fromCharCode(u16buffer[i]);
      }
    };
  }),

  benny.cycle(),
  benny.complete(cleanup),

  benny.save(getOptions('js', 'string-decoding')),
);