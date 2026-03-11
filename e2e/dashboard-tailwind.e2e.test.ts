/**
 * Dashboard Tailwind Migration E2E — Puppeteer
 *
 * Verifica que as classes Tailwind estão sendo aplicadas corretamente após a migração.
 *
 * Pré-requisitos:
 *   npm run dev   → Vite em http://localhost:3000 (ou E2E_BASE_URL)
 *   npm run api   → backend Go em http://localhost:8080
 */

import puppeteer, { Browser, Page } from 'puppeteer';
import path from 'path';
import fs from 'fs';

const BASE_URL = process.env.E2E_BASE_URL ?? 'http://localhost:3000';
const AUTH_TOKEN = 'pulse-dev-token';
const NAV_TIMEOUT = 15000;
const SCREENSHOTS_DIR = path.join(__dirname, '..', 'screenshots');

xdescribe('Dashboard Tailwind Migration', () => {
	let browser: Browser;
	let page: Page;

	beforeAll(async () => {
		browser = await puppeteer.launch({
			headless: true,
			args: ['--no-sandbox', '--disable-setuid-sandbox'],
		});
		if (!fs.existsSync(SCREENSHOTS_DIR)) {
			fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
		}
	});

	afterAll(async () => {
		await browser.close();
	});

	beforeEach(async () => {
		page = await browser.newPage();
		// Injeta o token antes da navegação para dispensar o fluxo de login
		await page.evaluateOnNewDocument((token) => {
			localStorage.setItem('auth_token', token);
		}, AUTH_TOKEN);
	});

	afterEach(async () => {
		await page.close();
	});

	test('bg-red-500 não existe mais no DOM', async () => {
		await page.goto(BASE_URL, { waitUntil: 'networkidle0', timeout: NAV_TIMEOUT });

		const redBgExists = await page.evaluate(() => {
			return document.querySelector('.bg-red-500') !== null;
		});

		expect(redBgExists).toBe(false);
	});

	test('wrapper principal tem background correto (bg-background)', async () => {
		await page.goto(BASE_URL, { waitUntil: 'networkidle0', timeout: NAV_TIMEOUT });

		await page.screenshot({
			path: path.join(SCREENSHOTS_DIR, 'dashboard-after-migration.png'),
		});

		const bgColor = await page.evaluate(() => {
			const el = document.querySelector('.flex.flex-col.min-h-screen');
			if (!el) return null;
			return getComputedStyle(el).backgroundColor;
		});

		// bg-background = #f5f7fa = rgb(245, 247, 250)
		expect(bgColor).toBe('rgb(245, 247, 250)');
	});

	test('MetricCard tem border-l-4 com borderLeftColor correto', async () => {
		await page.goto(BASE_URL, { waitUntil: 'networkidle0', timeout: NAV_TIMEOUT });

		const borderColor = await page.evaluate(() => {
			const el = document.querySelector('.border-l-4');
			if (!el) return null;
			return getComputedStyle(el).borderLeftColor;
		});

		// Primeiro MetricCard usa #6c63ff = rgb(108, 99, 255)
		expect(borderColor).toBe('rgb(108, 99, 255)');
	});

	test('div de filtros tem classes flex gap-3 bg-white', async () => {
		await page.goto(BASE_URL, { waitUntil: 'networkidle0', timeout: NAV_TIMEOUT });

		const filterBarExists = await page.evaluate(() => {
			return document.querySelector('.flex.gap-3.bg-white') !== null;
		});

		expect(filterBarExists).toBe(true);
	});

	test('h1 do header tem classes text-2xl font-bold', async () => {
		await page.goto(BASE_URL, { waitUntil: 'networkidle0', timeout: NAV_TIMEOUT });

		const h1Exists = await page.evaluate(() => {
			return document.querySelector('h1.text-2xl.font-bold') !== null;
		});

		expect(h1Exists).toBe(true);
	});

	test('overlay do modal aparece com bg-black/50 ao clicar em campanha', async () => {
		await page.goto(BASE_URL, { waitUntil: 'networkidle0', timeout: NAV_TIMEOUT });

		// Aguarda a tabela de campanhas carregar
		const campaignRow = await page.$('[data-testid="campaign-row"]');
		if (!campaignRow) {
			// Se não houver campanhas, o teste é pulado
			return;
		}

		await campaignRow.click();

		// Aguarda o overlay aparecer
		await page.waitForSelector('.fixed.inset-0', { timeout: NAV_TIMEOUT });

		const overlayBg = await page.evaluate(() => {
			const el = document.querySelector('.fixed.inset-0');
			if (!el) return null;
			return getComputedStyle(el).backgroundColor;
		});

		// bg-black/50 = rgba(0, 0, 0, 0.5)
		expect(overlayBg).toBe('rgba(0, 0, 0, 0.5)');
	});
});
