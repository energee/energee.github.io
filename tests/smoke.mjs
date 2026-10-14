// Run against the site using a Playwright-compatible page or tab.playwright.
export async function smoke(page) {
  const assert = (value, message) => { if (!value) throw new Error(message); };
  assert((await page.getByRole('heading', { level: 1 }).innerText()).includes('AI that knows your business'), 'Broader business positioning is missing');
  for (const id of ['problems', 'how', 'technology', 'work']) {
    assert(await page.locator(`#${id}`).count() === 1, `Missing section: ${id}`);
  }
  for (const name of ['Customers wait—or go elsewhere.', 'Your team keeps hunting for answers.', 'Work gets stuck between systems.']) {
    assert(await page.getByRole('heading', { name, exact: true }).count() === 1, `Missing problem: ${name}`);
  }
  assert((await page.getByRole('heading', { level: 1 }).textContent()).includes('business. And'), 'Hero sentences lost their separating space');
  let copy = await page.locator('body').innerText();
  copy += await page.locator('meta[name="description"]').getAttribute('content');
  assert(await page.title() === 'Energee — AI that knows your business', 'Page title is stale');
  assert((await page.locator('meta[name="description"]').getAttribute('content')).includes('business knowledge'), 'Page description is stale');
  for (const name of ['Retrieval and business knowledge (RAG)', 'Agents and software integrations', 'Voice applications', 'Task-specific model adaptation', 'Evaluation and operation']) {
    const trigger = page.getByRole('button', { name, exact: true });
    await trigger.click();
    copy += await page.locator('#technology').innerText();
    assert(await trigger.getAttribute('aria-expanded') === 'true', `${name} did not expand`);
    if (name === 'Retrieval and business knowledge (RAG)') assert((await page.locator('#technology').innerText()).includes('does not change the model’s weights'), 'RAG distinction is missing');
    if (name === 'Task-specific model adaptation') assert((await page.locator('#technology').innerText()).includes('Fine-tuning changes model weights'), 'Fine-tuning distinction is missing');
    await trigger.click();
  }
  for (const name of ['Where should we start?', 'Do we need to train our own model?', 'Can you work with our existing software?', 'What does it cost?', 'What if the AI gets something wrong?']) {
    const trigger = page.getByRole('button', { name, exact: true });
    await trigger.click();
    assert(await trigger.getAttribute('aria-expanded') === 'true', `${name} did not expand`);
    copy += await page.locator('#questions').innerText();
    await trigger.click();
  }
  await page.getByRole('button', { name: 'Let’s talk', exact: true }).click();
  assert(await page.getByRole('dialog').isVisible(), 'Workflow form did not open');
  copy += await page.getByRole('dialog').innerText();
  assert(!/or it’s free|you don’t pay|No risk\./i.test(copy), 'Unapproved blanket guarantee remains');
  const initialDraft = new URL(await page.getByRole('link', { name: 'Open email draft' }).getAttribute('href'));
  assert(initialDraft.searchParams.get('subject') === 'Workflow discovery: Not specified', 'Default draft assigns an unselected business type');
  await page.getByLabel('What work keeps getting stuck?').fill('Policies & records? Scattered.\nCRM: Salesforce');
  await page.getByLabel('What kind of business?').selectOption('Professional services');
  const draft = new URL(await page.getByRole('link', { name: 'Open email draft' }).getAttribute('href'));
  assert(draft.protocol === 'mailto:' && draft.pathname === 'hello@energee.example', 'Incorrect contact destination');
  assert(draft.searchParams.get('subject') === 'Workflow discovery: Professional services', 'Email subject lost the selected business');
  assert(draft.searchParams.get('body') === 'Policies & records? Scattered.\nCRM: Salesforce', 'Email body lost or misencoded the brief');
  assert((await page.getByRole('dialog').innerText()).includes('This is a placeholder'), 'Preview contact was not identified');
  await page.getByRole('button', { name: 'Close', exact: true }).click();
  await page.locator('[data-slot="dialog-content"]').waitFor({ state: 'detached' });
  assert(!await page.getByRole('dialog').isVisible(), 'Workflow form did not close');
  assert(await page.evaluate(() => document.activeElement?.textContent) === 'Let’s talk', 'Dialog did not restore focus to its opener');
  await page.getByRole('button', { name: 'Let’s talk', exact: true }).click();
  await page.getByRole('dialog').waitFor({ state: 'visible' });
  assert(await page.locator('#brief').evaluate(element => element.value) === 'Policies & records? Scattered.\nCRM: Salesforce', 'Closing the dialog lost the brief');
  await page.locator('#brief').press('Escape');
  await page.locator('[data-slot="dialog-content"]').waitFor({ state: 'detached' });
  assert(!await page.getByRole('dialog').isVisible(), 'Escape did not close workflow form');
  const motion = page.locator('#motion-toggle');
  if (await motion.isEnabled()) {
    await motion.click();
    assert(await motion.getAttribute('aria-pressed') === 'true', 'Animation did not pause');
    await motion.click();
    assert(await motion.getAttribute('aria-pressed') === 'false', 'Animation did not resume');
  }
  assert(await page.evaluate(() => [...document.querySelectorAll('button,textarea,select,label')].every(element => element.hasAttribute('data-slot'))), 'A UI control does not use shadcn');
}

