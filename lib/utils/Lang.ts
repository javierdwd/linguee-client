export type LANG_CODE =
  | 'EN'
  | 'DE'
  | 'FR'
  | 'ES'
  | 'ZH'
  | 'RU'
  | 'JA'
  | 'PT'
  | 'IT'
  | 'NL'
  | 'PL'
  | 'SV'
  | 'DA'
  | 'FI'
  | 'EL'
  | 'CS'
  | 'RO'
  | 'HU'
  | 'SK'
  | 'BG'
  | 'SL'
  | 'LT'
  | 'LV'
  | 'ET'
  | 'MT';

export class UnrecognizedLangError extends Error {
  message: string = 'Unrecognized language';
}

export class Lang {
  private static langsDict: Record<LANG_CODE, string> = {
    EN: 'english',
    DE: 'german',
    FR: 'french',
    ES: 'spanish',
    ZH: 'chinese',
    RU: 'russian',
    JA: 'japanese',
    PT: 'portuguese',
    IT: 'italian',
    NL: 'dutch',
    PL: 'polish',
    SV: 'swedish',
    DA: 'danish',
    FI: 'finnish',
    EL: 'greek',
    CS: 'czech',
    RO: 'romanian',
    HU: 'hungarian',
    SK: 'slovak',
    BG: 'bulgarian',
    SL: 'slovene',
    LT: 'lithuanian',
    LV: 'latvian',
    ET: 'estonian',
    MT: 'maltese',
  };

