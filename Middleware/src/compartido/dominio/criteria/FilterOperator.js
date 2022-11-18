import { EnumValueObject } from "../value-object/EnumValueObject.js";
import { InvalidArgumentError } from "../value-object/InvalidArgumentError.js";

export const Operator = {
  EQUAL: "=",
  NOT_EQUAL: "!=",
  GT: ">",
  LT: "<",
  CONTAINS: "CONTAINS",
  NOT_CONTAINS: "NOT_CONTAINS",
};

export class FilterOperator extends EnumValueObject {
  constructor(value) {
    super(value, Object.values(Operator));
  }
  static fromValue(value) {
    switch (value) {
      case Operator.EQUAL:
        return new FilterOperator(Operator.EQUAL);
      case Operator.NOT_EQUAL:
        return new FilterOperator(Operator.NOT_EQUAL);
      case Operator.GT:
        return new FilterOperator(Operator.GT);
      case Operator.LT:
        return new FilterOperator(Operator.LT);
      case Operator.CONTAINS:
        return new FilterOperator(Operator.CONTAINS);
      case Operator.NOT_CONTAINS:
        return new FilterOperator(Operator.NOT_CONTAINS);
      default:
        throw new InvalidArgumentError(
          `The filter operator ${value} is invalid`
        );
    }
  }
  isPositive() {
    return (
      this.value !== Operator.NOT_EQUAL && this.value !== Operator.NOT_CONTAINS
    );
  }
  throwErrorForInvalidValue(value) {
    throw new InvalidArgumentError(`The filter operator ${value} is invalid`);
  }
  static equal() {
    return this.fromValue(Operator.EQUAL);
  }
}
