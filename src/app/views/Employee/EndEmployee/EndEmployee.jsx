import {
  Button,
  IconButton,
  Input,
  InputAdornment,
  TextField,
  Icon,
} from "@material-ui/core";
import { Notifications, Visibility } from "@material-ui/icons";
import TablePagination from "@material-ui/core/TablePagination";
import { Breadcrumb, ConfirmationDialog, ShowDialog } from "egret";
import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import MaterialTable from "material-table";
import SaveIcon from '@material-ui/icons/Save';
import { useDispatch, useSelector } from "react-redux";
import {
  setEmployee,
  getEmployees,
  deleteEmployee,
} from "app/redux/actions/EmployeeActions";
import {
  ACTION_EMPLOYEE,
  STATUS_EMPLOYEE,
} from "app/constants/employeeConstants";
import { employeesColumns } from "app/components/CustomColumns";
import CustomTable from "app/components/CustomTable";
import ProfileEmployeeDialog from "../ProfileEmployee/ProfileEmployee";
import EndEmployeeDialog from "./EndEmployeeDialog";

export default function Employee({ t }) {
  const [keyword, setKeyword] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [showDialogEndEmployee, setShowDialogEndEmployee] = useState(false);
 
  const { employeeList, totalElements,employee,success } = useSelector(
    (state) => state.employee
  );

  const dispatch = useDispatch();

  const searchEmployees = () => {
    const payload = {
      keyword,
      pageIndex: pageIndex + 1,
      pageSize,
      listStatus: STATUS_EMPLOYEE.END,
    };
    dispatch(getEmployees(payload));
  };
  useEffect(() => {
    searchEmployees();
  }, [pageIndex, pageSize,success]); 

  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = () => {
    searchEmployees();
  }; 
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchEmployees();
    }
  }; 

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageIndex(0);
  };
  const handleChangePage = (event, newPage) => {
    setPageIndex(newPage);
  };

  const handleViewEmployee = (employee) => {
    setShowProfile(true);
    dispatch(setEmployee(employee));
  };

  const handleViewEmployeeClose = () => {
    setShowProfile(false);
  };


  const handleDialogEndEmployee=(employee)=>{
    setShowDialogEndEmployee(true)
    dispatch(setEmployee(employee));
  }

  const handleDialogEndEmployeeClose=()=>{
    setShowDialogEndEmployee(false)
  }
  

  const columns = employeesColumns(t,(rowData) => (
    <div>
      <IconButton
        fontSize="small"
        color="secondary"
        onClick={() => handleViewEmployee(rowData)}
      >
        <Icon>
          <Visibility />
        </Icon>
      </IconButton>  
      {ACTION_EMPLOYEE.END.includes(rowData.submitProfileStatus) &&  <IconButton
        fontSize="small"
        color="primary"
        onClick={() => handleDialogEndEmployee(rowData)}
      >
        <Icon>
         <SaveIcon/>
        </Icon>
      </IconButton>   }
    </div>
  ));
  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[{ name: t("Dashboard.employee_manage.end") }]}
        />
      </div>

      <div className="flex flex-space-between flex-middle mb-20">
        <Input
          className="w-50 ml-auto"
          placeholder={t('general.enterSearch')}
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

      <CustomTable
        data={employeeList}
        columns={columns}
        pageSize={pageSize}
        pageIndex={pageIndex}
        t={t}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        count={totalElements}
        paging={true}
      />

      <ProfileEmployeeDialog
        open={showProfile}
        handleClose={handleViewEmployeeClose}
        t={t}
        employee={employee}
      />

     {showDialogEndEmployee &&  <EndEmployeeDialog t={t} employee={employee}  open={showDialogEndEmployee}  handleClose={handleDialogEndEmployeeClose}/>}
    </div>
  );
}
