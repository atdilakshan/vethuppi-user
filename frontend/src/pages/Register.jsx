import React, { useRef, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import axios from "../axios";
import { useToasts } from "react-toast-notifications";
import { saveTokenLocalStorage } from "../utils/utils";

const Register = () => {
  const [Disabled, setDisabled] = useState(false);

  const loginNameRef = useRef();
  const loginEmailRef = useRef();
  const loginPhoneNumberRef = useRef();
  const loginPasswordRef = useRef();
  const { addToast } = useToasts();

  const submitHandler = (e) => {
    e.preventDefault();
    const json = {
      name: loginNameRef.current.value,
      email: loginEmailRef.current.value,
      phone_no: loginPhoneNumberRef.current.value,
      password: loginPasswordRef.current.value,
    };
    axios
      .post("v1/signup", json)
      .then((result) => {
        // saveTokenLocalStorage(result.data);
        addToast("Successfully Login", {
          appearance: "success",
          autoDismiss: "true",
          autoDismissTimeout: 2000,
        });
        window.location = "/login";
      })
      .catch((error) => {
        addToast("username or password is incorrcet", {
          appearance: "error",
          autoDismiss: "true",
          autoDismissTimeout: 2000,
        });
        setDisabled(false);

        // setEmail("");
        // setPassword("");
      });
  };

  return (
    <Helmet title="Signup">
      <CommonSection title="Signup" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <form className="form mb-5" onSubmit={submitHandler}>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    ref={loginNameRef}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    ref={loginEmailRef}
                  />
                </div>
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
                  Sign Up
                </button>
              </form>
              <Link to="/login">Already have an account? Login</Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Register;