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
import { updateEmployee } from "app/redux/actions/EmployeeActions";
import { getLeaders } from "app/redux/actions/LeaderActions";
import { POSITIONS } from "app/constants/employeeConstants";
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
  t,
  open,
  handleClose,
  employee,
  handleDialogEmployeeClose,
  content,
  isSalary,
  salary,
  handleDialogSalaryClose,
  isPromotion,
  promotion,
  handleDialogPromotionClose,
  isProposal,
  proposal,
  handleDialogProposalClose,
}) {
  const [leader, setLeader] = useState("");
  const { leaderList } = useSelector((state) => state.leader);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLeaders());
  }, []);

  const handleSubmit = () => {
    if(isSalary){
        dispatch(updateSalaryByEmployee({...salary,leaderId:leader,salaryIncreaseStatus: 2}))
        handleDialogSalaryClose()
    }else if(isPromotion){
      dispatch(updatePromotionByEmployee({...promotion,leaderId:leader,processStatus: 2}))
      handleDialogPromotionClose()
    }else if(isProposal){
      dispatch(updateProposalByEmployee({...proposal,leaderId:leader,proposalStatus: 2}))
      handleDialogProposalClose()
    } else{
      dispatch(updateEmployee({ ...employee, ...content, leaderId: leader,submitProfileStatus:6 }));
      handleDialogEmployeeClose();
    }
   
  };

  const handleChangInput = (e) => {
    setLeader(e.target.value);
  };
  const leaderPosition = leader
    ? leaderList?.find((item) => item.id === leader).leaderPosition
    : "";
  const leaderName = POSITIONS.find(
    (position) => position.id === leaderPosition
  )?.name;
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
          {t('general.sendLeader')}
        </DialogTitle>
        <ValidatorForm onSubmit={handleSubmit}>
          <DialogContent dividers>
            <Grid container>
              <Grid item xs={12}>
                <TextValidator
                  label={
                    <span>
                      <span className="text-error">*</span>
                      Tên lãnh đạo
                    </span>
                  }
                  select
                  value={leader || ""}
                  onChange={handleChangInput}
                  className="w-100"
                  name="leader"
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
              <Grid item xs={12}>
                <TextValidator
                  label={
                    <span>
                      <span className="text-error ">*</span>
                      Chức vụ
                    </span>
                  }
                   value={leaderName || ""}
                  className="w-100"
                
                  validators={["required"]}
                  errorMessages={[t("general.required")]}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button variant="contained" color="primary" type="submit">
            {t('general.sendLeader')}
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
