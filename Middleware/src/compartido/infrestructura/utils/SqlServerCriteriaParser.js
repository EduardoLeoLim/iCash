import { Criteria } from "../../dominio/criteria/Criteria.js";
import { Operator } from "../../dominio/criteria/FilterOperator.js";
import { InvalidArgumentError } from "../../dominio/value-object/InvalidArgumentError.js";

export class SqlServerCriteriaParser {
  constructor(fields, source, criteria) {
    this._fields = fields;
    this._source = source;
    this._criteria = criteria;

    if (
      !this._source instanceof String ||
      !this._criteria instanceof Criteria ||
      !this._fields instanceof Array
    )
      throw new InvalidArgumentError("SqlParser: Recursos inválidos.");

    if (this._source.length == 0)
      throw new InvalidArgumentError("SqlParser: Recursos inválidos.");
  }

  parse() {
    let consulta = this.#createQuery();
    let parameters = this.#creteParams();

    return { consulta, parameters };
  }

  #createQuery() {
    let consulta = "";
    consulta += `SELECT ${
      this._fields.length > 0 ? this._fields.join(", ") + " " : "* "
    }`;
    consulta += `FROM ${this._source}`;

    if (this._criteria.hasFilters()) {
      consulta += ` WHERE ${this.#createConditions()}`;
    }

    consulta += ";";

    return consulta;
  }

  #createConditions() {
    let conditions = "";
    let filters = this._criteria.filters.filters;
    let numParamenter = 1;
    filters.forEach((filter) => {
      let field = filter.field.value;
      let param = "param" + numParamenter;
      let operator = `${this.#createOperator(filter.operator.value)}`;

      conditions += `${field} ${operator} @${param} `;

      numParamenter++;
    });

    return conditions;
  }

  #createOperator(value) {
    switch (value) {
      case Operator.EQUAL:
        return "=";
      case Operator.NOT_EQUAL:
        return "!=";
      case Operator.GT:
        return ">";
      case Operator.LT:
        return "<";
      case Operator.CONTAINS:
        return "LIKE";
      case Operator.NOT_CONTAINS:
        return "NOT LIKE";
    }
  }

  #creteParams() {
    let filters = this._criteria.filters.filters;
    let numParamenter = 1;
    let params = [];

    filters.forEach((filter) => {
      let value = filter.value.value;
      let param = "param" + numParamenter;
      if (
        filter.operator.value === Operator.CONTAINS ||
        filter.operator.value === Operator.NOT_CONTAINS
      ) {
        value = `%${value}%`;
      }

      let parameter = new Map();
      parameter.set("param", param);
      parameter.set("value", value);

      params.push(parameter);
    });
    return params;
  }
}
