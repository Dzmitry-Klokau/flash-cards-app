import { isEmpty } from "lodash";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

type Props = {
  visible: boolean;
  data: Array<GameType | GroupType> | undefined;
  onAddPress: VoidFunction;
  onRowPress: (id: string) => void;
};

export const Tab = ({ data, visible, onAddPress, onRowPress }: Props) => {
  if (isEmpty(data) || !visible) return null;

  return (
    <>
      <TableContainer component={Paper} sx={{ ph: 1 }}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">
                <IconButton onClick={onAddPress}>
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <TableRow
                key={row.id}
                role="button"
                onClick={() => {
                  row.id && onRowPress(row.id);
                }}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
              >
                <TableCell sx={{ width: "30vw" }}>{row.title}</TableCell>
                <TableCell>{row.desc}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
