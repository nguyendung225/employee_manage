import {
  Button,
  IconButton,
  Input,
  InputAdornment,
  TextField,
  Icon,
} from "@material-ui/core";
import { Visibility } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  getEmployeeById,
  setEmployee,
} from "app/redux/actions/EmployeeActions";

import { salaryColoums } from "app/components/CustomColumns";
import CustomTable from "app/components/CustomTable";
import ProfileEmployee from "app/views/Employee/ProfileEmployee/ProfileEmployee";
import { getSalaryListByLeader } from "app/redux/actions/SalaryActions";
import SalaryInfoDialog from "app/views/Employee/EmployeeDocuments/SalaryInfoDialog";
import { searchDataByKeyword } from "utils";

export default function TabPendingSalary({ t }) {
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [showDialogSalary, setShowDialogSalary] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [salary, setSalary] = useState({});
  const [salaryList, setSalaryList] = useState([]);
  const { salaryListByLeader, success } = useSelector((state) => state.salary);

  const { employee } = useSelector((state) => state.employee);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSalaryListByLeader());
  }, [success]); 
  useEffect(() => {
    salaryListByLeader.length > 0 && setSalaryList(salaryListByLeader);
  }, [salaryListByLeader]);
  useEffect(() => {
    let newListSalary = [...salaryListByLeader];
    newListSalary = newListSalary.slice(
      pageIndex * pageSize,
      pageIndex * pageSize + pageSize
    );
    setSalaryList(newListSalary);
  }, [pageSize, pageIndex, salaryListByLeader]);

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageIndex(0);
  };
  const handleChangePage = (event, newPage) => {
    setPageIndex(newPage);
  };

  const handleDialogSalary = (salary) => {
    setShowDialogSalary(true);
    salary && dispatch(getEmployeeById(salary?.employeeId));
    setSalary(salary);
  };
  const handleDialogSalaryClose = () => {
    setShowDialogSalary(false);
  };

  const handleViewEmployee = (salary) => {
    setShowProfile(true);
    dispatch(getEmployeeById(salary?.employeeId));
  };

  const handleViewEmployeeClose = () => {
    setShowProfile(false);
  };

  const columns = salaryColoums(t,(rowData) => (
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

      <IconButton
        fontSize="small"
        color="primary"
        onClick={() => handleDialogSalary(rowData)}
      >
        <Icon>edit</Icon>
      </IconButton>
    </div>
  ));

  const handleSearch = () => {
    let newListSalary = [...salaryListByLeader];
    newListSalary = searchDataByKeyword(newListSalary, keyword);

    setSalaryList(newListSalary);
  };
  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="m-sm-30">
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
        data={salaryList}
        columns={columns}
        pageSize={pageSize}
        pageIndex={pageIndex}
        t={t}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        count={salaryListByLeader.length}
        paging={true}
      />
      {showProfile && (
        <ProfileEmployee
          open={showProfile}
          handleClose={handleViewEmployeeClose}
          t={t}
          employee={employee}
        />
      )}

      {showDialogSalary && (
        <SalaryInfoDialog
          open={showDialogSalary}
          handleClose={handleDialogSalaryClose}
          t={t}
          employee={employee}
          isManage={true}
          salary={salary}
        />
      )}
    </div>
  );
}
