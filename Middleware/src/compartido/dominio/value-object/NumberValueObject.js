export class NumberValueObject {
  constructor(value) {
    this._value = value;
  }
  get value() {
    return this._value;
  }
  toString() {
    return this._value.toString();
  }
  equals(o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof NumberValueObject)) {
      return false;
    }
    return Object.is(this._value, o.value);
  }
}
