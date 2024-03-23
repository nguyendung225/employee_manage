import React, { useState } from 'react';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Tab, Tabs } from '@material-ui/core';
import { TabPanel, a11yProps } from 'app/components/CustomTab';
import { TAB_CERTIFICATE, TAB_CERTIFICATE_INFO, TAB_CV, TAB_PERSONAL_BACKGROUND } from 'app/constants/employeeConstants';
import TabCV from './Tabs/TabCV';
import TabProfile from './Tabs/TabProfile';
import TabCertificate from './Tabs/TabCertificate';

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
   
    background: "#0000002e",
    height: "730px",
    width:'1140px'
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      height: 224,
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
      flexShrink:0
    },
  }));

export default function ProfileEmployee({open,t,handleClose,employee}) {
    const classes = useStyles();
    const [tab,setTab]=useState(0)
 

    const handleChange = (event, newValue) => {
        setTab(newValue);
      };
  return (
    <div>
     
      <Dialog onClose={handleClose} maxWidth={'lg'} fullWidth={true} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {t('staff.profile.title')}
        </DialogTitle>
       
      <div className="flex flex-space-between ">
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={tab}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label={t('staff.profile.cv')} {...a11yProps(TAB_CV)} />
        <Tab label={t('staff.profile.personalBackground')} {...a11yProps(TAB_PERSONAL_BACKGROUND)} />
        <Tab label={t('staff.profile.certificate')} {...a11yProps(TAB_CERTIFICATE_INFO)} />
       
      </Tabs>
      <DialogContent dividers>
      <TabPanel value={tab} index={TAB_CV} className={'tabCV'}>
         <TabCV employee={employee} t={t}/>
      </TabPanel>
      <TabPanel value={tab} index={TAB_PERSONAL_BACKGROUND} className={'tabProfile'}>
        <TabProfile employee={employee} t={t}/>
      </TabPanel>
      <TabPanel value={tab} index={TAB_CERTIFICATE_INFO} className={'tabCertificate'}>
         <TabCertificate employee={employee} t={t}/> 
      </TabPanel>
      
   
        </DialogContent>
        </div>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}