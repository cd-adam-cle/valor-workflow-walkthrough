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

// Reálně existující šablony (zdroj pravdy = workflow/content-rules.js).
// Typy 04/09/11/12 byly z enginu odstraněny — nemají náhled ani je nelze vygenerovat.
const TEMPLATE_INDICES = [1, 2, 3, 5, 6, 7, 8, 10, 13, 14, 15, 16];

const buildFiles = (style) =>
  TEMPLATE_INDICES.map((i) => `${style}_basic_${String(i).padStart(2, '0')}.png`);

const FILES = {
  bronze: buildFiles('bronze'),
  dark: buildFiles('dark'),
  light: buildFiles('light'),
};

const LAYOUT_NAMES = {
  '01': 'Hook · úvod',
  '02': 'Fact-check',
  '03': 'Glass card',
  '05': 'Timeline',
  '06': 'Content base',
  '07': 'Content base · alt',
  '08': 'Content base · alt 2',
  '10': 'Content base · D10',
  '13': 'Krok 1 · Analýza',
  '14': 'Krok 2 · Strategie',
  '15': 'Krok 3 · Řízení',
  '16': 'Final · CTA',
};

export function getTiles(styleId) {
  const files = FILES[styleId] || [];
  return files.map((file) => {
    const numStr = file.match(/_(\d{2})\.png$/)?.[1] || '';
    return {
      id: `${styleId}-${file}`,
      src: `./templates/${styleId}/${file}`,
      label: `${styleId}_basic_${numStr}`,
      layoutName: LAYOUT_NAMES[numStr] || '',
      index: parseInt(numStr, 10),
    };
  });
}
