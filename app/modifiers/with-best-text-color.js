import { modifier } from 'ember-modifier';

// How do we handle "currentColor"?
export default modifier(function withBestTextColor(element) {
  let bgColor = window.getComputedStyle(element).backgroundColor;
  let textColor = getContrastYIQ(bgColor);

  element.style.color = textColor;
});

const RGBA = /rgba?\((?<red>\d+),\s?(?<green>\d+),\s?(?<blue>\d+)(,\s?(?<alpha>\d+))?\)/;
function getContrastYIQ(color) {
  let matches = color.match(RGBA);

  if (!matches) {
    return 'black';
  }

  let { red, green, blue, alpha } = matches.groups;

  if (alpha && parseFloat(alpha) < 50) {
    return 'black';
  }

  let r = parseFloat(red);
  let g = parseFloat(green);
  let b = parseFloat(blue);

  if (r === 255 && g === 255 && b === 255) {
    return 'black';
  }

  let yiq = (red * 299 + green * 587 + blue * 114) / 1000;

  return yiq >= 128 ? 'black' : 'white';
}
