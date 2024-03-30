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
import { Grid } from "@material-ui/core";
import "styles/views/_letter.scss";
import { formatCurrency, formatMoney, getDayMonthYear } from "utils";
import { useDispatch } from "react-redux";
import {
  addSalaryByEmployee,
  updateSalaryByEmployee,
} from "app/redux/actions/SalaryActions";
import ApprovedDialog from "./ApprovedDialog";
import AdditionalRequestDialog from "./AdditionalRequestDialog"; 
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

export default function SalaryInfoDialog({
  open,
  t,
  handleClose,
  employee,
  salaryListByEmployee,
  salary,
  isManage,
}) {
  const [showDialogApproved, setShowDialogApproved] = useState(false);
  const [showDialogAdditionalRequest, setShowDialogAdditionalRequest] =
    useState(false);
    const [showPromotion, setShowPromotion] = useState(false);
  const [showDialogReasonForRejection, setShowDialogReasonForRejection] =
    useState(false);
    const [showDialogSendLeader, setShowDialogSendLeader] = useState(false);
  const dispatch = useDispatch();
  const handleDialogSendLeader = () => {
    setShowDialogSendLeader(true);
  };
  const handleDialogSendLeaderClose = () => {
    setShowDialogSendLeader(false);
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
  
  return (
    <div >
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={"md"}
        fullWidth={true}
        className="dialog"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        <Typography className="h4 font-weight-600">Đề xuất tăng lương</Typography>
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
                <span className="h4 font-weight-600 border-b">
                  Độc lập - Tự do - Hạnh phúc <br />
                </span>
                <Typography className="mt-20 text-right h5">
               <i>   Hà Nội</i>,<i>ngày</i>  <span className="time">{getDayMonthYear(salary?.startDate).day} </span>,<i>tháng</i> <span className="time">{getDayMonthYear(salary?.startDate).month}</span>,<i>năm </i> <span className="time">{getDayMonthYear(salary?.startDate).year} </span>
                </Typography>
              </div>
            </Grid>
          </Grid>
          <div className="mt-40 mb-20 text-center">
            <Typography className="h4 font-weight-600">QUYẾT ĐỊNH</Typography>
            <i>V/v tăng lương cho người lao động</i>
          </div>

          <div>
            <Typography >
              {" "}
              - Căn cứ vào Điều lệ, nội quy, quy chế của Công ty OCEANTECH
            </Typography>
            <Typography >
              - Căn cứ vào hợp đồng số <b>{employee?.code}</b> được ký giữa Công
              ty OCEANTECH và Ông/Bà {employee?.name} ngày 07 tháng 01 năm 2024
            </Typography>
            <Typography >
              - Căn cứ vào sự đóng góp thực tế của Ông/Bà:{" "}
              <b>{employee?.name}</b> đổi với sự phát triển của Công ty
              OCEANTECH
            </Typography>
            <div className={"text-center mb-10 mt-20"}>
              <Typography className="h4 font-weight-600">
                GIÁM ĐỐC CÔNG TY OCEANTECH
              </Typography>
              <Typography className="h4 font-weight-600">QUYẾT ĐỊNH</Typography>
            </div>
            <div>
              <Typography >
                {" "}
                -<b> Điều 1: </b>Tăng lương cho Ông/Bà: <b>{employee?.name}</b>{" "}
                đang làm việc tại công ty kể từ ngày 18 tháng 01 năm 2024, cụ
                thể như sau:
              </Typography>
              <Typography >
                Mức lương hiện tại:{" "}
                <b>{formatCurrency(salary?.oldSalary)} VND</b>
              </Typography>
              <Typography >
                Mức lương sau điều chỉnh:
                <b> {formatCurrency(salary?.newSalary)} VND</b>
              </Typography>
              <Typography >
                - <b>Điều 2</b>: Các Ông/Bà Phòng nhân sự, Phòng tài chính kế
                toán và Ông/Bà: <b>{employee?.name}</b> căn cứ thi hành quyết
                định này.
              </Typography>
            </div>
            <div className="mt-20 mb-40">
              <Grid container>
                <Grid item xs={6}>
                  <div className="mt-20 ml-20">
                    <Typography className={" mb-10 font-weight-600"}>
                      <i>Nơi nhận:</i>
                    </Typography>
                    <Typography >Như điều 2</Typography>
                    <Typography>Lưu HS,VP</Typography>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="">
                   
                    {salary?.salaryIncreaseStatus === 3 &&   <LeterComfirmation title={'Giám đốc'} name={ employee?.leaderName} time={salary?.startDate}/>
                         }
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
           
          
            {  
              (
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  className="mr-12"
                  disabled={salaryListByEmployee?.some(item => item.salaryIncreaseStatus == 2)}

                  onClick={() => handleDialogSendLeader()}
                >
                  {t("general.sendLeader")}
                </Button>
              )
            }
         
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

      {showDialogApproved && (
        <ApprovedDialog
          t={t}
          open={showDialogApproved}
          handleClose={handleDialogApprovedClose}
          handleCloseProfile={handleClose}
          employee={employee}
          salary={salary}
          isSalary={true}
        />
      )}

      {showDialogAdditionalRequest && (
        <AdditionalRequestDialog
          t={t}
          open={showDialogAdditionalRequest}
          handleClose={handleDialogAdditionalRequestClose}
          handleCloseProfile={handleClose}
          employee={employee}
          isSalary={true}
          salary={salary}
        />
      )}

      {showDialogReasonForRejection && (
        <ReasonForRejectionDialog
          t={t}
          open={showDialogReasonForRejection}
          handleClose={handleDialogReasonForRejectionClose}
          handleCloseProfile={handleClose}
          employee={employee}
          isSalary={true}
          salary={salary}
        />
      )}
      {showDialogSendLeader && (
        <SendLeaderDialog
          t={t}
          open={showDialogSendLeader}
          handleClose={handleDialogSendLeaderClose}
          handleDialogSalaryClose={handleClose}
          employee={employee}
          isSalary={true}
          salary={salary}
       
        />
      )}
    </div>

    
  );
}
