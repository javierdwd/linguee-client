const fs = require("fs");
const iconv = require("iconv-lite");
const axios = require("axios");
const linguee = require("../lib/linguee");
util = require("util");

const term = "sial";
const saveRAW = true;
const saveJS = false;
const langFrom = "english";
const langTo = "spanish";

function writeRAW() {
  let url = `https://www.linguee.com/`;
  url += `${langFrom}-${langTo}/search/search`;
  url += `?source=auto&ajax=1&query=${term}`;

  axios
    .get(url, { responseType: "arraybuffer" })
    .then(response => {
      const data = iconv.decode(Buffer.from(response.data), "ISO-8859-15");

      fs.writeFile(
        `${__dirname}/examples/term-EN-ES-${term}.html`,
        data,
        { flag: "w" },
        err => {
          if (err) throw err;
          console.log("The HTML file has been saved. Term: " + term);
        }
      );
    })
    .catch(error => {
      reject(error);
    });
}

async function writeJS() {
  const data = await linguee.translate(term, "english", "spanish");

  fs.writeFile(
    `${__dirname}/examples/term-EN-ES-${term}.js`,
    `module.exports = ${util.inspect(data, {
      depth: null,
      compact: false
    })}`,
    { flag: "w" },
    err => {
      if (err) throw err;
      console.log("The JS file has been saved. Term: " + term);
    }
  );
}

if (term !== "") {
  if (saveRAW) {
    writeRAW();
  }
  if (saveJS) {
    writeJS();
  }
}
