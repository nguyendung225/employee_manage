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
import { Grid, MenuItem } from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useDispatch, useSelector } from "react-redux";
import { getLeaders } from "app/redux/actions/LeaderActions";
import { POSITIONS } from "app/constants/employeeConstants";
import moment from "moment";
import { updateEmployee } from "app/redux/actions/EmployeeActions";
import { convertTimeToDate } from "utils";
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

export default function SendLeaderDialog({
  open,
  t,
  handleClose,
  employee,
  handleEmployeeDialogClose,
  isRegister,
  isSalary,
  salary,
  handleDialogSalaryClose,
  isPromotion,
  promotion,
  handleDialogPromotionClose,
  isProposal,
  proposal,
  handleDialogProposalClose,
  isEnd,
  handleDialogEmployeeClose
  
}) {
  const [formData, setFormData] = useState({
    submitDay: employee?.submitDay || new Date().toISOString().split("T")[0],
    submitContent: employee?.submitContent || "",
    leaderId: employee?.leaderId || "",
  });
  const { leaderList } = useSelector((state) => state.leader);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLeaders());
  }, []);
  const handleChangInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const leaderPosition = formData?.leaderId
    ? leaderList?.find((item) => item.id === formData?.leaderId)?.leaderPosition
    : "";
  const leaderName = POSITIONS.find(
    (position) => position.id === leaderPosition
  )?.name;

  const handleSubmit = () => {
    if (isRegister) {
      dispatch(
        updateEmployee({ ...employee, ...formData, submitProfileStatus: 2 })
      );
      handleEmployeeDialogClose();
    }
    else if (isSalary) {
      dispatch(
        updateSalaryByEmployee({
          ...salary,
          leaderId: formData.leaderId,
          salaryIncreaseStatus: 2,
        })
      );
      handleDialogSalaryClose();
    }else if(isPromotion){
      dispatch(updatePromotionByEmployee({...promotion,leaderId:formData.leaderId,processStatus: 2}))
      handleDialogPromotionClose()
    }else if(isProposal){
      dispatch(updateProposalByEmployee({...proposal,leaderId:formData.leaderId,proposalStatus: 2}))
      handleDialogProposalClose()
    }else{
      dispatch(updateEmployee({ ...employee, leaderId: formData.leaderId,submitProfileStatus:6 }));
      handleDialogEmployeeClose()
      
    }
  };
  console.log(formData);
  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {t("general.sendLeader")}
        </DialogTitle>
        <ValidatorForm onSubmit={handleSubmit}>
          {(!isSalary &&  !isPromotion && !isProposal && !isEnd) ? (
            <DialogContent dividers>
              <Grid container spacing={1} className="mb-20">
                <Grid item xs={12} sm={3} md={2}>
                  &&{" "}
                  <TextValidator
                    variant="outlined"
                    size={"small"}
                    label={
                      <span>
                        <span className="text-error">*</span>
                        {t("staff.submitDay")}
                      </span>
                    }
                    type="date"
                    value={
                      typeof formData?.submitDay === "string"
                        ? formData?.submitDay
                        : convertTimeToDate(formData?.submitDay) || ""
                    }
                    onChange={handleChangInput}
                    className="w-100"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="submitDay"
                    validators={["required"]}
                    errorMessages={[t("general.required")]}
                    inputProps={{
                      min: moment().format("YYYY-MM-DD"),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <TextValidator
                    variant="outlined"
                    size={"small"}
                    label={
                      <span>
                        <span className="text-error">*</span>
                        {t("staff.leaderName")}
                      </span>
                    }
                    select
                    value={
                      employee?.submitProfileStatus == 4 ||
                      employee?.submitProfileStatus == 5
                        ? employee?.leaderId
                        : formData?.leaderId || ""
                    }
                    disabled={
                      employee?.submitProfileStatus == 4 ||
                      employee?.submitProfileStatus == 5
                    }
                    onChange={handleChangInput}
                    className="w-100"
                    name="leaderId"
                    validators={["required"]}
                    errorMessages={[t("general.required")]}
                  >
                    {leaderList?.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item?.id}>
                          {item.leaderName}
                        </MenuItem>
                      );
                    })}
                  </TextValidator>
                </Grid>

                <Grid item xs={12} sm={3} md={3}>
                  <TextValidator
                    variant="outlined"
                    size={"small"}
                    label={
                      <span>
                        <span className="text-error ">*</span>
                        {t("leader.position")}
                      </span>
                    }
                    value={
                      formData?.leaderId ? t(`position.${leaderName}`) : ""
                    }
                    disabled
                    className="w-100"
                    validators={["required"]}
                    errorMessages={[t("general.required")]}
                  />
                </Grid>

                <Grid item xs={12} sm={3} md={4}>
                  <TextValidator
                    variant="outlined"
                    size={"small"}
                    label={
                      <span>
                        <span className="text-error">*</span>
                        {t("staff.submitContent")}
                      </span>
                    }
                    value={formData?.submitContent || ""}
                    onChange={handleChangInput}
                    className="w-100"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="submitContent"
                    validators={["required"]}
                    errorMessages={[t("general.required")]}
                  />
                </Grid>
              </Grid>
            </DialogContent>
          ) : (
            <DialogContent dividers>
              <Grid container spacing={1} className="mb-20">
                <Grid item xs={12} sm={6}>
                  <TextValidator
                    variant="outlined"
                    size={"small"}
                    label={
                      <span>
                        <span className="text-error">*</span>
                        {t("staff.leaderName")}
                      </span>
                    }
                    select
                    value={
                      employee?.submitProfileStatus == 4 ||
                      employee?.submitProfileStatus == 5
                        ? employee?.leaderId
                        : formData?.leaderId || ""
                    }
                    disabled={
                      employee?.submitProfileStatus == 4 ||
                      employee?.submitProfileStatus == 5
                    }
                    onChange={handleChangInput}
                    className="w-100"
                    name="leaderId"
                    validators={["required"]}
                    errorMessages={[t("general.required")]}
                  >
                    {leaderList?.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item?.id}>
                          {item.leaderName}
                        </MenuItem>
                      );
                    })}
                  </TextValidator>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextValidator
                    variant="outlined"
                    size={"small"}
                    label={
                      <span>
                        <span className="text-error ">*</span>
                        {t("leader.position")}
                      </span>
                    }
                    value={
                      formData?.leaderId ? t(`position.${leaderName}`) : ""
                    }
                    disabled
                    className="w-100"
                    validators={["required"]}
                    errorMessages={[t("general.required")]}
                  />
                </Grid>
              </Grid>
            </DialogContent>
          )}

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
