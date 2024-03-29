import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { Dialog, Tab, Tabs } from "@material-ui/core";
import { TabPanel, a11yProps } from "app/components/CustomTab";
import "styles/views/_profile.scss";
import {
  ACTION_EMPLOYEE,
  STATUS_EMPLOYEE,
  TAB_CERTIFICATE_INFO,
  TAB_CV,
  TAB_PERSONAL_BACKGROUND,
} from "app/constants/employeeConstants";
import TabCV from "./Tabs/TabCV";
import TabProfile from "./Tabs/TabProfile";
import TabCertificate from "./Tabs/TabCertificate";
import SendLeaderDialog from "../EmployeeDocuments/SendLeaderDialog";
import ApprovedDialog from "../EmployeeDocuments/ApprovedDialog";
import AdditionalRequestDialog from "../EmployeeDocuments/AdditionalRequestDialog";
import RejectionDialog from "../EmployeeDocuments/RejectionDialog";
import { isMobile } from "utils";

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
    background: "#0000002e",
    height: isMobile()?'586px' :"634px",
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: isMobile() ? "block" : "flex",
 //   height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    flexShrink: 0,
  },
}));

export default function ProfileEmployee({
  open,
  t,
  isManage,
  handleClose,
  employee,
  handleEmployeeDialogClose,
}) {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const [openSendLeader, setOpenSendLeader] = useState(false);
  const [showDialogApproved, setShowDialogApproved] = useState(false);
  const [showDialogAdditional, setShowDialogAdditional] = useState(false);
  const [showDialogRejection, setShowDialogRejection] = useState(false);
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleSendLeader = () => {
    setOpenSendLeader(true);
  };

  const handleSendLeaderDialogClose = () => {
    setOpenSendLeader(false);
  };

  const handleDialogApproved = () => {
    setShowDialogApproved(true);
  };

  const handleDialogApprovedClose = () => {
    setShowDialogApproved(false);
  };

  const handleDialogAdditionalRequest = () => {
    setShowDialogAdditional(true);
  };

  const handleDialogAdditionalRequestClose = () => {
    setShowDialogAdditional(false);
  };

  const handleDialogRejection = () => {
    setShowDialogRejection(true);
  };

  const handleDialogRejectionClose = () => {
    setShowDialogRejection(false);
  };
  return (
    <div>
      <Dialog
        onClose={handleClose}
        maxWidth={"lg"}
        fullWidth={true}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {t("staff.profile.title")}
        </DialogTitle>

        <div className={classes.root}>
          <Tabs
            orientation={isMobile() ? "horizontal" : "vertical"}
            variant="scrollable"
            value={tab}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            <Tab label={t("staff.profile.cv")} {...a11yProps(TAB_CV)} />
            <Tab
              label={t("staff.profile.personalBackground")}
              {...a11yProps(TAB_PERSONAL_BACKGROUND)}
            />
            <Tab
              label={t("staff.profile.certificate")}
              {...a11yProps(TAB_CERTIFICATE_INFO)}
            />
          </Tabs>
          <DialogContent dividers>
            <TabPanel value={tab} index={TAB_CV} className={"tabCV"}>
              <TabCV employee={employee} t={t} />
            </TabPanel>
            <TabPanel
              value={tab}
              index={TAB_PERSONAL_BACKGROUND}
              className={"tabProfile"}
            >
              <TabProfile employee={employee} t={t} />
            </TabPanel>
            <TabPanel
              value={tab}
              index={TAB_CERTIFICATE_INFO}
              className={"tabCertificate"}
            >
              <TabCertificate employee={employee} t={t} />
            </TabPanel>
          </DialogContent>
        </div>
        <DialogActions>
          {ACTION_EMPLOYEE.EDIT.includes(employee?.submitProfileStatus) &&
            STATUS_EMPLOYEE.ADD.includes(employee?.submitProfileStatus) && (
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  className="ml-10"
                  onClick={() => handleSendLeader()}
                >
                  {t("general.sendLeader")}
                </Button>
              </div>
            )}

          {isManage && (
            <div>
              <Button
                variant="contained"
                color="primary"
                type="button"
                className="ml-10"
                onClick={() => handleDialogApproved()}
              >
                {t("general.approved")}
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="button"
                className="ml-10"
                onClick={() => handleDialogAdditionalRequest()}
              >
                {t("general.additionalRequest.title")}
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="button"
                className="ml-10"
                onClick={() => handleDialogRejection()}
              >
                {t("general.refuse.title")}
              </Button>
            </div>
          )}
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
      </Dialog>

      {openSendLeader && (
        <SendLeaderDialog
          open={openSendLeader}
          t={t}
          handleClose={handleSendLeaderDialogClose}
          employee={employee}
          handleEmployeeDialogClose={handleEmployeeDialogClose}
          handleProfileClose={handleClose}
        />
      )}

      {showDialogApproved && (
        <ApprovedDialog
          open={showDialogApproved}
          t={t}
          handleClose={handleDialogApprovedClose}
          employee={employee}
          handleProfileClose={handleClose}
        />
      )}
      {showDialogAdditional && (
        <AdditionalRequestDialog
          open={showDialogAdditional}
          t={t}
          handleClose={handleDialogAdditionalRequestClose}
          employee={employee}
          handleProfileClose={handleClose}
        />
      )}
      {showDialogRejection && (
        <RejectionDialog
          open={showDialogRejection}
          t={t}
          handleClose={handleDialogRejectionClose}
          employee={employee}
          handleProfileClose={handleClose}
        />
      )}
    </div>
  );
}
