export interface IInstitution {
  name: string;
  email: string;
  phone: string;
}

export class Institution implements IInstitution {
  name: string;
  email: string;
  phone: string;

  constructor(name: string, email: string, phone: string) {
    this.name = name;
    this.email = email;
    this.phone = phone;
  }

  toString() {
    return this.name;
  }

  static create(institution: IInstitution | undefined) {
    if (!institution) return undefined;

    return new Institution(
      institution.name,
      institution.email,
      institution.phone
    );
  }
}
