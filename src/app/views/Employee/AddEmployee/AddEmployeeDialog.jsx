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
import {
  TAB_CERTIFICATE,
  TAB_EMPLOYEE,
  TAB_FAMILY,
} from "app/constants/employeeConstants";
import { TabPanel, a11yProps } from "app/components/CustomTab";
import TabEmployee from "./Tabs/TabEmployee";
import TabCertificate from "./Tabs/TabCertificate";
import TabFamily from "./Tabs/TabFamily";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
//import { getCertificates } from "app/redux/actions/CertificateActions";
import { setEmployee, updateEmployee } from "app/redux/actions/EmployeeActions";
import { getCertificates } from "app/redux/actions/CertificateActions";
import { getFamilies } from "app/redux/actions/FamilyActions";
import ProfileEmployee from "../ProfileEmployee/ProfileEmployee";

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

export default function AddEmployeeDialog({
  open,
  employeeData,
  handleClose,
  t,
}) {
  const [tab, setTab] = React.useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [employee, setEmployee] = useState(employeeData);
  const refFormAddEmployee = useRef(null);
  const dispatch = useDispatch();
 
  const handleChangeTab = (event, newValue) => {
    if (newValue !== TAB_EMPLOYEE) {
      if (employee?.id) {
        setTab(newValue);
      } else {
        toast.error("Vui lòng thêm thông tin nhân viên");
      }
    } else {
      setTab(TAB_EMPLOYEE);
    }
  };

  const handleSubmit = () => {
    if (tab === TAB_EMPLOYEE) {
      refFormAddEmployee.current.submit();
    }
  };

  const handleRegister = () => {
    console.log(employee);
    dispatch(updateEmployee(employee));

    setShowProfile(true);
  };

  const handleDialogProfileClose = () => {
    setShowProfile(false);
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
          {employee?.id ? "Cập nhật nhân viên" : " Thêm mới nhân viên"}
        </DialogTitle>

        <DialogContent dividers>
          <div>
            <AppBar position="static" color="default">
              <Tabs
                value={tab}
                onChange={handleChangeTab}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
              >
                <Tab label="Thông tin nhân viên" {...a11yProps(TAB_EMPLOYEE)} />
                <Tab
                  label="Thông tin văn bằng"
                  {...a11yProps(TAB_CERTIFICATE)}
                />
                <Tab label="Thông tin gia đình" {...a11yProps(TAB_FAMILY)} />
              </Tabs>
            </AppBar>

            <TabPanel value={tab} index={TAB_EMPLOYEE}>
              <TabEmployee
                t={t}
                refFormAddEmployee={refFormAddEmployee}
                employee={employee}
                setEmployee={setEmployee}
                handleClose={handleClose}
              />
            </TabPanel>
            <TabPanel value={tab} index={TAB_CERTIFICATE}>
              <TabCertificate
                t={t}
                employee={employee}
                setEmployee={setEmployee}
              />
            </TabPanel>
            <TabPanel value={tab} index={TAB_FAMILY}>
              <TabFamily t={t} employee={employee} setEmployee={setEmployee} />
            </TabPanel>
          </div>
        </DialogContent>
        <DialogActions>
          {employeeData?.id && (
            <Button
              variant="contained"
              color="primary"
              type="button"
              onClick={() => handleRegister()}
            >
              {t("general.register")}
            </Button>
          )}

          {tab === TAB_EMPLOYEE && (
            <div>
              {" "}
              <Button
                variant="contained"
                color="primary"
              
                onClick={() => handleSubmit()}
              >
                {t("general.save")}
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

      {showProfile && (
        <ProfileEmployee
          open={showProfile}
          t={t}
          handleClose={handleDialogProfileClose}
          employee={employee}
          handleEmployeeDialogClose={handleClose}
        />
      )}
    </div>
  );
}
