import {
  FormPage,
  Img,
  H1,
  FormDiv,
  Form,
  FormLogo,
  LogoDiv2,
  LabelInput,
  LabelI,
  Input,
  FormImage,
  Preloader,
  ImgLoader,
  Botton,
} from "../Styled/Styled";
import logo from "../Images/logo_.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { PORT, loader } from "../../Utils/AppUtils";
import axios from "axios";
import swal from "sweetalert";
import { InputSelect } from "../Dashboard/RegisterDashboard/Styled-dashboard";
const Userforms = () => {
  console.log(localStorage.getItem("email"));

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    interests: "",
    userName: "",
  });

  const [cpass, setCpass] = useState();
  const handleChangePassword = (event) => {
    const { name, value } = event.target;
    setCpass(value);
    console.log(name);
  };
  const [loading, setLoading] = useState(false);

  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    if (name === cpass) {
      setPasswordMatch(value === formData.password);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.interests == "" && formData.interests == "Select Interest") {
      swal("ALERT", "Interest is required", "error");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      swal("ALERT", "Invalid email format", "error");
    } else if (formData.password.length < 6) {
      swal("ALERT", "Password must be at least 6 characters long", "error");
    } else if (formData.password !== cpass) {
      swal("ALERT", "Password does not match", "error");
    } else if (formData.userName == "") {
      swal("ALERT", "username is empty", "error");
    } else {
      try {
        setLoading(true);

        const response = await axios.post(
          `http://localhost:${PORT}/api/v1/register`,
          formData
        );

        setLoading(false);
        localStorage.setItem("email", formData.email);
        const status = response.statusCode;

        console.log(response);
        console.log(status);
        swal("ALERT", response.data.message, "success");
        window.location.href = "/otp";
      } catch (err) {
        setLoading(false);
        if (
          err.response.data.error == "Email already exists" &&
          err.response.data.status == true
        ) {
          swal("ALERT", err.response.data.error, "error");
        } else if (err.response.data.status == false) {
          localStorage.setItem("email", formData.email);
          window.location.href = "/verify-message";
        }

        console.log(err);
        swal("ALERT", err.response.data.error, "error");
      }
    }
  };
  return (
    <>
      {loading ? (
        <Preloader>
          <ImgLoader src={loader} width={50}></ImgLoader>
        </Preloader>
      ) : (
        <FormPage>
          <FormDiv style={{ height: "900px" }}>
            <Form onSubmit={handleSubmit}>
              <FormLogo>
                <LogoDiv2>
                  <Img src={logo} alt="logo" width={50} />
                  <H1>Cyngofok</H1>
                </LogoDiv2>
              </FormLogo>
              <h1>Create a new Account</h1>

              <LabelInput>
                <LabelI>
                  Email Address
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  ></Input>
                </LabelI>
                <LabelI>
                  Username
                  <Input
                    type="text"
                    placeholder="Enter your username"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                  ></Input>
                </LabelI>

                <LabelI>
                  Phone
                  <Input
                    type="phone"
                    placeholder="Enter your Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  ></Input>
                </LabelI>
                <LabelI>
                  Password
                  <Input
                    type="password"
                    placeholder="*****************************"
                    value={formData.password}
                    onChange={handleChange}
                    name="password"
                  ></Input>
                </LabelI>
                <LabelI>
                  Confirm Password
                  <Input
                    type="password"
                    placeholder="*****************************"
                    value={cpass}
                    name="cpassword"
                    onChange={handleChangePassword}
                  ></Input>
                  <span>
                    {passwordMatch
                      ? "Password Match"
                      : "Password does not match"}
                  </span>
                </LabelI>
                <LabelI>
                  Interest
                  <InputSelect
                    type="text"
                    style={{ width: "100%" }}
                    name="interests"
                    onChange={handleChange}
                  >
                    <option>Select Interest</option>
                    <option value="Football">Football</option>
                    <option value="Hockey">Hockey</option>
                    <option value="BasketBall">BasketBall</option>
                    <option value="Motorsports,">Motorsports,</option>
                    <option value="Bandy">Bandy</option>
                    <option value="Rugby">Rugby</option>
                    <option value="Skiing">Skiing</option>
                    <option value="Shooting">Shooting</option>
                  </InputSelect>
                </LabelI>
                <LabelI style={{ display: "flex" }}>
                  <input
                    type="checkbox"
                    style={{ margin: "10px", width: "30px" }}
                  />
                  <p style={{ fontSize: "14px", color: "" }}>
                    By continuing you agree to EasyLend‘s Terms of Service and
                    Privacy Policy,
                  </p>
                </LabelI>
                <Botton>Sign up</Botton>
              </LabelInput>
              <p>
                Already have an account ?{" "}
                <Link style={{ color: "blue" }} to="/">
                  Sign in here
                </Link>
              </p>
            </Form>
          </FormDiv>
          <FormImage></FormImage>
        </FormPage>
      )}
    </>
  );
};
export default Userforms;
