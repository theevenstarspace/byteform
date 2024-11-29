import path from 'node:path';
import { cpSync, readdirSync } from 'node:fs';

export function copyFile(from: string, to: string): void {
  cpSync(
    path.resolve(from),
    path.resolve(to),
    { recursive: true }
  );
}

export function throwIfNoContent(dir: string): void {
  const files = readdirSync(dir);

  if (files.length === 0) {
    throw new Error(`No files found in ${dir}`);
  }
}
