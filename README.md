# Linguee Client

[![build-and-run-tests](https://github.com/javierdwd/linguee-client/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/javierdwd/linguee-client/actions/workflows/build-and-test.yml)

Translate words using the Linguee online service.

## How it works

This library makes a background request to Linguee.com, parse the response and returns an object which contains a set of data.
It traverse the document (HTML response, there is not a JSON api available), hence the results may be affected by changes in the DOM of the service.

## Installation

`npm install linguee-client`

## Usage

_VanillaJS:_

```JS
const linguee = require("linguee-client");

linguee.translate("answer", "EN", "ES")
  .then(result => {
      console.log(result);
  })
  .catch(error => {
      console.log(error);
  });
```

_Typescript:_

```TS
import linguee from "linguee-client"

try {
  const translation = await linguee.translate("answer", "EN", "ES");

  console.log(translation); // Linguee translation object or void (term was not found).
} catch(err: Error) {
  console.log(error);
}
```

### The result depends on the word to be translated.

```JSON
{
  "from": "EN",
  "to": "ES",
  "queryTerm": "state",
  "spelling": null,
  "wiki": {
    "abstracts": [],
    "legal": ""
  },
  "words": [
    {
      "additionalInfo": {
        "plural": "states"
      },
      "audios": [
        {
          "url": "https://...",
          "version": "American English"
        },
        {
          "url": "https://...",
          "version": "British English"
        }
      ],
      "term": "state",
      "translations": [
        {
          "examples": [
            {
              "phrase": "The state of the economy has improved.",
              "translation": "La situación de la economía ha mejorado."
            }
          ],
          "term": "situación",
          "type": "noun, feminine"
        }
      ],
      "type": "noun",
      "uncommonTranslations": [
        {
          "examples": [],
          "term": "país",
          "type": "noun, masculine"
        },
        {
          "examples": [],
          "term": "condición",
          "type": "noun, feminine"
        },
        {
          "examples": [],
          "term": "nación",
          "type": "noun, feminine"
        }
      ]
    }
  ],
  "inexactWords": [
    {
      "additionalInfo": null,
      "audios": [
        {
          "url": "https://...",
          "version": "American English"
        },
        {
          "url": "https://...",
          "version": "British English"
        }
      ],
      "term": "steady state",
      "translations": [
        {
          "examples": [],
          "term": "situación estable",
          "type": "noun, feminine"
        },
        {
          "examples": [],
          "term": "régimen estable",
          "type": "noun, masculine"
        }
      ],
      "type": "n",
      "uncommonTranslations": []
    }
  ]
}
```

## Test

`npm run test`

### **_TODOs_**

- [x] Improve responses with the less common translations, and audio examples.
- [x] Allow to set the languages for translation.
- [x] Add test coverage.
- [ ] Add documentation pages.

## License

MIT

## Linguee

[Website](https://www.linguee.com/)

[Terms and Conditions](https://www.linguee.com/english-spanish/page/termsAndConditions.php)
