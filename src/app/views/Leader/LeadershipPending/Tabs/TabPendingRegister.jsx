import { Icon, IconButton, Input, InputAdornment } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import CustomTable from "app/components/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees, setEmployee } from "app/redux/actions/EmployeeActions";
import { ACTION_EMPLOYEE, STATUS_EMPLOYEE } from "app/constants/employeeConstants";
import { employeesColumns } from "app/components/CustomColumns";
import { Visibility } from "@material-ui/icons";
import ProfileEmployee from "app/views/Employee/ProfileEmployee/ProfileEmployee";
export default function TabPendingRegister({t}) {
   const [keyword,setKeyword]=useState('')
   const [pageSize, setPageSize] = useState(10);
   const [pageIndex, setPageIndex] = useState(0);
   const [showProfile,setShowProfile]=useState(false)
    const {employeeList,totalElements,employee,success}=useSelector(state=>state.employee);
     const dispatch=useDispatch();

    
    useEffect(()=>{
      searchEmployees()
    },[success])

  const searchEmployees = () => {
    const payload = {
      keyword,
      pageIndex: pageIndex + 1,
      pageSize,
      listStatus: STATUS_EMPLOYEE.PENDING,
    };
    dispatch(getEmployees(payload));
  };
  
   const handleChangeKeyword=(e)=>{
    setKeyword(e.target.value);
   }
   const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageIndex(0);
  };
  const handleChangePage = (event, newPage) => {
    setPageIndex(newPage);
  };

   const handleKeyDown=(e)=>{
    if (e.key === "Enter") {
      searchEmployees();
    }
   }

   const handleViewEmployee=(employee)=>{
          setShowProfile(true)
          dispatch(setEmployee(employee))
   }
 
   const handleProfileClose=()=>{
    setShowProfile(false)
    dispatch(setEmployee({}))
   }
   const handleDialogLetter=()=>{

   }
  
   const columns = employeesColumns(t,(rowData) => (
    <div>

      
      {ACTION_EMPLOYEE.PENDING_END.includes(rowData.submitProfileStatus) && (
        <IconButton
          fontSize="small"
          color="secondary"
          onClick={() => handleViewEmployee(rowData)}
        >
          <Visibility />
        </IconButton>
      )}
      <IconButton
        fontSize="small"
        color="primary"
        onClick={() =>
          ACTION_EMPLOYEE.PENDING_END.includes(rowData.submitProfileStatus)
            ? handleDialogLetter(rowData)
            : handleViewEmployee(rowData)
        }
      >
        <Icon>
          <Icon>edit</Icon>
        </Icon>
      </IconButton>
    </div>
  ));
   
  return   <div className="m-sm-30">
  
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
            onClick={() => searchEmployees()}
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
      {showProfile && <ProfileEmployee t={t} open={showProfile} employee={employee} handleClose={handleProfileClose}/> }
  </div>
}
