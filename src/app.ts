type Service = readonly [number: string, title: string, description: string, examples: string];

const sets = {
  ops: [
    ['01','Workflow automation','Offload repetitive steps across your tools, with clear handling for exceptions and approvals.','Order processing · CRM updates · Reconciliation'],
    ['02','Operational agents','Give agents bounded tasks, relevant context, and a usable interface for your team to supervise their work.','Customer requests · Follow-ups · Routine checks'],
    ['03','Document intelligence','Turn unstructured documents into useful information, flagging uncertain or incomplete results for review.','Invoices · Purchase orders · Internal reports']
  ],
  eng: [
    ['01','Agent-assisted coding','Integrate coding agents into feature development, debugging, and review, with tests and human review built in.','Repository context · Test generation · Reviewed changes'],
    ['02','Living documentation','Keep technical documentation, API references, and onboarding guides aligned with changes to your software.','Change detection · Draft updates · Source references'],
    ['03','Release workflows','Coordinate checks, changelogs, versioning, and release preparation, with approval gates for consequential steps.','CI/CD · Release notes · Deployment approvals']
  ],
  knowledge: [
    ['01','Chat with your data','Build retrieval-augmented assistants that help people explore large knowledge sources with relevant references.','RAG · Permission-aware retrieval · Source citations'],
    ['02','Answer engine optimization','Make your business easier for AI search systems to understand and reference, then measure visibility over time.','Content structure · Clear answers · Discoverability'],
    ['03','Knowledge maintenance','Keep useful answers connected to current policies, product information, and internal documentation.','Internal search · Content freshness · Support knowledge']
  ]
} satisfies Record<string, readonly Service[]>;

type ServiceArea = keyof typeof sets;

function requiredElement<K extends keyof HTMLElementTagNameMap>(id: string, tag: K): HTMLElementTagNameMap[K] {
  const element = document.getElementById(id);
  const constructor = document.createElement(tag).constructor;
  if (!(element instanceof constructor)) {
    throw new Error(`Expected <${tag}> with id="${id}"`);
  }
  return element as HTMLElementTagNameMap[K];
}

function isServiceArea(key: string | undefined): key is ServiceArea {
  return key === 'ops' || key === 'eng' || key === 'knowledge';
}

const panel = requiredElement('service-panel', 'div');
const tabs = [...document.querySelectorAll<HTMLButtonElement>('button[data-tab]')];

function selectTab(key: ServiceArea): void {
  tabs.forEach(button => {
    const selected = button.dataset.tab === key;
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  panel.setAttribute('aria-labelledby', `tab-${key}`);
  panel.innerHTML = sets[key].map(([number, title, description, examples]) =>
    `<article class="service"><span class="service-icon">${number} /</span><h3>${title}</h3><p>${description}</p><div class="example">${examples}</div></article>`
  ).join('');
}

tabs.forEach((button, index) => {
  button.addEventListener('click', () => {
    if (isServiceArea(button.dataset.tab)) selectTab(button.dataset.tab);
  });
  button.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === 'Home' ? 0
      : event.key === 'End' ? tabs.length - 1
      : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    const next = tabs[nextIndex];
    if (next && isServiceArea(next.dataset.tab)) {
      next.focus();
      selectTab(next.dataset.tab);
    }
  });
});
selectTab('ops');

const approve = requiredElement('approve', 'button');
const reset = requiredElement('reset', 'button');
const log = requiredElement('log-text', 'span');
const icon = requiredElement('log-icon', 'span');
approve.addEventListener('click', () => {
  approve.disabled = true;
  approve.textContent = 'Approved in demo';
  log.textContent = 'Review recorded · Ready for next step';
  icon.textContent = '✓';
  reset.hidden = false;
});
reset.addEventListener('click', () => {
  approve.disabled = false;
  approve.textContent = 'Approve proposed date';
  log.textContent = 'Awaiting review · Nothing sent';
  icon.textContent = '◷';
  reset.hidden = true;
});

