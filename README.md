# Lingue Client

Translate words using the Linguee online service.

## How it works

This library makes a background request to Linguee.com, parse the response and returns an object which contains a set of data.
It traverse the document (HTML response, there is not a JSON api available), hence the results may be affected by changes in the DOM of the service.

## Installation

`npm install linguee-client`

## Usage

```
const linguee = require("linguee-client");

linguee.translate("answer")
  .then(result => {
      console.log(result);
  })
  .catch(error => {
      console.log(error);
  });
```

## Test

`npm run test:single`

### **_TODOs_**

- [x] Improve responses with the less common translations, and audio examples.
- [x] Allow to set the languages for translation.

## License

MIT

## Linguee

[Website](https://www.linguee.com/)

[Terms and Conditions](https://www.linguee.com/english-spanish/page/termsAndConditions.php)
