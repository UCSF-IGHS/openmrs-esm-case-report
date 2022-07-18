import React from "react";
import {
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "carbon-components-react";

interface CaseReportsProps {
  caseReports: CaseReport[];
}

const CaseReportsTable: React.FC<CaseReportsProps> = ({ caseReports }) => {
  const headers = [
    {
      key: "identifier",
      header: "Patient Identifier",
    },
    {
      key: "personName",
      header: "Patient Name",
    },
    {
      key: "gender",
      header: "Gender",
    },
    {
      key: "age",
      header: "Age",
    },
    {
      key: "status",
      header: "Status",
    },
    {
      key: "reportTriggers",
      header: "Triggers",
    },
    {
      key: "dateCreated",
      header: "Date Created",
    },
    {
      key: "actions",
      header: "Actions",
    },
  ];

  return (
    <DataTable rows={caseReports} headers={headers}>
      {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
        <Table {...getTableProps()}>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow {...getRowProps({ row })}>
                {row.cells.map((cell) => (
                  <TableCell key={cell.id}>{cell.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </DataTable>
  );
};

export default CaseReportsTable;
