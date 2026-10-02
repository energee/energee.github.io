// Run against the site using a Playwright-compatible page or tab.playwright.
export async function smoke(page) {
  const assert = (value, message) => { if (!value) throw new Error(message); };
  const tab = name => page.getByRole('tab', { name, exact: true });
  const selected = async name => {
    await tab(name).and(page.locator('[aria-selected="true"]')).waitFor({ state: 'visible' });
    return tab(name).getAttribute('aria-selected');
  };
  await tab('AI for engineering').click();
  assert(await selected('AI for engineering') === 'true', 'Engineering tab did not select');
  assert((await page.getByRole('tabpanel').innerText()).includes('Ship reviewed changes'), 'Wrong tab content');
  await tab('AI for engineering').press('End');
  assert(await selected('AI search & knowledge') === 'true', 'End key did not select last tab');
  await tab('AI search & knowledge').press('ArrowRight');
  assert(await selected('AI for operations') === 'true', 'Arrow key did not wrap to first tab');
  await tab('AI for operations').press('ArrowLeft');
  assert(await selected('AI search & knowledge') === 'true', 'Arrow key did not wrap to last tab');
  await tab('AI search & knowledge').press('Home');
  assert(await selected('AI for operations') === 'true', 'Home key did not select first tab');
  await page.getByRole('button', { name: 'Inside the architecture' }).click();
  assert(await page.getByRole('button', { name: 'Inside the architecture' }).getAttribute('aria-expanded') === 'true', 'Architecture did not expand');
  await page.getByRole('button', { name: 'Inside the architecture' }).click();
  await page.getByRole('button', { name: 'How we check that callers are actually helped' }).click();
  assert(await page.getByRole('button', { name: 'How we check that callers are actually helped' }).getAttribute('aria-expanded') === 'true', 'Call evaluation did not expand');
  await page.getByRole('button', { name: 'How we check that callers are actually helped' }).click();
  await page.getByRole('button', { name: 'What will it cost?' }).click();
  assert(await page.getByRole('button', { name: 'What will it cost?' }).getAttribute('aria-expanded') === 'true', 'Cost explanation did not expand');
  await page.getByRole('button', { name: 'What will it cost?' }).click();
  await page.getByRole('button', { name: 'Let’s talk', exact: true }).click();
  assert(await page.getByRole('dialog').isVisible(), 'Project brief did not open');
  await page.getByLabel('What process would you like to improve?').fill('Calls & bookings? 20% repeat requests\nTools: CRM + calendar');
  await page.getByLabel('Where does it fit?').selectOption('Software engineering');
  const draft = new URL(await page.getByRole('link', { name: 'Open email draft' }).getAttribute('href'));
  assert(draft.protocol === 'mailto:' && draft.pathname === 'hello@energee.example', 'Incorrect contact destination');
  assert(draft.searchParams.get('subject') === 'First workflow: Software engineering', 'Email subject lost the selected area');
  assert(draft.searchParams.get('body') === 'Calls & bookings? 20% repeat requests\nTools: CRM + calendar', 'Email body lost or misencoded the brief');
  assert((await page.getByRole('dialog').innerText()).includes('This is a placeholder'), 'Preview contact was not identified');
  await page.getByRole('button', { name: 'Close', exact: true }).click();
  await page.locator('[data-slot="dialog-content"]').waitFor({ state: 'detached' });
  assert(!await page.getByRole('dialog').isVisible(), 'Project brief did not close');
  assert(await page.evaluate(() => document.activeElement?.textContent) === 'Let’s talk', 'Dialog did not restore focus to its opener');
  await page.getByRole('button', { name: 'Let’s talk', exact: true }).click();
  await page.getByRole('dialog').waitFor({ state: 'visible' });
  assert(await page.locator('#brief').evaluate(element => element.value) === 'Calls & bookings? 20% repeat requests\nTools: CRM + calendar', 'Closing the dialog lost the brief');
  await page.locator('#brief').press('Escape');
  await page.locator('[data-slot="dialog-content"]').waitFor({ state: 'detached' });
  assert(!await page.getByRole('dialog').isVisible(), 'Escape did not close project brief');
  const motion = page.locator('#motion-toggle');
  if (await motion.isEnabled()) {
    await motion.click();
    assert(await motion.getAttribute('aria-pressed') === 'true', 'Animation did not pause');
    await motion.click();
    assert(await motion.getAttribute('aria-pressed') === 'false', 'Animation did not resume');
  }
  assert(await page.evaluate(() => [...document.querySelectorAll('button,textarea,select,label')].every(element => element.hasAttribute('data-slot'))), 'A UI control does not use shadcn');
}