// Run on /work/mgr/, /ai-phone-agents/, /knowledge-search/, or /workflow-automation/ (hydrated from prerendered HTML).
export async function smokePage(page) {
  const assert = (value, message) => { if (!value) throw new Error(message); };
  assert(await page.getByRole('heading', { level: 1 }).count() === 1, 'Page must have exactly one h1');
  assert(await page.locator('link[rel="canonical"]').count() === 1, 'Canonical link is missing');
  assert(await page.locator('header nav a').count() === 4, 'Header should link to the three services and our work');
  const architecture = page.getByRole('button', { name: 'Inside the architecture' });
  if (await architecture.count()) {
    await architecture.click();
    assert(await architecture.getAttribute('aria-expanded') === 'true', 'Architecture did not expand');
  }
  await page.getByRole('button', { name: 'Let’s talk', exact: true }).click();
  assert(await page.getByRole('dialog').isVisible(), 'Contact dialog did not open after hydration');
  await page.getByRole('button', { name: 'Close', exact: true }).click();
  assert(await page.evaluate(() => [...document.querySelectorAll('button,textarea,select,label')].every(element => element.hasAttribute('data-slot'))), 'A UI control does not use shadcn');
}

// The site is always dark; checks the dark palette, text contrast, and ghost buttons.
export async function themeSmoke(page) {
  const styles = await page.evaluate(() => ({
    background: getComputedStyle(document.body).backgroundColor,
    text: [...document.querySelectorAll('h1,h2,.hero-copy,.section-heading>p,.case-row p,.steps p,footer>span')].map(element => getComputedStyle(element).color),
    ghost: [...document.querySelectorAll('[data-variant="ghost"]:not([data-size^="icon"])')].map(element => ({
      left: getComputedStyle(element).paddingLeft,
      right: getComputedStyle(element).paddingRight,
      border: getComputedStyle(element).borderLeftWidth,
    })),
  }));
  const luminance = color => {
    const rgb = color.match(/[\d.]+/g).slice(0, 3).map(value => {
      const channel = Number(value) / 255;
      return channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4;
    });
    return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
  };
  const background = luminance(styles.background);
  if (background > .05) throw new Error(`Wrong dark background: ${styles.background}`);
  for (const color of styles.text) {
    const text = luminance(color);
    if ((Math.max(text, background) + .05) / (Math.min(text, background) + .05) < 4.5) throw new Error(`Unreadable dark text: ${color}`);
  }
  if (!styles.ghost.length || styles.ghost.some(button => button.left !== '24px' || button.right !== '24px' || button.border !== '0px')) throw new Error('Ghost button spacing or border regressed');
}