  // prettier-ignore
  private static availableTranslations: Record<LANG_CODE, LANG_CODE[]> =  {
    EN: ["DE", "FR", "ES", "ZH", "RU", "JA", "PT", "IT", "NL", "PL", "SV", "DA", "FI", "EL", "CS", "RO", "HU", "SK", "BG", "SL", "LT", "LV", "ET", "MT"],
    DE: ["EN", "FR", "ES", "PT", "IT", "NL", "PL", "SV", "DA", "FI", "EL", "CS", "RO", "HU", "SK", "BG", "SL", "LT", "LV", "ET", "MT"],
    FR: ["EN", "DE", "ES", "PT", "IT", "NL", "PL", "SV", "DA", "FI", "EL", "CS", "RO", "HU", "SK", "BG", "SL", "LT", "LV", "ET", "MT"],
    ES: ["EN", "DE", "FR", "PT", "IT", "NL", "PL", "SV", "DA", "FI", "EL", "CS", "RO", "HU", "SK", "BG", "SL", "LT", "LV", "ET", "MT"],
    ZH: ["EN"],
    RU: ["EN"],
    JA: ["EN"],
    PT: ["EN", "DE", "FR", "ES", "IT", "NL", "PL", "SV", "DA", "FI", "EL", "CS", "RO", "HU", "SK", "BG", "SL", "LT", "LV", "ET", "MT"],
    IT: ["EN", "DE", "FR", "ES", "PT", "NL", "PL", "SV", "DA", "FI", "EL", "CS", "RO", "HU", "SK", "BG", "SL", "LT", "LV", "ET", "MT"],
    NL: ["EN", "DE", "FR", "ES", "PT", "IT", "PL", "SV", "DA", "FI", "EL", "CS", "RO", "HU", "SK", "BG", "SL", "LT", "LV", "ET", "MT"],
    PL: ["EN", "DE", "FR", "ES", "PT", "IT", "NL", "SV", "DA", "FI", "EL", "CS", "RO", "HU", "SK", "BG", "SL", "LT", "LV", "ET", "MT"],
    SV: ["EN", "DE", "FR", "ES", "PT", "IT", "NL", "PL", "DA", "FI", "EL", "CS", "RO", "HU", "SK", "BG", "SL", "LT", "LV", "ET", "MT"],
    DA: ["EN", "DE", "FR", "ES", "PT", "IT", "NL", "PL", "SV", "FI", "EL", "CS", "RO", "HU", "SK", "BG", "SL", "LT", "LV", "ET", "MT"],
    FI: ["EN", "DE", "FR", "ES", "PT", "IT", "NL", "PL", "SV", "DA", "EL", "CS", "RO", "HU", "SK", "BG", "SL", "LT", "LV", "ET", "MT"],
    EL: ["EN", "DE", "FR", "ES", "PT", "IT", "NL", "PL", "SV", "DA", "FI", "CS", "RO", "HU", "SK", "BG", "SL", "LT", "LV", "ET", "MT"],
    CS: ["EN", "DE", "FR", "ES", "PT", "IT", "NL", "PL", "SV", "DA", "FI", "EL", "RO", "HU", "SK", "BG", "SL", "LT", "LV", "ET", "MT"],
    RO: ["EN", "DE", "FR", "ES", "PT", "IT", "NL", "PL", "SV", "DA", "FI", "EL", "CS", "HU", "SK", "BG", "SL", "LT", "LV", "ET", "MT"],
    HU: ["EN", "DE", "FR", "ES", "PT", "IT", "NL", "PL", "SV", "DA", "FI", "EL", "CS", "RO", "SK", "BG", "SL", "LT", "LV", "ET", "MT"],
    SK: ["EN", "DE", "FR", "ES", "PT", "IT", "NL", "PL", "SV", "DA", "FI", "EL", "CS", "RO", "HU", "BG", "SL", "LT", "LV", "ET", "MT"],
    BG: ["EN", "DE", "FR", "ES", "PT", "IT", "NL", "PL", "SV", "DA", "FI", "EL", "CS", "RO", "HU", "SK", "SL", "LT", "LV", "ET", "MT"],
    SL: ["EN", "DE", "FR", "ES", "PT", "IT", "NL", "PL", "SV", "DA", "FI", "EL", "CS", "RO", "HU", "SK", "BG", "LT", "LV", "ET", "MT"],
    LT: ["EN", "DE", "FR", "ES", "PT", "IT", "NL", "PL", "SV", "DA", "FI", "EL", "CS", "RO", "HU", "SK", "BG", "SL", "LV", "ET", "MT"],
    LV: ["EN", "DE", "FR", "ES", "PT", "IT", "NL", "PL", "SV", "DA", "FI", "EL", "CS", "RO", "HU", "SK", "BG", "SL", "LT", "ET", "MT"],
    ET: ["EN", "DE", "FR", "ES", "PT", "IT", "NL", "PL", "SV", "DA", "FI", "EL", "CS", "RO", "HU", "SK", "BG", "SL", "LT", "LV", "MT"],
    MT: ["EN", "DE", "FR", "ES", "PT", "IT", "NL", "PL", "SV", "DA", "FI", "EL", "CS", "RO", "HU", "SK", "BG", "SL", "LT", "LV", "ET"],
  }

  static isLangCode(lang: LANG_CODE | string): lang is LANG_CODE {
    return Object.prototype.hasOwnProperty.call(Lang.langsDict, lang);
  }

  private static normalizeLangCode(lang: string): LANG_CODE | false {
    const normLangCode = lang.toUpperCase();

    if (Lang.isLangCode(normLangCode)) {
      return normLangCode;
    } else {
      const normLangName = lang.toLowerCase();
      const langEntries = Object.entries(Lang.langsDict) as [
        LANG_CODE,
        string
      ][];
      const langIndex = langEntries.findIndex(
        ([_, langName]) => normLangName === langName
      );

      if (langIndex === -1) {
        return false;
      }

      return langEntries[langIndex][0];
    }
  }

  static available(rootLang?: string): LANG_CODE[] {
    if (!rootLang) {
      return Object.keys(Lang.availableTranslations) as LANG_CODE[];
    }

    const lang = Lang.normalizeLangCode(rootLang);

    if (!lang) {
      throw new UnrecognizedLangError();
    }

    return Lang.availableTranslations[lang];
  }

  static get(langCode: string) {
    const normLangCode = Lang.normalizeLangCode(langCode);

    if (!normLangCode || !Lang.isLangCode(normLangCode)) {
      return null;
    }

    return {
      code: normLangCode,
      name: Lang.langsDict[normLangCode],
    };
  }
}

export default Lang;
