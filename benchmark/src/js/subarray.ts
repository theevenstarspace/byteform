import benny from 'benny';
import { cleanup, getOptions } from '../utils';
import type { Summary } from "benny/lib/internal/common-types";

const ab = new ArrayBuffer(256);
const u8 = new Uint8Array(ab);

const SLICE_POSITION = 128;
const SLICE_LENGTH = 128;
const SLICE_END_POSITION = SLICE_POSITION + SLICE_LENGTH;

export const SubArray = (): Promise<Summary> => benny.suite(
  'Sub Array',

  benny.add('new Uint8Array', () => {
    new Uint8Array(ab, SLICE_POSITION, SLICE_LENGTH);
  }),

  benny.add('Uint8Array.subaray', () => {
    u8.subarray(SLICE_POSITION, SLICE_END_POSITION);
  }),

  benny.cycle(),
  benny.complete(cleanup),

  benny.save(getOptions('js', 'sub-array')),
);