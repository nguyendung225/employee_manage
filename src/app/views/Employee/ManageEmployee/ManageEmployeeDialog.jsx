import React, { useEffect, useRef, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ConstantList from "app/appConfig";
import {
  GENDER,
  TAB_PROMOTION,
  TAB_PROPOSAL,
  TAB_SALARY,
  TEAMS,
} from "app/constants/employeeConstants";
import { TabPanel, a11yProps } from "app/components/CustomTab";
import ProfileEmployee from "../ProfileEmployee/ProfileEmployee";
import { Avatar, Grid, MenuItem, TextField } from "@material-ui/core";
import { convertTimeToDate, formatDate } from "utils";
import moment from "moment";
import TabSalary from "./Tabs/TabSalary";
import TabPromotion from "./Tabs/TabPromotion";
import TabProposal from "./Tabs/TabProposal";
import ResignationLetter from "../EmployeeDocuments/ResignationLetter";

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
    padding: 0,
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

export default function ManageEmployeeDialog({
  open,
  employee,
  handleClose,
  t,
}) {
  const [tab, setTab] = React.useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [showResignationLetter, setShowResignationLetter] = useState(false);
  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  const handleDialogProfile = () => {
    setShowProfile(true);
  };
  const handleDialogProfileClose = () => {
    setShowProfile(false);
  };

  const handleReasonForEnding = () => {
    setShowResignationLetter(true);
  };

  const handleReasonForEndingClose = () => {
    setShowResignationLetter(false);
  };

  return (
    <div>
      <Dialog
        maxWidth={"lg"}
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {t("process.processUpdate")}
        </DialogTitle>

        <div>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12} md={2} className="text-center">
                <Avatar
                  alt="avatar"
                  src={
                    employee?.image
                      ? employee?.image
                      : ConstantList.ROOT_PATH + "assets/images/avatar.jpg"
                  }
                  className="w-140 h-140 m-auto"
                />
              </Grid>
              <Grid item xs={12} md={10} className="pr-20 pl-20">
                <Grid container spacing={2} className="mb-20">
                  <Grid item xs={12} sm={5} md={3}>
                    <TextField
                      variant="outlined"
                      size={"small"}
                      label={<span>{t("staff.code")}</span>}
                      value={employee?.code || ""}
                      className="w-100 "
                      name="code"
                      validators={["required", "isEmployeeIdValid"]}
                    />
                  </Grid>
                  <Grid item xs={12} sm={7} md={5}>
                    <TextField
                      variant="outlined"
                      size={"small"}
                      label={<span>{t("staff.name")}</span>}
                      value={employee?.name || ""}
                      className="w-100"
                      name="name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3} md={2}>
                    <TextField
                      variant="outlined"
                      size={"small"}
                      label={<span>{t("staff.gender.title")}</span>}
                      value={
                        employee?.gender === null ||
                        employee?.gender === undefined
                          ? ""
                          : GENDER.find(
                              (item) => item.value === employee?.gender
                            )?.name
                      }
                      className="w-100"
                      name="gender"
                    />
                  </Grid>

                  <Grid item xs={12} sm={4} md={2}>
                    <TextField
                      variant="outlined"
                      size={"small"}
                      label={<span>{t("staff.dateOfBirth")}</span>}
                      value={
                        typeof employee?.dateOfBirth === "string"
                          ? employee?.dateOfBirth
                          : formatDate(employee?.dateOfBirth) || ""
                      }
                      className="w-100"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="dateOfBirth"
                    />
                  </Grid>
                  <Grid item xs={12} sm={5} md={3}>
                    <TextField
                      variant="outlined"
                      size={"small"}
                      label={<span>{t("staff.phone")}</span>}
                      value={employee?.phone || ""}
                      className="w-100"
                      name="phone"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3} md={2}>
                    <TextField
                      variant="outlined"
                      size={"small"}
                      label={<span>{t("staff.team")}</span>}
                      value={
                        employee?.team === null || employee?.team === undefined
                          ? ""
                          : TEAMS.find((item) => item.value === employee?.team)
                              ?.name
                      }
                      className="w-100"
                      name="team"
                    />
                  </Grid>

                  <Grid item xs={12} sm={4} md={3}>
                    <TextField
                      variant="outlined"
                      size={"small"}
                      label={
                        <span>{t("staff.citizenIdentificationNumber")}</span>
                      }
                      value={employee?.citizenIdentificationNumber || ""}
                      className="w-100"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3} md={2}>
                    <TextField
                      variant="outlined"
                      size={"small"}
                      label={<span>{t("staff.dateOfIssuanceCard")}</span>}
                      value={
                        typeof employee?.dateOfIssuanceCard === "string"
                          ? employee?.dateOfIssuanceCard
                          : formatDate(employee?.dateOfIssuanceCard) || ""
                      }
                      className="w-100"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="dateOfIssuanceCard"
                    />
                  </Grid>
                  <Grid item xs={12} sm={2} md={2}>
                    <TextField
                      variant="outlined"
                      size={"small"}
                      label={<span>{t("staff.placeOfIssueCard")}</span>}
                      value={employee?.placeOfIssueCard || ""}
                      className="w-100"
                      name="placeOfIssueCard"
                    />
                  </Grid>

                  <Grid item xs={12} sm={4} md={3}>
                    <TextField
                      variant="outlined"
                      size={"small"}
                      label={<span>{t("staff.email")}</span>}
                      value={employee?.email || ""}
                      className="w-100"
                      name="email"
                    />
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <TextField
                      variant="outlined"
                      size={"small"}
                      label={<span>{t("staff.address")}</span>}
                      value={employee?.address || ""}
                      className="w-100"
                      name="address"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <AppBar position="static" color="default">
              <Tabs
                value={tab}
                onChange={handleChangeTab}
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label={t("salary.title")} {...a11yProps(TAB_SALARY)} />
                <Tab
                  label={t("promotion.title")}
                  {...a11yProps(TAB_PROMOTION)}
                />
                <Tab label={t("proposal.title")} {...a11yProps(TAB_PROPOSAL)} />
              </Tabs>
            </AppBar>

            <TabPanel value={tab} index={TAB_SALARY}>
              <TabSalary t={t} employee={employee} />
            </TabPanel>
            <TabPanel value={tab} index={TAB_PROMOTION}>
              <TabPromotion t={t} employee={employee} />
            </TabPanel>
            <TabPanel value={tab} index={TAB_PROPOSAL}>
              <TabProposal t={t} employee={employee} />
            </TabPanel>
          </DialogContent>
        </div>

        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleDialogProfile()}
          >
            {t("general.viewProfile")}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleReasonForEnding()}
          >
            {t("general.end")}
          </Button>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            {t("general.cancel")}
          </Button>
        </DialogActions>
      </Dialog>

      {showProfile && (
        <ProfileEmployee
          open={showProfile}
          t={t}
          handleClose={handleDialogProfileClose}
          employee={employee}
          handleEmployeeDialogClose={handleClose}
        />
      )}

      {showResignationLetter && (
        <ResignationLetter
          t={t}
          open={showResignationLetter}
          handleClose={handleReasonForEndingClose}
          employee={employee}
          handleDialogEmployeeClose={handleClose}
        />
      )}
    </div>
  );
}
