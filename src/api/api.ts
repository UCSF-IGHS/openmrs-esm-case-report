import { openmrsFetch } from "@openmrs/esm-framework";

const BASE_WS_API_URL = "/ws/rest/v1/";
const CASE_REPORTS_URL = "casereport/casereport";
const CASE_REPORTS_FETCH_URL =
  "?v=custom:(id,uuid,dateCreated,status,patient:(patientIdentifier:(identifier),person:(uuid,gender,age,personName:(display))),reportTriggers:(display,auditInfo))";

export function fetchAllCaseReports() {
  const reports = openmrsFetch(
    BASE_WS_API_URL + CASE_REPORTS_URL + CASE_REPORTS_FETCH_URL
  );
  return reports;
}

export function fetchSubmittedCaseReports() {
  const url = CASE_REPORTS_URL + CASE_REPORTS_FETCH_URL + "&status=SUBMITTED";
  const reports = openmrsFetch(BASE_WS_API_URL + url);
  return reports;
}

export function dismissCaseReport(case_report_uuid: string) {
  return openmrsFetch(
    `${BASE_WS_API_URL + CASE_REPORTS_URL}/${case_report_uuid}/statuschange/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        action: "DISMISS",
      },
    }
  );
}
