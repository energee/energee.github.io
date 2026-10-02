// Run against the built site using a Playwright-compatible page or tab.playwright.
export async function smoke(page) {
  const assert = (value, message) => { if (!value) throw new Error(message); };
  const selected = key => page.locator(`#tab-${key}`).getAttribute('aria-selected');
  await page.locator('#tab-eng').click();
  assert(await selected('eng') === 'true', 'Engineering tab did not select');
  assert((await page.locator('#service-panel').innerText()).includes('Agent-assisted coding'), 'Wrong tab content');
  await page.locator('#tab-eng').press('End');
  assert(await selected('knowledge') === 'true', 'End key did not select last tab');
  await page.locator('#tab-knowledge').press('ArrowRight');
  assert(await selected('ops') === 'true', 'Arrow key did not wrap to first tab');
  await page.locator('#tab-ops').press('ArrowLeft');
  assert(await selected('knowledge') === 'true', 'Arrow key did not wrap to last tab');
  await page.locator('#tab-knowledge').press('Home');
  assert(await selected('ops') === 'true', 'Home key did not select first tab');
  await page.locator('#approve').click();
  assert(!await page.locator('#approve').isEnabled(), 'Approval button stayed enabled');
  assert(await page.locator('#reset').isVisible(), 'Reset button stayed hidden');
  await page.locator('#reset').click();
  assert(await page.locator('#approve').isEnabled(), 'Reset did not restore approval');
  assert(!await page.locator('#reset').isVisible(), 'Reset button stayed visible');
  await page.getByRole('button', { name: 'Let’s talk', exact: true }).click();
  assert(await page.locator('#contact').isVisible(), 'Project brief did not open');
  await page.getByLabel('What process would you like to improve?').fill('Strict TypeScript smoke check');
  await page.getByRole('button', { name: 'Download project brief' }).click();
  assert((await page.locator('#brief-status').innerText()).includes('Nothing was sent.'), 'Brief did not download');
  await page.getByRole('button', { name: 'Close project brief' }).click();
  assert(!await page.locator('#contact').isVisible(), 'Project brief did not close');
  const motion = page.locator('#motion-toggle');
  if (await motion.isEnabled()) {
    const before = await motion.getAttribute('aria-pressed');
    await motion.click();
    assert(await motion.getAttribute('aria-pressed') !== before, 'Animation did not toggle');
    await motion.click();
  }
}
