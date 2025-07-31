export class Password {
  constructor (value) {
    if (!value) {
      throw new Error('Password is required');
    }

    if (value.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }

    this._value = value;
  }

  getValue () {
    return this._value;
  }
}