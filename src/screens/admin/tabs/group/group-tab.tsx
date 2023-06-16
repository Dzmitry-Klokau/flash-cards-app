import { isEmpty } from "lodash";
import { useMemo } from "react";
import { Table } from "../../../../shared/components";

type Props = {
  visible: boolean;
  data: Array<GroupType>;
};

export const GroupTab = ({ data, visible }: Props) => {
  const table = useMemo(
    () => (
      <Table
        head={["Title", "Description"]}
        data={data}
        fields={[{ field: "title" }, { field: "desc" }]}
        keyField="id"
      />
    ),
    [data]
  );

  if (isEmpty(data) || !visible) return null;

  return table;
};
