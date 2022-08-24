/* eslint-disable no-debugger, no-console */
import { useTranslation } from "react-i18next";
import { Modal } from "carbon-components-react";
import React, { useState } from "react";
import { dismissCaseReport } from "./api/api";
import { showToast } from "@openmrs/esm-framework";

interface caseReportActionDialogProps {
  caseReportUuid: string;
  action: string;
  displayText: string;
  name: string;
  handleSubmit: () => void;
}

export const CaseReportActionDialog: React.FC<caseReportActionDialogProps> = ({
  caseReportUuid,
  action,
  displayText,
  name,
  handleSubmit,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <CaseReportActionModal
          isOpen={isOpen}
          close={() => setIsOpen(false)}
          action={action}
          uuid={caseReportUuid}
          name={name}
          handleSubmit={handleSubmit}
        />
      )}
      <li className="bx--overflow-menu-options__option">
        <button
          className="bx--overflow-menu-options__btn"
          role="menuitem"
          title="Add to list"
          onClick={() => setIsOpen(true)}
          style={{
            maxWidth: "100vw",
          }}
        >
          <span className="bx--overflow-menu-options__option-content">
            {displayText || action}
          </span>
        </button>
      </li>
    </>
  );
};

export const CaseReportActionModal: React.FC<{
  isOpen: boolean;
  close: () => void;
  uuid: string;
  action: string;
  name: string;
  handleSubmit: () => void;
}> = ({ isOpen, close, uuid, action, name, handleSubmit }) => {
  const { t } = useTranslation();

  const modalHeaderText = t("actionDialogHeader", `${action} Case Report`);
  const modalBodyText = t(
    `Are you sure you want to ${action} case report for ${name}?`
  );

  const caseReportAction = () => {
    if (action === "Dismiss") {
      try {
        //dismissCaseReport(uuid);
        showToast({
          kind: "success",
          critical: true,
          description: `Case Report was successfully dismissed!`,
        });
      } catch (err) {
        showToast({
          kind: "error",
          critical: true,
          description: err,
        });
      }
      close();
      handleSubmit();
    }

    //window.location.reload();
  };

  return (
    <>
      <Modal
        open={isOpen}
        modalHeading={modalHeaderText}
        modalLabel=""
        passiveModal={false}
        primaryButtonText="Confirm"
        secondaryButtonText="Cancel"
        onRequestClose={close}
        onRequestSubmit={caseReportAction}
      >
        <p style={{ marginBottom: "1rem" }}>{modalBodyText}.</p>
      </Modal>
    </>
  );
};
