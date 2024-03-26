import React, { useEffect, useState } from "react";

import { Breadcrumb, ConfirmationDialog, ShowDialog } from "egret";
import {
  Button,
  Input,
  InputAdornment,
  IconButton,
  Icon,
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEmployee,
  getEmployees,
  setEmployee,
} from "app/redux/actions/EmployeeActions";
import {
  ACTION_EMPLOYEE,
  STATUS_EMPLOYEE,
} from "app/constants/employeeConstants";
import CustomTable from "app/components/CustomTable";
import { employeesColumns } from "app/components/CustomColumns";
import { Notifications, Visibility } from "@material-ui/icons";
import AddEmployeeDialog from "./AddEmployeeDialog";
import ProfileEmployee from "../ProfileEmployee/ProfileEmployee";
export default function AddEmployee({ t }) {
  const [keyword, setKeyword] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [showEmployee, setShowEmployee] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotify,setShowNotify]=useState(false)
  const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] =
    useState(false);
  const [id, setId] = useState(null);
  const { employeeList, totalElements,employee, success } = useSelector(
    (state) => state.employee
  );

  const dispatch = useDispatch();
  useEffect(() => {
    handleSearch();
  }, [pageIndex, pageSize, success]);

  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };
  const handleSearch = () => {
    const payload = {
      keyword,
      pageIndex: pageIndex + 1,
      pageSize,
      listStatus: STATUS_EMPLOYEE.ADD,
    };
    dispatch(getEmployees(payload));
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageIndex(0);
  };
  const handleChangePage = (event, newPage) => {
    setPageIndex(newPage);
  };

  const handleDialogEmployee = (employee) => {
    setShowEmployee(true);
    employee && dispatch(setEmployee(employee));
  };

  const handleCloseEmployeeDialog = () => {
    setShowEmployee(false);
    dispatch(setEmployee({}));
  };

  const handleDeleteEmployee = (employee) => {
    setShouldOpenConfirmationDialog(true);
    setId(employee?.id);
  };

  const handleDialogConfirmationClose = () => {
    setShouldOpenConfirmationDialog(false);
    setId(null);
  };
  
  const handleConfirmationResponse = () => {
    dispatch(deleteEmployee(id));
    handleDialogConfirmationClose();
  };

  const handleViewEmployee = (employee) => {
    setShowProfile(true);
    dispatch(setEmployee(employee));
    
  };

  const handleDialogProfileClose = () => {
    setShowProfile(false);
  };

  const handleNotifyDialog = (employee) => {
    setShowNotify(true)
    dispatch(setEmployee(employee))
  };

  const handleNotifyClose=()=>{
    setShowNotify(false)
    dispatch(setEmployee({}))
  }
  const columns = employeesColumns(t, (rowData) => (
    <div>
      {ACTION_EMPLOYEE.EDIT.includes(rowData.submitProfileStatus) && (
        <IconButton
          fontSize="small"
          color="primary"
          onClick={() => handleDialogEmployee(rowData)}
        >
          <Icon>edit</Icon>
        </IconButton>
      )}
      {ACTION_EMPLOYEE.DELETE.includes(rowData.submitProfileStatus) && (
        <IconButton
          fontSize="small"
          color="error"
          onClick={() => handleDeleteEmployee(rowData)}
        >
          <Icon color="error">delete</Icon>
        </IconButton>
      )}

      {ACTION_EMPLOYEE.VIEW.includes(rowData.submitProfileStatus) && (
        <IconButton
          fontSize="small"
          color="secondary"
          onClick={() => handleViewEmployee(rowData)}
        >
          <Icon>
            <Visibility />
          </Icon>
        </IconButton>
      )}

      {ACTION_EMPLOYEE.NOTIFY.includes(rowData.submitProfileStatus) && (
        <IconButton
          fontSize="small"
          color="secondary"
          onClick={() => handleNotifyDialog(rowData)}
        >
          <Notifications />
        </IconButton>
      )}
    </div>
  ));
  return (
    <div>
      <div className="m-sm-30">
        <div className="mb-sm-30 mb-20">
          <Breadcrumb
            routeSegments={[{ name: t("Dashboard.employee_manage.add") }]}
          />
          <div className="flex-space-between flex mt-20">
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleDialogEmployee()}
            >
              {t("general.addNew")}
            </Button>
            <Input
              className="w-50"
              placeholder={t("general.enterSearch")}
              type={"text"}
              value={keyword}
              onChange={handleChangeKeyword}
              onKeyDown={handleKeyDown}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleSearch()}
                  >
                    {<SearchIcon />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
        </div>
      </div>
      <CustomTable
        t={t}
        pageIndex={pageIndex}
        pageSize={pageSize}
        data={employeeList}
        paging={true}
        columns={columns}
        count={totalElements}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleChangePage={handleChangePage}
      />

      {showEmployee && (
        <AddEmployeeDialog
          handleClose={handleCloseEmployeeDialog}
          open={showEmployee}
          t={t}
          employeeData={employee}
        />
      )}

      {shouldOpenConfirmationDialog && (
        <ConfirmationDialog
          open={shouldOpenConfirmationDialog}
          onConfirmDialogClose={handleDialogConfirmationClose}
          onYesClick={() => handleConfirmationResponse()}
          title={t("confirm")}
          text={t("general.deleteConfirm")}
          Yes={t("general.confirm")}
          No={t("general.cancel")}
        />
      )}
      {showProfile && (
        <ProfileEmployee
          open={showProfile}
          t={t}
          handleClose={handleDialogProfileClose}
          employee={employee}
        />
      )}
      {showNotify && <ShowDialog open={showNotify} 
        text={
          employee?.submitProfileStatus === "4"
            ? employee?.additionalRequest ||  t('general.none')
            : employee?.reasonForRejection || t('general.none')
        }
        title={
          employee?.submitProfileStatus === "4"
            ?  t('general.additionalRequest.title')
            :  t('general.refuse.title')
        }
        onConfirmDialogClose={handleNotifyClose}/>}
      
    </div>
  );
}
