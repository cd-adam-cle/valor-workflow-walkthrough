// Mapping from raw template filenames (in /public/templates/{style}/) to human labels.
// Standardized to style_basic_XX.png.

export const STYLES = [
  {
    id: 'bronze',
    name: 'Bronze basic',
    tag: 'Energický',
    description:
      'Výrazné oranžovo-bronzové pozadí, černes/bílé nadpisy a jemné bílé pruhy v pozadí. Skvělé pro edukační kroky a energická témata.',
  },
  {
    id: 'dark',
    name: 'Dark basic',
    tag: 'Prémiový',
    description:
      'Tmavé uhlové pozadí, bílo-bronzové texty s gradienty a svítící bronzové pruhy. Exkluzivní, technologický a luxusní vzhled.',
  },
  {
    id: 'light',
    name: 'Light basic',
    tag: 'Korporátní',
    description:
      'Světlé krémově-pískové pozadí, bronzovo-černé texty a tmavé bronzové pruhy. Čistý, minimalistický styl s maximální čitelností.',
  },
];

const FILES = {
  bronze: Array.from({ length: 16 }, (_, i) => `bronze_basic_${String(i + 1).padStart(2, '0')}.png`),
  dark: Array.from({ length: 16 }, (_, i) => `dark_basic_${String(i + 1).padStart(2, '0')}.png`),
  light: Array.from({ length: 16 }, (_, i) => `light_basic_${String(i + 1).padStart(2, '0')}.png`),
};

const LAYOUT_NAMES = {
  '01': 'Hook · úvod',
  '02': 'Fact-check',
  '03': 'Glass card',
  '04': 'Citace (06)',
  '05': 'Timeline',
  '06': 'Content base',
  '07': 'Content base · alt',
  '08': 'Content base · alt 2',
  '09': 'Content base · D5',
  '10': 'Content base · D10',
  '11': 'Citace (09)',
  '12': 'Citace · alt (09)',
  '13': 'Krok 1 · Analýza',
  '14': 'Krok 2 · Strategie',
  '15': 'Krok 3 · Řízení',
  '16': 'Final · CTA',
};

export function getTiles(styleId) {
  const files = FILES[styleId] || [];
  return files.map((file, idx) => {
    const numStr = String(idx + 1).padStart(2, '0');
    return {
      id: `${styleId}-${file}`,
      src: `./templates/${styleId}/${file}`,
      label: `${styleId}_basic_${numStr}`,
      layoutName: LAYOUT_NAMES[numStr] || '',
      index: idx + 1,
    };
  });
}
