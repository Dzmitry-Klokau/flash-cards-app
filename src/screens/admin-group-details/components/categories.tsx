import { useRef, useState } from "react";
import { Box, Button, Theme, Typography } from "@mui/material";
import TreeItem from "@mui/lab/TreeItem";
import { makeStyles } from "@mui/styles";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { TreeView } from "@mui/lab";
import { grey, blue } from "@mui/material/colors";
import { DeleteDialog } from "./delete-dialog";
import { isEqual } from "lodash";
import { AddDialog } from "./add-dialog";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
  category: {
    backgroundColor: grey[100],
  },
  list: {
    backgroundColor: blue[100],
  },
}));

type Type = "list" | "category";
type Node = {
  id: string;
  name: string;
  type: Type;
  data: Array<Node>;
};

const mockData: Node = {
  id: "0",
  name: "root",
  type: "category",
  data: [
    {
      id: "1",
      name: "test 1",
      type: "category",
      data: [],
    },
    {
      id: "2",
      name: "test 2",
      type: "category",
      data: [
        {
          id: "4",
          name: "test 4",
          type: "category",
          data: [],
        },
        {
          id: "5",
          name: "test 5",
          type: "category",
          data: [],
        },
      ],
    },
  ],
};

type FindNodeFunc = (items: Node["data"], id: string) => Node | undefined;

const findNode: FindNodeFunc = (items, id) => {
  if (!items) {
    return;
  }

  for (const item of items) {
    if (item.id === id) {
      return item;
    }

    const child: Node | undefined = findNode(item.data, id);
    if (child) {
      return child;
    }
  }
};

type DeleteNodeFunc = (node: Node, id: string) => Node;
const deleteItem: DeleteNodeFunc = (node, id) => {
  let filtered = node.data.filter((d) => d.id !== id);

  if (isEqual(node.data, filtered)) {
    for (let i = 0; i < filtered.length; i += 1) {
      const result = deleteItem(filtered[i], id);
      const canBeStopped = !isEqual(filtered[i], result);
      filtered[i] = result;
      if (canBeStopped) break;
    }
  }

  return {
    ...node,
    data: filtered,
  };
};

export const Subcategories = () => {
  const classes = useStyles();
  const [data, setData] = useState(mockData);
  const active = useRef<string>(mockData.id);
  const [itemForDeletion, setItemForDeletion] = useState<Node | undefined>();
  const [addVisible, setAddVisible] = useState<boolean>(false);

  const onAdd = () => {
    setAddVisible(true);
  };

  const onDeletePress = () => {
    const node = findNode(data.data, active.current);
    setItemForDeletion(node);
  };

  const handleDeleteConfirmation = () => {
    const res = deleteItem(data, active.current);
    setData(res);
    setItemForDeletion(undefined);
  };

  const renderItem = (node: Node) => {
    return (
      <TreeItem
        nodeId={node.id}
        label={node.name}
        className={node.type === "list" ? classes.list : classes.category}
      >
        {Array.isArray(node.data) ? node.data.map((d) => renderItem(d)) : null}
      </TreeItem>
    );
  };

  return (
    <>
      <Box className={classes.title}>
        <Typography>Categories</Typography>
        <Box>
          <Button onClick={onAdd}>
            <AddIcon />
          </Button>
          <Button onClick={onDeletePress}>
            <DeleteIcon />
          </Button>
        </Box>
      </Box>
      <TreeView
        aria-label="icon expansion"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ flexGrow: 1, overflowY: "auto", marginBottom: 2 }}
        onNodeFocus={(_, id) => {
          active.current = id;
        }}
      >
        {renderItem(data)}
      </TreeView>
      <DeleteDialog
        value={itemForDeletion?.name}
        onCancel={() => {
          setItemForDeletion(undefined);
        }}
        onSubmit={handleDeleteConfirmation}
      />
      <AddDialog
        visible={addVisible}
        onCancel={() => {
          setAddVisible(false);
        }}
        onSubmit={() => {
          setAddVisible(false);
        }}
      />
    </>
  );
};
