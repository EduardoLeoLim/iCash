import { Criteria } from "./Criteria.js";
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
    filterValues.set("value", value);

    this._filters.push(filterValues);

    return this;
  }

  notEqual(field, value) {
    let filterValues = new Map();
    filterValues.set("field", field);
    filterValues.set("operator", "!=");
    filterValues.set("value", value);

    this._filters.push(filterValues);

    return this;
  }

  greaterThan(field, value) {
    let filterValues = new Map();
    filterValues.set("field", field);
    filterValues.set("operator", ">");
    filterValues.set("value", value);

    this._filters.push(filterValues);

    return this;
  }

  lessThan(field, value) {
    let filterValues = new Map();
    filterValues.set("field", field);
    filterValues.set("operator", "<");
    filterValues.set("value", value);

    this._filters.push(filterValues);

    return this;
  }

  contains(field, value) {
    let filterValues = new Map();
    filterValues.set("field", field);
    filterValues.set("operator", "CONTAINS");
    filterValues.set("value", value);

    this._filters.push(filterValues);

    return this;
  }

  notContains(field, value) {
    let filterValues = new Map();
    filterValues.set("field", field);
    filterValues.set("operator", "NOT_CONTAINS");
    filterValues.set("value", value);

    this._filters.push(filterValues);

    return this;
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
    this._limit;

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
