import { APIRequestContext, APIResponse, TestInfo } from '@playwright/test';
import { TranslationParams, TranslationResponse } from '../models/translation.model';

export class TranslationApiClient {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * Šalje zahtev za prevođenje i automatski kači payload u HTML report ako je prosleđen testInfo.
   */
  async translate(
    params: TranslationParams,
    testInfo?: TestInfo
  ): Promise<{ response: APIResponse; body: TranslationResponse }> {
    const searchParams = new URLSearchParams({
      q: params.q || '',
      langpair: params.langpair,
    });

    const response = await this.request.get(`/get?${searchParams.toString()}`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
    });

    const text = await response.text();
    let body: TranslationResponse;

    try {
      body = JSON.parse(text);
    } catch {
      body = {
        responseData: {
          translatedText: text,
          match: 0,
        },
        responseStatus: response.status(),
      };
    }

    // Automatsko kačenje u izveštaj unutar API klijenta
    if (testInfo) {
      await testInfo.attach(`API Response [${params.langpair}]`, {
        body: JSON.stringify(body, null, 2),
        contentType: 'application/json',
      });
    }

    return { response, body };
  }

  /**
   * Meri vreme odziva i opciono prilaže metrike u izveštaj.
   */
  async measureResponseTime(
    params: TranslationParams,
    testInfo?: TestInfo
  ): Promise<{ durationMs: number; status: number }> {
    const startTime = Date.now();
    const { response } = await this.translate(params, testInfo);
    const durationMs = Date.now() - startTime;

    if (testInfo) {
      await testInfo.attach('SLA Performance Metrics', {
        body: JSON.stringify({ durationMs, status: response.status() }, null, 2),
        contentType: 'application/json',
      });
    }

    return {
      durationMs,
      status: response.status(),
    };
  }
}
