// Run against the site using a Playwright-compatible page or tab.playwright.
export async function smoke(page) {
  const assert = (value, message) => { if (!value) throw new Error(message); };
  await page.getByRole('button', { name: 'Inside the architecture' }).click();
  assert(await page.getByRole('button', { name: 'Inside the architecture' }).getAttribute('aria-expanded') === 'true', 'Architecture did not expand');
  await page.getByRole('button', { name: 'Inside the architecture' }).click();
  await page.getByRole('button', { name: 'How we test it before your customers hear it' }).click();
  assert(await page.getByRole('button', { name: 'How we test it before your customers hear it' }).getAttribute('aria-expanded') === 'true', 'Testing explanation did not expand');
  await page.getByRole('button', { name: 'How we test it before your customers hear it' }).click();
  await page.getByRole('button', { name: 'What does it cost?' }).click();
  assert(await page.getByRole('button', { name: 'What does it cost?' }).getAttribute('aria-expanded') === 'true', 'Cost explanation did not expand');
  await page.getByRole('button', { name: 'What does it cost?' }).click();
  await page.getByRole('button', { name: 'Free call count', exact: true }).click();
  assert(await page.getByRole('dialog').isVisible(), 'Call count form did not open');
  await page.getByLabel('How do you handle calls today?').fill('After 5pm & weekends? Voicemail.\nCalendar: Google');
  await page.getByLabel('What kind of business?').selectOption('Auto repair');
  const draft = new URL(await page.getByRole('link', { name: 'Open email draft' }).getAttribute('href'));
  assert(draft.protocol === 'mailto:' && draft.pathname === 'hello@energee.example', 'Incorrect contact destination');
  assert(draft.searchParams.get('subject') === 'Missed-call count: Auto repair', 'Email subject lost the selected business');
  assert(draft.searchParams.get('body') === 'After 5pm & weekends? Voicemail.\nCalendar: Google', 'Email body lost or misencoded the brief');
  assert((await page.getByRole('dialog').innerText()).includes('This is a placeholder'), 'Preview contact was not identified');
  await page.getByRole('button', { name: 'Close', exact: true }).click();
  await page.locator('[data-slot="dialog-content"]').waitFor({ state: 'detached' });
  assert(!await page.getByRole('dialog').isVisible(), 'Call count form did not close');
  assert(await page.evaluate(() => document.activeElement?.textContent) === 'Free call count', 'Dialog did not restore focus to its opener');
  await page.getByRole('button', { name: 'Free call count', exact: true }).click();
  await page.getByRole('dialog').waitFor({ state: 'visible' });
  assert(await page.locator('#brief').evaluate(element => element.value) === 'After 5pm & weekends? Voicemail.\nCalendar: Google', 'Closing the dialog lost the brief');
  await page.locator('#brief').press('Escape');
  await page.locator('[data-slot="dialog-content"]').waitFor({ state: 'detached' });
  assert(!await page.getByRole('dialog').isVisible(), 'Escape did not close call count form');
  const motion = page.locator('#motion-toggle');
  if (await motion.isEnabled()) {
    await motion.click();
    assert(await motion.getAttribute('aria-pressed') === 'true', 'Animation did not pause');
    await motion.click();
    assert(await motion.getAttribute('aria-pressed') === 'false', 'Animation did not resume');
  }
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
