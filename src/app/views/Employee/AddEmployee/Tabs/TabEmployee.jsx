import { Button, Grid } from "@material-ui/core";
import {Avatar} from "@material-ui/core";
import React, { useEffect } from "react";
import ConstantList from "app/appConfig";
import { toast } from "react-toastify";
import { uploadImage } from "app/services/EmployeeService";
import { convertTimeToDate, statusCode } from "utils";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { GENDER, TEAMS } from "app/constants/employeeConstants";
import  {MenuItem} from '@material-ui/core'
import { useDispatch } from "react-redux";
import { addEmployee, updateEmployee } from "app/redux/actions/EmployeeActions";
import moment from "moment";
import {
    addAddressValidationRule,
    addAgeValidationRule,
    addEmailValidationRule,
    addEmployeeIdValidationRule,
    addFullNameValidationRule,
    addIdentityCardValidationRule,
    addPhoneValidationRule,
    removeAddressValidationRule,
    removeAgeValidationRule,
    removeEmailValidationRule,
    removeEmployeeIdValidationRule,
    removeFullNameValidationRule,
    removeIdentityCardValidationRule,
    removePhoneValidationRule,
  } from "app/validator";
export default function TabEmployee({
    t,
    refFormAddEmployee,
    setEmployee,
    employee,
    handleClose,
}) {
    const dispatch=useDispatch();
    useEffect(() => {
        addEmployeeIdValidationRule();
        addPhoneValidationRule();
        addIdentityCardValidationRule();
        addAgeValidationRule();
        addEmailValidationRule();
        addFullNameValidationRule();
        addAddressValidationRule()
    
        return () => {
          removeEmployeeIdValidationRule();
          removePhoneValidationRule();
          removeIdentityCardValidationRule();
          removeAgeValidationRule();
          removeEmailValidationRule();
          removeFullNameValidationRule();
          removeAddressValidationRule()
        };
      }, []);
    const handleChangeImage = async (event) => {
        const file = event.target.files[0];
    
        if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
            
        if (file.size > 10 * 1024 * 1024) { 
          toast.error("Kích thước của tệp ảnh quá lớn. Vui lòng chọn một tệp ảnh nhỏ hơn 10MB.");
          event.target.value = null; 
          return; 
        }
          const formData = new FormData();
          formData.append("file", file);
          try {
            const response = await uploadImage(formData);
    
            if (response?.status === statusCode.SUCCESS) {
              const imageUrl =
                response?.data &&
                `${ConstantList.API_ENPOINT}/public/image/${response?.data?.name}`;
              setEmployee((prev) => ({ ...prev, image: imageUrl }));
            } else {
              console.error("Upload failed");
            }
          } catch (error) {
            console.error("Error during upload:", error);
          }
        } else {
          toast.error("Vui lòng chọn một tệp ảnh JPG hoặc PNG.");
          event.target.value = null;
        }
      };

      const handleChangInput = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
      };
      
    
      const handleSubmit = () => {
        const payload = {
          ...employee,
          employeeFamilyDtos: [],
          certificatesDto: [],
        };
        
        if (employee?.id) {
          dispatch(updateEmployee(employee));
         handleClose();
        } else {
          dispatch(addEmployee(payload));
           
        }
      };

      
  return (
    <div>
       <ValidatorForm ref={refFormAddEmployee} onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3} className="text-center">
          <Avatar
            alt="avatar"
            src={
              employee?.image
                ? employee?.image
                : ConstantList.ROOT_PATH + "assets/images/avatar.jpg"
            }
            className="w-140 h-140 m-auto"
          />

          <Button variant="contained" color="primary" component="label">
            {t("general.choosePhoto")}
            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleChangeImage}
              className=" display-none"
              name="image"
            />
          </Button>
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid container spacing={2} className="mb-20">
            <Grid item xs={12} sm={5} md={3}>
              <TextValidator
                variant="outlined"
                size={'small'}
                label={
                  <span>
                    <span className="text-error">*</span>
                    {t("staff.code")}
                  </span>
                }
                value={employee?.code || ""}
                onChange={handleChangInput}
                className="w-100 "
                name="code"
                validators={["required", "isEmployeeIdValid"]}
                errorMessages={[
                  t("general.required"),
                  "Mã nhân không đúng định dạng(NV+2 số cuối của năm+3 số)",
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={7} md={5}>
              <TextValidator
                variant="outlined"
                size={'small'}
                label={
                  <span>
                    <span className="text-error">*</span>
                    {t("staff.name")}
                  </span>
                }
                value={employee?.name || ""}
                onChange={handleChangInput}
                className="w-100"
                name="name"
                validators={["required",'isFullNameValid']}
                errorMessages={[t("general.required"),"Họ và tên không được chứa số và ký tự đặc biệt"]}
              />
            </Grid>
            <Grid item xs={12} sm={3} md={2}>
              <TextValidator
                variant="outlined"
                size={'small'}
                label={
                  <span>
                    <span className="text-error">*</span> 
                    {t("staff.gender.title")}
                  </span>
                }
                select
                value={employee?.gender === null || employee?.gender === undefined ? '': employee?.gender}
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

            <Grid item xs={12} sm={4} md={2}>
              <TextValidator
                variant="outlined"
                size={'small'}
                label={
                  <span>
                    <span className="text-error">*</span>
                    {t("staff.dateOfBirth")}
                  </span>
                }
                type="date"
                value={
                  typeof employee?.dateOfBirth === "string"
                    ? employee?.dateOfBirth
                    : convertTimeToDate(employee?.dateOfBirth) || ""
                }
                onChange={handleChangInput}
                className="w-100"
                InputLabelProps={{
                  shrink: true,
                }}
                name="dateOfBirth"
                validators={["required", "isAgeValid"]}
                errorMessages={[t("general.required"), "Bạn chưa đủ 18 tuổi"]}
                inputProps={{
                  max: moment().format("YYYY-MM-DD"),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={5} md={3}>
              <TextValidator
                variant="outlined"
                size={'small'}
                label={
                  <span>
                    <span className="text-error">*</span> 
                    {t("staff.phone")}
                  </span>
                }
                value={employee?.phone || ""}
                onChange={handleChangInput}
                className="w-100"
                name="phone"
                validators={["required", "isPhoneNumberValid"]}
                errorMessages={[
                  t("general.required"),
                  "Số điện thoại phải bắt đầu từ chữ số 0 và có 10 chữ số",
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={3} md={2}>
              <TextValidator
                variant="outlined"
                size={'small'}
                label={
                  <span>
                    <span className="text-error">*</span>
                    {t("staff.team")}
                  </span>
                }
                select
                value={employee?.team ===null ||employee?.team ===undefined? "":employee?.team}
                onChange={handleChangInput}
                className="w-100"
                name="team"
                validators={["required"]}
                errorMessages={[t("general.required")]}
              >
                {TEAMS.map((item, index) => {
                  return (
                    <MenuItem value={item.value} key={item.value}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </TextValidator>
            </Grid>

            <Grid item xs={12} sm={4} md={3}>
              <TextValidator
                variant="outlined"
                size={'small'}
                label={
                  <span>
                    <span className="text-error">*</span>
                    {t("staff.citizenIdentificationNumber")}
                  </span>
                }
                value={employee?.citizenIdentificationNumber || ""}
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
            <Grid item xs={12} sm={3} md={2}>
              <TextValidator
                variant="outlined"
                size={'small'}
                label={
                  <span>
                    <span className="text-error">*</span>
                    {t("staff.dateOfIssuanceCard")}
                  </span>
                }
                type="date"
                value={
                  typeof employee?.dateOfIssuanceCard === "string"
                    ? employee?.dateOfIssuanceCard
                    : convertTimeToDate(employee?.dateOfIssuanceCard) || ""
                }
                onChange={handleChangInput}
                className="w-100"
                InputLabelProps={{
                  shrink: true,
                }}
                name="dateOfIssuanceCard"
                validators={["required"]}
                errorMessages={[t("general.required")]}
                inputProps={{
                  max: moment().format("YYYY-MM-DD"),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={2}md={2}>
              <TextValidator
                variant="outlined"
                size={'small'}
                label={
                  <span>
                    <span className="text-error">*</span>
                    {t("staff.placeOfIssueCard")}
                  </span>
                }
                value={employee?.placeOfIssueCard || ""}
                onChange={handleChangInput}
                className="w-100"
                name="placeOfIssueCard"
                validators={["required",'isAddressValid']}
                errorMessages={[t("general.required"),'Nơi cấp không hợp lệ']}
              />
            </Grid>

            <Grid item xs={12} sm={4} md={3}>
              <TextValidator
                variant="outlined"
                size={'small'}
                label={
                  <span>
                    <span className="text-error">*</span>
                    {t("staff.email")}
                  </span>
                }
                value={employee?.email || ""}
                onChange={handleChangInput}
                className="w-100"
                name="email"
                validators={["required", "isEmailValid"]}
                errorMessages={[t("general.required"), "Email không hợp lệ"]}
              />
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <TextValidator
                variant="outlined"
                size={'small'}
                label={
                  <span>
                    <span className="text-error">*</span>
                    {t("staff.address")}
                  </span>
                }
                value={employee?.address || ""}
                onChange={handleChangInput}
                className="w-100"
                name="address"
                validators={["required",'isAddressValid']}
                errorMessages={[t("general.required",),'Địa chỉ không hợp lệ']}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ValidatorForm>
       
    </div>
  );
}
