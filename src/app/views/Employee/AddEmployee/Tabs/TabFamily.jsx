import { Button, Grid, Icon, IconButton, MenuItem } from "@material-ui/core";
import { familyColoums } from "app/components/CustomColumns";
import CustomTable from "app/components/CustomTable";
import { GENDER, RELATIONSHIP } from "app/constants/employeeConstants";
import { addEmployee } from "app/redux/actions/EmployeeActions";
import { addFamily, deleteFamily, getFamilies, updateFamily } from "app/redux/actions/FamilyActions";
import { ConfirmationDialog } from "egret";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useDispatch, useSelector } from "react-redux";
import { convertTimeToDate } from "utils";
import {
  addAddressValidationRule,
  addAgeValidationRule,
  addEmailValidationRule,
  addFullNameValidationRule,
  addIdentityCardValidationRule,
  addPhoneValidationRule,
  removeAddressValidationRule,
  removeAgeValidationRule,
  removeEmailValidationRule,
  removeFullNameValidationRule,
  removeIdentityCardValidationRule,
  removePhoneValidationRule,
} from "app/validator";
export default function TabFamily({t,employee}) {
  const [family,setFamily]=useState({})
  const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] =
  useState(false);
const [id, setId] = useState(null);
  const dispatch=useDispatch();
  const {familyList,success}=useSelector(state=>state.family);
  
  useEffect(() => {
    addPhoneValidationRule();
    addIdentityCardValidationRule();
    addAgeValidationRule();
    addEmailValidationRule();
    addFullNameValidationRule();
    addAddressValidationRule()

    return () => {
      removePhoneValidationRule();
      removeIdentityCardValidationRule();
      removeAgeValidationRule()
      removeEmailValidationRule();
      removeFullNameValidationRule()
      removeAddressValidationRule()
    };
  }, []);
  useEffect(()=>{
     dispatch(getFamilies(employee?.id))
  },[employee?.id,success])
  const handleChangInput=(e)=>{
      setFamily({...family,[e.target.name]:e.target.value})
  }

  const handleSubmit=()=>{
    if (family?.id) {
      dispatch(updateFamily(family));
    } else {
      const payloay = {
        id: employee?.id,
        data: [{ ...family }],
      };
      dispatch(addFamily(payloay));
    }
    setFamily({});
  }

  const handleCancel=()=>{
    setFamily({})
  }

  const handleDialogCertificate=(family)=>{
      setFamily(family)
  }

  const handleDialogConfirm=(family)=>{
      setShouldOpenConfirmationDialog(true)
      setId(family?.id)
  }

  const handleConfirmationResponse = () => {
    dispatch(deleteFamily(id));
    handleDialogConfirmationClose();
  };

  const handleDialogConfirmationClose = () => {
    setFamily({});
    setId(null);
    setShouldOpenConfirmationDialog(false);
  };

  const columns=familyColoums(t,(rowData)=>(
    <div>
    <IconButton onClick={() => handleDialogCertificate(rowData)}>
      <Icon fontSize="small" color="primary">
        edit
      </Icon>
    </IconButton>

    <IconButton onClick={() => handleDialogConfirm(rowData)}>
      <Icon fontSize="small" color="error">
        delete
      </Icon>
    </IconButton>
  </div>
  ))
  return <div>
    <ValidatorForm onSubmit={handleSubmit}>
        <Grid container spacing={2} className="mb-20">
          <Grid item xs={12} sm={8} md={5} lg={4}>
            <TextValidator
              variant="outlined"
              size={'small'}
              label={
                <span>
                  <span className="text-error">*</span>
                  {t("family.name")}
                </span>
              }
              value={family?.name || ""}
              onChange={handleChangInput}
              className="w-100"
              name="name"
              validators={["required",'isFullNameValid']}
              errorMessages={[t("general.required"),'Họ và tên không được chứa số và ký tự đặc biệt']}
            />
          </Grid>
          <Grid item xs={12} sm={4}  md={2} lg={2}>
            <TextValidator
              variant="outlined"
              size={'small'}
              label={
                <span>
                  <span className="text-error">*</span>
                  {t("family.dateOfBirth")}
                </span>
              }
              type="date"
              value={
                typeof family?.dateOfBirth === "string"
                  ? family?.dateOfBirth
                  : convertTimeToDate(family?.dateOfBirth) || ""
              }
              onChange={handleChangInput}
              className="w-100"
              InputLabelProps={{
                shrink: true,
              }}
              name="dateOfBirth"
              validators={["required"]}
              errorMessages={[t("general.required")]}
              inputProps={{
                max: moment().format("YYYY-MM-DD"),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}  md={2} lg={1}>
            <TextValidator
              variant="outlined"
              size={'small'}
              label={
                <span>
                  <span className="text-error">*</span>
                  {t("family.gender")}
                </span>
              }
              select
              value={family?.gender===null || family?.gender===undefined?"": family?.gender}
              onChange={handleChangInput}
              className="w-100"
              name="gender"
              validators={["required"]}
              errorMessages={[t("general.required")]}
            >
              {GENDER.map((item, index) => {
                return (
                  <MenuItem value={item.value} key={item.value}>
                    {t(`staff.gender.${item.name}`)}
                  </MenuItem>
                );
              })}
            </TextValidator>
          </Grid>

          <Grid item xs={12} sm={4}  md={3} lg={2}>
            <TextValidator
              variant="outlined"
              size={'small'}
              label={
                <span>
                  <span className="text-error">*</span>
                  {t("family.phoneNumber")}
                </span>
              }
              value={family?.phoneNumber || ""}
              onChange={handleChangInput}
              className="w-100"
              name="phoneNumber"
              validators={["required", "isPhoneNumberValid"]}
              errorMessages={[
                t("general.required"),
                "Số điện thoại phải bắt đầu từ chữ số 0 và có 10 chữ số",
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={5} md={3} lg={3}>
            <TextValidator
              variant="outlined"
              size={'small'}
              label={
                <span>
                  <span className="text-error">*</span>
                  {t("family.citizenIdentificationNumber")}
                </span>
              }
              value={family?.citizenIdentificationNumber || ""}
              onChange={handleChangInput}
              className="w-100"
              name="citizenIdentificationNumber"
              validators={["required", "isIdentityCardValid"]}
              errorMessages={[
                t("general.required"),
                "Căn cước công dân phải có 9 hoặc 12 chữ số",
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={3} md={2} lg={2}>
            <TextValidator
              variant="outlined"
              size={'small'}
              label={
                <span>
                  <span className="text-error">*</span>
                  {t("family.relationShip.title")}
                </span>
              }
              select
              value={family?.relationShip===null || family?.relationShip===undefined?"":family?.relationShip}
              onChange={handleChangInput}
              className="w-100"
              name="relationShip"
              validators={["required"]}
              errorMessages={[t("general.required")]} 
            >
              {RELATIONSHIP.map((item, index) => {
                return (
                  <MenuItem value={item.value} key={item.value}>
                    {t(`family.relationShip.${item.name}`)}
                  </MenuItem>
                );
              })}
            </TextValidator>
          </Grid>

          <Grid item xs={12} sm={4} md={3} lg={3}>
            <TextValidator
              variant="outlined"
              size={'small'}
              label={
                <span>
                  <span className="text-error">*</span>
                  {t("family.email")}
                </span>
              }
              value={family?.email || ""}
              onChange={handleChangInput}
              className="w-100"
              name="email"
              validators={["required", "isEmailValid"]}
              errorMessages={[t("general.required"), "Email không hợp lệ"]}
            />
          </Grid>
          <Grid item xs={12} sm={5} md={4}  lg={5}>
            <TextValidator
              variant="outlined"
              size={'small'}
              label={
                <span>
                  <span className="text-error">*</span>
                  {t("family.address")}
                </span>
              }
              value={family?.address || ""}
              onChange={handleChangInput}
              className="w-100"
              name="address"
              validators={["required",'isAddressValid']}
              errorMessages={[t("general.required",),'Địa chỉ không hợp lệ']}
            />
          </Grid>

          <Grid
            item
            xs={12}
            lg={2}
            className="flex flex-center text-center mt-auto "
          >
            <Button variant="contained" color="primary" type="submit"   className="mr-12">
              {t("general.save")}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              type="button"
              onClick={handleCancel}
            >
              {t("general.cancel")}
            </Button>
          </Grid>
        </Grid>
      </ValidatorForm>
      <div className="mt-40">
          <CustomTable data={familyList} t={t} columns={columns} />
      </div>
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
  </div>;
}