const dialog = requiredElement('contact', 'dialog');
document.querySelectorAll('[data-contact]').forEach(button => button.addEventListener('click', () => {
  dialog.showModal();
  document.body.classList.add('modal-open');
}));
const closeButton = dialog.querySelector('button.close');
if (!closeButton) throw new Error('Missing project brief close button');
closeButton.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
    dialog.close();
  }
});
dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));

const area = requiredElement('area', 'select');
const brief = requiredElement('brief', 'textarea');
const briefStatus = requiredElement('brief-status', 'p');
requiredElement('brief-form', 'form').addEventListener('submit', event => {
  event.preventDefault();
  const text = `ENERGEE / PROJECT BRIEF\n\nArea: ${area.value}\n\n${brief.value.trim()}\n\nCreated locally in the Energee site preview. Not submitted.\n`;
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'energee-project-brief.txt';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  briefStatus.textContent = 'Your brief was prepared for download. Nothing was sent.';
});

// An original, procedural ASCII signal field. No tracking or external assets.
function startAsciiField(): void {
  const canvas = requiredElement('ascii-field', 'canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const hero = canvas.parentElement;
  if (!hero) return;
  const button = requiredElement('motion-toggle', 'button');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let width = 0, height = 0, frame = 0, last = 0, time = 0;
  let inView = true, userPaused = reduce.matches;
  const glyphs = ' .·:+*=#';

  const paint = (): void => {
    ctx.clearRect(0, 0, width, height);
    const gap = 12, cols = Math.ceil(width / gap), rows = Math.ceil(height / 15);
    ctx.font = '10px monospace';
    ctx.textBaseline = 'middle';
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const nx = x / cols, ny = y / rows;
        const wave = .12 * Math.sin(nx * 10 + time * .3) + .07 * Math.sin(nx * 23 - time * .19);
        const ridge = Math.exp(-Math.pow((ny - .50 - wave) * 5, 2));
        const band = (Math.sin(nx * 29 + ny * 17 + time * .23) + Math.cos(nx * 11 - ny * 23 - time * .31) + 2) / 4;
        const strength = ridge * band;
        const grain = (Math.sin(x * 127.1 + y * 311.7) * 43758.5453) % 1;
        if (strength < .14 || grain < -.50) continue;
        const index = Math.min(glyphs.length - 1, Math.floor(strength * (glyphs.length - 1)));
        const alpha = .1 + strength * .4;
        ctx.fillStyle = `rgba(183,218,131,${alpha})`;
        ctx.fillText(glyphs.charAt(index), x * gap, y * 15);
      }
    }
  };

  const resize = (): void => {
    const box = hero.getBoundingClientRect();
    width = box.width;
    height = box.height;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    paint();
  };

  function tick(stamp: number): void {
    frame = 0;
    if (userPaused || reduce.matches || document.hidden || !inView) return;
    if (stamp - last >= 80) {
      time += .08;
      paint();
      last = stamp;
    }
    frame = requestAnimationFrame(tick);
  }

  function sync(): void {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    const paused = userPaused || reduce.matches;
    button.textContent = reduce.matches ? 'Reduced motion enabled' : paused ? 'Play animation' : 'Pause animation';
    button.setAttribute('aria-pressed', String(paused));
    button.disabled = reduce.matches;
    if (!paused && !document.hidden && inView) frame = requestAnimationFrame(tick);
  }

  button.addEventListener('click', () => {
    userPaused = !userPaused;
    sync();
  });
  reduce.addEventListener('change', () => {
    userPaused = reduce.matches;
    sync();
    paint();
  });
  document.addEventListener('visibilitychange', sync);
  new ResizeObserver(resize).observe(hero);
  new IntersectionObserver(entries => {
    const entry = entries[0];
    if (!entry) return;
    inView = entry.isIntersecting;
    sync();
  }, { threshold: 0 }).observe(hero);
  resize();
  sync();
}
startAsciiField();
