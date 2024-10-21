import { AgeGroup, IAgeGroup } from "@/app/_lib/constants";
import { Farming, IFarming } from "../../culturas/_models";
import {
  IInstitution,
  Institution,
} from "../../instituicoes/_context/models/Institution";
import { ulid } from "ulid";
import { Timestamp } from "firebase/firestore";

type Ulid = string;

export interface IControl {
  id: Ulid | undefined;
  ageGroup: IAgeGroup | undefined;
  farming: IFarming | undefined;
  grossWeightPerCapita: number;
  numberOfPeople: number;
  plannedDays: number;
  total: number;
  date: Date | null;
  institution: IInstitution | undefined;
  supplied: number;
  daysServed: number;
  isCompleted: boolean;
}

export class Control implements IControl {
  id: Ulid | undefined;
  ageGroup: IAgeGroup | undefined;
  farming: IFarming | undefined;
  numberOfPeople: number;
  plannedDays: number;
  date: Date | null;
  institution: IInstitution | undefined;
  supplied: number;

  constructor(
    ageGroup: IAgeGroup | undefined,
    farming: IFarming | undefined,
    numberOfPeople: number,
    plannedDays: number,
    date: Date | null,
    institution: IInstitution | undefined,
    supplied: number,
    id: Ulid | undefined
  ) {
    this.id = id ?? ulid();
    this.ageGroup = ageGroup;
    this.farming = farming;
    this.numberOfPeople = numberOfPeople;
    this.plannedDays = plannedDays;
    this.date = date;
    this.institution = institution;
    this.supplied = supplied;
  }

  get grossWeightPerCapita() {
    if (!this.farming || !this.ageGroup) return 0;

    return Control.calculateGrossWeightPerCapita(this.farming, this.ageGroup);
  }

  get total() {
    return Control.calculateTotal(
      this.farming,
      this.ageGroup,
      this.numberOfPeople,
      this.plannedDays
    );
  }

  get daysServed() {
    if (this.total === 0) return 0;

    return (this.supplied * this.plannedDays) / this.total;
  }

  get isCompleted() {
    return (
      this.supplied > 0 &&
      this.daysServed >= 1 &&
      !!this.date &&
      !!this.institution
    );
  }

  static calculateGrossWeightPerCapita(farming: IFarming, ageGroup: IAgeGroup) {
    if (!farming || !ageGroup) return 0;

    return (farming[ageGroup.key as keyof IFarming] as number) / 1000;
  }

  static calculateTotal(
    farming: IFarming | undefined,
    ageGroup: IAgeGroup | undefined,
    numberOfPeople: number,
    plannedDays: number
  ) {
    if (!farming || !ageGroup || !numberOfPeople || !plannedDays) return 0;

    return (
      this.calculateGrossWeightPerCapita(farming, ageGroup) *
      plannedDays *
      numberOfPeople
    );
  }

  static calculateDaysServed(
    supplied: number,
    farming: IFarming,
    ageGroup: IAgeGroup,
    numberOfPeople: number,
    plannedDays: number
  ) {
    if (
      !farming ||
      !ageGroup ||
      !numberOfPeople ||
      !plannedDays ||
      supplied === 0
    )
      return 0;

    if (!this.calculateTotal(farming, ageGroup, numberOfPeople, plannedDays))
      return 0;

    return (
      (supplied * plannedDays) /
      this.calculateTotal(farming, ageGroup, numberOfPeople, plannedDays)
    );
  }

  static create(aFormData: IControl) {
    const date =
      aFormData.date instanceof Timestamp
        ? aFormData.date.toDate()
        : typeof aFormData.date === "string"
        ? new Date(aFormData.date)
        : aFormData.date;

    return new Control(
      AgeGroup.create(aFormData.ageGroup),
      Farming.create(aFormData.farming),
      aFormData.numberOfPeople,
      aFormData.plannedDays,
      date,
      Institution.create(aFormData.institution),
      aFormData.supplied,
      aFormData.id
    );
  }
}

export interface ISupply {
  id: Ulid | undefined;
  controls: IControl[];
  status: "Concluído" | "Incompleto";
  date: Date;
}

export class Supply implements ISupply {
  constructor(
    public controls: IControl[],
    public id: Ulid | undefined = undefined,
    public date: Date
  ) {
    this.id = id ?? ulid();
    this.controls = controls.map((control) => Control.create(control));
    this.date = date;
  }

  get planned() {
    return this.controls.reduce((acc, control) => acc + control.plannedDays, 0);
  }

  get supplied() {
    return this.controls.reduce((acc, control) => acc + control.supplied, 0);
  }

  get status() {
    return this.controls.reduce(
      (acc, control) => acc && control.isCompleted,
      true
    )
      ? "Concluído"
      : "Incompleto";
  }

  static create(aFormData: ISupply) {
    const date = aFormData.date
      ? aFormData.date instanceof Timestamp
        ? aFormData.date.toDate()
        : new Date(aFormData.date)
      : new Date();

    return new Supply(aFormData.controls, aFormData.id, date);
  }
}
