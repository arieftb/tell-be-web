export class Name {
  constructor (value) {
    if (!value) {
      throw new Error('Name is required');
    }

    const trimmed = value.trim();

    if (trimmed.length === 0) {
      throw new Error('Name cannot be empty');
    }

    if (trimmed.length > 255) {
      throw new Error('Name cannot be longer than 255 characters');
    }

    this._name = trimmed;
  }

  getValue () {
    return this._name;
  }
}