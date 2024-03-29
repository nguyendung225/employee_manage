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
import { Grid } from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import moment from "moment";
import { useDispatch } from "react-redux";
import { updateEmployee } from "app/redux/actions/EmployeeActions";
import { updateSalaryByEmployee } from "app/redux/actions/SalaryActions";
import { updatePromotionByEmployee } from "app/redux/actions/PromotionActions";
import { updateProposalByEmployee } from "app/redux/actions/ProposalActions";

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

export default function ReasonForRejectionDialog({
  t,
  open,
  handleClose,
  employee,
  handleCloseProfile,
  isRegister,
  isEnd,
  isSalary,
  salary,
  isPromotion,
  promotion,
  isProposal,
  proposal
}) {
  const [content, setContent] = useState({
    rejectionDate: new Date().toISOString().split("T")[0],
    reasonForRejection: "",
    refuseEndProfileDay: new Date().toISOString().split("T")[0],
    reasonForRefuseEndProfile: "",
    reasonForRefusal: "",
  });
  const dispatch = useDispatch();
  const handleChangInput = (e) => {
    setContent({ ...content, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    isRegister &&
      dispatch(
        updateEmployee({
          ...employee,
          rejectionDate: content.rejectionDate,
          reasonForRejection: content.reasonForRejection,
          submitProfileStatus: 5,
        })
      );

    isEnd &&
      dispatch(
        updateEmployee({
          ...employee,
          refuseEndProfileDay: content.refuseEndProfileDay,
          reasonForRefuseEndProfile: content.reasonForRefuseEndProfile,
          submitProfileStatus: 9,
        })
      );
    isSalary &&
      dispatch(
        updateSalaryByEmployee({
          ...salary,
          rejectionDate: content.rejectionDate,
          reasonForRefusal: content.reasonForRefusal,
          salaryIncreaseStatus: 5,
        })
      );

    isPromotion &&
      dispatch(
        updatePromotionByEmployee({
          ...promotion,
          rejectionDate: content.rejectionDate,
          reasonForRefusal: content.reasonForRefusal,

          processStatus: 5,
        })
      );
      isProposal &&
      dispatch(
        updateProposalByEmployee({
          ...proposal,
          rejectionDate: content.rejectionDate,
          reasonForRefusal: content.reasonForRefusal,

          proposalStatus: 5,
        })
      );
    handleClose();
    handleCloseProfile();
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
          Từ chối
        </DialogTitle>
        <ValidatorForm onSubmit={handleSubmit}>
          <DialogContent dividers>
            <Grid container>
              <Grid item xs={12}>
                <TextValidator
                  label={
                    <span>
                      <span className="text-error">*</span>
                      Ngày từ chối
                    </span>
                  }
                  type="date"
                  value={
                    isEnd ? content.refuseEndProfileDay : content.rejectionDate
                  }
                  onChange={handleChangInput}
                  className="w-100"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name={isEnd ? "refuseEndProfileDay" : "rejectionDate"}
                  validators={["required"]}
                  errorMessages={[t("general.required")]}
                  inputProps={{
                    min: moment().format("YYYY-MM-DD"),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  label={
                    <span>
                      <span className="text-error">*</span>
                      Nội dung từ chối
                    </span>
                  }
                  value={
                    isRegister
                      ? content.reasonForRejection
                      : isEnd
                      ? content.reasonForRefuseEndProfile
                      : content.reasonForRefusal
                  }
                  onChange={handleChangInput}
                  className="w-100"
                  name={
                    isRegister
                      ? "reasonForRejection"
                      : isEnd
                      ? "reasonForRefuseEndProfile"
                      : "reasonForRefusal"
                  }
                  validators={["required"]}
                  errorMessages={[t("general.required")]}
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
