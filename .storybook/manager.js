import { themes } from '@storybook/theming';
import { addons } from '@storybook/addons';

addons.setConfig({
  theme: {
    ...themes.dark,
    brandImage: './icon.svg',
    brandTitle: 'Ricardo Marinho Components',
    brandUrl: 'https://ricardomarinho.com',
  },
});
