import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service tailwind;

  async model() {
    let response = await fetch('/tailwind-config.json');
    let json = await response.json();

    this.tailwind.useConfig(json);
  }
}
