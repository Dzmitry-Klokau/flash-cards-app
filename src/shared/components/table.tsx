import {
  Link,
  Paper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { get } from "lodash";

type CellType = {
  field: string;
  onClick?: (row: any) => void;
};

type Props = {
  head: Array<string>;
  fields: Array<CellType>;
  data: Array<any>;
  keyField: string;
};

export const Table = ({ head, fields, data, keyField }: Props) => (
  <TableContainer component={Paper} sx={{ ph: 1 }}>
    <MuiTable sx={{ minWidth: 350 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          {head.map((h, index) => (
            <TableCell key={index}>{h}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow
            key={get(row, keyField, keyField)}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            {fields.map((c, i) => (
              <TableCell key={`${get(row, keyField, keyField)}-${i}`}>
                {c.onClick ? (
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => {
                      c.onClick?.(row);
                    }}
                  >
                    {get(row, c.field, c.field)}
                  </Link>
                ) : (
                  get(row, c.field, c.field)
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </MuiTable>
  </TableContainer>
);
