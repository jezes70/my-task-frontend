import { Flex, Input, LabelI, Modar } from "../../Styled/Styled";

import styled from "styled-components";
import money from "./Images/money-bill.png";
import { Link } from "react-router-dom";
import money4 from "./Images/Profile.png";
import logout from "./Images/logout.png";

import { useState, useEffect } from "react";
import swal from "sweetalert";

import { Button, InputSelect } from "../RegisterDashboard/Styled-dashboard";
import {
  App,
  AppContent,
  LoanModar,
  RoleModar,
  FormI,
} from "./DashboardStyled";
import { config } from "../../../Utils/AppUtils";

const MainDashboard = () => {
  const userid = localStorage.getItem("id");

  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmState, setConfirm] = useState(false);
  const [leftState, setleftState] = useState(false);
  const [count, setCount] = useState(0);

  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    interests: "",
    password: "",
    userName: "",
  });

  const loanIn = () => {
    setConfirm(false);
    setState(true);
  };

  const goBack = () => {
    setConfirm(true);
    setState(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const save = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/api/v1/update/${userid}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        console.log(data);
        swal("ALERT", "SUCCESS", "success");
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  // Fetch user data and populate the form
  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/view-users/${userid}`, config)
      .then((response) => response.json())
      .then((data) => {
        setFormData({
          email: data.msg.email,
          password: data.msg.password,
          userName: data.msg.userName,
          phone: data.msg.phone,
          interests: data.msg.interests,
        });
      });
  }, [userid]);

  const left = () => {
    setCount(count + 1);
    setleftState(true);
    if (count == 2) {
      setleftState(false);
      setCount(0);
      console.log(loading);
    }
  };
  const logout_session = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  return (
    <>
      <Flex>
        <SideDashboard style={{ left: leftState ? "0%" : "-130%" }}>
          <h1>Overview</h1>
          <Link to="/dashboard">
            <SidedTfLX>
              <img src={money} width={30} alt="Loans" />
              <span style={{ color: "#2D00F7" }}>&nbsp;</span>
            </SidedTfLX>
          </Link>

          <span>
            <SidedTfLX onClick={loanIn}>
              <img src={money4} width={30} alt="Profile" />
              <span>&nbsp;Profile</span>
            </SidedTfLX>
          </span>
          <h1>Overview</h1>

          <span onClick={logout_session}>
            <SidedTfLX>
              <img src={logout} width={30} alt="Logout" />
              <span>&nbsp;Logout</span>
            </SidedTfLX>
          </span>

          <Close onClick={left}>X</Close>
        </SideDashboard>
        <App>
          <But onClick={left}>MENU</But>
          <div style={{ height: "50px" }}></div>
          <h1>Welcome to the dashboard</h1>

          <div>EmaIl: {formData.email}</div>
          <div>Username: {formData.userName}</div>
          <div>Phone: {formData.phone}</div>

          <div>Interest: {formData.interests}</div>

          <AppContent>
            <Button onClick={loanIn}>Update Profile</Button>
          </AppContent>
        </App>

        {state && !confirmState ? (
          <LoanModar>
            <Modar>
              <RoleModar>
                <h1>Update Profile</h1>
                <button onClick={goBack}>x</button>
              </RoleModar>
              <FormI>
                <LabelI style={{ width: "100%" }}>
                  <p></p>
                  Email
                  <Input
                    type="email"
                    onChange={handleChange}
                    value={formData.email}
                    name="email"
                    placeholder="Enter Email"
                  ></Input>
                </LabelI>
                <LabelI style={{ width: "100%" }}>
                  <p></p>
                  Password
                  <Input
                    type="password"
                    onChange={handleChange}
                    value={formData.password}
                    name="password"
                    placeholder="Select Password"
                  ></Input>
                </LabelI>
                <LabelI style={{ width: "100%" }}>
                  <p></p>
                  Select Phone
                  <Input
                    type="phone"
                    onChange={handleChange}
                    value={formData.phone}
                    name="phone"
                    placeholder="Phone"
                  ></Input>
                </LabelI>
                <LabelI style={{ width: "100%" }}>
                  <p></p>
                  Select userName
                  <Input
                    type="userName"
                    onChange={handleChange}
                    value={formData.userName}
                    name="userName"
                    placeholder="userName"
                  ></Input>
                </LabelI>
                <LabelI style={{ width: "100%" }}>
                  <p></p>

                  <InputSelect
                    type="text"
                    style={{ width: "100%" }}
                    name="interests"
                    onChange={handleChange}
                  >
                    <option>Select Interest</option>
                    <option value="Football">Football</option>
                    <option value="Ice Hockey,">Ice Hockey</option>
                    <option value="BasketBall">BasketBall</option>
                    <option value="Motorsports,">Motorsports,</option>
                    <option value="Bandy">Bandy</option>
                    <option value="Rugby">Rugby</option>
                    <option value="Skiing">Skiing</option>
                    <option value="Shooting">Shooting</option>
                  </InputSelect>
                </LabelI>
                <p></p>

                <Button onClick={save} type="submit">
                  Continue
                </Button>
              </FormI>
            </Modar>
          </LoanModar>
        ) : (
          ""
        )}
      </Flex>
    </>
  );
};

export default MainDashboard;

const SideDashboard = styled.div`
  width: 15%;
  height: 80vh;
  border-top: 1px solid #ccc;
  padding: 20px;
  a {
    text-decoration: none;
  }
  @media (max-width: 600px) {
    transition-duration: 1s;
    width: 100%;
    background: white;
    border-top: 1px solid #ccc;
    position: absolute;
    left: -130%;
  }
`;

const SidedTfLX = styled.div`
  width: 90%;
  height: 40px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-left: 10px;
  img {
    margin-right: 10px;
  }
  span {
    color: #667085;
  }
`;

const But = styled.button`
  display: none;
  @media (max-width: 700px) {
    display: flex;
  }
`;

const Close = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  display: none;
  @media (max-width: 600px) {
    display: flex;
  }
`;
