export interface IAgeGroup {
  name: string;
  ageGroup: string;
  key: TAgeGroupKey;
}

export class AgeGroup implements IAgeGroup {
  name: string;
  ageGroup: string;
  key: TAgeGroupKey;
  constructor(name: string, ageGroup: string, key: TAgeGroupKey) {
    this.name = name;
    this.ageGroup = ageGroup;
    this.key = key;
  }

  toString() {
    return `${this.name} (${this.ageGroup})`;
  }

  static create(ageGroup: IAgeGroup | undefined) {
    if (!ageGroup) return undefined;

    return new AgeGroup(ageGroup.name, ageGroup.ageGroup, ageGroup.key);
  }
}

export type TAgeGroupKey =
  | "pre_school"
  | "elementary_school"
  | "high_school"
  | "adults_and_elderly";

type TAgeGroup = {
  [key in TAgeGroupKey]: IAgeGroup;
};
export const ageGroup: TAgeGroup = Object.freeze({
  pre_school: new AgeGroup("Pré-Escola", "4-5", "pre_school"),
  elementary_school: new AgeGroup(
    "Ensino Fundamental",
    "6-15",
    "elementary_school"
  ),
  high_school: new AgeGroup("Ensino Médio", "16-18", "high_school"),
  adults_and_elderly: new AgeGroup(
    "Adultos e Idosos",
    "16-19",
    "adults_and_elderly"
  ),
});
