import {
  FormPage,
  Img,
  H1,
  FormDiv,
  Form,
  FormLogo,
  ImgLoader,
  LogoDiv2,
  Preloader,
  LabelInput,
  LabelI,
  Input,
  FormImage,
  Botton,
} from "../Styled/Styled";
import { useState } from "react";
import logo from "../Images/logo_.png";
import { Link } from "react-router-dom";
import { PORT, loader } from "../../Utils/AppUtils";
import swal from "sweetalert";
import axios from "axios";
const UserFormsAuth = () => {
  const [formData, setFormData] = useState({
    value: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.value) {
      swal("ALERT", "Invalid email/otp format", "error");
    } else {
      try {
        setLoading(true);

        const url = `http://localhost:${PORT}/api/v1/login`;
        const response = await axios.post(url, formData);
        setLoading(false);

        console.log(response.data);

        const email_verify = response.data.user.email;
        const id = response.data.user._id;
        const token = response.data.token;
        const registrationStatus = response.data.user.status;

        localStorage.setItem("id", id);
        localStorage.setItem("token", token);
        localStorage.setItem("email", email_verify);

        swal("ALERT", "Succesful Login", "success");
        console.log(id);
        console.log(token);

        if (!registrationStatus) {
          request_meethod("/verify-message");
        } else {
          request_meethod("/dashboard");
        }
      } catch (err) {
        setLoading(false);
        const Error = err.response.data.error;
        console.log(err.response.data);
        console.log(Error);

        if (Error == "User Not Activated") {
          swal("ALERT", Error, "error");
          localStorage.setItem("email", formData.value);

          window.location.href = "/verify-message";
        } else {
          swal("ALERT", Error, "error");
        }
      }
    }
  };

  const request_meethod = (url) => {
    var x = 0;
    setInterval(() => {
      x++;
      if (x == 3) {
        window.location.href = url;
      }
    }, 1000);
  };
  return (
    <>
      {loading ? (
        <Preloader>
          <ImgLoader src={loader} width={50}></ImgLoader>
        </Preloader>
      ) : (
        <FormPage>
          <FormDiv>
            <Form onSubmit={handleSubmit} method="post">
              <FormLogo>
                <LogoDiv2>
                  <Img src={logo} alt="logo" width={50} />
                  <H1>Cyngofok</H1>
                </LogoDiv2>
              </FormLogo>
              <h1>Welcome back to Cyngofok</h1>

              <LabelInput>
                <LabelI>
                  Email Address
                  <Input
                    type="text"
                    onChange={handleChange}
                    value={formData.value}
                    name="value"
                    placeholder="Enter your email"
                  ></Input>
                </LabelI>
                <LabelI>
                  Password
                  <Input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    placeholder="*****************************"
                  ></Input>
                </LabelI>
                <Link to="/reset">Forget password</Link>
                <p></p>

                <Botton>Login</Botton>
              </LabelInput>
              <p>
                {" "}
                {"Don't have an account"} ?{" "}
                <Link style={{ color: "blue" }} to="/signup">
                  Sign up here
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
export default UserFormsAuth;
