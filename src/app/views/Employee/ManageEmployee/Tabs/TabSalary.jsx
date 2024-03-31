import { Button, Grid, Icon, IconButton } from "@material-ui/core";
import { Notifications, Visibility } from "@material-ui/icons";
import { employeesColumns, salaryColoums } from "app/components/CustomColumns";
import CustomTable from "app/components/CustomTable";
import { ACTION_PROCESS } from "app/constants/employeeConstants";
import {
  addSalaryByEmployee,
  deleteSalaryByEmployee,
  getSalaryListByEmployee,
  updateSalaryByEmployee,
} from "app/redux/actions/SalaryActions";
import { ConfirmationDialog, ShowDialog } from "egret";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useDispatch, useSelector } from "react-redux";
import { convertTimeToDate } from "utils";
import SalaryInfoDialog from "../../EmployeeDocuments/SalaryInfoDialog";

export default function TabSalary({ t, employee }) {
  const [salary, setSalary] = useState({
    startDate: new Date().toISOString().split("T")[0],
    oldSalary: 0,
    newSalary: "",
    reason: "",
    note: "",
  });
  const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] =
    useState(false);
  const [id, setId] = useState(null);
  const [showNotify, setShowNotify] = useState(false);
  const [showSalary, setShowSalary] = useState(false);
  const dispatch = useDispatch();
  const { salaryListByEmployee, success } = useSelector(
    (state) => state.salary
  );
  useEffect(() => {
    employee?.id && dispatch(getSalaryListByEmployee(employee?.id));
  }, [employee?.id, success]);
  const handleChangInput = (e) => {
    setSalary({ ...salary, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setSalary({});
  };

  const handleSubmit = () => {
    if (salary?.id) {
      dispatch(updateSalaryByEmployee(salary));
    } else {
      dispatch(
        addSalaryByEmployee({
          id: employee?.id,
          data: [
            {
              startDate:
                salary?.startDate || new Date().toISOString().split("T")[0],
              oldSalary: salary?.oldSalary || 0,
              ...salary,
            },
          ],
        })
      );
    }
    setSalary({});
  };

  const handleDeleteSalary = (salary) => {
    setShouldOpenConfirmationDialog(true);
    setId(salary?.id);
  };

  const handleDialogConfirmationClose = () => {
    setShouldOpenConfirmationDialog(false);
    setId(null);
    setSalary({});
  };

  const handleConfirmationResponse = () => {
    dispatch(deleteSalaryByEmployee(id));
    handleDialogConfirmationClose();
  };

  const handleDialogEmployee = (salary) => {
    setSalary(salary);
  };

  const handleNotifyDialog = (salary) => {
    setShowNotify(true);
    setSalary(salary);
  };

  const handleCloseNotify = () => {
    setShowNotify(false);
    setSalary({});
  };

  const handleViewSalary = (salary) => {
    setShowSalary(true);
    salary && setSalary(salary);
  };

  const handleDialogSalaryClose = () => {
    setShowSalary(false);
    setSalary({});
  };
  const columns = salaryColoums(t, (rowData) => (
    <div>
      {ACTION_PROCESS.EDIT.includes(rowData.salaryIncreaseStatus) && (
        <IconButton
          fontSize="small"
          color="primary"
          onClick={() => handleDialogEmployee(rowData)}
        >
          <Icon>edit</Icon>
        </IconButton>
      )}
      {ACTION_PROCESS.DELETE.includes(rowData.salaryIncreaseStatus) && (
        <IconButton
          fontSize="small"
          color="error"
          onClick={() => handleDeleteSalary(rowData)}
        >
          <Icon color="error">delete</Icon>
        </IconButton>
      )}
      {ACTION_PROCESS.VIEW.includes(rowData.salaryIncreaseStatus) && (
        <IconButton
          fontSize="small"
          color="secondary"
          onClick={() => handleViewSalary(rowData)}
        >
          <Icon>
            <Visibility />
          </Icon>
        </IconButton>
      )}
      {ACTION_PROCESS.NOTIFY.includes(rowData.salaryIncreaseStatus) && (
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
      <ValidatorForm onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={2}>
            <TextValidator
              variant="outlined"
              size={"small"}
              label={
                <span>
                  <span className="text-error">*</span>
                  {t("salary.startDate")}
                </span>
              }
              type="date"
              value={
                typeof salary?.startDate === "string"
                  ? salary?.startDate
                  : convertTimeToDate(salary?.startDate) ||
                    new Date().toISOString().split("T")[0]
              }
              onChange={handleChangInput}
              className="w-100"
              InputLabelProps={{
                shrink: true,
              }}
              name="startDate"
              validators={["required"]}
              errorMessages={[t("general.required")]}
              inputProps={{
                min: moment().format("YYYY-MM-DD"),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <TextValidator
              variant="outlined"
              size={"small"}
              label={
                <span>
                  <span className="text-error">*</span>
                  {t("salary.oldSalary")}
                </span>
              }
              value={salary?.oldSalary || 0}
              onChange={handleChangInput}
              className="w-100"
              disabled
              name="oldSalary"
              validators={["required"]}
              errorMessages={[t("general.required")]}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <TextValidator
              variant="outlined"
              size={"small"}
              label={
                <span>
                  <span className="text-error">*</span>
                  {t("salary.newSalary")}
                </span>
              }
              value={salary?.newSalary || ""}
              onChange={handleChangInput}
              className="w-100"
              name="newSalary"
              validators={["required", "matchRegexp:^\\d*$"]}
              errorMessages={[t("general.required"), "Vui lòng nhập số"]}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <TextValidator
              variant="outlined"
              size={"small"}
              label={
                <span>
                  <span className="text-error">*</span>
                  {t("salary.reason")}
                </span>
              }
              value={salary?.reason || ""}
              onChange={handleChangInput}
              className="w-100"
              name="reason"
              validators={["required"]}
              errorMessages={[t("general.required")]}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <TextValidator
              variant="outlined"
              size={"small"}
              label={
                <span>
                  <span className="text-error">*</span>
                  {t("salary.note")}
                </span>
              }
              value={salary?.note || ""}
              onChange={handleChangInput}
              className="w-100"
              name="note"
              validators={["required"]}
              errorMessages={[t("general.required")]}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={2}>
            <div className="text-center">
              <Button
                variant="contained"
                color="primary"
                className="mr-12"
                type="submit"
                disabled={salaryListByEmployee.some(
                  (item) =>
                    +item.salaryIncreaseStatus === 1 ||
                    salaryListByEmployee.some(
                      (item) => +item.salaryIncreaseStatus === 2
                    )
                )}
              >
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
            </div>
          </Grid>
        </Grid>
      </ValidatorForm>
      <div className="mt-10">
        <CustomTable data={salaryListByEmployee} columns={columns} t={t} />
      </div>
      {showNotify && (
        <ShowDialog
          onConfirmDialogClose={handleCloseNotify}
          open={showNotify}
          text={
            salary?.salaryIncreaseStatus === 4
              ? salary?.additionalRequest || t("general.none")
              : salary?.reasonForRefusal || t("general.none")
          }
          title={
            salary?.salaryIncreaseStatus === 4
              ? t("general.additionalRequest.title")
              : t("general.refuse.title")
          }
        />
      )}

      {shouldOpenConfirmationDialog && (
        <ConfirmationDialog
          title={t("general.confirm")}
          open={shouldOpenConfirmationDialog}
          onConfirmDialogClose={handleDialogConfirmationClose}
          onYesClick={handleConfirmationResponse}
          text={t("general.deleteConfirm")}
          Yes={t("general.confirm")}
          No={t("general.cancel")}
        />
      )}

      {showSalary && (
        <SalaryInfoDialog
          salary={salary}
          open={showSalary}
          t={t}
          salaryListByEmployee={salaryListByEmployee}
          handleClose={handleDialogSalaryClose}
        />
      )}
    </div>
  );
}
