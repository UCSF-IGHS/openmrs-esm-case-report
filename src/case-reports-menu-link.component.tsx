import React from "react";
import { useTranslation } from "react-i18next";
import { ConfigurableLink } from "@openmrs/esm-framework";

export default function CaseReportsMenuLink() {
  const { t } = useTranslation();
  return (
    <ConfigurableLink to="${openmrsSpaBase}/case-reports">
      {t("caseReportsMenuLink", "Case Reports")}
    </ConfigurableLink>
  );
}
