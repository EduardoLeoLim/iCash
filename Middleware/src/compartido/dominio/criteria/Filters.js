import { Filter } from "./Filter.js";

export class Filters {
  constructor(filters) {
    this.filters = filters;
  }
  static fromValues(filters) {
    return new Filters(filters.map(Filter.fromValues));
  }
  static none() {
    return new Filters([]);
  }
}
