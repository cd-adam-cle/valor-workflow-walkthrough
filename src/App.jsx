import { useEffect, useState } from 'react';
import { STYLES, getTiles } from './templates.js';

const STEPS = [
  {
    n: '1',
    group: 'Příprava',
    title: 'Stáhni si program Antigravity',
    body: 'Antigravity je program, ve kterém s tebou bude pomocník (umělá inteligence) povídat. Stáhneš ho podobně jako jakýkoliv jiný program.',
    tip: 'Otevři si v prohlížeči stránku antigravity.google a klikni na tlačítko „Download“. Vyber verzi pro tvůj počítač — Windows, Mac, nebo Linux. Pak ho dvojklikem nainstaluj.',
  },
  {
    n: '2',
    group: 'Příprava',
    title: 'Spusť Antigravity a přihlas se Google účtem',
    body: 'Po instalaci najdi ikonu Antigravity (na ploše, v nabídce Start, nebo ve složce Aplikace) a spusť ji. Program tě požádá o přihlášení — klikni na „Sign in with Google“ a přihlas se svým Gmailem.',
    tip: 'Bez přihlášení pomocník nebude fungovat. Pokud nemáš Google účet, ozvi se nám.',
  },
  {
    n: '3',
    group: 'Otevření Agent Manageru',
    title: 'Najdi v počítači složku „valor-group“',
    body: 'Tu složku jsme ti připravili a poslali. Najdi ji ve svém počítači (bývá v Dokumentech, na ploše, nebo ve Stahování). Zapamatuj si, kde leží — za chvilku ji budeš vybírat.',
    tip: 'Když si nemůžeš vzpomenout, kam jsi ji uložil, hledej slovo „valor-group“ v počítači.',
  },
  {
    n: '4',
    group: 'Otevření Agent Manageru',
    title: 'Otevři Agent Manager',
    body: 'V Antigravity přepni do Agent Manageru — to je ta část programu, kde s pomocníkem mluvíš (vypadá jako jednoduchý chat). NE ta programovací část s kódem. Vlevo uvidíš panel s nadpisem „Workspaces“.',
    tip: 'Agent Manager je tvůj pracovní prostor. Vlevo „+ New Conversation“, „Conversation History“ a seznam „Workspaces“.',
  },
  {
    n: '5',
    group: 'Otevření Agent Manageru',
    title: 'Klikni v levém panelu na ikonku „Add Workspace“',
    body: 'V levém panelu vedle nadpisu „Workspaces“ uvidíš malou ikonku složky se symbolem + („Add Workspace“). Klikni na ni. Uprostřed obrazovky se otevře okénko s názvem „Select Workspace…“.',
    tip: 'Pokud složku „valor-group“ v seznamu Workspaces už vidíš (z minula), můžeš na ni rovnou kliknout a přeskočit kroky 5–7.',
  },
  {
    n: '6',
    group: 'Otevření Agent Manageru',
    title: 'V okénku „Select Workspace“ klikni na „Open Folder“',
    body: 'V otevřeném okénku „Select Workspace…“ je nahoře modře zvýrazněná volba „Open Folder“. Klikni na ni. Otevře se ti okénko pro výběr složky z tvého počítače.',
    tip: 'Pod „Open Folder“ vidíš seznam „Other Workspaces“ — pokud je tam „valor-group“, můžeš na něj rovnou kliknout místo „Open Folder“.',
  },
  {
    n: '7',
    group: 'Otevření Agent Manageru',
    title: 'Vyber složku valor-group a potvrď',
    body: 'V okénku najdi složku valor-group (tu z kroku 3). Klikni na ni jednou, aby byla označená, a klikni dole na tlačítko „Open“ nebo „Select Folder“. Složka se přidá do seznamu Workspaces vlevo.',
    tip: 'Stačí složku označit — není potřeba do ní vstupovat. Pak ji potvrď tlačítkem dole.',
  },
  {
    n: '8',
    group: 'Spuštění pomocníka',
    title: 'Klikni na „+ New Conversation“ vlevo nahoře',
    body: 'V Agent Manageru vlevo úplně nahoře je tlačítko „+ New Conversation“. Klikni na něj — založíš novou konverzaci s pomocníkem.',
    tip: 'Pod tlačítkem v sekci „Conversation History“ vidíš historii všech předchozích konverzací — k těm se můžeš kdykoliv vrátit.',
  },
  {
    n: '9',
    group: 'Spuštění pomocníka',
    title: 'Zkontroluj, že je vybraná složka valor-group',
    body: 'Uprostřed obrazovky uvidíš nahoře nápis „New conversation in [složka]“. Musí tam stát „valor-group“. Když je tam jiná složka, klikni na ten název a v seznamu vyber „valor-group“.',
    tip: 'Bez správné složky pomocník neví, kde má pracovat.',
  },
  {
    n: '10',
    group: 'Spuštění pomocníka',
    title: 'Vyber správný model: Gemini 3.1 (High)',
    body: 'Pod políčkem pro psaní je tlačítko s názvem modelu (např. „Gemini 3.5 Flash (High)“). Klikni na něj a v seznamu vyber „Gemini 3.1 (High)“ — ten dělá nejlepší obrázky. Pokud tě Antigravity upozorní, že už jsi denní limit modelu 3.1 vyčerpal, přepni se na „Gemini 3.5 Flash (High)“.',
    tip: 'Pravidlo je jednoduché: vždycky preferuj 3.1 (High). Až ti dojde, použij 3.5 Flash (High) jako záskok.',
  },
  {
    n: '11',
    group: 'Tvorba obrázků',
    title: 'Připrav si text, ze kterého chceš obrázky',
    body: 'Nachystej si text k proměně v obrázky — příspěvek na LinkedIn, nabídka služby, výtah z porady, článek. Měj ho v dosahu (ve Wordu, v e-mailu, kdekoliv).',
    tip: 'Funguje to nejlépe na 200 až 800 slov. Z krátkého textu vznikne 3–4 obrázky, z dlouhého klidně 8–10.',
  },
  {
    n: '12',
    group: 'Tvorba obrázků',
    title: 'Vyber si styl: Bronze, Dark, nebo Light',
    body: 'Podívej se v galerii na této stránce na tři styly. Bronze je teplý a výrazný. Dark je elegantní a tmavý. Light je čistý a světlý. Vyber, který sedí k tématu.',
    tip: 'Nejsi si jistý? Pošli pomocníkovi svůj text a napiš: „Doporuč mi styl, který se k tomu hodí.“',
  },
  {
    n: '13',
    group: 'Tvorba obrázků',
    title: 'Napiš zadání pomocníkovi (dvě možnosti)',
    body: 'Teď pomocníkovi řekneš, co má udělat. Jdou dvě cesty: 1) Napiš mu rovnou do pole „Ask anything…“ v Agent Manageru — klidně vlastními slovy. 2) Nebo si dole na této stránce vyplň „Vzorové zadání“, klikni na „Kopírovat zadání“ a vlož ho do Antigravity (Ctrl + V). Předloha je jen pomůcka — není povinná.',
    tip: 'Pokud teprve začínáš, vyplň si vzorové zadání dole — pomůže ti to nezapomenout na nic důležitého. Pak už klidně piš jen vlastními slovy.',
  },
  {
    n: '14',
    group: 'Tvorba obrázků',
    title: 'Odešli zprávu pomocníkovi',
    body: 'V poli „Ask anything…“ máš svůj text. Stiskni Enter (nebo klikni na šipku odeslání vpravo). Pomocník se rozjede.',
    tip: 'Pokud se ti zpráva neodeslala, zkontroluj, že máš v levém panelu vybranou složku valor-group.',
  },
  {
    n: '15',
    group: 'Tvorba obrázků',
    title: 'Počkej, až pomocník dokončí práci',
    body: 'Pomocník začne tvořit. V chatu uvidíš v reálném čase, co dělá — vybírá šablony, renderuje obrázky. Trvá to zhruba minutu, někdy o pár vteřin déle.',
    tip: 'Během čekání nemusíš nic dělat. Jen nezavírej Antigravity a neměň složku.',
  },
  {
    n: '16',
    group: 'Hotovo',
    title: 'Najdi hotové obrázky ve složce „vytvoreno“',
    body: 'Až pomocník skončí, řekne ti přesnou cestu, kam obrázky uložil. Otevři si na počítači složku valor-group → vytvoreno → najdeš tam novou podsložku s dnešním datem, názvem tvého karuselu a vybraným stylem.',
    tip: 'Příklad názvu: „2026-05-25_predstaveni_firmy_bronze“. Uvnitř jsou PNG obrázky slide_01.png, slide_02.png atd.',
  },
  {
    n: '17',
    group: 'Hotovo',
    title: 'Použij obrázky kam potřebuješ',
    body: 'PNG obrázky jsou připravené pro Instagram, LinkedIn, Facebook. Nahraj je rovnou tam, kam chceš — nebo si je zkopíruj do Dropboxu, Google Drive, či pošli e-mailem.',
    tip: 'Workflow automaticky generuje obrázky v poměru 5:4 (1620 × 2025 px) — vejdou se na všechny sociální sítě bez ztráty kvality.',
  },
  {
    n: '18',
    group: 'Úpravy',
    title: 'Chceš něco změnit? Stačí napsat',
    body: 'Pokud se ti něco nelíbí, pokračuj ve stejné konverzaci a napiš třeba: „Předělej 3. obrázek tak, aby vypadal jako bronze_basic_06.“ Nebo: „Zkrať text na druhém obrázku.“ Pomocník upraví, co řekneš.',
    tip: 'Pomocník si pamatuje, co jste dělali — nemusíš začínat znovu od začátku.',
  },
];

