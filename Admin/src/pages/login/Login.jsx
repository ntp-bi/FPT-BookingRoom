import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Col, Container, Form, FormGroup, Row } from "reactstrap";

import { jwtDecode } from "jwt-decode";

import "./login.scss";

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleInputFocus = (fieldName) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasErrors = false;
        const newErrors = { ...errors };

        if (!credentials.username) {
            newErrors.username = "Vui lòng nhập tên người dùng.";
            hasErrors = true;
        } else {
            newErrors.username = "";
        }

        if (!credentials.password) {
            newErrors.password = "Vui lòng nhập mật khẩu.";
            hasErrors = true;
        } else {
            newErrors.password = "";
        }

        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/account/login",
                credentials,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = response.data;
            if (response.status === 200) {
                const token = data.data;
                localStorage.setItem("token", token);

                const decoded = jwtDecode(token);

                if (decoded.role === "teacher") {
                    navigate("/home");
                } else {
                    navigate("/");
                }
            }
        } catch (error) {
            toast.error("Đăng nhập thất bại!");
        }
    };

    return (
        <Container>
            <Row>
                <Col lg="8" className="container">
                    <div className="login__container">
                        <div className="login__img">
                            <img src="/assets/person/register.png" alt="" />
                        </div>

                        <div className="login__form">
                            <div className="user">
                                <img src="/assets/person/user.png" alt="" />
                            </div>
                            <h2>Đăng nhập</h2>

                            <Form onSubmit={handleSubmit}>
                                <FormGroup className="form__input">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        id="username"
                                        onChange={handleChange}
                                        onFocus={() => handleInputFocus("username")}
                                        value={credentials.username}
                                    />
                                </FormGroup>
                                {errors.username && (
                                    <div className="error">{errors.username}</div>
                                )}
                                <FormGroup className="form__input">
                                    <input
                                        type="password"
                                        placeholder="Mật khẩu"
                                        id="password"
                                        onChange={handleChange}
                                        onFocus={() => handleInputFocus("password")}
                                        value={credentials.password}
                                    />
                                </FormGroup>
                                {errors.password && (
                                    <div className="error">{errors.password}</div>
                                )}
                                <Button
                                    className="auth__btn"
                                    type="submit"
                                    onClick={handleSubmit}
                                >
                                    Đăng nhập
                                </Button>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
