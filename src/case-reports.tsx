import React, { useEffect, useState } from "react";
import { DataTableSkeleton, Tab, Tabs } from "carbon-components-react";
import CaseReportsTable from "./case-reports-table";
import { fetchAllCaseReports, fetchSubmittedCaseReports } from "./api/api";
import moment from "moment";

const CaseReports: React.FC = () => {
  const [queuedReports, setQueuedReports] = useState<CaseReport[]>([]);
  const [submittedReports, setSubmittedReports] = useState<CaseReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(true);
      if (data.results?.length > 0) {
        let reports: CaseReport[] = [];
        data.results.map((r) => {
          reports.push(convertReport(r));
        });
        setSubmittedReports(reports);
        setIsLoading(false);
      }
    });

    fetchAllCaseReports().then(({ data }) => {
      setIsLoading(true);
      if (data.results?.length > 0) {
        let reports: CaseReport[] = [];
        data.results.map((r) => {
          reports.push(convertReport(r));
        });
        setQueuedReports(reports);
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <DataTableSkeleton rowCount={5} />
      ) : (
        <Tabs>
          <Tab label="Case Reports Queue">
            <CaseReportsTable caseReports={queuedReports} isActionable={true} />
          </Tab>
          <Tab label="Submitted Case Reports">
            <CaseReportsTable
              caseReports={submittedReports}
              isActionable={false}
            />
          </Tab>
        </Tabs>
      )}
    </>
  );
};

export default CaseReports;
