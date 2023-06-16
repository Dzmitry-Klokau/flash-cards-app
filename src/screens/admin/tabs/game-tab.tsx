import { isEmpty } from "lodash";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../navigation";

type Props = {
  visible: boolean;
  data: Array<GameType>;
};

export const GameTab = ({ data, visible }: Props) => {
  const navigate = useNavigate();

  if (isEmpty(data) || !visible) return null;

  return (
    <>
      <TableContainer component={Paper} sx={{ ph: 1 }}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => {
              return (
                <>
                  <TableRow
                    key={row.id}
                    role="button"
                    onClick={() => {
                      navigate(
                        `${routes["admin-game-details"].path}/${row.id}`,
                        { relative: "path" }
                      );
                    }}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                    }}
                  >
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.desc}</TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
