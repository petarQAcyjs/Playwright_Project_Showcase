import { Page, Locator, expect } from '@playwright/test';

export class WorkspacePage {
  readonly page: Page;
  readonly projectNameInput: Locator;
  readonly targetLanguageSelect: Locator;
  readonly createProjectButton: Locator;
  readonly sourceTextArea: Locator;
  readonly targetTextArea: Locator;
  readonly translateAiButton: Locator;
  readonly projectStatusBadge: Locator;
  readonly qualityScoreLabel: Locator;
  readonly errorBanner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.projectNameInput = page.getByTestId('st-project-name');
    this.targetLanguageSelect = page.getByTestId('st-target-language');
    this.createProjectButton = page.getByTestId('st-create-project-btn');
    this.sourceTextArea = page.getByTestId('st-source-text');
    this.targetTextArea = page.getByTestId('st-target-text');
    this.translateAiButton = page.getByTestId('st-translate-ai-btn');
    this.projectStatusBadge = page.getByTestId('st-project-status');
    this.qualityScoreLabel = page.getByTestId('st-quality-score');
    this.errorBanner = page.getByTestId('st-error-banner');
  }

  async navigateToWorkspace() {
    await this.page.goto('/');
  }

  async createProject(name: string, targetLang: 'de' | 'es' | 'ar') {
    await this.projectNameInput.fill(name);
    await this.targetLanguageSelect.selectOption(targetLang);
    await this.createProjectButton.click();
  }

  async triggerAiTranslation() {
    await this.translateAiButton.click();
  }

  async verifyTranslationCompleted(expectedText: string, expectedScore: string) {
    await expect(this.targetTextArea).toHaveValue(expectedText);
    await expect(this.qualityScoreLabel).toContainText(expectedScore);
    await expect(this.projectStatusBadge).toHaveText('Completed');
  }

  async verifyFallbackModeActive() {
    await expect(this.errorBanner).toBeVisible();
    await expect(this.projectStatusBadge).toHaveText('Fallback Mode');
  }
}
