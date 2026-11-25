import { createRound, draw, parseTotal, randomIndex } from './core.js';
const $ = id => document.getElementById(id);
let round = createRound(5);
let busy = false;
let projecting = false;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
function render() {
  const last = round.history.at(-1);
  $('board').replaceChildren(...Array.from({ length: round.total }, (_, i) => {
    const n = i + 1, used = round.history.includes(n);
    const tile = document.createElement('span');
    tile.className = `tile${used ? ' used' : ''}${last === n ? ' latest' : ''}`;
    tile.textContent = n;
    tile.setAttribute('aria-label', `${n}: ${used ? 'ya salió' : 'disponible'}`);
    return tile;
  }));
  $('history').replaceChildren(...round.history.map((n, i) => {
    const li = document.createElement('li');
    const order = document.createElement('span'); order.className = 'order'; order.textContent = `${i + 1}º:`;
    const number = document.createElement('b'); number.textContent = `#${n}`;
    li.append(order, number); return li;
  }));
  $('empty-history').hidden = round.history.length > 0;
  $('history-count').textContent = round.history.length;
  $('board-count').textContent = `Quedan ${round.remaining.length} de ${round.total}`;
  $('remaining').textContent = round.remaining.length === 1 ? '1 número por descubrir' : `${round.remaining.length} números por descubrir`;
  $('round-state').textContent = busy ? '🍊 MEZCLANDO NÚMEROS…' : !round.remaining.length ? '🎉 RONDA COMPLETA 🎉' : round.history.length ? `🎉 TURNO #${round.history.length} ELEGIDO 🎉` : '🍊 LISTOS PARA SORTEAR';
  $('draw').disabled = busy || !round.remaining.length;
  $('draw').textContent = busy ? '🍊 SORTEANDO…' : !round.remaining.length ? '🎉 ¡RONDA COMPLETA!' : round.history.length ? `🍊 SACAR SIGUIENTE (QUEDAN ${round.remaining.length})` : '🍊 SACAR NÚMERO';
  $('reset').disabled = busy;
  document.querySelectorAll('#range-form input, #range-form button, [data-preset]').forEach(el => el.disabled = busy);
  document.querySelectorAll('[data-preset]').forEach(el => el.setAttribute('aria-pressed', String(Number(el.dataset.preset) === round.total)));
}
function reset(total = round.total) {
  if (busy) return;
  round = createRound(total);
  $('total').value = round.total;
  $('number').textContent = '?';
  $('stage-caption').textContent = 'Un gran momento empieza con un número.';
  $('stage').classList.remove('revealed');
  $('confetti').replaceChildren();
  $('range-error').textContent = '';
  $('total').removeAttribute('aria-invalid');
  $('announcement').textContent = `Nueva ronda del 1 al ${round.total}.`;
  render();
}
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
async function pick() {
  if (busy || !round.remaining.length) return;
  busy = true; render();
  $('stage').classList.remove('revealed');
  $('stage').classList.add('rolling');
  $('stage-caption').textContent = 'Capi está eligiendo…';
  try {
    if (!reducedMotion.matches) {
      for (let i = 0; i < 12; i++) {
        $('number').textContent = round.remaining[randomIndex(round.remaining.length)];
        await pause(45 + i * 7);
      }
    }
    const n = draw(round);
    $('number').textContent = n;
    $('stage').classList.add('revealed');
    $('stage-caption').textContent = round.remaining.length ? '¡Este es tu momento!' : '¡Ronda completa! Capi se merece un descanso.';
    $('announcement').textContent = `${round.history.length}º: número ${n}. ${round.remaining.length} restantes.${!round.remaining.length ? ' Ronda completa.' : ''}`;
    celebrate();
  } catch {
    $('number').textContent = round.history.at(-1) ?? '?';
    $('stage-caption').textContent = 'No se pudo sortear. Inténtalo otra vez.';
    $('announcement').textContent = 'No se pudo sortear. Inténtalo otra vez.';
  } finally {
    busy = false; $('stage').classList.remove('rolling'); render();
  }
}
function celebrate() {
  if (reducedMotion.matches) return;
  const colors = ['#f2b565', '#b9c796', '#e6cfac', '#d98a6b'];
  const pieces = Array.from({ length: 65 }, () => {
    const piece = document.createElement('i'); piece.className = 'confetto';
    piece.style.setProperty('--x', `${Math.random() * 100}%`);
    piece.style.setProperty('--c', colors[Math.floor(Math.random() * colors.length)]);
    piece.style.setProperty('--t', `${1.4 + Math.random() * 1.4}s`);
    piece.style.setProperty('--d', `${Math.random() * .25}s`);
    piece.addEventListener('animationend', () => piece.remove(), { once: true });
    return piece;
  });
  $('confetti').replaceChildren(...pieces);
}
$('draw').addEventListener('click', pick);
$('reset').addEventListener('click', () => reset());
$('range-form').addEventListener('submit', event => {
  event.preventDefault();
  if (busy) return;
  try { reset(parseTotal($('total').value)); } catch (error) {
    $('range-error').textContent = error.message;
    $('total').setAttribute('aria-invalid', 'true'); $('total').focus();
  }
});
document.querySelectorAll('[data-preset]').forEach(button => button.addEventListener('click', () => reset(button.dataset.preset)));
function setProjection(value) {
  projecting = value;
  document.body.classList.toggle('projecting', value);
  $('projection').querySelector('span').textContent = value ? 'Salir de proyección' : 'Modo proyección';
  $('projection').setAttribute('aria-pressed', String(value));
}
setProjection(false);
$('projection').addEventListener('click', async () => {
  const next = !projecting; setProjection(next);
  try {
    if (next && document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
    else if (!next && document.fullscreenElement) await document.exitFullscreen();
  } catch { /* El diseño ampliado funciona aunque no se permita pantalla completa. */ }
});
document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement) setProjection(false); });
document.addEventListener('keydown', event => {
  if (event.code === 'Escape') { setProjection(false); return; }
  if (event.code !== 'Space' || event.repeat || event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.target.closest('input, button, a, textarea, select, [contenteditable]')) return;
  event.preventDefault(); pick();
});
render();
