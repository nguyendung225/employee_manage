import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import "styles/views/_letter.scss";
import { Grid } from "@material-ui/core";
import { getDayMonthYear } from "utils";
import { ACTION_PROCESS, TEAMS } from "app/constants/employeeConstants";
import {
  addProposalByEmployee,
  updateProposalByEmployee,
} from "app/redux/actions/ProposalActions";
import { useDispatch } from "react-redux";
import AdditionalRequestDialog from "./AdditionalRequestDialog";
import ApprovedDialog from "./ApprovedDialog";
import ReasonForRejectionDialog from "./ReasonForRejectionDialog";
import SendLeaderDialog from "./SendLeaderDialog";
import LeterComfirmation from "./LeterComfirmation";

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

export default function ProposalInfoDialog({
  open,
  t,
  handleClose,
  employee,
  proposalListByEmployee,
  proposal,
  isManage,
}) {
  const [showDialogAdditionalRequest, setShowDialogAdditionalRequest] =
    useState(false);
  const [showDialogApproved, setShowDialogApproved] = useState(false);
  const [showDialogReasonForRejection, setShowDialogReasonForRejection] =
    useState(false);
  const [showDialogSendLeader, setShowDialogSendLeader] = useState(false);
  const dispatch = useDispatch();
  const handleSendLeader = () => {
    if (proposal?.id) {
      dispatch(updateProposalByEmployee({ ...proposal, proposalStatus: 2 }));
    } else {
      dispatch(
        addProposalByEmployee({
          id: employee?.id,
          data: [{ oldProposal: proposal?.oldProposal || 0, ...proposal }],
        })
      );
    }
    handleClose();
  };

  const handleDialogAdditionalRequest = () => {
    setShowDialogAdditionalRequest(true);
  };

  const handleDialogAdditionalRequestClose = () => {
    setShowDialogAdditionalRequest(false);
  };

  const handleDialogApproved = () => {
    setShowDialogApproved(true);
  };

  const handleDialogApprovedClose = () => {
    setShowDialogApproved(false);
  };

  const handleDialogReasonForRejection = () => {
    setShowDialogReasonForRejection(true);
  };

  const handleDialogReasonForRejectionClose = () => {
    setShowDialogReasonForRejection(false);
  };

  const handleDialogSendLeader = () => {
    setShowDialogSendLeader(true);
  };
  const handleDialogSendLeaderClose = () => {
    setShowDialogSendLeader(false);
  };

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
          <Typography className="h4 font-weight-600">Đơn đề xuất</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <div className="pl-20 pr-20">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <div className="text-center">
                  <Typography className="h4 font-weight-600">
                    CÔNG TY OCEANTECH
                  </Typography>
                  <span className="h5 font-weight-600">Số 1311/ QĐ - TL</span>
                </div>
              </Grid>
              <Grid item xs={12} sm={8}>
                <div className="text-center">
                  <Typography className="h4 font-weight-600">
                    CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                  </Typography>
                  <span className="h4 font-weight-600 border-b ">
                    Độc lập - Tự do - Hạnh phúc <br />
                  </span>
                  <Typography className="mt-20 h5">
                    {" "}
                    <i>Hà Nội</i>,ngày{" "}
                    <span className="time">
                      {getDayMonthYear(proposal?.proposalDate).day}
                    </span>
                    , tháng{" "}
                    <span className="time">
                      {getDayMonthYear(proposal?.proposalDate).month}
                    </span>
                    ,năm{" "}
                    <span className="time">
                      {getDayMonthYear(proposal?.proposalDate).year}
                    </span>
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <div className="mt-40 mb-20 text-center">
              <Typography className="h4 font-weight-500">
                ĐƠN ĐỀ XUẤT
              </Typography>
            </div>

            <div>
              <Typography> Kính gửi: Ban Giám đốc công ty OCEANTECH</Typography>

              <Typography>- Căn cứ Điều lệ Công ty OCEANTECH</Typography>
              <Typography>
                - Căn cứ yêu cầu hoạt động sản xuất kinh doanh;
              </Typography>

              <div>
                <Typography> Tên tôi là: {employee?.name}</Typography>
                <Typography>
                  {" "}
                  Hiện tại tôi đang làm công việc{" "}
                  {
                    TEAMS.find((item) => item.value === employee?.gender)?.name
                  }{" "}
                  tại công ty OCEANTECH
                </Typography>

                <Typography>
                  {" "}
                  Tôi viết đơn này để đề xuất: {proposal?.content}
                </Typography>
                <Typography> Lý do: {proposal?.note}</Typography>
                <Typography>Xin trân trọng cảm ơn!</Typography>
              </div>
              <div className="mt-20 mb-40">
                <Grid container>
                  <Grid item xs={6}>
                    <div className="mt-20 ml-20">
                      <Typography className={" mb-10 font-weight-600"}>
                        <i>Nơi nhận:</i>
                      </Typography>
                      <Typography>Ban Giám đốc công ty OCEANTECH</Typography>
                      <Typography>
                        Cơ quan, tổ chức, cá nhân liên quan
                      </Typography>
                      <Typography>Lưu HS,VP</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <LeterComfirmation
                      name={employee?.name}
                      time={proposal?.proposalDate}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <div className="text-center m-auto ">
            {isManage && (
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
            )}
            {!ACTION_PROCESS.MANAGE.includes(proposal.proposalStatus) &&
              !proposalListByEmployee?.find((item) =>
                ACTION_PROCESS.PENDING.includes(item?.proposalStatus)
              ) && (
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
            {!ACTION_PROCESS.MANAGE.includes(proposal.proposalStatus) &&
              proposalListByEmployee?.find((item) =>
                ACTION_PROCESS.PENDING.includes(item?.proposalStatus)
              ) && (
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  className="mr-12"
                  disabled
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

      {showDialogAdditionalRequest && (
        <AdditionalRequestDialog
          t={t}
          open={showDialogAdditionalRequest}
          handleClose={handleDialogAdditionalRequestClose}
          handleCloseProfile={handleClose}
          employee={employee}
          isProposal={true}
          proposal={proposal}
        />
      )}

      {showDialogApproved && (
        <ApprovedDialog
          t={t}
          open={showDialogApproved}
          handleClose={handleDialogApprovedClose}
          handleCloseProfile={handleClose}
          employee={employee}
          proposal={proposal}
          isProposal={true}
        />
      )}

      {showDialogReasonForRejection && (
        <ReasonForRejectionDialog
          t={t}
          open={showDialogReasonForRejection}
          handleClose={handleDialogReasonForRejectionClose}
          handleCloseProfile={handleClose}
          employee={employee}
          isProposal={true}
          proposal={proposal}
        />
      )}

      {showDialogSendLeader && (
        <SendLeaderDialog
          t={t}
          open={showDialogSendLeader}
          handleClose={handleDialogSendLeaderClose}
          handleDialogProposalClose={handleClose}
          employee={employee}
          isProposal={true}
          proposal={proposal}
        />
      )}
    </div>
  );
}
