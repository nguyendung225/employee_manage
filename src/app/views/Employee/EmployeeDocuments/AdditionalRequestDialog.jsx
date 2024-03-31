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
    overflow: "hidden",
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    margin: "10px auto",
    display: "flex",
    justifyContent: "center",
  },
}))(MuiDialogActions);

export default function AdditionalRequestDialog({
  open,
  t,
  handleClose,
  employee,
  handleProfileClose,
}) {
  const [formData, setFormData] = useState({
    additionalRequest: employee?.additionalRequest || "",
  });

  const dispatch = useDispatch();
  const handleChangInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(
      updateEmployee({
        ...employee,
        additionalRequest: formData.additionalRequest,
        submitProfileStatus: 4,
      })
    );
    handleProfileClose();
  };
  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={"sm"}
        fullWidth={true}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {t("general.additionalRequest.title")}
        </DialogTitle>
        <ValidatorForm onSubmit={handleSubmit}>
          <DialogContent dividers>
            <Grid container>
              <Grid item xs={12}>
                <TextValidator
                  variant="outlined"
                  size="small"
                  multiline
                  label={
                    <span>
                      <span className="text-error">*</span>
                      {t("general.additionalRequest.content")}
                    </span>
                  }
                  value={formData?.additionalRequest || ""}
                  onChange={handleChangInput}
                  className="w-100 "
                  name="additionalRequest"
                  validators={["required"]}
                  errorMessages={[t("general.required")]}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="ml-10"
            >
              {t("general.additionalRequest.title")}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              type="button"
              className="ml-10"
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
