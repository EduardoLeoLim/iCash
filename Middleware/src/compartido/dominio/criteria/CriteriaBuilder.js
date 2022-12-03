import { Criteria } from "./Criteria.js";
import { FilterBuilder } from "./FilterBuilder.js";
import { Filters } from "./Filters.js";
import { Order } from "./Order.js";

export class CriteriaBuilder {
  constructor() {
    this._filters = [];
    this._order = Order.none();
  }

  equal(field, value) {
    let filterValues = new Map();
    filterValues.set("field", field);
    filterValues.set("operator", "=");
    filterValues.set("value", value.toString());

    return new FilterBuilder(this, filterValues);
  }

  notEqual(field, value) {
    let filterValues = new Map();
    filterValues.set("field", field);
    filterValues.set("operator", "!=");
    filterValues.set("value", value.toString());

    return new FilterBuilder(this, filterValues);
  }

  greaterThan(field, value) {
    let filterValues = new Map();
    filterValues.set("field", field);
    filterValues.set("operator", ">");
    filterValues.set("value", value.toString());

    return new FilterBuilder(this, filterValues);
  }

  lessThan(field, value) {
    let filterValues = new Map();
    filterValues.set("field", field);
    filterValues.set("operator", "<");
    filterValues.set("value", value.toString());

    return new FilterBuilder(this, filterValues);
  }

  contains(field, value) {
    let filterValues = new Map();
    filterValues.set("field", field);
    filterValues.set("operator", "CONTAINS");
    filterValues.set("value", value.toString());

    return new FilterBuilder(this, filterValues);
  }

  notContains(field, value) {
    let filterValues = new Map();
    filterValues.set("field", field);
    filterValues.set("operator", "NOT_CONTAINS");
    filterValues.set("value", value.toString());

    return new FilterBuilder(this, filterValues);
  }

  orderAsc(field) {
    this._order = Order.asc(field);

    return this;
  }

  orderDesc(field) {
    this._order = Order.desc(field);

    return this;
  }

  limit(limit) {
    this._limit = limit;

    return this;
  }

  offset(offset) {
    this._offset = offset;

    return this;
  }

  build() {
    return new Criteria(
      Filters.fromValues(this._filters),
      this._order,
      this._limit,
      this._offset
    );
  }
}
