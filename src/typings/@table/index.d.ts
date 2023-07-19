/// <reference path="../_references.ts" />

type FormikProps = import("formik").FormikProps;
type FormikValues = import("formik").FormikValues;

declare type RenderCellFunc = (
  name: string,
  rowIndex: number,
  formik: FormikProps<FormikValues>,
  hasError: boolean,
  sx: any
) => React.ReactNode;
