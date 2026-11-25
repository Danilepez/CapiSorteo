export const MAX_TOTAL = 1000;
export function parseTotal(value) {
  const text = String(value).trim();
  const n = Number(text);
  if (!/^\d+$/.test(text) || !Number.isSafeInteger(n) || n < 1 || n > MAX_TOTAL) {
    throw new RangeError(`Escribe un número entero entre 1 y ${MAX_TOTAL}.`);
  }
  return n;
}
export function createRound(total) {
  const n = parseTotal(total);
  return { total: n, remaining: Array.from({ length: n }, (_, i) => i + 1), history: [] };
}
export function randomIndex(size, cryptoSource = globalThis.crypto) {
  if (!Number.isInteger(size) || size < 1 || size > MAX_TOTAL) throw new RangeError('Rango inválido');
  const limit = 2 ** 32 - (2 ** 32 % size);
  const buffer = new Uint32Array(1);
  do { cryptoSource.getRandomValues(buffer); } while (buffer[0] >= limit);
  return buffer[0] % size;
}
export function draw(round, choose = randomIndex) {
  if (!round.remaining.length) return null;
  const index = choose(round.remaining.length);
  if (!Number.isInteger(index) || index < 0 || index >= round.remaining.length) throw new RangeError('Índice inválido');
  const [number] = round.remaining.splice(index, 1);
  round.history.push(number);
  return number;
}
