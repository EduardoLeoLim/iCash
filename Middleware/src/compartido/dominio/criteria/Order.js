import { OrderBy } from "./OrderBy.js";
import { OrderType, OrderTypes } from "./OrderType.js";

export class Order {
  constructor(orderBy, orderType) {
    this.orderBy = orderBy;
    this.orderType = orderType;
  }
  static fromValues(orderBy, orderType) {
    if (!orderBy) {
      return Order.none();
    }
    return new Order(
      new OrderBy(orderBy),
      OrderType.fromValue(orderType || OrderTypes.ASC)
    );
  }
  static none() {
    return new Order(new OrderBy(""), new OrderType(OrderTypes.NONE));
  }
  static desc(orderBy) {
    return new Order(new OrderBy(orderBy), new OrderType(OrderTypes.DESC));
  }
  static asc(orderBy) {
    return new Order(new OrderBy(orderBy), new OrderType(OrderTypes.ASC));
  }
  hasOrder() {
    return !this.orderType.isNone();
  }
}
