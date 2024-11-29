import path from 'node:path';
import { cp, readdir } from 'node:fs/promises';

export async function copyFile(from: string, to: string): Promise<void> {
  await cp(
    path.resolve(from),
    path.resolve(to),
    { recursive: true }
  );
}

export async function throwIfNoContent(dir: string): Promise<void> {
  const files = await readdir(dir);

  if (files.length === 0) {
    throw new Error(`No files found in ${dir}`);
  }
}
