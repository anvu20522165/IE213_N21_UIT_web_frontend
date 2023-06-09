import React, { useContext } from "react";
import { DatePicker, Form, Input, Select, ConfigProvider } from "antd";
import { PhoneOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { User } from "../../interface/Interface";
import { usePatch } from "../../api/patch";
import { openNotification } from "../../components/Notifications";
import dayjs from "dayjs";
import "../../App.css";
import { ThemeProvider } from "../../components/ThemeProvider";
import useGet from "../../api/useGet";
import { AuthContext } from "../../context/AuthContext";

export const UserInfo: React.FC = () => {
  const gender = ["Nam", "Nữ"];

  const { user } = useContext(AuthContext);
  const onFinish = (values: any) => {};

  // React.useEffect(() => {
  //   if (userResult) {
  //     if (!isError) {
  //       openNotification("success", "Chỉnh sửa thông tin thành công");
  //     } else {
  //       openNotification("error", "Chỉnh sửa thông tin thất bại");
  //       fetchGet("user/" + user?.id);
  //     }
  //   }
  // }, [userResult]);

  const onFinishFailed = (values: any) => {};

  const disabledDate = (current: dayjs.Dayjs) => {
    return (
      current &&
      (current < dayjs("1950-01-01") || current > dayjs("2010-12-31"))
    );
  };

  return (
    <div className="sm:min-h-screen bg-white dark:bg-slate-800 rounded drop-shadow-md py-5">
      <div className="flex items-center justify-center bg-sky-300 dark:bg-sky-800 rounded h-10 mb-5 lg:mx-20 mx-10">
        <h1 className="font-semibold sm:text-base">THÔNG TIN TÀI KHOẢN</h1>
      </div>
      <div className="flex justify-center">
        <ThemeProvider>
          {user && (
            <Form
              name="basic"
              initialValues={{
                name: user?.name,
                phoneNumber: user?.phone,
                email: user?.email,
                gender: user?.gender,
                dayOfBirth: dayjs(new Date(user.birthDay)),
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="on"
              className="lg:w-2/3 w-4/5"
            >
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input
                  placeholder="Enter your name"
                  size="large"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                />
              </Form.Item>

              <Form.Item name="email">
                <Input
                  disabled={true}
                  size="large"
                  type="email"
                  prefix={<MailOutlined className="site-form-item-icon" />}
                />
              </Form.Item>

              <Form.Item
                name="phoneNumber"
                rules={[
                  { required: true, message: "Please input your phone!" },
                ]}
              >
                <Input
                  size="large"
                  showCount={false}
                  type="tring"
                  placeholder="Enter your phone"
                  className="dark:bg-slate-800 dark:text-white"
                  style={{
                    WebkitAppearance: "none",
                  }}
                  prefix={<PhoneOutlined className="site-form-item-icon" />}
                />
              </Form.Item>

              <div className="flex justify-between">
                <Form.Item
                  name="gender"
                  rules={[{ required: true, message: "gender!" }]}
                  className="w-2/5"
                >
                  <Select
                    allowClear
                    optionLabelProp="label"
                    size="large"
                    placeholder={
                      <React.Fragment>
                        <i className="fa-solid fa-mars-and-venus text-black dark:text-white"></i>
                        &nbsp;Gender
                      </React.Fragment>
                    }
                  >
                    {gender.map((gender) => (
                      <Select.Option
                        key={gender}
                        value={gender}
                        label={
                          <React.Fragment>
                            <i className="fa-solid fa-mars-and-venus text-black dark:text-white"></i>
                            &nbsp;
                            {gender}
                          </React.Fragment>
                        }
                      >
                        {gender}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="dayOfBirth"
                  rules={[
                    {
                      required: true,
                      message: "dayOfBirth!",
                    },
                  ]}
                >
                  <DatePicker
                    disabledDate={disabledDate}
                    defaultPickerValue={dayjs(new Date(user?.birthDay))}
                    size="large"
                    format="DD/MM/YYYY"
                  />
                </Form.Item>
              </div>

              <div className="flex justify-end">
                <Form.Item>
                  <button
                    className="px-4 py-2 border border-transparent rounded-md font-semibold text-white
             bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out mt-2"
                  >
                    Chỉnh sửa
                  </button>
                </Form.Item>
              </div>
            </Form>
          )}
        </ThemeProvider>
      </div>
    </div>
  );
};
