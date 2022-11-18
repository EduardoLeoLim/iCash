import { InvalidArgumentError } from "../value-object/InvalidArgumentError.js";
import { FilterField } from "./FilterField.js";
import { FilterOperator } from "./FilterOperator.js";
import { FilterValue } from "./FilterValue.js";

export class Filter {
  constructor(field, operator, value) {
    this.field = field;
    this.operator = operator;
    this.value = value;
  }
  static fromValues(values) {
    const field = values.get("field");
    const operator = values.get("operator");
    const value = values.get("value");
    if (!field || !operator || !value) {
      throw new InvalidArgumentError("El filtro es inválido");
    }
    return new Filter(
      new FilterField(field),
      FilterOperator.fromValue(operator),
      new FilterValue(value)
    );
  }
}
