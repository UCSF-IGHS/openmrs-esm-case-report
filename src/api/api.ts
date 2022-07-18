import { openmrsFetch } from "@openmrs/esm-framework";

const BASE_WS_API_URL = "/ws/rest/v1/";
const CASE_REPORTS_URL =
  "casereport/casereport?v=custom:(id,uuid,dateCreated,status,patient:(patientIdentifier:(identifier),person:(uuid,gender,age,personName:(display))),reportTriggers:(display,auditInfo))";

export function fetchAllCaseReports() {
  const reports = openmrsFetch(BASE_WS_API_URL + CASE_REPORTS_URL);
  return reports;
}

export function fetchSubmittedCaseReports() {
  const url = CASE_REPORTS_URL + "&status=SUBMITTED";
  const reports = openmrsFetch(BASE_WS_API_URL + url);
  return reports;
}
