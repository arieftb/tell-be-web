export class Email {
  constructor(value) {
    if (!value) {
      throw new Error('Email is required');
    }

    const trimmed = value.trim();

    if (trimmed.length === 0) {
      throw new Error('Email cannot be empty');
    }

    if (trimmed.length > 255) {
      throw new Error('Email cannot be longer than 255 characters');
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(trimmed)) {
      throw new Error('Email is invalid');
    }

    this._value = value;
  }

  getValue() {
    return this._value;
  }
}
