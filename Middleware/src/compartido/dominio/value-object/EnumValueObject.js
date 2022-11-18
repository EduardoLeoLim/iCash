export class EnumValueObject {
  constructor(value, validValues) {
    this.validValues = validValues;
    this.value = value;
    this.checkValueIsValid(value);
  }
  checkValueIsValid(value) {
    if (!this.validValues.includes(value)) {
      this.throwErrorForInvalidValue(value);
    }
  }
}
