import {
  Align,
  Form,
  LabelInput,
  LabelI,
  Input,
  Botton,
  ImgLoader,
  Preloader,
} from "../Styled/Styled";
import Header from "../Header/Header";
import swal from "sweetalert";

import { Link } from "react-router-dom";
import { useState } from "react";
import { PORT, loader } from "../../Utils/AppUtils";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const SendLink = (event) => {
    event.preventDefault();
    console.log(formData.email);

    const obj = JSON.stringify({
      email: formData.email,
    });
    console.log(obj);
    try {
      setLoading(true);
      fetch(`http://localhost:${PORT}/api/v1/forgotPassword`, {
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
          setLoading(false);
          console.log(data);
          swal("ALERT", data.message, "success");
          localStorage.setItem("email_", formData.email);
        })
        .catch((e) => {
          setLoading(false);
          console.log(e);
          swal("ALERT", e.ressponse.error, "error");
        });
    } catch (err) {
      setLoading(false);
      const Error = err.response.data.error;

      console.log(Error);

      if (Error == "User Not Activated") {
        swal("ALERT", Error, "error");
        localStorage.setItem("email", formData.email);

        window.location.href = "/verify-message";
      } else {
        swal("ALERT", Error, "error");
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
        <>
          <Header navbar={[]} />

          <Align>
            <Form onSubmit={SendLink}>
              <h1>Enter Email</h1>
              <LabelInput>
                <LabelI>
                  Email Address
                  <Input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  ></Input>
                </LabelI>

                <p></p>

                <Botton>Enter Email</Botton>
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
      )}
    </>
  );
};

export default ResetPassword;
