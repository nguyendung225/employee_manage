import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Grid } from "@material-ui/core";
import moment from "moment";
import { useDispatch } from "react-redux";
import { updateEmployee } from "app/redux/actions/EmployeeActions";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
  },
}))(MuiDialogActions);

export default function EndEmployeeDialog({ t, open, employee, handleClose }) {
  const [numberSaved, setNumberSaved] = useState("");
  const codeSaveDefault = `NL${moment().format("MM")}${moment().format(
    "YYYY"
  )}/`;
  const dispatch = useDispatch();
  const handleChangInput = (e) => {
    const value = e.target.value;

    if (value.startsWith(codeSaveDefault)) {
      setNumberSaved(value);
    }
  };

  const handleSubmit = () => {
    dispatch(
      updateEmployee({
        ...employee,
        decisionDay: new Date().toISOString().split("T")[0],
        numberSaved,
        submitProfileStatus: 0,
      })
    );
    handleClose();
  };

  return (
    <div>
      <Dialog
        maxWidth={"sm"}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {t("staff.save")}
        </DialogTitle>
        <ValidatorForm onSubmit={handleSubmit}>
          <DialogContent dividers>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <TextValidator
                  variant="outlined"
                  size={"small"}
                  label={
                    <span>
                      <span className="text-error">*</span>
                      {t("staff.decisionDay")}
                    </span>
                  }
                  disabled
                  type="date"
                  value={new Date().toISOString().split("T")[0]}
                  name="decisionDay"
                  className="w-100"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  validators={["required"]}
                  errorMessages={[t("general.required")]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextValidator
                  variant="outlined"
                  size={"small"}
                  label={
                    <span>
                      <span className="text-error">*</span>
                      {t("staff.numberSaved")}
                    </span>
                  }
                  value={numberSaved || codeSaveDefault}
                  onChange={handleChangInput}
                  className="w-100"
                  name="numberSaved"
                  validators={[
                    "required",
                    `matchRegexp:^${codeSaveDefault}\\d{3}$`,
                  ]}
                  errorMessages={[
                    t("general.required"),
                    "Mã nộp lưu phải có dạng " +
                      codeSaveDefault +
                      "3 số bất kỳ",
                  ]}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" type="submit">
              {t("general.save")}
            </Button>

            <Button
              variant="contained"
              color="secondary"
              type="button"
              onClick={handleClose}
            >
              {t("general.cancel")}
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}
