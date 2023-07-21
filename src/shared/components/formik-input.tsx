import { Component } from "react";
import { TextField } from "@mui/material";
import { connect } from "formik";


type Props = {
  className: string;
  title: string;
  fieldName: string;
  disabled?: boolean;
};

class Input extends Component<Props & FormikProp> {
  shouldComponentUpdate(nextProps: Readonly<Props & FormikProp>): boolean {
    const { fieldName, formik, ...rest } = this.props;
    const {
      fieldName: nextFieldName,
      formik: nextFormik,
      ...nextRest
    } = nextProps;

    if (
      formik.values[fieldName] !== nextFormik.values[nextFieldName] ||
      formik.errors[fieldName] !== nextFormik.errors[nextFieldName] ||
      rest.disabled !== nextRest.disabled ||
      rest.title !== nextRest.title
    ) {
      console.log("render " + fieldName);
      return true;
    }
    return false;
  }

  render() {
    const {
      formik: { values, errors, handleBlur, handleChange },
      fieldName,
      title,
      className,
      ...rest
    } = this.props;

    return (
      <TextField
        className={className}
        label={title}
        variant="standard"
        value={values[fieldName]}
        error={!!errors[fieldName]}
        onBlur={handleBlur(fieldName)}
        onChange={handleChange(fieldName)}
        {...rest}
      />
    );
  }
}
// @ts-ignore
export const FormikInput: React.FC<Props> = connect<Props>(Input);
