"use strict";

if (process.env.NODE_ENV === "production") {
  module.exports = require("./dist/shopware-6-client.cjs.prod.js");
} else {
  module.exports = require("./dist/shopware-6-client.cjs.js");
}
