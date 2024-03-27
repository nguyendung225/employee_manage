import { Button, Grid, Icon, IconButton, MenuItem } from "@material-ui/core";
import { Notifications, Visibility } from "@material-ui/icons";
import {
  employeesColumns,
  proposalColoums,
} from "app/components/CustomColumns";
import CustomTable from "app/components/CustomTable";
import { ACTION_EMPLOYEE, POSITIONS } from "app/constants/employeeConstants";
import { ACTION_PROCESS, PROPOSAL } from "app/constants/processConstants";
import {
  addProposalByEmployee,
  deleteProposalByEmployee,
  getProposalListByEmployee,
  updateProposalByEmployee,
} from "app/redux/actions/ProposalActions";
import { ConfirmationDialog, ShowDialog } from "egret";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useDispatch, useSelector } from "react-redux";
import { convertTimeToDate } from "utils";

export default function TabProposal({ t, employee }) {
  const [proposal, setProposal] = useState({
    proposalDate: new Date().toISOString().split("T")[0],
    type: 0,
    content: "",
    note: "",
    detailedDescription: "",
  });
  const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] =
    useState(false);
  const [id, setId] = useState(null);
  const [showNotify, setShowNotify] = useState(false);
  const dispatch = useDispatch();
  const { proposalListByEmployee, success } = useSelector(
    (state) => state.proposal
  );
  useEffect(() => {
    employee?.id && dispatch(getProposalListByEmployee(employee?.id));
  }, [employee?.id, success]);
  const handleChangInput = (e) => {
    setProposal({ ...proposal, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setProposal({});
  };

  const handleSubmit = () => {
    if (proposal?.id) {
      dispatch(updateProposalByEmployee(proposal));
    } else {
      dispatch(
        addProposalByEmployee({
          id: employee?.id,
          data: [
            {
              proposalDate:
                proposal.proposalDate || new Date().toISOString().split("T")[0],
              ...proposal,
            },
          ],
        })
      );
    }
    setProposal({});
  };

  const handleDeleteProposal = (proposal) => {
    setShouldOpenConfirmationDialog(true);
    setId(proposal?.id);
  };

  const handleDialogConfirmationClose = () => {
    setShouldOpenConfirmationDialog(false);
    setId(null);
    setProposal({});
  };

  const handleConfirmationResponse = () => {
    dispatch(deleteProposalByEmployee(id));
    handleDialogConfirmationClose();
  };

  const handleDialogEmployee = (proposal) => {
    setProposal(proposal);
  };

  const handleNotifyDialog = (proposal) => {
    setShowNotify(true);
    setProposal(proposal);
  };

  const handleCloseNotify = () => {
    setShowNotify(false);
    setProposal({});
  };
  const columns = proposalColoums(t, (rowData) => (
    <div>
      {ACTION_PROCESS.EDIT.includes(rowData.proposalStatus) && (
        <IconButton
          fontSize="small"
          color="primary"
          onClick={() => handleDialogEmployee(rowData)}
        >
          <Icon>edit</Icon>
        </IconButton>
      )}
      {ACTION_PROCESS.DELETE.includes(rowData.proposalStatus) && (
        <IconButton
          fontSize="small"
          color="error"
          onClick={() => handleDeleteProposal(rowData)}
        >
          <Icon color="error">delete</Icon>
        </IconButton>
      )}
      {ACTION_PROCESS.VIEW.includes(rowData.proposalStatus) && (
        <IconButton fontSize="small" color="secondary">
          <Icon>
            <Visibility />
          </Icon>
        </IconButton>
      )}
      {ACTION_PROCESS.NOTIFY.includes(rowData.proposalStatus) && (
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
                  {t("proposal.proposalDate")}
                </span>
              }
              type="date"
              value={
                typeof proposal?.proposalDate === "string"
                  ? proposal?.proposalDate
                  : convertTimeToDate(proposal?.proposalDate) ||
                    new Date().toISOString().split("T")[0]
              }
              onChange={handleChangInput}
              className="w-100"
              InputLabelProps={{
                shrink: true,
              }}
              name="proposalDate"
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
                  {t("proposal.type")}
                </span>
              }
              value={proposal?.type || ""}
              onChange={handleChangInput}
              select
              className="w-100"
              name="type"
              validators={["required"]}
              errorMessages={[t("general.required")]}
            >
              {PROPOSAL.map((item, index) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {" "}
                    {t(`proposal.${item.name}`)}
                  </MenuItem>
                );
              })}
            </TextValidator>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <TextValidator
              variant="outlined"
              size={"small"}
              label={
                <span>
                  <span className="text-error">*</span>
                  {t("proposal.content")}
                </span>
              }
              value={proposal?.content || ""}
              onChange={handleChangInput}
              className="w-100"
              name="content"
              validators={["required"]}
              errorMessages={[t("general.required")]}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={4}>
            <TextValidator
              variant="outlined"
              size={"small"}
              label={
                <span>
                  <span className="text-error">*</span>
                  {t("proposal.note")}
                </span>
              }
              value={proposal?.note || ""}
              onChange={handleChangInput}
              className="w-100"
              name="note"
              validators={["required"]}
              errorMessages={[t("general.required")]}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={8}>
            <TextValidator
              variant="outlined"
              size={"small"}
              label={
                <span>
                  <span className="text-error">*</span>
                  {t("proposal.detailedDescription")}
                </span>
              }
              value={proposal?.detailedDescription || ""}
              onChange={handleChangInput}
              className="w-100"
              name="detailedDescription"
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
                disabled={proposalListByEmployee.some(
                  (item) =>
                    +item.proposalStatus === 1 ||
                    proposalListByEmployee.some(
                      (item) => +item.proposalStatus === 2
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
        <CustomTable data={proposalListByEmployee} columns={columns} t={t} />
      </div>
      {showNotify && (
        <ShowDialog
          onConfirmDialogClose={handleCloseNotify}
          open={showNotify}
          text={
            proposal?.proposalIncreaseStatus == 4
              ? proposal?.additionalRequest || t("general.none")
              : proposal?.reasonForRefusal || t("general.none")
          }
          title={
            proposal?.proposalIncreaseStatus == 4
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
