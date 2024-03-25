import {
  Avatar,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import ConstantList from "app/appConfig";
import "styles/views/_TabProfile.scss";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import { GENDER, RELATIONSHIP } from "app/constants/employeeConstants";
import { formatDate } from "utils";
import LeterComfirmation from "../../AddEmployee/EmployeeDocuments/LeterComfirmation";
import { useDispatch, useSelector } from "react-redux";
import { getFamilies } from "app/redux/actions/FamilyActions";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function TabProfile({ t, employee }) {
  const classes = useStyles();
  const {familyList,success}=useSelector(state=>state.family);
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getFamilies(employee?.id))
 },[employee?.id,success])
  return (
    <div className="profile">
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Avatar
            alt="avatar"
            src={
              employee?.image ||
              ConstantList.ROOT_PATH + "assets/images/avatar.jpg"
            }
            className="w-200 h-200 mt-20 ml-20"
          />
        </Grid>
        <Grid item xs={9}>
          <div className="text-center mt-20">
            <Typography className="h3 font-weight-bold">
              CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
            </Typography>
            <Typography className="h3 font-weight-bold ">
              <span className="border-b">Độc lập - Tự do - Hạnh phúc</span>
            </Typography>

            <Typography className="h2 font-weight-bold mt-20">
              Sơ yếu lý lịch
            </Typography>
            <Typography className="h3 font-weight-bold">Tự thuật</Typography>
          </div>
        </Grid>
      </Grid>

      <div className="myself">
        <div className="">
          <Typography className="h3 font-weight-bold mx-20">
            I.Thông tin bản thân
          </Typography>
          <div className="ml-30 font-size-24 font-weight-500">
            <div className=" flex flex-middle ">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={9}>
                  <div className="flex ">
                    <Typography> 1.Họ và tên:</Typography>{" "}
                    <Typography className="title">{employee?.name}</Typography>
                  </div>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <div className="flex ">
                    <Typography> 2.Giới tính:</Typography>{" "}
                    <Typography className="title">
                      {" "}
                      {
                        t(`staff.gender.${GENDER.find((item) => item.value === employee?.gender)
                          ?.name}`)
                      }
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </div>

            <div className=" flex flex-middle ">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <div className="flex ">
                    <Typography> 3.Ngày sinh:</Typography>{" "}
                    <Typography className="title">
                      {formatDate(employee?.dateOfBirth)}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </div>

            <div className=" flex flex-middle ">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <div className="flex ">
                    <Typography> 4.Hộ khẩu thường trú:</Typography>{" "}
                    <Typography className="title">
                      {employee?.address}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </div>

            <div className=" flex flex-middle ">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <div className="flex ">
                    <Typography> 5.Điện thoại:</Typography>{" "}
                    <Typography className="title">{employee?.phone}</Typography>
                  </div>
                </Grid>
              </Grid>
            </div>

            <div className=" flex flex-middle ">
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6}>
                  <div className="flex ">
                    <Typography> 6.Dân tộc:</Typography>{" "}
                    <Typography className="title">
                      {employee?.ethnic}
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <div className="flex ">
                    <Typography> 7.Tôn giáo:</Typography>{" "}
                    <Typography className="title">
                      {employee?.religion}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </div>

            <div className=" flex flex-middle ">
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6}>
                  <div className="flex ">
                    <Typography> 8.Căn cước công dân:</Typography>{" "}
                    <Typography className="title">
                      {employee?.citizenIdentificationNumber}
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <div className="flex ">
                    <Typography> 9.Ngày cấp:</Typography>{" "}
                    <Typography className="title">
                      {formatDate(employee?.dateOfIssuanceCard)}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </div>

            <div className=" flex flex-middle ">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <div className="flex ">
                    <Typography> 10.Nơi cấp:</Typography>{" "}
                    <Typography className="title">
                      {employee?.placeOfIssueCard}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>

      <div className="family">
        <div className="">
          <Typography className="h3 font-weight-bold mx-20">
            II.Thông tin gia đình
          </Typography>

          <div className="ml-30 p-8 font-size-24 font-weight-500">
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" width={50}>STT</TableCell>
                    <TableCell align="left">Tên người thân</TableCell>
                    <TableCell align="center" width={100}>Ngày sinh</TableCell>
                    <TableCell align="left">Quan hệ</TableCell>
                    <TableCell align="center">Căn cước</TableCell>
                    <TableCell align="center">Số điện thoại</TableCell>
                    <TableCell align="left">Địa chỉ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {familyList.map((familiy, index) => (
                    <TableRow key={familiy?.id}>
                      <TableCell align="center" width={50}>{index + 1}</TableCell>
                      <TableCell align="left">{familiy?.name}</TableCell>
                      <TableCell align="center" width={100}>
                        {formatDate(familiy?.dateOfBirth)}
                      </TableCell>
                      <TableCell align="left">
                        {
                          t(`family.relationShip.${RELATIONSHIP.find(
                            (item) => item.value === familiy?.relationShip
                          ).name}`)
                        }
                      </TableCell>
                      <TableCell align="center">
                        {familiy?.citizenIdentificationNumber}
                      </TableCell>
                      <TableCell align="center">
                        {familiy?.phoneNumber}
                      </TableCell>
                      <TableCell align="left">
                        {familiy?.address}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>

      <div>
        <Typography className="h3 font-weight-bold mx-20">
          III.Lời cam đoan
        </Typography>
        <div className="ml-30 font-size-24 font-weight-500">
          <Typography>
            Tôi xin cam đoan bản khai sơ yếu lý lịch trên là đúng sự thật, nếu
            có điều gì không đúng tôi xin chịu trách nhiệm trước pháp luật về
            lời khai của mình.
          </Typography>
        </div>

        <div className="ml-30 font-size-24 font-weight-500">
          <div className="my-40 flex flex-middle">
            <Grid container spacing={2}>
              <Grid item xs={4} sm={6}></Grid>
              <Grid item xs={8} sm={6} >
                <LeterComfirmation
                  name={employee?.name}
                  time={employee?.submitDay || new Date()}
                />
              </Grid>
            </Grid>
          </div>
        </div> 
      </div>
    </div>
  );
}
