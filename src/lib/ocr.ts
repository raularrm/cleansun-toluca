import { createWorker } from 'tesseract.js';

/**
 * Runs OCR on an image file entirely in the browser (tesseract.js, WASM).
 * The image itself is never uploaded anywhere — only Tesseract's static
 * language-model files are fetched (once, cached) the first time this runs.
 */
export async function recognizeReceiptText(
  file: File,
  onProgress?: (pct: number) => void
): Promise<string> {
  const worker = await createWorker('spa', 1, {
    logger: (m) => {
      if (m.status === 'recognizing text' && typeof m.progress === 'number') {
        onProgress?.(Math.round(m.progress * 100));
      }
    },
  });
  try {
    const {
      data: { text },
    } = await worker.recognize(file);
    return text;
  } finally {
    await worker.terminate();
  }
}

const KEYWORD_LINE = /(total a pagar|importe total|total del recibo|total a cubrir|monto total|total)/i;
const AMOUNT = /\$?\s?(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})?)/g;

function toNumber(raw: string): number | null {
  // Normalize "3,456.00" or "3.456,00" style separators to a plain float.
  let cleaned = raw.trim();
  const hasComma = cleaned.includes(',');
  const hasDot = cleaned.includes('.');
  if (hasComma && hasDot) {
    // Assume the last separator is the decimal point.
    if (cleaned.lastIndexOf(',') > cleaned.lastIndexOf('.')) {
      cleaned = cleaned.replace(/\./g, '').replace(',', '.');
    } else {
      cleaned = cleaned.replace(/,/g, '');
    }
  } else if (hasComma && !hasDot) {
    // Could be thousands ("3,200") or decimal ("32,00") — treat 2-digit tail as decimal.
    cleaned = /,\d{2}$/.test(cleaned) ? cleaned.replace(',', '.') : cleaned.replace(/,/g, '');
  }
  const n = parseFloat(cleaned);
  return isNaN(n) ? null : n;
}

/**
 * Best-effort extraction of a bimonthly bill amount from OCR'd receipt text.
 * Prefers a number on a line containing a "total" keyword; falls back to the
 * largest plausible peso amount found anywhere in the text.
 */
export function extractAmountFromText(text: string): number | null {
  const lines = text.split(/\r?\n/);
  const keywordCandidates: number[] = [];
  const allCandidates: number[] = [];

  for (const line of lines) {
    const matches = Array.from(line.matchAll(AMOUNT)).map((m) => toNumber(m[1])).filter((n): n is number => n !== null && n > 0);
    if (!matches.length) continue;
    allCandidates.push(...matches);
    if (KEYWORD_LINE.test(line)) keywordCandidates.push(...matches);
  }

  const plausible = (n: number) => n >= 50 && n <= 100000;

  const fromKeyword = keywordCandidates.filter(plausible);
  if (fromKeyword.length) return Math.max(...fromKeyword);

  const fromAll = allCandidates.filter(plausible);
  if (fromAll.length) return Math.max(...fromAll);

  return null;
}
