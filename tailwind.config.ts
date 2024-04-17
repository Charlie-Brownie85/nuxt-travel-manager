import type { Config } from 'tailwindcss';

import preset from './tailwind-preset';

export default <Partial<Config>>{
  mode: 'jit',
  presets: [
    preset,
  ],
  content: [
    './src/**/*.{html,vue,js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#EFF3F3',
        },
        logo: '#8AA0A0',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function initial({ addVariant }: { addVariant: any }) {
      addVariant('initial', 'html :where(&)');
    },
  ],
};
