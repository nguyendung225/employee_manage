import React, { useEffect, useState } from "react";
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
import {
  addExperience,
  updateExperience,
} from "app/redux/actions/ExperienceActions";
import moment from "moment";
import { convertTimeToDate } from "utils";

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
    padding: theme.spacing(1),
    margin: "10px auto",
    display: "flex",
    justifyContent: "center",
  },
}))(MuiDialogActions);

export default function ExperienceDialog({
  open,
  handleClose,
  t,
  employee,
  experienceData,
}) {
  const [experience, setExperience] = useState(experienceData);
  const dispatch = useDispatch();
  const handleChangeInput = (e) => {
    setExperience({ ...experience, [e.target.name]: e.target.value});
  };

  const handleSubmit = () => {
    if (experience?.id) {
      dispatch(updateExperience(experience));
      handleClose();
    } else {
      const payloay = {
        id: employee?.id,
        data: [{ ...experience }],
      };
      dispatch(addExperience(payloay));
      handleClose();
    }
  };

  const isEndDateValid = () => {
    ValidatorForm.addValidationRule("isEndDateValid", () => {
      const { startDate, endDate } = experience;
      if (
        (moment(endDate).isSame(startDate, "day") ||
          moment(endDate).isAfter(startDate, "day")) &&
        startDate &&
        endDate
      ) {
        return true;
      }
      return false;
    });
  };

  useEffect(() => {
    isEndDateValid();

    return () => {
      ValidatorForm.removeValidationRule("isEndDateValid");
    };
  }, [experience?.startDate, experience?.endDate]);

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {t("staff.experience")}
        </DialogTitle>
        <ValidatorForm onSubmit={handleSubmit}>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextValidator
                  className="w-100"
                  label={t("staff.companyName")}
                  name="companyName"
                  value={experience?.companyName}
                  onChange={handleChangeInput}
                  validators={["required"]}
                  errorMessages={[t("general.required")]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextValidator
                  className="w-100"
                  label={t("staff.startDate")}
                  type="date"
                  name="startDate"
                  value={
                    typeof experience?.startDate === "string"
                      ? experience?.startDate
                      : convertTimeToDate(experience?.startDate) || ""
                  }
                  onChange={handleChangeInput}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  validators={["required"]}
                  errorMessages={[t("general.required")]}
                  inputProps={{
                    max: moment().format("YYYY-MM-DD"),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextValidator
                  className="w-100"
                  label={t("staff.endDate")}
                  type="date"
                  name="endDate"
                  value={
                    typeof experience?.endDate === "string"
                      ? experience?.endDate
                      : convertTimeToDate(experience?.endDate) || ""
                  }
                  onChange={handleChangeInput}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  validators={["required", "isEndDateValid"]}
                  errorMessages={[
                    t("general.required"),
                    "Vui lòng chọn ngày kết thúc lớn hơn hoặc bằng ngày bắt đầu",
                  ]}
                  inputProps={{
                    max: moment().format("YYYY-MM-DD"),
                  }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextValidator
                  className="w-100"
                  label="Địa chỉ công ty"
                  name="companyAddress"
                  value={experience?.companyAddress}
                  onChange={handleChangeInput}
                  validators={["required"]}
                  errorMessages={[t("general.required")]}
                />
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  className="w-100"
                  label="Lý do nghỉ việc"
                  name="leavingReason"
                  value={experience?.leavingReason}
                  onChange={handleChangeInput}
                  validators={["required"]}
                  errorMessages={[t("general.required")]}
                />
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  className="w-100"
                  label="Mô tả công việc"
                  name="jobDescription"
                  value={experience?.jobDescription}
                  onChange={handleChangeInput}
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
              className="mx-10"
              type="submit"
            >
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
