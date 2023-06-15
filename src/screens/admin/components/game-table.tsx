import { ListItem, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import { memo, useCallback, useMemo, useState } from "react";

import { ModalWrapper, Table } from "../../../shared/components";

type Props = {
  visible: boolean;
  data: Array<GameType>;
};

export const GameTable = memo(({ data, visible }: Props) => {
  const [modalData, setModalData] = useState<GameType>();

  const table = useMemo(
    () => (
      <Table
        head={["Title", ""]}
        data={data}
        fields={[
          { field: "title" },
          { field: "Details", onClick: (row) => setModalData(row) },
        ]}
        keyField="uid"
      />
    ),
    [data]
  );

  if (isEmpty(data) || !visible) return null;

  return (
    <>
      {table}
      <ModalWrapper
        open={!!modalData}
        onClose={() => {
          setModalData(undefined);
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {`Uid: ${modalData?.uid}`}
        </Typography>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {`title: ${modalData?.title}`}
        </Typography>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {`Description: ${modalData?.desc}`}
        </Typography>
        {modalData?.cards.map((c, index) => (
          <Typography
            key={index}
                id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            {`${c.primary}-${c.secondary}-${c.optional}`}
          </Typography>
        ))}
      </ModalWrapper>
    </>
  );
});
