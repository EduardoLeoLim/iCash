import { InvalidArgumentError } from "../value-object/InvalidArgumentError.js";
import { FilterField } from "./FilterField.js";
import { FilterOperator } from "./FilterOperator.js";
import { FilterValue } from "./FilterValue.js";

export class Filter {
  constructor(field, operator, value, isOptional) {
    this.field = field;
    this.operator = operator;
    this.value = value;
    if (isOptional) this.isOptional = isOptional;
    else this.isOptional = false;
  }
  static fromValues(values) {
    const field = values.get("field");
    const operator = values.get("operator");
    const value = values.get("value");
    const isOptional = values.get("isOptional");
    if (!field || !operator || !value) {
      throw new InvalidArgumentError("El filtro es inválido");
    }
    return new Filter(
      new FilterField(field),
      FilterOperator.fromValue(operator),
      new FilterValue(value),
      isOptional
    );
  }
}
