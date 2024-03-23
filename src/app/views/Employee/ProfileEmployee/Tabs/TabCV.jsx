import { Avatar } from "@material-ui/core";
import React from "react";
import ConstantList from "app/appConfig";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PhoneIcon from "@material-ui/icons/Phone";
import { formatDate } from "utils";
import "styles/views/_TabCV.scss";
import { GENDER } from "app/constants/employeeConstants";
export default function TabCV({t, employee }) {
  console.log(employee);
  return (
    <div className="">
      <div className="flex">
        <div className="left">
          <Avatar
            alt="avatar"
            src={
              employee?.image ||
              ConstantList.ROOT_PATH + "assets/images/avatar.jpg"
            }
            className="avatar"
          />
          <div className="w-80 text-right ">
            <div className="flex flex-middle flex-end">
              <MailOutlineIcon  />
              <div className="ml-10">quynhmai92@gmail.com</div>
            </div>
            <div className="flex flex-middle flex-end mt-10">
              <PhoneIcon  />
              <div className="ml-10">0948958604</div>
            </div>
          </div>
          <div className="skills">
            <div className="title">Kỹ năng</div>
            <ul>
              <li>Giao tiếp tốt với khách hàng</li>
              <li>Thuyết phục</li>
              <li>Thương lượng</li>
            </ul>
          </div>
          <div className="language">
            <div className="title">Ngoại ngữ</div>
            <ul>
              <div className=" flex flex-middle flex-space-between w-80">
                {" "}
                <li>Tiếng anh</li>{" "}
                <div className=" flex flex-middle">
                  <div className="mr-20 dot"></div>
                  <div className="mr-20 dot"></div>
                  <div className="mr-20 dot"></div>
                </div>
              </div>
              <div className=" flex flex-middle flex-space-between w-80">
                <li>Tiếng trung</li>{" "}
                <div className=" flex flex-middle">
                  <div className="mr-20 dot"></div>{" "}
                  <div className="mr-20 dot"></div>
                  <div className="mr-20 dot outline"></div>
                </div>
              </div>
            </ul>
          </div>
          <div className="actions">
            <div className="title">Hoạt động</div>
            <ul>
              <li>Giao tiếp tốt với khách hàng</li>
              <li>Thuyết phục</li>
              <li>Thương lượng</li>
            </ul>
          </div>
        </div>
        <div className="right">
          <div className="head">
            <div className="name">Nguyễn Trúc Quỳnh Mai</div>
            <div className="job">Nhân viên kinh doanh</div>
          </div>
          <div className="info ">
            <div className="my-8 ">
              <img
                src={ConstantList.ROOT_PATH + "assets/images/gender.png"}
                alt="gender"
                className="gender"
              />
              <span className="ml-4">
                {t(`staff.gender.${GENDER.find((item) => item.value === employee?.gender)?.name}`)}
              </span>
            </div>
            <div className="my-8 ">
              <img
                src={ConstantList.ROOT_PATH + "assets/images/cake.png"}
                alt="cake"
                className="cake"
              />
              <span className="ml-4">{formatDate(employee?.dateOfBirth)}</span>
            </div>
            <div className="my-8 ">
              <img
                src={ConstantList.ROOT_PATH + "assets/images/location.png"}
                alt="location"
                className="location"
              />
              <span className="ml-4">{employee?.address}</span>
            </div>
          
          </div>
          <div className="goal">
              <div className="title">Mục tiêu nghề nghiệp</div>
              <div className="description">
              Áp dụng những kinh nghiệm về kỹ năng bán hàng và sự hiểu biết về thị trường để trở thành một nhân viên bán hàng chuyên nghiệp, mang đến nhiều giá trị cho khách hàng. Từ đó giúp Công ty tăng số lượng khách hàng và mở rộng tập khách hàng.


              </div>
          </div>

         

          <div className="experience">
          <div className="title">Kinh nghiệm làm việc</div>
          <div className="description"><span >05/2019 - 05/2022</span> <span className="dot">.</span> <span>Cửa hàng siêu việt</span></div>
          <div className="job">Nhân viên bán hàng</div>
           <ul>
              <li>Bán hàng trực tiếp tại cửa hàng cho nhân viên người Việt</li>
              <li>Bán hàng trực tiếp tại cửa hàng cho nhân viên người Việt</li>
           </ul>
          </div>

          <div className="certificate">
          <div className="title">Chứng chỉ</div>
          
       
           <ul>
              <li>Bán hàng trực tiếp tại cửa hàng cho nhân viên người Việt</li>
              <li>Bán hàng trực tiếp tại cửa hàng cho nhân viên người Việt</li>
           </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
