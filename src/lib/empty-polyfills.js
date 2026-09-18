// Replaces next/dist/build/polyfills/polyfill-module (see next.config.mjs).
// Every browser Next 16 supports (Chrome/Edge 111+, Firefox 111+, Safari 16.4+)
// already has Array.prototype.at/flat/flatMap, Object.fromEntries/hasOwn and
// String.prototype.trimStart/trimEnd, so the polyfills were dead weight
// (PageSpeed "Legacy JavaScript", ~13 KB).
export {};
