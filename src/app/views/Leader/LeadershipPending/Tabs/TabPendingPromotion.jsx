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

import { promotionColoums } from "app/components/CustomColumns";
import CustomTable from "app/components/CustomTable";
import ProfileEmployee from "app/views/Employee/ProfileEmployee/ProfileEmployee";
import { getPromotionListByLeader } from "app/redux/actions/PromotionActions";
import PromotionInfoDialog from "app/views/Employee/EmployeeDocuments/PromotionInfoDialog";
import { searchDataByKeyword } from "utils";

export default function TabPendingPromotion({ t }) {
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [showDialogPromotion, setShowDialogPromotion] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [promotion, setPromotion] = useState({});
  const [promotionList, setPromotionList] = useState([]);
  const { promotionListByLeader, success } = useSelector((state) => state.promotion);

  const { employee } = useSelector((state) => state.employee);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPromotionListByLeader());
  }, [success]); 
  useEffect(() => {
    promotionListByLeader.length > 0 && setPromotionList(promotionListByLeader);
  }, [promotionListByLeader]);
  useEffect(() => {
    let newListPromotion = [...promotionListByLeader];
    newListPromotion = newListPromotion.slice(
      pageIndex * pageSize,
      pageIndex * pageSize + pageSize
    );
    setPromotionList(newListPromotion);
  }, [pageSize, pageIndex, promotionListByLeader]);

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageIndex(0);
  };
  const handleChangePage = (event, newPage) => {
    setPageIndex(newPage);
  };

  const handleDialogPromotion = (promotion) => {
    setShowDialogPromotion(true);
    promotion && dispatch(getEmployeeById(promotion?.employeeId));
    setPromotion(promotion);
  };
  const handleDialogPromotionClose = () => {
    setShowDialogPromotion(false);
  };

  const handleViewEmployee = (promotion) => {
    setShowProfile(true);
    dispatch(getEmployeeById(promotion?.employeeId));
  };

  const handleViewEmployeeClose = () => {
    setShowProfile(false);
  };

  const columns = promotionColoums(t,(rowData) => (
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
        onClick={() => handleDialogPromotion(rowData)}
      >
        <Icon>edit</Icon>
      </IconButton>
    </div>
  ));

  const handleSearch = () => {
    let newListPromotion = [...promotionListByLeader];
    newListPromotion = searchDataByKeyword(newListPromotion, keyword);

    setPromotionList(newListPromotion);
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
        data={promotionList}
        columns={columns}
        pageSize={pageSize}
        pageIndex={pageIndex}
        t={t}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        count={promotionListByLeader.length}
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

      {showDialogPromotion && (
        <PromotionInfoDialog
          open={showDialogPromotion}
          handleClose={handleDialogPromotionClose}
          t={t}
          employee={employee}
          isManage={true}
          promotion={promotion}
        />
      )}
    </div>
  );
}
