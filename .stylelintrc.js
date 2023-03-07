const propertyOrder = require('stylelint-config-clean-order');

// Overwrite empty line threshold
propertyOrder.rules['order/properties-order'][1].unspecified = 'bottom';
propertyOrder.rules['order/properties-order'][1].emptyLineMinimumPropertyThreshold = 25;

module.exports = {
  defaultSeverity: 'warning',
  reportDescriptionlessDisables: true,
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-declaration-block-no-ignored-properties', 'stylelint-order'],
  rules: {
    ...propertyOrder.rules,
    'no-descending-specificity': null,
    'plugin/declaration-block-no-ignored-properties': true,
    'custom-property-empty-line-before': 'never',
    'comment-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment', 'stylelint-commands'],
      },
    ],
  },
};
