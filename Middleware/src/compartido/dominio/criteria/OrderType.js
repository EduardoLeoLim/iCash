import { EnumValueObject } from "../value-object/EnumValueObject.js";
import { InvalidArgumentError } from "../value-object/InvalidArgumentError.js";

export const OrderTypes = {
  ASC: "asc",
  DESC: "desc",
  NONE: "none",
};

export class OrderType extends EnumValueObject {
  constructor(value) {
    super(value, Object.values(OrderTypes));
  }
  static fromValue(value) {
    switch (value) {
      case OrderTypes.ASC:
        return new OrderType(OrderTypes.ASC);
      case OrderTypes.DESC:
        return new OrderType(OrderTypes.DESC);
      default:
        throw new InvalidArgumentError(`The order type ${value} is invalid`);
    }
  }
  isNone() {
    return this.value === OrderTypes.NONE;
  }
  isAsc() {
    return this.value === OrderTypes.ASC;
  }
  throwErrorForInvalidValue(value) {
    throw new InvalidArgumentError(`The order type ${value} is invalid`);
  }
}
