export class Criteria {
  constructor(filters, order, limit, offset) {
    this.filters = filters;
    this.order = order;
    this.limit = limit;
    this.offset = offset;
  }
  hasFilters() {
    return this.filters.filters.length > 0;
  }
}
