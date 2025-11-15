import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Input,
  Label,
  Form,
  FormGroup,
  Alert,
  Spinner,
} from "reactstrap";
import logo from "@assets/images/logo/logo2.png";
import {
  clearError,
  register as registerAction,
} from "@store/slices/authSlice";

const initialFormState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState(initialFormState);
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (isAuthenticated && storedToken) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Clear error when component mounts
    if (error) {
      dispatch(clearError());
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (localError) {
      setLocalError("");
    }
    if (error) {
      dispatch(clearError());
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setLocalError("نام و نام‌خانوادگی خود را وارد کنید.");
      return false;
    }

    if (!formData.email.trim()) {
      setLocalError("وارد کردن ایمیل الزامی است.");
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setLocalError("ایمیل وارد شده معتبر نیست.");
      return false;
    }

    if (!formData.password.trim()) {
      setLocalError("وارد کردن رمز عبور الزامی است.");
      return false;
    }

    if (formData.password.length < 6) {
      setLocalError("طول رمز عبور باید حداقل ۶ کاراکتر باشد.");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setLocalError("رمز عبور و تکرار آن یکسان نیست.");
      return false;
    }

    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLocalError("");

    if (!validateForm()) {
      return;
    }

    dispatch(
      registerAction({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      })
    );
  };

  return (
    <div
      className="auth-page d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fb 0%, #dee3f3 100%)",
        padding: "2rem",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xl={4} lg={5} md={6}>
            <Card className="shadow-sm border-0">
              <CardBody className="p-4">
                <div className="text-center mb-4">
                  <img
                    src={logo}
                    alt="لوگوی رایانگان"
                    style={{
                      width: "72px",
                      height: "72px",
                      objectFit: "contain",
                    }}
                  />
                  <h1 className="h4 fw-bold mt-3 mb-1">ثبت‌نام</h1>
                  <p className="text-muted mb-0">حساب کاربری جدید ایجاد کنید</p>
                </div>

              
                {(localError || error) && (
                  <Alert color="danger" className="py-2">
                    {localError || error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit} noValidate>
                  <FormGroup>
                    <Label for="name" className="form-label">
                      نام کاربری
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="مثال: امیر"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      invalid={!!localError && !formData.name.trim()}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="password" className="form-label">
                      رمز عبور
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="حداقل ۶ کاراکتر"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={6}
                      invalid={
                        !!localError &&
                        (formData.password.length < 6 ||
                          !formData.password.trim())
                      }
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="confirmPassword" className="form-label">
                      تکرار رمز عبور
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="رمز عبور را تکرار کنید"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      minLength={6}
                      invalid={
                        !!localError &&
                        formData.password !== formData.confirmPassword
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email" className="form-label">
                      ایمیل
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="example@mail.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      invalid={!!localError && !formData.email.trim()}
                    />
                  </FormGroup>
                    <FormGroup>
                    <Label for="name" className="form-label">
                      نام 
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="مثال: امیرحسین"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      invalid={!!localError && !formData.name.trim()}
                    />
                  </FormGroup>
                    <FormGroup>
                    <Label for="name" className="form-label">
                      نام خانوادگی
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="مثال: غلام پور"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      invalid={!!localError && !formData.name.trim()}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>جنسیت</Label>
                    <Input type="select" name="gender" required>
                      <option value="">انتخاب کنید</option>
                      <option value="">مرد</option>
                      <option value="">زن</option>
                      </Input>
                  </FormGroup>

                  <Button
                    type="submit"
                    color="primary"
                    className="w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner size="sm" className="me-2" />
                        لطفاً صبر کنید...
                      </>
                    ) : (
                      "ایجاد حساب کاربری"
                    )}
                  </Button>
                </Form>

                <div className="text-center mt-4">
                  <small className="text-muted">
                    حساب کاربری دارید؟{" "}
                    <Link to="/signup" className="text-decoration-none">
                      وارد شوید
                    </Link>
                  </small>
                </div>

                <div className="text-center mt-3">
                  <small className="text-muted">
                    با ثبت‌نام، با شرایط استفاده و سیاست حفظ حریم خصوصی موافقت
                    می‌کنید.
                  </small>
                </div>
              </CardBody>
            </Card>

            <p className="text-center text-muted mt-3 mb-0">
              © {new Date().getFullYear()} رایانگان. تمامی حقوق محفوظ است.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
