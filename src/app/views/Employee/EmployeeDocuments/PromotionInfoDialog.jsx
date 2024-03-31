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
import {
  addPromotionByEmployee,
  updatePromotionByEmployee,
} from "app/redux/actions/PromotionActions";
import { useDispatch } from "react-redux";
import ApprovedDialog from "./ApprovedDialog";
import AdditionalRequestDialog from "./AdditionalRequestDialog";
import ReasonForRejectionDialog from "./ReasonForRejectionDialog";
import SendLeaderDialog from "./SendLeaderDialog";

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

export default function PromotionInfoDialog({
  open,
  t,
  handleClose,
  promotionListByEmployee,
  employee,
  promotion,
  isManage,
}) {
  const [showDialogApproved, setShowDialogApproved] = useState(false);
  const [showDialogAdditionalRequest, setShowDialogAdditionalRequest] =
    useState(false);
  const [showDialogReasonForRejection, setShowDialogReasonForRejection] =
    useState(false);
    const [showDialogSendLeader, setShowDialogSendLeader] = useState(false);
  const dispatch = useDispatch();
  const handleSendLeader = () => {
    if (promotion?.id) {
      dispatch(updatePromotionByEmployee({ ...promotion, processStatus: 2 }));
    } else {
      dispatch(
        addPromotionByEmployee({
          id: employee?.id,
          data: [
            { currentPosition: promotion?.currentPosition || 1, ...promotion },
          ],
        })
      );
    }

    handleClose();
  };

  const handleDialogApproved = () => {
    setShowDialogApproved(true);
  };

  const handleDialogApprovedClose = () => {
    setShowDialogApproved(false);
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
        <Typography className="h4 font-weight-600">Đề xuất thăng chức</Typography>
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
                  <i>Hà Nội</i>,ngày <span className="time">{getDayMonthYear(promotion?.promotionDay).day}</span>, tháng <span className="time">{getDayMonthYear(promotion?.promotionDay).month}</span>,năm <span>{getDayMonthYear(promotion?.promotionDay).year}</span>
                </Typography>
              </div>
            </Grid>
          </Grid>
          <div className="mt-40 mb-20 text-center">
            <Typography className="h4 font-weight-600">QUYẾT ĐỊNH</Typography>
            <i>V/v thăng chức</i>
          </div>

          <div>
            <Typography className=" font-weight-500 h5">
              {" "}
              HỘI ĐỒNG THÀNH VIÊN CÔNG TY OCEANTECH
            </Typography>
            <Typography >
              - Căn cứ Luật Doanh nghiệp 2020 và các văn bản hướng dẫn thi hành;
            </Typography>
            <Typography >
              - Căn cứ Điều lệ Công ty OCEANTECH
            </Typography>
            <Typography >
              - Căn cứ yêu cầu hoạt động sản xuất kinh doanh;
            </Typography>
            <Typography >
              - Xét năng lực, phẩm chất và trình độ của Ông/Bà{" "}
              <span>{employee?.name}</span>
            </Typography>
            <div className={"text-center mb-10 mt-20"}>
              <Typography className="h4 font-weight-600">QUYẾT ĐỊNH</Typography>
            </div>
            <div>
              <Typography >
                {" "}
                -<b> Điều 1: </b> Bổ nhiệm chức danh Phó phòng đối với:{" "}
              </Typography>
              <Typography >
                - Ông/Bà: <b>{employee?.name}</b>. Giới tính: Nam
              </Typography>
              <Typography >
                - Sinh ngày: 10/10/1992. Dân tộc: Khôngg. Tôn giáo: Sed
              </Typography>
              <Typography >
                - Số chứng minh nhân dân/Thẻ căn cước công dân: 123654789. Nơi
                cấp: hoa qua son Ngày cấp: 01/01/2022
              </Typography>
              <Typography >
                - Nơi đăng ký hộ khẩu thường trú: 23 Trần Cao Văn, Quận 1
              </Typography>
              <Typography >
                - Nơi ở hiện tại: 23 Trần Cao Văn, Quận 1
              </Typography>
              <Typography >
                {" "}
                -<b> Điều 2: </b> Quyền và nghĩa vụ{" "}
              </Typography>
              <Typography >
                - Thực hiện quyền và nghĩa vụ của cấp bậc được bổ nhiệm theo quy
                định của công ty
              </Typography>
              <Typography >
                {" "}
                -<b> Điều 3: </b> Hiệu lực thi hành
              </Typography>
              <Typography >
                - Ông/Bà có tên tại Điều 1 và các cơ quan, tổ chức, cá nhân liên
                quan chịu trách nhiệm thi hành quyết định này. Quyết định có
                hiệu lực kể từ ngày ký.
              </Typography>
            </div>
            <div className="mt-20 mb-40">
              <Grid container>
                <Grid item xs={6}>
                  <div className="mt-20 ml-20">
                    <Typography className={" mb-10 font-weight-600"}>
                      <i>Nơi nhận:</i>
                    </Typography>
                    <Typography >
                      Ông/Bà: <b>{employee?.leaderName}</b>
                    </Typography>
                    <Typography>Cơ quan, tổ chức, cá nhân liên quan</Typography>
                    <Typography>Lưu HS,VP</Typography>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="">
                    <div className="mt-20 text-center w-60 ml-auto">
                      <Typography className={" mb-10 font-weight-600 h5"}>
                        TM. HỘI ĐỒNG THÀNH VIÊN
                      </Typography>
                      <Typography className={" mb-10 font-weight-600 "}>
                        Chủ tịch Hội đồng thành viên
                      </Typography>
                      <i>(Ký tên, đóng dấu)</i>
                      <Typography className={" mt-40 h5 font-weight-600 "}>
                         {promotion?.processStatus ==='3' && employee?.leaderName}
                      </Typography>
                    </div>
                  </div>
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
        
             
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  className="mr-12"
                  disabled={promotionListByEmployee?.some(item => item.processStatus == 2)}

                  onClick={() => handleDialogSendLeader()}
                >
                  {t("general.sendLeader")}
                </Button>
  
         
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

        {showDialogApproved && (
          <ApprovedDialog
            t={t}
            open={showDialogApproved}
            handleClose={handleDialogApprovedClose}
            handleCloseProfile={handleClose}
            employee={employee}
            promotion={promotion}
            isPromotion={true}
          />
        )}
      </Dialog>

      {showDialogAdditionalRequest && (
        <AdditionalRequestDialog
          t={t}
          open={showDialogAdditionalRequest}
          handleClose={handleDialogAdditionalRequestClose}
          handleCloseProfile={handleClose}
          employee={employee}
          promotion={promotion}
          isPromotion={true}
        />
      )}
      {showDialogReasonForRejection && (
        <ReasonForRejectionDialog
          t={t}
          open={showDialogReasonForRejection}
          handleClose={handleDialogReasonForRejectionClose}
          handleCloseProfile={handleClose}
          employee={employee}
          isPromotion={true}
          promotion={promotion}
        />
      )}
       {showDialogSendLeader && (
        <SendLeaderDialog
          t={t}
          open={showDialogSendLeader}
          handleClose={handleDialogSendLeaderClose}
          handleDialogPromotionClose={handleClose}
          employee={employee}
          isPromotion={true}
          promotion={promotion}
       
        />
      )}
    </div>
  );
}
