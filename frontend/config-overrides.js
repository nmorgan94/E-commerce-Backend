const {addDecoratorsLegacy, override, addBabelPlugin} = require('customize-cra');

module.exports = override(
    addDecoratorsLegacy(),
    addBabelPlugin("babel-plugin-styled-components")
);