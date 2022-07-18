import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "carbon-components-react";
import CaseReportsTable from "./case-reports-table";
import { fetchAllCaseReports, fetchSubmittedCaseReports } from "./api/api";
import moment from "moment";

const CaseReports: React.FC = () => {
  const [queuedReports, setQueuedReports] = useState<CaseReport[]>([]);
  const [submittedReports, setSubmittedReports] = useState<CaseReport[]>([]);

  function convertReport(r: any): CaseReport {
    const caseReport: CaseReport = {
      age: r.patient.person.age,
      dateCreated: moment(r.dateCreated).format("DD-MMM-YYYY HH:mm"),
      gender: r.patient.person.gender,
      id: r.id.toString(),
      identifier: r.patient.patientIdentifier.identifier,
      personName: r.patient.person.personName.display,
      reportTriggers: r.reportTriggers.map((t) => t.display).join(),
      status: r.status,
      uuid: r.uuid,
    };
    return caseReport;
  }

  useEffect(() => {
    fetchSubmittedCaseReports().then(({ data }) => {
      if (data.results?.length > 0) {
        let reports: CaseReport[] = [];
        data.results.map((r) => {
          reports.push(convertReport(r));
        });
        setSubmittedReports(reports);
      }
    });

    fetchAllCaseReports().then(({ data }) => {
      if (data.results?.length > 0) {
        let reports: CaseReport[] = [];
        data.results.map((r) => {
          reports.push(convertReport(r));
        });
        setQueuedReports(reports);
      }
    });
  }, []);

  return (
    <Tabs>
      <Tab label="Case Reports Queue">
        <CaseReportsTable caseReports={queuedReports} />
      </Tab>
      <Tab label="Submitted Case Reports">
        <CaseReportsTable caseReports={submittedReports} />
      </Tab>
    </Tabs>
  );
};

export default CaseReports;
