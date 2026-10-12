import { test as base, expect as baseExpect } from '@playwright/test';
import { WorkspacePage } from '../pages/WorkspacePage';

type CustomFixtures = {
  workspacePage: WorkspacePage;
};

export const test = base.extend<CustomFixtures>({
  workspacePage: async ({ page }, use) => {
    const workspacePage = new WorkspacePage(page);
    await workspacePage.navigateToWorkspace();
    await use(workspacePage);
  },
});

export const expect = baseExpect;
