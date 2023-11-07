import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import {
  Form,
  Input,
  LabelInput,
  LabelI,
  Botton,
  Align,
} from "../Styled/Styled"; // Import the appropriate components
import { PORT } from "../../Utils/AppUtils";
const email = localStorage.getItem("email_");
const Password = () => {
  const [mainMessage, setMainMessage] = useState("");
  const [statusCode, setCode] = useState(0);
  const [loading, setHoled] = useState(false);

  const [formData, setFormData] = useState({
    cpassword: "",
    password: "",
  });

  console.log(mainMessage);
  console.log(statusCode);
  console.log(loading);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    const fun = async () => {
      try {
        setHoled(false);
        const url = `http://localhost:${PORT}/api/v1/auth/verify-user`;
        const response = await axios.get(url, {
          params: {
            token: token,
          },
        });
        setHoled(true);
        const statusCode = response.status;
        console.log(statusCode);
        if (statusCode === 200) {
          setCode(statusCode);
          setMainMessage("USER ACTIVATED");
        } else {
          setCode(statusCode);
          setMainMessage("Try again or check verification Link");
        }
      } catch (error) {
        setCode(500);
        setHoled(true);
        console.error(error);
        setMainMessage("Try again or check verification Link");
      }
    };
    fun();
  }, [token]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.cpassword) {
      swal("ALERT", "Passwords do not match", "error");
    } else {
      try {
        const url = `http://localhost:${PORT}/api/v1/change-password`;
        const response = await axios.post(url, {
          password: formData.password,
          email: email,
        });

        console.log(response.data);
        window.location.href = "/success";
      } catch (err) {
        const Error = err.response.data.error;
        console.log(err.response.data);
        console.log(Error);

        if (Error === "User Not Activated") {
          swal("ALERT", Error, "error");
          localStorage.setItem("email", formData.email);
          window.location.href = "/verify-message";
        } else {
          swal("ALERT", Error, "error");
        }
      }
    }
  };

  return (
    <Align>
      <Form onSubmit={handleSubmit}>
        <h1>Reset Your Password</h1>
        <span
          style={{
            textAlign: "center",
          }}
        ></span>

        <LabelInput>
          <LabelI>
            Password
            <Input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="*********************"
              value={formData.password}
            />
          </LabelI>
          <LabelI>
            Confirm Password
            <Input
              onChange={handleChange}
              type="password" // Corrected input type
              name="cpassword" // Added name attribute
              value={formData.cpassword}
              placeholder="*********************"
            />
          </LabelI>
          <p></p>
          <Botton type="submit">Login</Botton> {/* Corrected submit button */}
        </LabelInput>
        <p>
          Dont have an account ?{" "}
          <Link style={{ color: "blue" }} to="/signup">
            Sign up here
          </Link>
        </p>
      </Form>
    </Align>
  );
};

export default Password;
