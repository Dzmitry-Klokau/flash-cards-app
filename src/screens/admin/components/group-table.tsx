import { isEmpty } from "lodash";
import { useMemo } from "react";
import { Table } from "../../../shared/components";

export const GroupTable = ({ data }: { data: Array<GroupType> }) => {
  const table = useMemo(
    () => (
      <Table
        head={["Title", "Description"]}
        data={data}
        fields={[{ field: "title" }, { field: "desc" }]}
        keyField="uid"
      />
    ),
    [data]
  );

  if (isEmpty(data)) return null;

  return table;
};
