/* eslint-disable no-debugger, no-console */
import { OverflowMenu, OverflowMenuItem } from "carbon-components-react";
import React, { useState } from "react";
import styles from "../src/root.scss";
import { showToast } from "@openmrs/esm-framework";
import { dismissCaseReport } from "./api/api";
import { CaseReportActionDialog } from "./case-report-action-dialog.component";

export interface CaseReportActionsProps {
  uuid: string;
  name: string;
  handleSubmit: () => void;
}

export const CaseReportActions: React.FC<CaseReportActionsProps> = ({
  uuid,
  name,
  handleSubmit,
}) => {
  return (
    <>
      <OverflowMenu flipped className={styles.flippedOverflowMenu}>
        <OverflowMenuItem itemText="Submit" />
        <CaseReportActionDialog
          handleSubmit={handleSubmit}
          caseReportUuid={uuid}
          action="Dismiss"
          displayText="Dismiss"
          name={name}
        />
      </OverflowMenu>
    </>
  );
};
