import { Avatar, Button, Icon } from "@material-ui/core";
import React, { useState } from "react";
import ConstantList from "app/appConfig";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PhoneIcon from "@material-ui/icons/Phone";
import { formatDate } from "utils";
import "styles/views/_TabCV.scss";
import {
  ACTION_EMPLOYEE,
  GENDER,
  STATUS_EMPLOYEE,
  TEAMS,
} from "app/constants/employeeConstants";
import ExperienceDialog from "../ExperienceDialog";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { updateEmployee } from "app/redux/actions/EmployeeActions";
import { deleteExperience } from "app/redux/actions/ExperienceActions";
import { ConfirmationDialog } from "egret";
export default function TabCV({
  t,
  employee,
  experiences,
  certificates,
}) {
  const [isExperience, setIsExperience] = useState(false);
  const [experience, setExperience] = useState({});
  const [skill, setSkill] = useState(employee?.skill);
  const [isEditSkill, setIsEditSkill] = useState(false);
  const [active, setActive] = useState(employee?.active);
  const [isEditActive, setIsEditActive] = useState(false);
  const [id,setId]=useState(null)
  const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] =
  useState(false);
  const handleExperienceDialog = (experience) => {
    setIsExperience(true);
    setExperience(experience);
  };
  const dispatch = useDispatch();
  const handleCloseExperience = () => {
    setIsExperience(false);
    setExperience({});
  };

  const handleEditSkill = () => {
    setIsEditSkill(true);
  };

  const handleChangeSkill = (e) => {
    setSkill(e.target.value);
  };

  const handleEditSkillClose = () => {
    setIsEditSkill(false);
  };

  const handleSubmitSkill = () => {
    const payload = { ...employee, skill };
    dispatch(updateEmployee(payload));
    handleEditSkillClose();
  };

  const handleCancelSkill = () => {
    handleEditSkillClose();
  };

  const handleEditActive = () => {
    setIsEditActive(true);
  };
  const handleChangeActive = (e) => {
    setActive(e.target.value);
  };

  const handleEditActiveClose = () => {
    setIsEditActive(false);
  };

  const handleSubmitActive = () => {
    const payload = { ...employee, active };
    dispatch(updateEmployee(payload));
    handleEditActiveClose();
  };

  const handleCancelActive = () => {
    handleEditActiveClose();
  };


  
  const handleDialogConfirm = (experience) => { 
    console.log(experience)
    setShouldOpenConfirmationDialog(true);
    setId(experience?.id);
  };

  const handleConfirmationResponse = () => {
    dispatch(deleteExperience(id));
    handleDialogConfirmationClose();
  };

  const handleDialogConfirmationClose = () => {
    setShouldOpenConfirmationDialog(false);
    setId(null);
  };
  return (
    <div className="">
      <div className="flex">
        <div className="left">
          <Avatar
            alt="avatar"
            src={
              employee?.image ||
              ConstantList.ROOT_PATH + "assets/images/avatar.jpg"
            }
            className="avatar"
          />
          <div className="w-80 text-right ">
            <div className="flex flex-middle flex-end">
              <MailOutlineIcon />
              <div className="ml-10">{employee?.email}</div>
            </div>
            <div className="flex flex-middle flex-end mt-10">
              <PhoneIcon />
              <div className="ml-10">{employee?.phone}</div>
            </div>
          </div>
          <div className="skills mt-50">
            <div className="title">
              Kỹ năng
              {ACTION_EMPLOYEE.EDIT.includes(employee?.submitProfileStatus) &&
                STATUS_EMPLOYEE.ADD.includes(employee?.submitProfileStatus) && (
                  <IconButton onClick={() => handleEditSkill()}>
                    <Icon fontSize="small" color="primary">
                      edit
                    </Icon>
                  </IconButton>
                )}
            </div>
            {isEditSkill && (
              <div>
                <textarea
                  value={skill || ""}
                  onChange={handleChangeSkill}
                ></textarea>
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSubmitSkill()}
                  className="mx-10"
                >
                  {t("general.save")}
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  type="button"
                  onClick={() => handleCancelSkill()}
                >
                  {t("general.cancel")}
                </Button>
              </div>
            )}
            {!isEditSkill && (
              <ul>
                {skill?.split("\n").map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="language">
            <div className="title">Ngoại ngữ</div>
            <ul>
              <div className=" flex flex-middle flex-space-between w-80">
                {" "}
                <li>Tiếng anh</li>{" "}
                <div className=" flex flex-middle">
                  <div className="mr-20 dot"></div>
                  <div className="mr-20 dot"></div>
                  <div className="mr-20 dot"></div>
                </div>
              </div>
              <div className=" flex flex-middle flex-space-between w-80">
                <li>Tiếng trung</li>{" "}
                <div className=" flex flex-middle">
                  <div className="mr-20 dot"></div>{" "}
                  <div className="mr-20 dot"></div>
                  <div className="mr-20 dot outline"></div>
                </div>
              </div>
            </ul>
          </div>
          <div className="actions">
            <div className="title">
              Hoạt động
              {ACTION_EMPLOYEE.EDIT.includes(employee?.submitProfileStatus) &&
                STATUS_EMPLOYEE.ADD.includes(employee?.submitProfileStatus) && (
                  <IconButton onClick={() => handleEditActive()}>
                    <Icon fontSize="small" color="primary">
                      edit
                    </Icon>
                  </IconButton>
                )}
            </div>
            {isEditActive && (
              <div>
                <textarea
                  value={active}
                  onChange={handleChangeActive}
                ></textarea>{" "}
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSubmitActive()}
                  className="mx-10"
                >
                  {t("general.save")}
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  type="button"
                  onClick={handleCancelActive}
                >
                  {t("general.cancel")}
                </Button>
              </div>
            )}
            {!isEditActive && (
              <ul>
                {active?.split("\n").map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="right">
          <div className="head">
            <div className="name">{employee?.name}</div>
            <div className="job">
              {TEAMS.find((item) => item.value === employee?.team)?.name}
            </div>
          </div>
          <div className="info ">
            <div className="my-8 ">
              <img
                src={ConstantList.ROOT_PATH + "assets/images/gender.png"}
                alt="gender"
                className="gender"
              />
              <span className="ml-4">
                {t(
                  `staff.gender.${
                    GENDER.find((item) => item.value === employee?.gender)?.name
                  }`
                )}
              </span>
            </div>
            <div className="my-8 ">
              <img
                src={ConstantList.ROOT_PATH + "assets/images/cake.png"}
                alt="cake"
                className="cake"
              />
              <span className="ml-4">{formatDate(employee?.dateOfBirth)}</span>
            </div>
            <div className="my-8 ">
              <img
                src={ConstantList.ROOT_PATH + "assets/images/location.png"}
                alt="location"
                className="location"
              />
              <span className="ml-4">{employee?.address}</span>
            </div>
          </div>
          <div className="goal">
            <div className="title">Mục tiêu nghề nghiệp</div>
            <div className="description">
              Áp dụng những kinh nghiệm về kỹ năng bán hàng và sự hiểu biết về
              thị trường để trở thành một nhân viên bán hàng chuyên nghiệp, mang
              đến nhiều giá trị cho khách hàng. Từ đó giúp Công ty tăng số lượng
              khách hàng và mở rộng tập khách hàng.
            </div>
          </div>

          <div className="experience ">
            <div className="title ">
              {" "}
              <div className="flex flex-middle">
                Kinh nghiệm làm việc
                {ACTION_EMPLOYEE.EDIT.includes(employee?.submitProfileStatus) &&
                  STATUS_EMPLOYEE.ADD.includes(
                    employee?.submitProfileStatus
                  ) && (
                    <IconButton onClick={() => handleExperienceDialog()}>
                      <Icon fontSize="small" color="primary">
                        <AddCircleIcon />
                      </Icon>
                    </IconButton>
                  )}
              </div>
            </div>
            <div>
              {experiences?.map((experience, index) => (
                <>
                  <div className="description">
                    <span>
                      {formatDate(experience?.startDate).slice(3)} -{" "}
                      {formatDate(experience?.endDate).slice(3)}
                    </span>{" "}
                    <span className="dot">.</span>{" "}
                    <span> {experience?.companyAddress}</span>
                  </div>
                  <div className="job">{experience?.companyName}
                  {ACTION_EMPLOYEE.EDIT.includes(
                        employee?.submitProfileStatus
                      ) &&
                        STATUS_EMPLOYEE.ADD.includes(
                          employee?.submitProfileStatus
                        ) && (
                          <IconButton
                            onClick={() => handleExperienceDialog(experience)}
                          >
                            <Icon fontSize="small" color="primary">
                              edit
                            </Icon>
                          </IconButton>
                        )}
                      {ACTION_EMPLOYEE.EDIT.includes(
                        employee?.submitProfileStatus
                      ) &&
                        STATUS_EMPLOYEE.ADD.includes(
                          employee?.submitProfileStatus
                        ) && (
                          <IconButton
                            onClick={() => handleDialogConfirm(experience)}
                          >
                            <Icon fontSize="small" color="error">
                              delete
                            </Icon>
                          </IconButton>
                        )}</div>
                  {experience?.jobDescription.split("\n").map((description) => {
                    return (
                      <ul className="skills">
                        <li>{description}</li>
                      </ul>
                    );
                  })}
                </>
              ))}
            </div>
          </div>

          <div className="certificate">
            <div className="title">Chứng chỉ</div>
            {certificates?.map((item, index) => (
              <ul>
                {console.log(employee)}
                <li>{item.certificateName}</li>
              </ul>
            ))}
          </div>
        </div>
      </div>
      {isExperience && (
        <ExperienceDialog
          open={isExperience}
          handleClose={handleCloseExperience}
          t={t}
          employee={employee}
          experienceData={experience}
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
    </div>
  );
}
