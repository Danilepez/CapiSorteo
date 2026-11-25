import { mkdir, copyFile, rm, cp } from 'node:fs/promises';
const dest = new URL('./dist/', import.meta.url);
await rm(dest, { recursive: true, force: true });
await mkdir(dest, { recursive: true });
for (const file of ['index.html', 'styles.css', 'app.js', 'core.js', 'capibara.svg']) {
  await copyFile(new URL(file, import.meta.url), new URL(file, dest));
}
await cp(new URL('./fonts/', import.meta.url), new URL('./fonts/', dest), { recursive: true });
console.log('Build listo con tipografía local.');