const TEMPLATE_PLACEHOLDER_TEXT = `(Sem vlož celý svůj text — třeba příspěvek na LinkedIn, článek, nebo nabídku služby. Asistent si z něj sám vybere, co je důležité pro jednotlivé obrázky.)`;
const TEMPLATE_PLACEHOLDER_WISHES = `- Vytvoř z mého textu sérii 5 obrázků.
- Pro první úvodní obrázek použij šablonu bronze_basic_01.
- Pro třetí obrázek, kde se mluví o rizicích, použij přesně šablonu bronze_basic_04.
- Pokud bude nějaký text moc dlouhý, sám ho zkrať, ať je hezky čitelný.`;

function buildPrompt(styleId, text, wishes) {
  return `Design šablona: ${styleId}

Text:
${text}

Specifikace / přání / formát:
${wishes}`;
}

function Lightbox({ tile, styleName, onClose }) {
  useEffect(() => {
    if (!tile) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [tile, onClose]);
  if (!tile) return null;
  const layoutCode = `${styleName.split(' ')[0].toLowerCase()}_basic_${String(tile.index).padStart(2, '0')}`;
  return (
    <div className="lightbox" onClick={onClose}>
      <button className="lightbox-close" aria-label="Zavřít" onClick={onClose}>×</button>
      <img className="lightbox-img" src={tile.src} alt={layoutCode} onClick={(e) => e.stopPropagation()} />
      <div className="lightbox-meta">
        <strong>{layoutCode}</strong>
      </div>
    </div>
  );
}

export default function App() {
  const [activeStyle, setActiveStyle] = useState('bronze');
  const [lightboxTile, setLightboxTile] = useState(null);
  const [copied, setCopied] = useState(false);

  const [formStyle, setFormStyle] = useState('bronze');
  const [formText, setFormText] = useState('');
  const [formWishes, setFormWishes] = useState('');

  const currentStyle = STYLES.find((s) => s.id === activeStyle);
  const tiles = getTiles(activeStyle);

  const canCopy = formText.trim().length > 0 && formWishes.trim().length > 0;

  const handleCopy = async () => {
    if (!canCopy) return;
    try {
      await navigator.clipboard.writeText(buildPrompt(formStyle, formText.trim(), formWishes.trim()));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      {/* NAV */}
      <header className="nav">
        <div className="nav-inner">
          <a href="#workflow">
            <img className="nav-logo" src="./logos/valor-horizontal-bronz-white.png" alt="Valor Group" />
          </a>
          <nav className="nav-links">
            <a href="#workflow">Jak to funguje</a>
            <a href="#templates">Galerie šablon</a>
            <a href="#prompt">Vzorové zadání</a>
            <a href="#faq">Časté dotazy</a>
            <a href="#prompt" className="nav-cta">Vytvořit karusel</a>
          </nav>
        </div>
      </header>

      {/* WORKFLOW */}
      <section className="workflow" id="workflow">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow eyebrow-xl">Návod krok za krokem</span>
            <p style={{ marginTop: 16 }}>Projdi si tyhle kroky první den. Pak už si vždycky stačí jen vzpomenout, co a kam napsat — celé to děláš přes chat.</p>
          </div>
          <div className="workflow-grid">
            {STEPS.map((step, i) => {
              const prevGroup = i > 0 ? STEPS[i - 1].group : null;
              const showGroup = step.group && step.group !== prevGroup;
              return (
                <article className="step" key={step.n}>
                  {showGroup && <span className="step-group">{step.group}</span>}
                  <span className="step-num">{step.n}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                  {step.tip && <div className="step-tip"><strong>Tip:</strong> {step.tip}</div>}
                </article>
              );
            })}
          </div>
          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <a href="#prompt" className="btn btn-primary">Zobrazit vzorové zadání pro asistenta ↓</a>
          </div>
        </div>
      </section>

      {/* TEMPLATES */}
      <section className="templates" id="templates">
        <div className="container">
          <div className="section-head section-head-compact">
            <span className="eyebrow eyebrow-xl">Galerie šablon</span>
          </div>

          <div className="tabs-wrap">
            <div className="tabs" role="tablist">
              {STYLES.map((s) => (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={activeStyle === s.id}
                  className={`tab ${activeStyle === s.id ? 'active' : ''}`}
                  onClick={() => setActiveStyle(s.id)}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          <div className="gallery">
            {tiles.map((tile) => {
              const layoutCode = `${activeStyle}_basic_${String(tile.index).padStart(2, '0')}`;
              return (
                <button
                  key={tile.id}
                  className="tile-card"
                  onClick={() => setLightboxTile(tile)}
                  aria-label={`Otevřít náhled ${layoutCode}`}
                >
                  <div className="tile-image-wrapper">
                    <img
                      src={tile.src}
                      alt={layoutCode}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const ph = e.currentTarget.nextElementSibling;
                        if (ph && ph.classList.contains('tile-placeholder')) ph.style.display = 'flex';
                      }}
                    />
                    <span className="tile-placeholder" aria-hidden="true">
                      <span>Brzy</span>
                    </span>
                    <span className="tile-num">#{String(tile.index).padStart(2, '0')}</span>
                  </div>
                  <div className="tile-card-info">
                    <div className="tile-card-code">{layoutCode}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROMPT */}
      <section className="prompt" id="prompt">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow eyebrow-xl">Vzorové zadání</span>
            <p style={{ marginTop: 16 }}>Vlevo je předloha — jen návod, jak má zadání vypadat. Vpravo si vyplň své vlastní zadání. Pak klikni na „Kopírovat zadání“ a vlož ho do Antigravity.</p>
          </div>

          <div className="prompt-twin">
            {/* LEFT: read-only template */}
            <div className="prompt-card prompt-card-template">
              <div className="prompt-head">
                <span className="prompt-label">Předloha (jen vzor)</span>
              </div>
              <div className="prompt-body">
                <div className="prompt-field-block">
                  <span className="k">Design šablona:</span> <span className="v">bronze</span>
                </div>
                <div className="prompt-field-block">
                  <span className="k">Text:</span>
                  <div className="c">{TEMPLATE_PLACEHOLDER_TEXT}</div>
                </div>
                <div className="prompt-field-block">
                  <span className="k">Specifikace / přání / formát:</span>
                  <div className="v">{TEMPLATE_PLACEHOLDER_WISHES}</div>
                </div>
              </div>
            </div>

            {/* RIGHT: editable form */}
            <div className="prompt-card prompt-card-form">
              <div className="prompt-head">
                <span className="prompt-label">Tvoje zadání</span>
                <button
                  className={`copy-btn ${copied ? 'copied' : ''} ${!canCopy ? 'disabled' : ''}`}
                  onClick={handleCopy}
                  disabled={!canCopy}
                >
                  {copied ? '✓ Zkopírováno' : 'Kopírovat zadání'}
                </button>
              </div>
              <div className="prompt-body">
                <div className="form-field">
                  <label htmlFor="form-style">Design šablona</label>
                  <select
                    id="form-style"
                    className="form-select"
                    value={formStyle}
                    onChange={(e) => setFormStyle(e.target.value)}
                  >
                    {STYLES.map((s) => (
                      <option key={s.id} value={s.id}>{s.id}</option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="form-text">Text</label>
                  <textarea
                    id="form-text"
                    className="form-textarea"
                    rows={6}
                    value={formText}
                    onChange={(e) => setFormText(e.target.value)}
                    placeholder="Sem vlož celý svůj text..."
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="form-wishes">Specifikace / přání / formát</label>
                  <textarea
                    id="form-wishes"
                    className="form-textarea"
                    rows={6}
                    value={formWishes}
                    onChange={(e) => setFormWishes(e.target.value)}
                    placeholder={"- Vytvoř z mého textu sérii X obrázků.\n- Pro první obrázek použij šablonu..."}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq" id="faq">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Podpora</span>
            <h2>Časté dotazy</h2>
          </div>
          <div className="faq-list">
            <details className="faq-item">
              <summary>Kde přesně najdu svoje hotové obrázky?</summary>
              <div className="answer">
                Všechny obrázky se automaticky ukládají k tobě do počítače. Najdeš je ve složce projektu v pod-složce <code>vytvoreno/</code>. Každý nový karusel bude mít vlastní složku pojmenovanou podle data, názvu karuselu a zvoleného stylu (např. <code>2026-05-25_predstaveni_firmy_bronze/</code>). Obrázky jsou vždy v poměru <b>5:4</b> (1620 × 2025 px) — připravené rovnou pro Instagram, LinkedIn i Facebook.
              </div>
            </details>
            <details className="faq-item">
              <summary>Jak změním jen jeden konkrétní obrázek, který se mi nelíbí?</summary>
              <div className="answer">
                Je to úplně jednoduché. Podívej se do naší galerie šablon (výše) a vyber si vzhled, který by se ti líbil víc. Pak asistentovi do chatu napiš například: <i>„Změň mi třetí obrázek tak, aby vypadal jako bronze_basic_11.“</i> Asistent obrázek okamžitě předělá.
              </div>
            </details>
            <details className="faq-item">
              <summary>Text na obrázku je moc malý nebo špatně čitelný. Co s tím?</summary>
              <div className="answer">
                Stává se to, když je textu příliš mnoho. Asistent se snaží text vždy vměstnat tak, aby byl vidět, a proto ho někdy zmenší. Stačí mu napsat: <i>„Text na druhém obrázku je moc malý, zkus ho víc zkrátit a zjednodušit.“</i>
              </div>
            </details>
            <details className="faq-item">
              <summary>Jak poznám vygenerovaný obrázek mezi ostatními soubory ve složce?</summary>
              <div className="answer">
                Velmi snadno. Všechny obrázky vytvořené pomocníkem se ukládají <b>výhradně</b> do složky <code>vytvoreno/</code> uvnitř projektu valor-group — nikde jinde. Uvnitř má každý karusel svou vlastní podsložku pojmenovanou podle data a tématu, například <code>2026-05-25_predstaveni_firmy_bronze/</code>. Jednotlivé obrázky uvnitř jsou pojmenované <code>slide_01.png</code>, <code>slide_02.png</code> atd. Když uvidíš tenhle vzorec, máš jistotu, že jde o čerstvý výstup od pomocníka.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* FOOTER REMOVED */}

      <Lightbox tile={lightboxTile} styleName={currentStyle.name} onClose={() => setLightboxTile(null)} />
    </>
  );
}
