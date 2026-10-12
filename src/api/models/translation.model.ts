export interface TranslationResponse {
  responseData: {
    translatedText: string;
    match: number; // Quality score / confidence (0-1)
  };
  quotaFinished?: boolean;
  mtMatches?: Array<{
    id: number;
    segment: string;
    translation: string;
    source: string;
    target: string;
    quality: string;
  }>;
  responseStatus: number;
  responseDetails?: string;
}

export interface TranslationParams {
  q: string; // Tekst za prevođenje
  langpair: string; // Primer: "en|de" ili "en|es"
  de?: string; // Validna email adresa za veći API rate limit
}

export interface LanguageDetectionResult {
  detectedLanguage: string;
  confidence: number;
}
