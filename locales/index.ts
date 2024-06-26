import {
  en as $vuetifyEn,
  es as $vuetifyEs,
  it as $vuetifyIt,
} from 'vuetify/locale';

import enUS from './en-US.json';
import esSP from './es-SP.json';
import itIt from './it-IT.json';

type Locale = Record<string, string | object>;

const projectLocales: Record<string, Locale> = {
  en: { ...enUS, $vuetify: { ...$vuetifyEn } },
  es: { ...esSP, $vuetify: { ...$vuetifyEs } },
  it: { ...itIt, $vuetify: { ...$vuetifyIt } },
};

export default projectLocales;
