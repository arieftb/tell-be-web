class User {
  constructor ({ id, name, email, avatar }) {
    if (!id || typeof id !== 'string' || id.length === 0) {
      throw new Error('USER.MISSING_REQUIRED_PROPERTIES');
    }

    if (!name || typeof name !== 'string' || name.length < 1 || name.length > 255) {
      throw new Error('USER.INVALID_NAME');
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('USER.INVALID_EMAIL');
    }

    if (!avatar || typeof avatar !== 'string' || !avatar.startsWith('http')) {
      throw new Error('USER.INVALID_AVATAR');
    }

    this.id = id;
    this.name = name;
    this.email = email;
    this.avatar = avatar;
  }
}

export default User;