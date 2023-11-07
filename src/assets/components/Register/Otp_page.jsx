import {
  Align,
  Form,
  LabelInput,
  LabelI,
  Input,
  Botton,
} from "../Styled/Styled";
import Header from "../Header/Header";
import swal from "sweetalert";

import { Link } from "react-router-dom";
import { useState } from "react";
import { PORT } from "../../Utils/AppUtils";
const email = localStorage.getItem("email");

const OTP = () => {
  console.log(email);
  const [formData, setFormData] = useState({
    otp: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const enterOtp = (event) => {
    event.preventDefault();
    console.log(formData.otp);

    const obj = JSON.stringify({
      otp: formData.otp,
      email: email,
    });
    console.log(obj);
    fetch(`http://localhost:${PORT}/api/v1/verify-otp`, {
      method: "POST", // Corrected placement
      headers: {
        "Content-Type": "application/json",
      },
      body: obj,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        swal("ALERT", data.message, "success");
      })
      .catch((e) => {
        console.log(e);
        swal("ALERT", e.ressponse.error, "success");
      });
  };
  return (
    <>
      <Header navbar={[]} />

      <Align>
        <Form onSubmit={enterOtp}>
          <h1>Enter OTP</h1>
          <LabelInput>
            <LabelI>
              OTP
              <Input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                placeholder="Enter your OTP"
              ></Input>
            </LabelI>

            <p></p>

            <Botton>Enter OTP</Botton>
          </LabelInput>
          <p>
            Dont have an account ?{" "}
            <Link style={{ color: "blue" }} to="/">
              Login here
            </Link>
          </p>
        </Form>
      </Align>
    </>
  );
};

export default OTP;
