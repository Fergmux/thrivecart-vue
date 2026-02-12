// Shared colour helpers per product code
const colorMap: Record<string, { bg: string; ring: string; text: string; badge: string }> = {
  R01: { bg: 'bg-red-500/10', ring: 'ring-red-500/30', text: 'text-red-400', badge: 'bg-red-500' },
  G01: {
    bg: 'bg-emerald-500/10',
    ring: 'ring-emerald-500/30',
    text: 'text-emerald-400',
    badge: 'bg-emerald-500',
  },
  B01: {
    bg: 'bg-blue-500/10',
    ring: 'ring-blue-500/30',
    text: 'text-blue-400',
    badge: 'bg-blue-500',
  },
};

const defaultColors = {
  bg: 'bg-gray-500/10',
  ring: 'ring-gray-500/30',
  text: 'text-gray-400',
  badge: 'bg-gray-500',
};

export function colors(code: string) {
  return colorMap[code] ?? defaultColors;
}

const currencyFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
});

export function formatPrice(value: number) {
  return currencyFormatter.format(value / 100);
}
