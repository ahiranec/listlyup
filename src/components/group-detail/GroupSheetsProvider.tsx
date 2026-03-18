/**
 * GroupSheetsProvider - Global provider for all group-related sheets
 * Renders all sheets and dialogs centrally
 */

import { useGroupSheets } from "../../lib/useGroupSheets";
import { ReportGroupSheet } from "../groups/ReportGroupSheet";

export function GroupSheetsProvider() {
  const {
    reportGroup,
    closeReportGroup,
  } = useGroupSheets();

  return (
    <>
      {/* Report Group Sheet */}
      {reportGroup && (
        <ReportGroupSheet
          open={reportGroup.open}
          onOpenChange={closeReportGroup}
          group={{
            id: reportGroup.groupId,
            name: reportGroup.groupName,
          }}
        />
      )}
    </>
  );
}