import { CriteriaBuilder } from "./CriteriaBuilder.js";

export class FilterBuilder {
  constructor(criteriaBuilder, filterValues) {
    this.criteriaBuilder = new CriteriaBuilder();
    this.criteriaBuilder._filters = criteriaBuilder._filters;
    this.criteriaBuilder._offset = criteriaBuilder._offset;
    this.criteriaBuilder._order = criteriaBuilder._order;
    this.criteriaBuilder._limit = criteriaBuilder._limit;
    this.filterValues = filterValues;
  }

  optional() {
    this.filterValues.set("isOptional", true);
    this.criteriaBuilder._filters.push(this.filterValues);
    return this.criteriaBuilder;
  }

  obligatory() {
    this.filterValues.set("isOptional", false);
    this.criteriaBuilder._filters.push(this.filterValues);
    return this.criteriaBuilder;
  }
}
