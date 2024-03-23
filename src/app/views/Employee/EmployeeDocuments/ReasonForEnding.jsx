import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import ResignationLetter from './ResignationLetter';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
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
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
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

export default function ReasonForEnding({t,open,handleClose,employee,handleCloseProfile, handleDialogEmployeeClose}) {
  const [showResignationLetter, setShowResignationLetter] = useState(false);

 
    const [reason,setReason]=useState({
      endDay:new Date().toISOString().split('T')[0],
      reasonForEnding:employee.reasonForEnding || '',
    })
    
    const dispatch=useDispatch();


    const handleResignationLetterDialog = () => {
      setShowResignationLetter(true);
    };
  
    const handleResignationLetterDialogClose = () => {
      setShowResignationLetter(false);
    };


    const handleChangInput=(e)=>{
        setReason({...reason,[e.target.name]:e.target.value})
    }

   const handleSubmit=()=>{
    handleResignationLetterDialog()
   }
  return (
    <div>
     
      <Dialog maxWidth={'sm'} fullWidth={true} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Kết thúc hồ sơ
        </DialogTitle>
        <ValidatorForm  onSubmit={handleSubmit}>
        <DialogContent dividers>
              <Grid container>
              <Grid item xs={12}>
              <TextValidator
                label={
                  <span>
                    <span className="text-error">*</span>
                    Ngày kết thúc
                  </span>
                }
                type="date"
                value={reason.endDay || ""}
                onChange={handleChangInput}
                className="w-100"
                InputLabelProps={{
                  shrink: true,
                }} 
                name="endDay"
                validators={["required"]}
                errorMessages={[t("general.required")]}
                inputProps={{
                  min: moment().format('YYYY-MM-DD')
                }}
              />
              </Grid>
              <Grid item xs={12}>
              <TextValidator
                label={
                  <span>
                    <span className="text-error">*</span>
                    Nội dung
                  </span>
                }
               
                value={reason.reasonForEnding || ""}
                onChange={handleChangInput}
                className="w-100"
           
                name="reasonForEnding"
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
            type='submit'
              
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

      {showResignationLetter && (
        <ResignationLetter
          t={t}
          open={showResignationLetter}
          handleClose={handleResignationLetterDialogClose}
          employee={employee}
          handleResignationLetterClose={handleClose}
          reason={reason}

          handleDialogEmployeeClose={handleDialogEmployeeClose}
        />
      )}
    </div>
  );
}