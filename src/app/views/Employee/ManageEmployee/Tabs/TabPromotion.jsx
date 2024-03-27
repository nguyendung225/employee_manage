import { Button, Grid, Icon, IconButton, MenuItem } from "@material-ui/core";
import { Notifications, Visibility } from "@material-ui/icons";
import {
  employeesColumns,
  promotionColoums,
} from "app/components/CustomColumns";
import CustomTable from "app/components/CustomTable";
import { ACTION_EMPLOYEE, POSITIONS } from "app/constants/employeeConstants";
import { ACTION_PROCESS } from "app/constants/processConstants";
import {
  addPromotionByEmployee,
  deletePromotionByEmployee,
  getPromotionListByEmployee,
  updatePromotionByEmployee,
} from "app/redux/actions/PromotionActions";
import { ConfirmationDialog, ShowDialog } from "egret";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useDispatch, useSelector } from "react-redux";
import { convertTimeToDate } from "utils";

export default function TabPromotion({ t, employee }) {
  const [promotion, setPromotion] = useState({
    promotionDay: new Date().toISOString().split("T")[0],
    currentPosition: 1,
    newPosition: "",
    note: "",
  });
  const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] =
    useState(false);
  const [id, setId] = useState(null);
  const [showNotify, setShowNotify] = useState(false);
  const dispatch = useDispatch();
  const { promotionListByEmployee, success } = useSelector(
    (state) => state.promotion
  );
  useEffect(() => {
    employee?.id && dispatch(getPromotionListByEmployee(employee?.id));
  }, [employee?.id, success]);
  const handleChangInput = (e) => {
    setPromotion({ ...promotion, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setPromotion({});
  };

  const handleSubmit = () => {
    if (promotion?.id) {
      dispatch(updatePromotionByEmployee(promotion));
    } else {
      dispatch(
        addPromotionByEmployee({
          id: employee?.id,
          data: [
            {
              promotionDay:
                promotion.promotionDay ||
                new Date().toISOString().split("T")[0],
              currentPromotion: promotion?.currentPromotion || 1,
              ...promotion,
            },
          ],
        })
      );
    }
    setPromotion({});
  };

  const handleDeletePromotion = (promotion) => {
    setShouldOpenConfirmationDialog(true);
    setId(promotion?.id);
  };

  const handleDialogConfirmationClose = () => {
    setShouldOpenConfirmationDialog(false);
    setId(null);
    setPromotion({});
  };

  const handleConfirmationResponse = () => {
    dispatch(deletePromotionByEmployee(id));
    handleDialogConfirmationClose();
  };

  const handleDialogEmployee = (promotion) => {
    setPromotion(promotion);
  };

  const handleNotifyDialog = (promotion) => {
    setShowNotify(true);
    setPromotion(promotion);
  };

  const handleCloseNotify = () => {
    setShowNotify(false);
    setPromotion({});
  };
  const columns = promotionColoums(t, (rowData) => (
    <div>
      {ACTION_PROCESS.EDIT.includes(rowData.processStatus) && (
        <IconButton
          fontSize="small"
          color="primary"
          onClick={() => handleDialogEmployee(rowData)}
        >
          <Icon>edit</Icon>
        </IconButton>
      )}
      {ACTION_PROCESS.DELETE.includes(rowData.processStatus) && (
        <IconButton
          fontSize="small"
          color="error"
          onClick={() => handleDeletePromotion(rowData)}
        >
          <Icon color="error">delete</Icon>
        </IconButton>
      )}
      {ACTION_PROCESS.VIEW.includes(rowData.processStatus) && (
        <IconButton fontSize="small" color="secondary">
          <Icon>
            <Visibility />
          </Icon>
        </IconButton>
      )}
      {ACTION_PROCESS.NOTIFY.includes(rowData.processStatus) && (
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
                  {t("promotion.promotionDay")}
                </span>
              }
              type="date"
              value={
                typeof promotion?.promotionDay === "string"
                  ? promotion?.promotionDay
                  : convertTimeToDate(promotion?.promotionDay) ||
                    new Date().toISOString().split("T")[0]
              }
              onChange={handleChangInput}
              className="w-100"
              InputLabelProps={{
                shrink: true,
              }}
              name="promotionDay"
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
                  {t("promotion.currentPosition")}
                </span>
              }
              value={
                promotion.currentPosition
                  ? t(
                      `position.${
                        POSITIONS.find(
                          (item) => item.id === promotion.currentPosition
                        )?.name
                      }`
                    )
                  : t(
                      `position.${
                        POSITIONS.find((item) => item.id === 1)?.name
                      }`
                    )
              }
              onChange={handleChangInput}
              className="w-100"
              disabled
              name="currentPromotion"
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
                  {t("promotion.newPosition")}
                </span>
              }
              value={promotion?.newPosition || ""}
              onChange={handleChangInput}
              select
              className="w-100"
              name="newPosition"
              validators={["required"]}
              errorMessages={[t("general.required")]}
            >
              {POSITIONS.map((item, index) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {" "}
                    {t(`position.${item.name}`)}
                  </MenuItem>
                );
              })}
            </TextValidator>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextValidator
              variant="outlined"
              size={"small"}
              label={
                <span>
                  <span className="text-error">*</span>
                  {t("promotion.note")}
                </span>
              }
              value={promotion?.note || ""}
              onChange={handleChangInput}
              className="w-100"
              name="note"
              validators={["required"]}
              errorMessages={[t("general.required")]}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={2}>
            <div className="text-center">
              <Button
                variant="contained"
                color="primary"
                className="mr-12"
                type="submit"
                disabled={promotionListByEmployee.some(
                  (item) =>
                    +item.processStatus === 1 ||
                    promotionListByEmployee.some(
                      (item) => +item.processStatus === 2
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
        <CustomTable data={promotionListByEmployee} columns={columns} t={t} />
      </div>
      {showNotify && (
        <ShowDialog
          onConfirmDialogClose={handleCloseNotify}
          open={showNotify}
          text={
            promotion?.promotionIncreaseStatus == 4
              ? promotion?.additionalRequest || t("general.none")
              : promotion?.reasonForRefusal || t("general.none")
          }
          title={
            promotion?.promotionIncreaseStatus == 4
              ? t("general.additionalRequest.title")
              : t("general.refuse.reason")
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
    </div>
  );
}
