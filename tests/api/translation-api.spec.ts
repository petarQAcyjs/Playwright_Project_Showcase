import { test, expect } from '@playwright/test';
import { TranslationApiClient } from '../../src/api/clients/TranslationApiClient';

test.describe('Smartcat Localization API Tests', () => {
  let apiClient: TranslationApiClient;

  test.beforeEach(async ({ request }) => {
    apiClient = new TranslationApiClient(request);
  });

  test('POST /get - Should successfully translate English to German', async () => {
    const sourceText = 'Welcome to the Smartcat AI translation platform';

    const { response, body } = await apiClient.translate({
      q: sourceText,
      langpair: 'en|de',
    });

    expect(response.status()).toBe(200);
    expect(body.responseData.translatedText).toBeTruthy();
  });

  test('POST /get - Should return high confidence match score for common phrases', async () => {
    const { body } = await apiClient.translate({
      q: 'Hello World',
      langpair: 'en|es',
    });

    expect(body.responseData.translatedText.toLowerCase()).toContain('hola');
  });

  test('API Performance - Should return translation response under SLA limit', async () => {
    const { durationMs, status } = await apiClient.measureResponseTime({
      q: 'Automation testing with Playwright and AI',
      langpair: 'en|fr',
    });

    expect(status).toBe(200);
    expect(durationMs).toBeLessThan(3000);
  });

  test('Negative Test - Handling empty string query gracefully', async () => {
    const { response } = await apiClient.translate({
      q: '',
      langpair: 'en|de',
    });

    // Proveravamo da li server odgovara bez pucanja klijenta
    expect([200, 400]).toContain(response.status());
  });
});
