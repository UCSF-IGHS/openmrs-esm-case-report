interface CaseReport {
  id: string;
  dateCreated: string;
  uuid: string;
  status: string;
  identifier: string;
  personName: string;
  gender: string;
  age: number;
  reportTriggers: Array<String>;
}
