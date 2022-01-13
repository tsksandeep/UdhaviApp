import I18n from "react-native-i18n";
import en from "../config/language/en";
import ta from "../config/language/ta";

I18n.fallbacks = true; // If an English translation is not available in en.js, it will look inside hi.js
I18n.missingBehaviour = "guess"; // It will convert HOME_noteTitle to "HOME note title" if the value of HOME_noteTitle doesn't exist in any of the translation files.
I18n.defaultLocale = "en"; // If the current locale in device is not en or hi
I18n.locale = "en"; // If we do not want the framework to use the phone's locale by default

I18n.translations = {
  ta,
  en,
};

export const setLocale = (locale: string) => {
  I18n.locale = locale;
};

export const getCurrentLocale = () => I18n.locale; // It will be used to define intial language state in reducer.

export const translateHeaderText =
  (langKey: string) =>
  ({ screenProps }: { screenProps: any }) => {
    const title = I18n.translate(langKey, screenProps.language);
    return { title };
  };

export default I18n.translate.bind(I18n);
