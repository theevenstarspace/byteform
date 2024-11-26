import path from 'node:path';
import { copyFile } from 'node:fs/promises';

async function copyReadme(): Promise<void> {
  // Copy README.md from ../README.md to ../docs/docs/README.md with overwrite
  await copyFile(
    // '../README.md',
    path.resolve('..', 'README.md'),
    // '../docs/docs/README.md'
    path.resolve('docs', 'README.md')
  );
}

export default copyReadme;
