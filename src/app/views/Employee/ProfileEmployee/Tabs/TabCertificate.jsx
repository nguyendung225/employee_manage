import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import "styles/views/_TabCertificate.scss";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import { getCertificates } from "app/redux/actions/CertificateActions";
import { formatDate } from "utils";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  
  },
});


export default function TabCertificate({ t,employee }) {
  const classes = useStyles();
  const dispatch=useDispatch();
  const {certificateList,success}=useSelector(state=>state.certificate);
  useEffect(()=>{
    dispatch(getCertificates(employee?.id))
 },[employee?.id,success])
  return (

    <div className="certificate">
      <div className=" font-size-24 font-weight-500">
        <Typography className="h3 font-weight-bold">Văn bằng</Typography>
        <TableContainer component={Paper} className="m-8">
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width={50}>STT</TableCell>
                <TableCell align="left">   {t("certificate.name")}</TableCell>
                <TableCell align="center" width={100}>{t('certificate.issueDate')}</TableCell>
                <TableCell align="left">{t('certificate.field')}</TableCell>
                <TableCell align="left">{t('certificate.content')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {certificateList.map((certificate,index) => (
                <TableRow key={certificate?.id}>
                  <TableCell align="center" width={50}>{index+1}</TableCell>
                  <TableCell align="left">{certificate?.certificateName}</TableCell>
                  <TableCell align="center" width={100}>{formatDate(certificate?.issueDate)}</TableCell>
                  <TableCell align="left">{certificate?.field}</TableCell>
                  <TableCell align="left">{certificate?.content }</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
