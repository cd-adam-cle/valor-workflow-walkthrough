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
// Pořadí = pořadí v galerii. Suffix "01b" = obsahový slide s kickerem (za Hookem).
// Typy 04/09/11/12 byly z enginu odstraněny. Při přidání šablony stačí doplnit sem.
const TEMPLATE_KEYS = [
  '01', '01b', '02', '03', '05', '06', '07', '08', '10',
  '13', '14', '15', '16', '17', '18', '19', '20', '21',
];

const buildFiles = (style) => TEMPLATE_KEYS.map((k) => `${style}_basic_${k}.png`);

const FILES = {
  bronze: buildFiles('bronze'),
  dark: buildFiles('dark'),
  light: buildFiles('light'),
};

const LAYOUT_NAMES = {
  '01': 'Hook · úvod',
  '01b': 'Historie · obsah',
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
  '17': 'Editorial',
  '18': 'Glass stack',
  '19': 'Spotlight · citát',
  '20': 'Finance HUD · graf',
  '21': 'Strand wave',
};

export function getTiles(styleId) {
  const files = FILES[styleId] || [];
  return files.map((file, i) => {
    // suffix podporuje i písmeno (01b) i čísla (07, 17…)
    const key = file.match(/_(\d{2}[a-z]?)\.png$/)?.[1] || '';
    return {
      id: `${styleId}-${file}`,
      src: `./templates/${styleId}/${file}`,
      label: `${styleId}_basic_${key}`,   // klient používá v zadání (bronze_basic_01b)
      layoutName: LAYOUT_NAMES[key] || '',
      index: key,                          // klíč šablony (string, podporuje 01b)
      displayNum: i + 1,                   // pořadové číslo v galerii (souvislé)
    };
  });
}
