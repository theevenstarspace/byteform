import type { SaveOptions } from 'benny/lib/internal/common-types';

import pkg from '../package.json';

const EXPORT_FOLDER = 'results/';

export const getOptions = (folder: string, name: string): SaveOptions => ({
  file: name,
  version: pkg.version,
  folder: EXPORT_FOLDER + folder,
  format: 'json',
});

export const cleanup = (): void => {
  if (global.gc) {
    global.gc();
  }
};



