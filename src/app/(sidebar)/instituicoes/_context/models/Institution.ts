export interface IInstitution {
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
}

export class Institution implements IInstitution {
  name: string;
  email: string;
  phone: string;
  isActive: boolean;

  constructor(name: string, email: string, phone: string, isActive: boolean) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.isActive = isActive;
  }

  toString() {
    return this.name;
  }

  static create(institution: IInstitution | undefined) {
    if (!institution) return undefined;

    return new Institution(
      institution.name,
      institution.email,
      institution.phone,
      institution.isActive ?? true
    );
  }
}
