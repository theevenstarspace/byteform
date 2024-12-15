import benny from 'benny';
import { cleanup, getOptions } from '../utils';
import type { Summary } from "benny/lib/internal/common-types";

const STRING_TO_ENCODE = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
const BUFFER_SIZE = 256;
const STREAM_OFFSET = 128;

export const StringEncoding = (): Promise<Summary> => benny.suite(
  'String Encoding',

  benny.add('TextEncoder Direct', () => {
    const buffer = new ArrayBuffer(BUFFER_SIZE);
    const encoder = new TextEncoder();

    return (): void => {
      // Imagine this is a stream and we need to write at a specific offset
      const u8 = new Uint8Array(buffer, STREAM_OFFSET);

      encoder.encodeInto(STRING_TO_ENCODE, u8);
    };
  }),

  benny.add('TextEncoder Indirect (Set)', () => {
    const buffer = new Uint8Array(BUFFER_SIZE);
    const encoder = new TextEncoder();

    return (): void => {
      const u8 = encoder.encode(STRING_TO_ENCODE);
      buffer.set(u8, STREAM_OFFSET);
    };
  }),

  benny.add('TextEncoder Indirect (Manual)', () => {
    const buffer = new Uint8Array(BUFFER_SIZE);
    const encoder = new TextEncoder();

    return (): void => {
      const u8 = encoder.encode(STRING_TO_ENCODE);
      
      let position = STREAM_OFFSET;
      for (let i = 0; i < u8.length; i++) {
        buffer[position++] = u8[i];
      }
    };
  }),

  benny.add('Manual utf8', () => {
    const buffer = new Uint8Array(BUFFER_SIZE);

    return (): void => {
      let pos = STREAM_OFFSET;
      for (let i = 0; i < STRING_TO_ENCODE.length; i++) {
        const char = STRING_TO_ENCODE.charCodeAt(i);

        if (char < 0x80) {
          buffer[pos++] = char;
        } else if (char < 0x800) {
          buffer[pos++] = 0xc0 | (char >> 6);
          buffer[pos++] = 0x80 | (char & 0x3f);
        } else if (char < 0xd800 || char >= 0xe000) {
          buffer[pos++] = 0xe0 | (char >> 12);
          buffer[pos++] = 0x80 | ((char >> 6) & 0x3f);
          buffer[pos++] = 0x80 | (char & 0x3f);
        } else {
          i++;
          // Surrogate pair:
          // UTF-16 encodes 0x10000-0x10FFFF by subtracting 0x10000 and
          // splitting the 20 bits of 0x0-0xFFFFF into two halves
          const surrogate = 0x10000 + (((char & 0x3ff) << 10) | (STRING_TO_ENCODE.charCodeAt(i) & 0x3ff));
          buffer[pos++] = 0xf0 | (surrogate >> 18);
          buffer[pos++] = 0x80 | ((surrogate >> 12) & 0x3f);
          buffer[pos++] = 0x80 | ((surrogate >> 6) & 0x3f);
          buffer[pos++] = 0x80 | (surrogate & 0x3f);
        }
      }
    };
  }),

  benny.cycle(),
  benny.complete(cleanup),

  benny.save(getOptions('js', 'string-encoding')),
);