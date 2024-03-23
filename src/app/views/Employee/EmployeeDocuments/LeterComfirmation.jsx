import { Typography } from "@material-ui/core";
import React from "react";
import { getDayMonthYear } from "utils";
import "styles/views/_letter.scss";
export default function LeterComfirmation({title,time,name}) {
     const {day,month,year}=getDayMonthYear(time) 
  return <div className="text-center">
                <Typography>
                 <i> Hà Nội,ngày </i><span className="time">{day}</span>,<i>tháng</i> <span className="time">{month}</span>,<i>năm</i> <span className="time">{year}</span>
                </Typography>
                <Typography > 
                  <b>{title?title:'Người làm đơn'}</b>
                </Typography>
                <Typography className="mt-10">
                  <i>{title?'(Ký tên,đóng dấu)': '(Ký,ghi rõ họ tên)'}</i>
                </Typography>
                <Typography className="mt-40 h4">
                  <b>{name}</b>
                </Typography>
              </div>
 
}
