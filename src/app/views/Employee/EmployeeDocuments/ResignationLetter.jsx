import React, { useEffect, useRef, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { Grid, Input, TextField, TextareaAutosize } from "@material-ui/core";
import { getDayMonthYear } from "utils";
import { useDispatch } from "react-redux";
import { updateEmployee } from "app/redux/actions/EmployeeActions";
import SendLeaderDialog from "./SendLeaderDialog";
import AdditionalRequestDialog from "./AdditionalRequestDialog";
import ReasonForRejectionDialog from "./ReasonForRejectionDialog";
import "styles/views/_letter.scss";
import moment from "moment";
import LeterComfirmation from "./LeterComfirmation";
import { TEAMS } from "app/constants/employeeConstants";
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function ResignationLetter({
  t,
  open,
  handleClose,
  employee,
  isManage,

  handleResignationLetterClose,
  handleDialogEmployeeClose,
}) {
  const [showDialogSendLeader, setShowDialogSendLeader] = useState(false);
  const [showDialogAdditionalRequest, setShowDialogAdditionalRequest] =
    useState(false);
  const [showDialogReasonForRejection, setShowDialogReasonForRejection] =
    useState(false);
  const [formData, setFormData] = useState({
    endDay: employee?.endDay || new Date().toISOString().split("T")[0],
    reasonForEnding: employee?.reasonForEnding || "",
  });
  
  const [lines, setLines] = useState([]);
  const defaultReason = "Lý do xin thôi việc: ";

  const dispatch = useDispatch();

  const handleDialogSendLeader = () => {
    setShowDialogSendLeader(true);
  };
  const handleDialogSendLeaderClose = () => {
    setShowDialogSendLeader(false);
  };

  const handleDialogApproved = () => {
    dispatch(updateEmployee({ ...employee, submitProfileStatus: 7 }));
    handleClose();
  };

  const handleDialogAdditionalRequest = () => {
    setShowDialogAdditionalRequest(true);
  };

  const handleDialogAdditionalRequestClose = () => {
    setShowDialogAdditionalRequest(false);
  };

  const handleDialogReasonForRejection = () => {
    setShowDialogReasonForRejection(true);
  };

  const handleDialogReasonForRejectionClose = () => {
    setShowDialogReasonForRejection(false);
  };

  const handleChangInput = (e) => {
    !isManage && setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const lines = formData.reasonForEnding?.split("\n");
    setLines(lines);
  }, [formData?.reasonForEnding]);

  const handleChangReason = (e) => {
    const { value } = e.target;
    if (value.startsWith(defaultReason)) {
      !isManage &&
        setFormData({
          ...formData,
          reasonForEnding: value.replace(defaultReason, ""),
        });
    } else {
      !isManage && setFormData({ ...formData, reasonForEnding: "" });
    }
  };

  const { day, month, year } = getDayMonthYear(formData?.endDay);
  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={"md"}
        fullWidth={true}
        className="dialog"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Typography className="h4 font-weight-600">
            Đơn xin thôi việc
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <div className="m-auto px-20 py-20">
            <div className="text-center">
              <Typography className="font-weight-600 h4">
                CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
              </Typography>
              <span className=" h4 font-weight-600">
                Độc lập - Tự do - Hạnh phúc
              </span>
            </div>
            <div className="w-30 dashed mx-auto my-20"></div>
            <Typography className="my-30 h4 font-weight-600 text-center">
              ĐƠN XIN THÔI VIỆC
            </Typography>
            <Typography className="flex">
              Kính gửi: Ban Giám đốc công ty{" "}
              <span className="text pl-4"> OCEANTECH</span>
            </Typography>
            <Typography>Trưởng phòng Hành chính dân sự.</Typography>
            <Typography className="flex">
              Tên tôi là: <span className="text pl-4"> {employee?.name}</span>
            </Typography>
            <Typography className="flex">
              Bộ phân:{" "}
              <span className="text pl-4">
                {" "}
                {TEAMS.find((item) => item.value === employee?.team)?.name}
              </span>
            </Typography>
            <Typography>
              Nay tôi trình đơn này kinh xin Ban Giám đốc Công ty chấp thuận cho
              tôi được
            </Typography>
            <Typography className=" flex flex-middle">
              Thôi việc từ ngày <span className="time">{day}</span>/
              <span className="time">{month}</span>/
              <span className="time">{year}</span>
              <Typography>
                <TextField
                  type="date"
                  value={formData?.endDay}
                  onChange={handleChangInput}
                  className="endDay"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="endDay"
                  validators={["required"]}
                  errorMessages={[t("general.required")]}
                  inputProps={{
                    min: moment().format("YYYY-MM-DD"),
                  }}
                />
                .
              </Typography>
            </Typography>
            <Typography className="reason">
              <Typography className={"title"}> Lý do xin thôi việc:</Typography>
              <Input
                multiline
                disableUnderline
                className="reasonForEnding"
                onChange={handleChangReason}
                value={
                  isManage
                    ? defaultReason + formData?.reasonForEnding.trim()
                    : defaultReason + formData?.reasonForEnding
                }
                name="reasonForEnding"
                rows={
                  formData?.reasonForEnding
                    ? formData?.reasonForEnding.split("\n").length
                    : 1
                }
              />
              {lines.map((item, index) => (
                <span
                  key={index}
                  style={{
                    position: `absolute`,
                    left: "0px",
                    top: `${(100 / lines.length) * (index + 1)}%`,
                    width: "100%",
                    display: "inline-block",
                    border: "1px dashed black",
                    marginTop: "-8px",
                  }}
                ></span>
              ))}
            </Typography>

            <Typography className="flex">
              Tôi sẽ bàn giao công việc cho
              <span className="text pl-4"> {employee?.leaderName}.</span>
            </Typography>
            <Typography className="flex">
              Bộ phân:{" "}
              <span className="text pl-4">
                {" "}
                {TEAMS.find((item) => item.value === employee?.team)?.name}
              </span>
            </Typography>
            <Typography>
              Tôi rất hài lòng vì thời gian được làm việc cho Công ty. Cảm ơn
              ban giáp đôc công ty đã hỗ trợ và giúp đỡ.
            </Typography>
            <Typography>
              Kính đề nghị Ban Giám đốc xem xét và giải quyết.
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={6}></Grid>
              <Grid item xs={6}>
                <LeterComfirmation
                  time={formData?.endDay}
                  name={employee?.name}
                />
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <div className="text-center m-auto ">
            {isManage ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  className="mr-12"
                  onClick={() => handleDialogApproved()}
                >
                  {t("general.approved")}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className="mr-12"
                  onClick={() => handleDialogAdditionalRequest()}
                >
                  {t("general.additionalRequest.title")}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className="mr-12"
                  onClick={() => handleDialogReasonForRejection()}
                >
                  {t("general.refuse.title")}
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                color="primary"
                type="button"
                className="mr-12"
                onClick={() => handleDialogSendLeader()}
              >
                {t("general.sendLeader")}
              </Button>
            )}

            <Button
              variant="contained"
              color="secondary"
              type="button"
              onClick={handleClose}
            >
              {t("general.cancel")}
            </Button>
          </div>
        </DialogActions>
      </Dialog>

      {showDialogSendLeader && (
        <SendLeaderDialog
          t={t}
          open={showDialogSendLeader}
          handleClose={handleDialogSendLeaderClose}
          employee={employee}
          formData={formData}
          handleDialogEmployeeClose={handleDialogEmployeeClose}
          handleDialogResignClose={handleClose}
          isEnd={true}
        />
      )}
      {showDialogAdditionalRequest && (
        <AdditionalRequestDialog
          t={t}
          open={showDialogAdditionalRequest}
          handleClose={handleDialogAdditionalRequestClose}
          handleCloseProfile={handleClose}
          employee={employee}
          isEnd={true}
        />
      )}

      {showDialogReasonForRejection && (
        <ReasonForRejectionDialog
          t={t}
          open={showDialogReasonForRejection}
          handleClose={handleDialogReasonForRejectionClose}
          handleCloseProfile={handleClose}
          employee={employee}
          isEnd={true}
        />
      )}
    </div>
  );
}
