import React, { useState } from "react";
import { Button, Col, Container, Form, FormGroup, Row } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import { ACCOUNT_URL } from "../../api/apiConfig";

import "./changePassword.scss";

const ChangePassword = () => {
    const [credentials, setCredentials] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
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

    const handleClick = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!credentials.oldPassword) {
            newErrors.oldPassword = "Vui lòng nhập mật khẩu cũ.";
        }

        if (!credentials.newPassword) {
            newErrors.newPassword = "Vui lòng nhập mật khẩu mới.";
        } else if (credentials.newPassword.length < 6) {
            newErrors.newPassword = "Mật khẩu mới phải có ít nhất 6 ký tự.";
        } else if (credentials.newPassword.length > 30) {
            newErrors.newPassword = "Mật khẩu mới không được dài hơn 30 ký tự.";
        } else if (credentials.newPassword === credentials.oldPassword) {
            newErrors.newPassword = "Mật khẩu mới trùng với mật khẩu cũ.";
        }

        if (!credentials.confirmPassword) {
            newErrors.confirmPassword = "Vui lòng nhập lại mật khẩu mới.";
        } else if (credentials.newPassword !== credentials.confirmPassword) {
            newErrors.confirmPassword = "Xác nhận mật khẩu không trùng khớp.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `${ACCOUNT_URL}/changePassword`,
                credentials,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setCredentials(response.data);
            toast.success("Đổi mật khẩu thành công!");
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                const apiError = error.response.data.message;
                if (apiError === "Incorrect old password") {
                    setErrors({ oldPassword: "Mật khẩu cũ không đúng." });
                } else {
                    setErrors({ global: "Đổi mật khẩu thất bại!" });
                }
            } else {
                setErrors({ global: "Đổi mật khẩu thất bại!" });
            }
            toast.error("Đổi mật khẩu thất bại!");
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
                            <h2>Đổi mật khẩu</h2>

                            <Form onSubmit={handleClick}>
                                <FormGroup className="form__input">
                                    <input
                                        type="password"
                                        placeholder="Nhập mật khẩu cũ"
                                        id="oldPassword"
                                        onChange={handleChange}
                                        onFocus={() => handleInputFocus("oldPassword")}
                                    />
                                </FormGroup>
                                {errors.oldPassword && (
                                    <div className="error">{errors.oldPassword}</div>
                                )}
                                <FormGroup className="form__input">
                                    <input
                                        type="password"
                                        placeholder="Nhập mật khẩu mới"
                                        id="newPassword"
                                        onChange={handleChange}
                                        onFocus={() => handleInputFocus("newPassword")}
                                    />
                                </FormGroup>
                                {errors.newPassword && (
                                    <div className="error">{errors.newPassword}</div>
                                )}
                                <FormGroup className="form__input">
                                    <input
                                        type="password"
                                        placeholder="Nhập lại mật khẩu"
                                        id="confirmPassword"
                                        onChange={handleChange}
                                        onFocus={() =>
                                            handleInputFocus("confirmPassword")
                                        }
                                    />
                                </FormGroup>
                                {errors.confirmPassword && (
                                    <div className="error">{errors.confirmPassword}</div>
                                )}
                                {errors.global && (
                                    <div className="error">{errors.global}</div>
                                )}
                                <Button
                                    className="auth__btn"
                                    type="submit"
                                    onClick={handleClick}
                                >
                                    Lưu
                                </Button>
                            </Form>
                            <p>
                                <Link to="/">Quay lại</Link>
                                <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ChangePassword;
