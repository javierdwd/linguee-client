function normalizeLangCode(lang) {
  if (lang.length === 2) {
    lang = lang.toUpperCase();

    return lang in this._list ? lang : null;
  } else {
    lang = lang.toLowerCase();

    for (let code in this._list) {
      if (this._list[code] === lang) {
        return code;
      }
    }
  }

  return null;
}

const langs = {
  _codes: [],
  _list: {
    EN: "english",
    DE: "german",
    FR: "french",
    ES: "spanish",
    ZH: "chinese",
    RU: "russian",
    JA: "japanese",
    PT: "portuguese",
    IT: "italian",
    NL: "dutch",
    PL: "polish",
    SV: "swedish",
    DA: "danish",
    FI: "finnish",
    EL: "greek",
    CS: "czech",
    RO: "romanian",
    HU: "hungarian",
    SK: "slovak",
    BG: "bulgarian",
    SL: "slovene",
    LT: "lithuanian",
    LV: "latvian",
    ET: "estonian",
    MT: "maltese"
  },
  // prettier-ignore
  _availableTranslations: {
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
  },
  available(lang = "") {
    code = normalizeLangCode.call(this, lang);

    if (!code) {
      return false;
    }

    return this._availableTranslations[code];
  },
  list() {
    return this._list;
  },
  codes() {
    if (this._codes.length) {
      return this._codes;
    }
    this._codes = Object.keys(this._list);

    return this._codes;
  },
  get(lang = "") {
    code = normalizeLangCode.call(this, lang);

    if (!code) {
      return null;
    }

    for (let langCode in this._list) {
      if (langCode === code) {
        return {
          code,
          name: this._list[code]
        };
      }
    }
  }
};

module.exports = langs;
