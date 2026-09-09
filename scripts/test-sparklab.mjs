import { chromium } from 'playwright';
import path from 'path';

const artifactsDir = '/Users/govindavashishtha/.gemini/antigravity-ide/brain/b0f949ba-60a9-411f-9d52-8d02fce539ab';

async function runTest() {
  console.log('🚀 Starting Playwright SparkLab Verification...');
  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 850 },
    colorScheme: 'dark',
  });

  const page = await context.newPage();

  // 1. Landing Page
  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(artifactsDir, '01_landing_hero.png') });
  console.log('📸 Captured 01_landing_hero.png');

  // 2. Click "Build my idea"
  console.log('Clicking "Build my idea"...');
  await page.click('text=Build my idea');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(artifactsDir, '02_form_step1.png') });
  console.log('📸 Captured 02_form_step1.png');

  // Step 1: Select "Environment" and click Continue
  console.log('Selecting "Environment" & clicking Continue...');
  await page.click('button:has-text("Environment")');
  await page.waitForTimeout(300);
  await page.click('button:has-text("Continue")');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(artifactsDir, '03_form_step2.png') });
  console.log('📸 Captured 03_form_step2.png');

  // Step 2: Select "Investigate something"
  console.log('Selecting "Investigate something"...');
  await page.click('button:has-text("Investigate something")');
  await page.waitForTimeout(300);
  await page.click('button:has-text("Continue")');
  await page.waitForTimeout(600);

  // Step 3: Select "1–2 weeks"
  console.log('Selecting "1–2 weeks"...');
  await page.click('button:has-text("1–2 weeks")');
  await page.waitForTimeout(300);
  await page.click('button:has-text("Continue")');
  await page.waitForTimeout(600);

  // Step 4: Select "Phone" and "Laptop"
  console.log('Selecting Resources...');
  await page.click('button:has-text("Phone")');
  await page.waitForTimeout(200);
  await page.click('button:has-text("Laptop")');
  await page.waitForTimeout(300);
  await page.click('button:has-text("Continue")');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(artifactsDir, '04_form_step5.png') });
  console.log('📸 Captured 04_form_step5.png');

  // Step 5: Enter custom thought & Submit
  console.log('Entering custom thought...');
  await page.fill('textarea', 'Something related to plastic waste in school');
  await page.waitForTimeout(300);
  await page.click('button:has-text("Invent My Project")');
  console.log('Clicked Invent My Project!');

  // Capture Thinking State
  await page.waitForTimeout(3500);
  await page.screenshot({ path: path.join(artifactsDir, '05_thinking_state.png') });
  console.log('📸 Captured 05_thinking_state.png');

  // Wait for 7 stages (~7.7s) + 3-second reveal (~3s) -> Total ~11-12s
  console.log('Waiting for AI Thinking sequence and 3-second reveal...');
  await page.waitForTimeout(8000);
  await page.screenshot({ path: path.join(artifactsDir, '06_project_result.png') });
  console.log('📸 Captured 06_project_result.png');

  // Click on Blueprint Hotspot "01"
  console.log('Testing Blueprint Hotspot pin...');
  const pin01 = page.locator('button:has-text("01")').first();
  if (await pin01.isVisible()) {
    await pin01.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(artifactsDir, '07_blueprint_hotspot.png') });
    console.log('📸 Captured 07_blueprint_hotspot.png');
  }

  // Click "Make another idea" to test reverse transition
  console.log('Testing "Make another idea" reset...');
  await page.click('button:has-text("Make another idea")');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(artifactsDir, '08_reset_to_landing.png') });
  console.log('📸 Captured 08_reset_to_landing.png');

  // Test "Surprise me" mode
  console.log('Testing "Surprise me" random generation...');
  await page.click('text=Surprise me');
  await page.waitForTimeout(12000);
  await page.screenshot({ path: path.join(artifactsDir, '09_surprise_result.png') });
  console.log('📸 Captured 09_surprise_result.png');

  console.log('✅ All Playwright tests executed successfully!');
  await browser.close();
}

runTest().catch((err) => {
  console.error('❌ Playwright test failed:', err);
  process.exit(1);
});
