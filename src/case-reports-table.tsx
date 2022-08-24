import React, { useCallback, useEffect, useState } from "react";
import {
  DataTable,
  Pagination,
  Search,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "carbon-components-react";
import styles from "../src/root.scss";
import { CaseReportActions } from "./case-report-actions.component";

interface CaseReportsProps {
  caseReports: CaseReport[];
  isActionable: boolean;
}

const CaseReportsTable: React.FC<CaseReportsProps> = ({
  caseReports,
  isActionable,
}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [nextOffSet, setNextOffSet] = useState(0);
  const [displayRows, setDisplayRows] = useState([]);
  const [abandonedRows, setAbandonedRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);

  const loadReports = useCallback(() => {
    updateTable(caseReports, 0, pageSize);
  }, [page, pageSize]);

  useEffect(() => {
    loadReports();
  }, []);

  useEffect(() => {
    if (abandonedRows.length) {
      setDisplayRows(
        displayRows.filter((row) => !abandonedRows.includes(row.uuid))
      );
      setAbandonedRows([]);
    }
  }, [abandonedRows, displayRows]);

  const updateTable = (fullDataset, start, itemCount) => {
    let currentRows = [];
    fullDataset = fullDataset.slice(start, start + itemCount);
    for (let report of fullDataset) {
      const actions = (
        <CaseReportActions
          handleSubmit={() => setAbandonedRows([...abandonedRows, report.uuid])}
          uuid={report.uuid}
          name={report.personName}
        ></CaseReportActions>
      );
      currentRows.push({
        id: report.id,
        uuid: report.uuid,
        identifier: report.identifier,
        personName: report.personName,
        gender: report.gender,
        age: report.age,
        status: report.status,
        reportTriggers: report.reportTriggers,
        dateCreated: report.dateCreated,
        actions: isActionable ? actions : "",
      });
    }
    setDisplayRows(currentRows);
  };

  const handleSearch = useCallback(
    (searchTerm) => {
      setSearchTerm(searchTerm);
      const filtrate = filterReportsByName(searchTerm, displayRows);
      setFilteredRows(filtrate);
      return true;
    },
    [displayRows]
  );

  const filterReportsByName = (
    searchTerm: string,
    reportsDataset: Array<any>
  ) => {
    return reportsDataset.filter((report) =>
      report.personName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

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
    <div className={styles.widgetContainer}>
      <div className={styles.searchBox}>
        <Search
          className={styles.searchField}
          labelText="Search"
          placeHolderText="Search Client list"
          size="sm"
          onKeyDown={({ target }) => handleSearch(target["value"])}
        />
      </div>
      <DataTable
        rows={searchTerm ? filteredRows : displayRows}
        headers={headers}
      >
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
      <Pagination
        page={page}
        pageSize={pageSize}
        pageSizes={[10, 20, 30, 40, 50]}
        totalItems={caseReports.length}
        onChange={({ page, pageSize }) => {
          setPage(page);
          setNextOffSet((page - 1) * pageSize);
          updateTable(caseReports, nextOffSet, pageSize);
          setPageSize(pageSize);
        }}
      />
    </div>
  );
};

export default CaseReportsTable;
