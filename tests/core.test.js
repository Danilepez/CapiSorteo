import test from 'node:test';
import assert from 'node:assert/strict';
import { createRound, draw, parseTotal, randomIndex } from '../core.js';
test('acepta enteros 1..1000 y rechaza entradas inválidas', () => {
  for (const n of ['1', '5', '8', '1000', ' 8 ']) assert.equal(parseTotal(n), Number(n));
  for (const n of ['', ' ', 0, -1, 1.5, '1e2', 'Infinity', 1001, 'abc']) assert.throws(() => parseTotal(n));
});
for (const total of [1, 5, 8, 1000]) test(`ronda de ${total}: sin repetidos, historial y agotamiento`, () => {
  const round = createRound(total);
  while (round.remaining.length) draw(round);
  assert.equal(new Set(round.history).size, total);
  assert.deepEqual([...round.history].sort((a, b) => a - b), Array.from({ length: total }, (_, i) => i + 1));
  assert.equal(draw(round), null);
  assert.equal(round.history.length, total);
});
test('conserva el orden y permite reiniciar el mismo rango', () => {
  const round = createRound(5);
  assert.equal(draw(round, () => 4), 5);
  assert.equal(draw(round, () => 0), 1);
  assert.deepEqual(round.history, [5, 1]);
  assert.deepEqual(round.remaining, [2, 3, 4]);
  assert.deepEqual(createRound(round.total), { total: 5, remaining: [1, 2, 3, 4, 5], history: [] });
});
test('el muestreo rechaza valores que generarían sesgo', () => {
  const values = [4294967295, 7]; let calls = 0;
  const crypto = { getRandomValues(array) { array[0] = values[calls++]; } };
  assert.equal(randomIndex(5, crypto), 2);
  assert.equal(calls, 2);
});
test('una elección inválida no altera la ronda', () => {
  const round = createRound(5);
  assert.throws(() => draw(round, () => 5));
  assert.equal(round.remaining.length, 5);
  assert.deepEqual(round.history, []);
});
