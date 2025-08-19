export class Password {
  constructor (value) {
    if (!value) {
      throw new Error('Password is required');
    }

    if (value.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    this._value = value;
  }

  getValue () {
    return this._value;
  }
}