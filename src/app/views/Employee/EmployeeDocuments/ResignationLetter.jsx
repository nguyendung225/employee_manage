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
import { Grid, TextField, TextareaAutosize } from "@material-ui/core";
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
  const [content, setContent] = useState({
    endDay: employee?.endDay || new Date().toISOString().split("T")[0],
    reasonForEnding: employee?.reasonForEnding || "",
  });

  const dispatch = useDispatch();

  const handleDialogSendLeader = () => {
    setShowDialogSendLeader(true);
    // setContent({ ...content,reasonForEnding: containerRef.current.innerText });
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
    !isManage &&  setContent({ ...content, [e.target.name]: e.target.value });
  };

  const textareaRef = useRef(null);
  const reasonRef = useRef(null);
  const [lines, setLines] = useState([]);
  const [status, setStatus] = useState(false);
  const defaultReason = "Lý do xin thôi việc: ";
  useEffect(() => {
    const lines = content.reasonForEnding?.split("\n");
    const countLines = lines.length > 0 ? lines.length : 1;
    const lineSpans = [];
    lines.forEach((line, index) => {
      lineSpans.push(
        <span
          key={index}
          style={{
            position: `absolute`,
            left: "0px",
            top: `${(100 / countLines) * (index + 1)}%`,
            width: "100%",
            display: "inline-block",
            border: "1px dashed black",
            marginTop: "-8px",
          }}
        ></span>
      );
    });

    setLines(lineSpans);
    if (textareaRef.current) {
      const textareaHeight = textareaRef.current.offsetHeight;
      reasonRef.current.style.height = `${textareaHeight}px`;
    } else {
      setStatus(true);
    }
  }, [content?.reasonForEnding, textareaRef.current, status]);


  const handleChangReason = (e) => {
    const { value } = e.target;
    if (value.startsWith(defaultReason) ) {
    !isManage && setContent({
        ...content,
        reasonForEnding: value.replace(defaultReason, ""),
      });
    } else {
      !isManage &&  setContent({ ...content, reasonForEnding: "" });
    }
  };

  const { day, month, year } = getDayMonthYear(content?.endDay);
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
          Đơn xin thôi việc
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
                  value={content?.endDay}
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
            <Typography className="reason" ref={reasonRef}>
              <Typography className={"title"}> Lý do xin thôi việc:</Typography>
              <textarea
                ref={textareaRef}
                //  className
                className="reasonForEnding"
                onChange={handleChangReason}
                value={isManage? defaultReason +  content?.reasonForEnding.trim():defaultReason +  content?.reasonForEnding}
                name="reasonForEnding"
                rows={
                  content?.reasonForEnding
                    ? content?.reasonForEnding.split("\n").length
                    : 1
                }
              />
              {lines}
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
                  time={content?.endDay}
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
          content={content}
          handleDialogEmployeeClose={handleDialogEmployeeClose}
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