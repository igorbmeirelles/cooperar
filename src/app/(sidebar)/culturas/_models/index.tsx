import { ulid } from "ulid";

type TULId = string;

export interface IFarming {
  id: TULId;
  farming: string;
  pre_school: number;
  elementary_school: number;
  high_school: number;
  adults_and_elderly: number;
  manual: string;
}

export class Farming implements IFarming {
  id: TULId;
  farming: string;
  pre_school: number;
  elementary_school: number;
  high_school: number;
  adults_and_elderly: number;
  manual: string;

  constructor(
    farming: string,
    pre_school: number,
    elementary_school: number,
    high_school: number,
    adults_and_elderly: number,
    manual: string,
    id: TULId | undefined = undefined
  ) {
    this.id = id ?? ulid();
    this.farming = farming;
    this.pre_school = pre_school;
    this.elementary_school = elementary_school;
    this.high_school = high_school;
    this.adults_and_elderly = adults_and_elderly;
    this.manual = manual;
  }

  toString() {
    return this.farming;
  }

  static create(farming: IFarming | undefined) {
    if (!farming) return undefined;

    return new Farming(
      farming.farming,
      farming.pre_school,
      farming.elementary_school,
      farming.high_school,
      farming.adults_and_elderly,
      farming.manual,
      farming.id
    );
  }
}
