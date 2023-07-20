import { Typography, Breadcrumbs as MuiBreadcrumbs, Link } from "@mui/material";

type Props = {
  level1Label: string;
  level1OnPress: VoidFunction;
  level2Label: string | undefined;
  level2OnPress: VoidFunction;
  level3Label: string | undefined;
};

export const Breadcrumbs = ({
  level1Label,
  level1OnPress,
  level2Label,
  level2OnPress,
  level3Label,
}: Props) => {
  const renderLevel1 = () => {
    if (level2Label) {
      return (
        <Link underline="hover" color="inherit" onClick={level1OnPress}>
          {level1Label}
        </Link>
      );
    }
    return <Typography color="text.primary">{level1Label}</Typography>;
  };

  const renderLevel2 = () => {
    if (level3Label) {
      return (
        <Link underline="hover" color="inherit" onClick={level2OnPress}>
          {level2Label}
        </Link>
      );
    }
    if (level2Label) {
      return <Typography color="text.primary">{level2Label}</Typography>;
    }

    return null;
  };

  const renderLevel3 = () => {
    if (level3Label) {
      return <Typography color="text.primary">{level3Label}</Typography>;
    }
    return null;
  };

  return (
    <MuiBreadcrumbs aria-label="breadcrumb">
      {renderLevel1()}
      {renderLevel2()}
      {renderLevel3()}
    </MuiBreadcrumbs>
  );
};
