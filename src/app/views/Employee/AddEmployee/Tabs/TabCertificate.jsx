import { Button, Grid, Icon, IconButton } from "@material-ui/core";
import { certificatesColoums } from "app/components/CustomColumns";
import CustomTable from "app/components/CustomTable";
import {
  addCertificate,
  deleteCertificate,
  getCertificates,
  updateCertificate,
} from "app/redux/actions/CertificateActions";
import { ConfirmationDialog } from "egret";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useDispatch, useSelector } from "react-redux";
import { convertTimeToDate } from "utils";

export default function TabCertificate({ t, employee }) {
  const [certificate, setCertificate] = useState({});
  const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] =
    useState(false);
  const [id, setId] = useState(null);
  const dispatch = useDispatch();
  const {certificateList,success}=useSelector(state=>state.certificate);
  useEffect(()=>{
     dispatch(getCertificates(employee?.id))
  },[employee?.id,success])
  const handleChangInput = (e) => {
    setCertificate({ ...certificate, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    if (certificate?.id) {
      dispatch(updateCertificate(certificate));
    } else {
      const payloay = {
        id: employee?.id,
        data: [{ ...certificate }],
      };
      dispatch(addCertificate(payloay));
    }
    setCertificate({});
  };

  const handleCancel = () => {
    setCertificate({});
  };

  const handleDialogCertificate = (certificate) => {
    certificate && setCertificate(certificate);
  };

  const handleDialogConfirm = (certificate) => {
    setShouldOpenConfirmationDialog(true);
    setId(certificate?.id);
  };

  const handleConfirmationResponse = () => {
    dispatch(deleteCertificate(id));
    handleDialogConfirmationClose();
  };

  const handleDialogConfirmationClose = () => {
    setCertificate({});
    setId(null);
    setShouldOpenConfirmationDialog(false);
  };
  const columns = certificatesColoums(t,(rowData) => (
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
  ));
  return (
    <div>
      {" "}
      <ValidatorForm onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextValidator
            variant="outlined"
            size={'small'}
              label={
                <span>
                  <span className="text-error">*</span>
                  {t("cetificate.name")}
                </span>
                
              }
              value={certificate?.certificateName || ""}
              onChange={handleChangInput}
              className="w-100"
              name="certificateName"
              validators={["required"]}
              errorMessages={[t("general.required")]}
            />
          </Grid>

          <Grid item xs={12} sm={3} md={2}>
            <TextValidator
              variant="outlined"
              size={'small'}
              label={
                <span>
                  <span className="text-error">*</span>
                  {t("cetificate.issueDate")}
                </span>
              }
              type="date"
              value={
                typeof certificate?.issueDate === "string"
                  ? certificate?.issueDate
                  : convertTimeToDate(certificate?.issueDate) || ""
              }
              onChange={handleChangInput}
              className="w-100"
              InputLabelProps={{
                shrink: true,
              }}
              name="issueDate"
              validators={["required"]}
              errorMessages={[t("general.required")]}
              inputProps={{
                max: moment().format("YYYY-MM-DD"),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3} md={2}>
            <TextValidator
              variant="outlined"
              size={'small'}
              label={
                <span>
                  <span className="text-error">*</span>
                  {t("cetificate.field")}
                </span>
              }
              value={certificate?.field || ""}
              onChange={handleChangInput}
              className="w-100"
              name="field"
              validators={["required"]}
              errorMessages={[t("general.required")]}
            />
          </Grid>

          <Grid item xs={12}   md={3}>
            <TextValidator
              variant="outlined"
              size={'small'}
              label={
                <span>
                  <span className="text-error">*</span>
                  {t("cetificate.content")}
                </span>
              }
              value={certificate?.content || ""}
              onChange={handleChangInput}
              className="w-100"
              name="content"
              validators={["required"]}
              errorMessages={[t("general.required")]}
            />
          </Grid>

          <Grid item xs={12} md={2} className="text-center mt-auto mt-auto ">
            <Button
              variant="contained"
              color="primary"
              className="mr-12"
              type="submit"
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
          </Grid>
        </Grid>
      </ValidatorForm>
      <div className="mt-40">
        <CustomTable data={certificateList} columns={columns} t={t} />
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
    </div>
  );
}
