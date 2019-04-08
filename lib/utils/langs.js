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
