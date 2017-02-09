const {DEFAULT_LOCALE} = require("common/constants");
const INITIAL_STATE = {locale: DEFAULT_LOCALE, strings: {}, direction: "ltr"};
const getLocalizedStrings = require("common/getLocalizedStrings");

function Intl(prevState = INITIAL_STATE, action) {
  switch (action.type) {
    case "LOCALE_UPDATED":
      if (!action.data) {
        return prevState;
      }
      return Object.assign({}, prevState, {
        locale: action.data.locale,
        strings: getLocalizedStrings(action.data.locale),
        direction: action.data.direction
      });
    default:
      return prevState;
  }
}

Intl.INITIAL_STATE = INITIAL_STATE;

module.exports = Intl;