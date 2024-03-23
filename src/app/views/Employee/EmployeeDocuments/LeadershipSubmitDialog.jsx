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
import { Grid, MenuItem } from "@material-ui/core";
import { POSITIONS } from "app/constants/employeeConstants";
import { useDispatch, useSelector } from "react-redux";
import { updateEmployee } from "app/redux/actions/EmployeeActions";
import moment from "moment";
import { getLeaders } from "app/redux/actions/LeaderActions";
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

export default function LeadershipSubmitDialog({
  open,
  handleClose,
  handleDialogEmployeeClose,
  t,
  employee,
}) {
  const [leadershipSubmitInfo, setLeadershipSubmitInfo] = useState({});
  const { leaderList } = useSelector((state) => state.leader);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLeaders());
  }, []);
  const handleSubmit = () => {
  
    const payload = {
      ...employee,
      ...leadershipSubmitInfo,
      submitProfileStatus:2
    
    };

    dispatch(updateEmployee(payload));
    handleClose()
    handleDialogEmployeeClose()
   
  };

  const handleChangInput = (e) => {
   
    setLeadershipSubmitInfo({
      ...leadershipSubmitInfo,
      [e.target.name]: e.target.value,
    });
  };

  const leaderPosition=leadershipSubmitInfo?.leaderId? leaderList?.find(item=>item.id===leadershipSubmitInfo?.leaderId).leaderPosition :''
  const leaderName=POSITIONS.find(position=>position.id===leaderPosition)?.name 
  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={"md"}
        fullWidth={true}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {t('general.sendLeader')}
        </DialogTitle>
        <ValidatorForm onSubmit={handleSubmit}>
          <DialogContent dividers>
            <Grid container spacing={2} className="mb-20">
              <Grid item xs={12} sm={2}>
                <TextValidator
                  label={
                    <span>
                      <span className="text-error">*</span>
                      Ngày trình
                    </span>
                  }
                  type="date"
                  value={leadershipSubmitInfo?.submitDay ||  new Date().toISOString().split("T")[0]}
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
              <Grid item xs={12} sm={5}>
                <TextValidator
                  label={
                    <span>
                      <span className="text-error">*</span>
                      Tên lãnh đạo
                    </span>
                  }
                  select
                  value={( employee?.submitProfileStatus==4||employee?.submitProfileStatus==5) ?employee?.leaderId : leadershipSubmitInfo?.leaderId || ""}
                  disabled={ ( employee?.submitProfileStatus==4||employee?.submitProfileStatus==5)}
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

              <Grid item xs={12} sm={5}>
                <TextValidator
                  label={
                    <span>
                      <span className="text-error ">*</span>
                      Chức vụ
                    </span>
                  }
                value={employee?.leaderPosition? employee?.leaderPosition: leaderName || ''}
                  disabled
                  className="w-100"
                 
                  validators={["required"]}
                  errorMessages={[t("general.required")]}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} className="mb-20">
              <Grid item xs={12}>
                <TextValidator
                  label={
                    <span>
                      <span className="text-error">*</span>
                      Nội dung
                    </span>
                  }
                  value={leadershipSubmitInfo?.submitContent || ""}
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
