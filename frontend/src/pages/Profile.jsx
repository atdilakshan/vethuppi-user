import React, { useEffect, useRef, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "../axios";
import { useToasts } from "react-toast-notifications";
import { saveTokenLocalStorage } from "../utils/utils";

const Profile = () => {
  const [Disabled, setDisabled] = useState(false);
  const loginPhoneNumberRef = useRef();
  const loginPasswordRef = useRef();
  const { addToast } = useToasts();

  const [IsUser, setIsUser] = useState(false);
  const [User, setUser] = useState(localStorage.getItem("auth"));

  useEffect(() => {
    async function checkUser() {
      if (localStorage.getItem("auth")) {
        const data = await JSON.parse(localStorage.getItem("auth"));
        setIsUser(true);
        setUser(data);
        console.log(data.user.name, "data");
      }
    }
    checkUser();
  }, []);
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

  const Logout = () => {
    localStorage.removeItem("userInfor");
    localStorage.removeItem("auth");
    window.location = "/login";
  };
  return (
    <Helmet title="Profile">
      <CommonSection title="Profile" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <div style={{ borderRadius: "50%" }}>
                <img
                  style={{ borderRadius: "50%" }}
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAMFBMVEXk5ueutLepr7Lc3+Dn6erg4uO3vL/X2tvHy83Q09WzuLvr7e7Axce9wsTU19m6v8JF5F41AAADRUlEQVR4nO2a25rjIAiAPWCi5vT+bztJ02633WxEEnAu+O/mav4PKVHAGEVRFEVRFEVRFEVRFMUYGMAE70MwAK1ddgBCGpcub3RLnE1zLwAfs3P2D865JYWmXtAv9i+jF3lsp7UqHRjt8WqkBSYeG+1aOTWwAp//E6aX1hTEndKp0Y6XDRak8zA96SWtIKKcRGOFjNPDSsxpxiqtiGV7hZNdhJyWGikXJdKqIqF2K5Fkr3OytuNXgrFWys3sUr5SaWNgdqoP1BYq7qyqd2IvC7U/vSfMdb2jOLmR9fwoab7Bmuq007OO8wsIEzFSnHfjgehkWZOKdnq8RaGnSmW+pEK9Fo5hlDp76Z3DVz7pUq5XKZW6V4oz0eklgVGqpzoxFk8TqBWd80UzUKVGTinSxXOF85mMbgF94VgbVcRrguN9Y9HOb2KVgpEUKOaHO6kocLc4hkyQYm9REYq6Y1YyhFRnfh9vQHVV4PzuvRiqWp5roESGNKEu1zvultkDmKsOUKi9P1R083i/eh+g+xwyXfQnyLog6oSdOvBXqC+rcl7JFIMPys+tBlNkmE+HyK4THtY+rczZ5arFsP3B4Ed3FC1nY8slDggxf+1wONuldkJPLdPHaVtx2bFT8r9kNQiCn1NKs18df4kRDG+gcZi2fx98n2KclrxfZ3I3jXENWDBN1rtg2HJpyY9s+sjzx9+r3Jpbg6AYGJ9Ge1gMPu2W5INIxGDoY3e0yXUoZrtx5o7XGqOIFXpHbOoZSylAQsfo0ytHpkoBPpbS6CxcY39/dm3LbmSlnenm6/r6iaNH6R2u5U4tSIX9OzTjXbkFfXeT0lYj7rlnXRgzHLJcrw/Fzcl6Lm+ZXBh8nHDt5UVtURdw3YXuEHkNoQw9sRAPTjLUkkXpuaIhtmPuq07HEKyAOhtCU7+Vw/S7+6C2QyvhtN7kqw4QvIRTbU+NPaGeVhXJXtNpvUbGS5E3kupBHyDj1+VfkL/Ayub9NRxyaEoeqdOsUBMJ0UBZ7OWKNCamg6rr1KVXKqhuO3HplQ5i9iab5g8Q5yfuZMuvG/KKFJ1iVed5U50zlQJ193sYQ3nBQ/K796KY6dnJU/zS+AYUj09RFEVRFHl+AMEWKA6VY532AAAAAElFTkSuQmCC"
                />
              </div>
              <br />
              <div> {User.user ? User.user.name : "User"}</div>
            </Col>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    required
                    value={User.user ? User.user.name : "Email"}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    required
                    // ref={loginPhoneNumberRef}
                    value={User.user ? User.user.phone_no : "Phone Number"}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    required
                    value={User.user ? User.user.email : "Email"}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                background: "#5c5cc0",
                padding: "6px 13px",
                borderRadius: "12px",
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={Logout}
            >
              {" "}
              Logout
            </div>
          </div>
        </Container>
      </section>
    </Helmet>
  );
};

export default Profile;
