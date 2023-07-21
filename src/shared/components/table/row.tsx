import { TableCell, TableRow, Box, IconButton } from "@mui/material";
import {
  Delete as DeleteIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from "@mui/icons-material";
import { connect } from "formik";
import { Component } from "react";



type Props = {
  index: number;
  hasError: boolean;
  onRemove: (index: number) => void;
  showUp: boolean;
  onUp: (index: number) => void;
  showDown: boolean;
  onDown: (index: number) => void;
  tableName: string;
  valueNames: string[];
  renderCell: RenderCellFunc;
};

type State = {
  highlight: boolean;
};

const cellInputStyle = {
  marginTop: 1,
  marginBottom: 1,
  width: "98%",
  minWidth: "150px",
  minHeight: 50,
};

class _Row extends Component<Props & FormikProp, State> {
  constructor(props: Props & FormikProp) {
    super(props);
    this.state = { highlight: false };
  }

  shouldComponentUpdate(
    nextProps: Readonly<Props & FormikProp>,
    nextState: Readonly<State>
  ): boolean {
    const { formik, index, tableName } = this.props;
    const { formik: nextFormik, index: nextIndex } = nextProps;

    const row = formik.values[tableName][index];
    const nextRow = nextFormik.values[tableName][nextIndex];

    const { showDown, showUp, hasError } = this.props;
    const {
      showDown: nextShowDown,
      showUp: nextShowUp,
      hasError: nextHasError,
    } = nextProps;

    if (
      row !== nextRow ||
      hasError !== nextHasError ||
      showUp !== nextShowUp ||
      showDown !== nextShowDown ||
      this.state.highlight !== nextState.highlight
    ) {
      return true;
    }

    return false;
  }

  render() {
    const {
      formik,
      index,
      hasError,
      onRemove,
      showUp,
      onUp,
      showDown,
      onDown,
      valueNames,
      renderCell,
    } = this.props;

    let rowStyles = {};
    if (this.state.highlight) {
      rowStyles = {
        backgroundColor: "rgba(25, 118, 210, 0.5)",
      };
      setTimeout(() => {
        this.setState({ highlight: false });
      }, 300);
    }

    return (
      <TableRow sx={rowStyles}>
        <TableCell padding="none">
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            {showDown && (
              <IconButton
                onClick={() => {
                  this.setState({ highlight: true });
                  onDown(this.props.index);
                }}
              >
                <ArrowDownwardIcon />
              </IconButton>
            )}
            {showUp && (
              <IconButton
                onClick={() => {
                  this.setState({ highlight: true });
                  onUp(this.props.index);
                }}
              >
                <ArrowUpwardIcon />
              </IconButton>
            )}
          </Box>
        </TableCell>
        {valueNames.map((vName) => (
          <TableCell
            padding="none"
            sx={{ width: 100 / valueNames.length - 5 + "%", paddingLeft: 1 }}
          >
            {renderCell(vName, index, formik, hasError, cellInputStyle)}
          </TableCell>
        ))}
        <TableCell padding="none">
          <IconButton onClick={() => onRemove(this.props.index)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }
}

// @ts-ignore
export const Row: React.FC<Props> = connect(_Row);
