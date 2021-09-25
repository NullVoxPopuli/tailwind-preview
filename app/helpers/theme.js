import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default class Theme extends Helper {
  @service tailwind;

  compute() {
    return this.tailwind.config.theme;
  }
}
