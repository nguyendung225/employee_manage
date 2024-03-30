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

import { proposalColoums } from "app/components/CustomColumns";
import CustomTable from "app/components/CustomTable";
import ProfileEmployee from "app/views/Employee/ProfileEmployee/ProfileEmployee";
import { getProposalListByLeader } from "app/redux/actions/ProposalActions";
import ProposalInfoDialog from "app/views/Employee/EmployeeDocuments/ProposalInfoDialog";
import { searchDataByKeyword } from "utils";

export default function TabPendingProposal({ t }) {
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [showDialogProposal, setShowDialogProposal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [proposal, setProposal] = useState({});
  const [proposalList, setProposalList] = useState([]);
  const { proposalListByLeader, success } = useSelector((state) => state.proposal);

  const { employee } = useSelector((state) => state.employee);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProposalListByLeader());
  }, [success]); 
  useEffect(() => {
    proposalListByLeader.length > 0 && setProposalList(proposalListByLeader);
  }, [proposalListByLeader]);
  useEffect(() => {
    let newListProposal = [...proposalListByLeader];
    newListProposal = newListProposal.slice(
      pageIndex * pageSize,
      pageIndex * pageSize + pageSize
    );
    setProposalList(newListProposal);
  }, [pageSize, pageIndex, proposalListByLeader]);

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageIndex(0);
  };
  const handleChangePage = (event, newPage) => {
    setPageIndex(newPage);
  };

  const handleDialogProposal = (proposal) => {
    setShowDialogProposal(true);
    proposal && dispatch(getEmployeeById(proposal?.employeeId));
    setProposal(proposal);
  };
  const handleDialogProposalClose = () => {
    setShowDialogProposal(false);
  };

  const handleViewEmployee = (proposal) => {
    setShowProfile(true);
    dispatch(getEmployeeById(proposal?.employeeId));
  };

  const handleViewEmployeeClose = () => {
    setShowProfile(false);
  };

  const columns = proposalColoums(t,(rowData) => (
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
        onClick={() => handleDialogProposal(rowData)}
      >
        <Icon>edit</Icon>
      </IconButton>
    </div>
  ));

  const handleSearch = () => {
    let newListProposal = [...proposalListByLeader];
    newListProposal = searchDataByKeyword(newListProposal, keyword);

    setProposalList(newListProposal);
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
        data={proposalList}
        columns={columns}
        pageSize={pageSize}
        pageIndex={pageIndex}
        t={t}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        count={proposalListByLeader.length}
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

      {showDialogProposal && (
        <ProposalInfoDialog
          open={showDialogProposal}
          handleClose={handleDialogProposalClose}
          t={t}
          employee={employee}
          isManage={true}
          proposal={proposal}
        />
      )}
    </div>
  );
}
