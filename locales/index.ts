import {
  en as $vuetifyEn,
  es as $vuetifyEs,
} from 'vuetify/locale';

import enUS from './en-US.json';
import esSP from './es-SP.json';

type Locale = Record<string, string | object>;

const projectLocales: Record<string, Locale> = {
  en: { ...enUS, $vuetify: { ...$vuetifyEn } },
  es: { ...esSP, $vuetify: { ...$vuetifyEs } },
};

export default projectLocales;
