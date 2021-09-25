import { DEBUG } from '@glimmer/env';
import { action } from '@ember/object';
import Service from '@ember/service';

/**
 * @typedef {Record<string, unknown>} Theme
 *
 * @typedef {Object} Config
 * @property {Theme} theme
 *
 **/

export default class TailwindService extends Service {
  /**
   *
   * @type {Config}
   */
  config = {};

  classFor(theme, variant) {
    return `${THEME_CLASS_MAP[theme]}-${variant}`;
  }

  @action
  useConfig(config) {
    this.config = config;

    // Log messages if we have config options that aren't in the GROUPS
    this.verify();
  }

  @action
  async verify() {
    /**
     * This function is removed in production builds.
     * It is used to help with mismatches in keys, since there are many
     */
    if (DEBUG) {
      await Promise.resolve();

      let providedKeys = Object.keys(this.config.theme);
      let knownKeys = Object.values(GROUPS).flat();

      let unknownCount = 0;
      for (let themeName of providedKeys) {
        if (!knownKeys.includes(themeName)) {
          unknownCount++;
          console.debug(`Theme '${themeName}' is not in a GROUP`);
        }
      }
      if (unknownCount > 0) {
        console.warn(`${unknownCount} keys not yet available for preview`);
      }

      let extraCount = 0;
      for (let themeName of knownKeys) {
        if (!providedKeys.includes(themeName)) {
          extraCount++;
          console.debug(`Extra key in group config: ${themeName}`);
        }
      }

      if (extraCount > 0) {
        console.warn(`${extraCount} extra keys`);
      }
    }
  }
}

const THEME_CLASS_MAP = {
  fontFamily: 'font',
};

// Mimicing Tailwind Docs' site, so folks are familiar with navigation
const GROUPS = {
  color: ['colors'],
  layout: [],
  flexboxAndGrid: [
    'flex',
    'gap',
    'gridAutoColumns',
    'gridColumn',
    'gridColumnEnd',
    'gridColumnStart',
    'gridRow',
    'gridRowEnd',
    'gridRowStart',
    'gridTemplateColumns',
    'gridTemplateRows',
    'inset',
    'flexGrow',
    'flexShrink',
  ],
  spacing: ['padding', 'margin'],
  sizing: ['width', 'minWidth', 'maxWidth', 'height', 'minHeight', 'maxHeight'],
  typography: ['fontFamily', 'fontSize', 'fontWeight', 'textColor', 'textOpacity'],
  background: [
    'backgroundColor',
    'backgroundImage',
    'backgroundOpacity',
    'backgroundPosition',
    'backgroundSize',
  ],
  border: ['borderColor', 'borderOpacity', 'borderRadius', 'borderWidth'],
  effects: [],
  filters: [],
  tables: [],
  transitionsAndAnimation: [],
  transforms: [],
  interactivity: [],
  svg: [],
  accessibility: [],
};
