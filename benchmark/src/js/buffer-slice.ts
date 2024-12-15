import benny from 'benny';
import { cleanup, getOptions } from '../utils';
import type { Summary } from "benny/lib/internal/common-types";

const ab = new ArrayBuffer(256);
const u8 = new Uint8Array(ab);

const SLICE_POSITION = 128;

export const BufferSlice = (): Promise<Summary> => benny.suite(
  'Buffer Slice',

  benny.add('ArrayBuffer', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const target = ab.slice(SLICE_POSITION);
  }),

  benny.add('Uint8Array', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const target = u8.slice(SLICE_POSITION).buffer;
  }),

  benny.cycle(),
  benny.complete(cleanup),

  benny.save(getOptions('js', 'buffer-slice')),
);