import { test, expect } from '../../src/fixtures/test.fixture';

test.describe('Smartdog AI Workspace - E2E & Mocking Tests', () => {

  test('E2E-01: Should successfully process translation using mock AI Engine', async ({ workspacePage, page }) => {
    // Presretanje mrežnog poziva za uspesan AI prevod
    await page.route('**/api/ai-translate*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          translatedText: 'Smartdog bietet KI-native Workflows für globale Enterprise-Teams.',
          accuracy: 98,
        }),
      });
    });

    await workspacePage.createProject('Enterprise Android Localization', 'de');
    await workspacePage.triggerAiTranslation();

    await workspacePage.verifyTranslationCompleted(
      'Smartdog bietet KI-native Workflows für globale Enterprise-Teams.',
      'AI Accuracy: 98%'
    );
  });

  test('E2E-02: Should handle AI Engine failure gracefully with Fallback Mode', async ({ workspacePage, page }) => {
    // Presretanje mrežnog poziva i simulacija greške servera (500)
    await page.route('**/api/ai-translate*', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'AI Translation Service Unavailable' }),
      });
    });

    await workspacePage.createProject('Web Portal Spanish', 'es');
    await workspacePage.triggerAiTranslation();

    await workspacePage.verifyFallbackModeActive();
  });

  test('E2E-03: Should apply RTL styling for Arabic target language', async ({ workspacePage, page }) => {
    await page.route('**/api/ai-translate*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          translatedText: 'يوفر Smartdog مسارات عمل قائمة على الذكاء الاصطناعي.',
          accuracy: 95,
        }),
      });
    });

    await workspacePage.createProject('Arabic UI Expansion', 'ar');
    await workspacePage.triggerAiTranslation();

    await expect(workspacePage.targetTextArea).toHaveClass(/rtl/);
  });
});
