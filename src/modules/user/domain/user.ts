export default class User {
  id?: string;
  email!: string;
  name!: string;
  image: string | null = "";
}

class UserBuilder {
  private id?: string;
  private email?: string;
  private name?: string;
  private image: string | null = "";

  setId(id: string): UserBuilder {
    this.id = id;
    return this;
  }

  setEmail(email: string): UserBuilder {
    this.email = email;
    return this;
  }

  setName(name: string): UserBuilder {
    this.name = name;
    return this;
  }

  setImage(image: string | null): UserBuilder {
    this.image = image;
    return this;
  }

  build(): User {
    if (!this.email) {
      throw new Error("Email is required");
    }
    if (!this.name) {
      throw new Error("Name is required");
    }

    const user = new User();
    user.id = this.id;
    user.email = this.email;
    user.name = this.name;
    user.image = this.image ?? null;
    return user;
  }
}

export { UserBuilder };
