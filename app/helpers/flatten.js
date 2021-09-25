import { helper } from '@ember/component/helper';

export default helper(function eachVariant(positional /*, named*/) {
  let config = positional[0];

  let flattened = [];

  for (let [key, value] of Object.entries(config)) {
    if (typeof value === 'string') {
      flattened.push(key);
      continue;
    }

    let variants = [];
    for (let variant of Object.keys(value)) {
      variants.push(`${key}-${variant}`);
    }
    flattened.push({ name: key, variants });
  }

  return flattened;
});
