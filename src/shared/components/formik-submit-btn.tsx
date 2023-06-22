import { Component } from "react";
import { Button } from "@mui/material";
import { connect, FormikValues, FormikProps } from "formik";

type Props = {
  className?: string;
  formik: FormikProps<FormikValues>;
  title: string;
};

class Btn extends Component<Props> {
  shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
    const { formik, ...rest } = this.props;
    const { formik: nextFormik, ...nextRest } = nextProps;

    if (
      formik.dirty !== nextFormik.dirty ||
      formik.isValid !== nextFormik.isValid ||
      rest.title !== nextRest.title
    ) {
      return true;
    }
    return false;
  }

  render() {
    const {
      formik: { dirty, isValid, handleSubmit },
      title,
      className,
    } = this.props;

    return (
      <Button
        className={className}
        fullWidth
        variant="contained"
        onClick={() => {
          if (dirty && isValid) {
            handleSubmit();
          }
        }}
        disabled={!dirty}
      >
        {title}
      </Button>
    );
  }
}

export const FormikSubmitBtn = connect<Props>(Btn);
