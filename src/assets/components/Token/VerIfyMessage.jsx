import axios from "axios";
import { useState } from "react";

import { sms, loader, PORT } from "../../Utils/AppUtils";
import {
  Preloader,
  ImgLoader,
  ButtonEmail,
  BodyToken,
  Modar,
} from "../Styled/Styled";
import { useLocation } from "react-router-dom";

const VerifyMessage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const message = queryParams.get("message-auth");
  console.log(message);

  const userdetails = localStorage.getItem("email");

  console.log(userdetails);

  if (userdetails == null || userdetails == "undefined") {
    window.location.replace("/login");
  }

  const [mainMessage, setMainMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const resendEmail = (e) => {
    setLoading(false);
    e.preventDefault();

    axios
      .get(`http://localhost:${PORT}/api/v1/resend/${userdetails}`, {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((response) => {
        setLoading(true);
        console.log(response.data);
        console.log(response.data.otp.otp);
        console.log(response.data.message);

        if (response.data.message == "OTP sent successfully") {
          setMainMessage(response.data.message);
        }
      })
      .catch((error) => {
        setLoading(true);
        console.error(error);
        setMainMessage("Try again or check verification Link");
      });
  };

  return (
    <>
      {!loading ? (
        <Preloader>
          <ImgLoader src={loader} width={50}></ImgLoader>
        </Preloader>
      ) : (
        <BodyToken>
          <Modar onSubmit={resendEmail}>
            <img src={sms} alt="" width={50} />

            <p>
              {mainMessage == "" ? (
                <p>
                  We have sent you an email for you to confirm your email if you
                  haven’t received it in a few minutes.
                </p>
              ) : (
                mainMessage
              )}
            </p>
            <ButtonEmail>Click to resend Mail</ButtonEmail>
          </Modar>
        </BodyToken>
      )}
    </>
  );
};

export default VerifyMessage;
