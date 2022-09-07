import React, { useRef, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "../axios";
import { useToasts } from "react-toast-notifications";
import { saveTokenLocalStorage } from "../utils/utils";

const Login = () => {
  const [Disabled, setDisabled] = useState(false);
  const loginPhoneNumberRef = useRef();
  const loginPasswordRef = useRef();
  const { addToast } = useToasts();

  const submitHandler = (e) => {
    e.preventDefault();
    const json = {
      phone_no: loginPhoneNumberRef.current.value,
      password: loginPasswordRef.current.value,
    };
    axios
      .post("v1/signin", json)
      .then((result) => {
        saveTokenLocalStorage(result.data);
        addToast("Successfully Login", {
          appearance: "success",
          autoDismiss: "true",
          autoDismissTimeout: 3000,
        });
        window.location = "/";
      })
      .catch((error) => {
        addToast("username or password is incorrcet", {
          appearance: "error",
          autoDismiss: "true",
          autoDismissTimeout: 3000,
        });
        setDisabled(false);

        // setEmail("");
        // setPassword("");
      });
  };

  return (
    <Helmet title="Login">
      <CommonSection title="Login" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <form className="form mb-5" onSubmit={submitHandler}>
                <div className="form__group">
                  <input
                    type="number"
                    placeholder="Phone Number"
                    required
                    ref={loginPhoneNumberRef}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    ref={loginPasswordRef}
                  />
                </div>
                <button type="submit" className="addTOCart__btn">
                  Login
                </button>
              </form>
              <Link to="/register">
                Don't have an account? Create an account
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
