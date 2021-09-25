import { helper } from '@ember/component/helper';

export default helper(function hasVariants(positional /*, named*/) {
  let data = positional[0];

  if (typeof data !== 'object') return false;

  return 'name' in data && 'variants' in data;
});
