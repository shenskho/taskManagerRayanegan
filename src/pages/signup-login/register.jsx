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
import { clearError } from "@store/slices/authSlice";
import { authService } from "@/services/authService";

const initialFormState = {
  nationalCode: "",
  password: "",
  rePassword: "",
  firstName: "",
  lastName: "",
  gender: "", // 1 male, 2 female
  parentRef: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState(initialFormState);
  const [localError, setLocalError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (isAuthenticated && storedToken) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("📝 register: change", name, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (localError) setLocalError("");
    if (error) dispatch(clearError());
  };

  const validateForm = () => {
    if (!formData.nationalCode.trim()) {
      setLocalError("کد ملی را وارد کنید.");
      return false;
    }
    if (!formData.firstName.trim()) {
      setLocalError("نام را وارد کنید.");
      return false;
    }
    if (!formData.lastName.trim()) {
      setLocalError("نام خانوادگی را وارد کنید.");
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
    if (!formData.rePassword.trim()) {
      setLocalError("تکرار رمز عبور را وارد کنید.");
      return false;
    }
    if (formData.password !== formData.rePassword) {
      setLocalError("رمز عبور و تکرار آن یکسان نیست.");
      return false;
    }
    if (!String(formData.gender)) {
      setLocalError("جنسیت را انتخاب کنید.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('📨 register: submit clicked');
    setLocalError("");
    setSuccessMsg("");

    if (!validateForm()) {
      console.warn("⚠️ register: validation failed", formData);
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        ...formData,
        gender: Number(formData.gender),
        parentRef: formData.parentRef.trim(),
      };
      if (!payload.parentRef) {
        delete payload.parentRef;
      }
      console.log("🔵 register: about to call authService.register with", {
        ...payload,
        password: "***",
        rePassword: "***",
      });
      const res = await authService.register(payload);
      console.log("🟢 register: response", res);
      console.log("🟢 register: response status", res?.status);
      console.log("🟢 register: response data", res?.data);
      
      // Check if successful (status 200-299 or no status but has data)
      if ((res?.status >= 200 && res?.status < 300) || (!res?.status && res?.data)) {
        setSuccessMsg("ثبت‌نام با موفقیت انجام شد. اکنون می‌توانید وارد شوید.");
        setTimeout(() => navigate("/signup", { replace: true }), 1000);
      } else {
        setLocalError(
          res?.data?.message ||
            res?.data?.error ||
            (typeof res?.data === "string" ? res.data : "") ||
            "ثبت‌نام ناموفق بود."
        );
      }
    } catch (e) {
      console.error("❌ register: error", e);
      const serverMsg =
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        (typeof e?.response?.data === "string" ? e.response.data : "");
      setLocalError(serverMsg || e?.message || "ثبت‌نام ناموفق بود.");
    } finally {
      setSubmitting(false);
    }
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

                {(successMsg || localError || error) && (
                  <Alert color={successMsg ? "success" : "danger"} className="py-2" fade={false}>
                    {successMsg || localError || error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit} noValidate>
                  <FormGroup>
                    <Label for="nationalCode" className="form-label">
                      کد ملی
                    </Label>
                    <Input
                      id="nationalCode"
                      name="nationalCode"
                      type="text"
                      placeholder="مثال: amir123"
                      value={formData.nationalCode}
                      onChange={handleChange}
                      required
                      invalid={!!localError && !formData.nationalCode.trim()}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="firstName" className="form-label">
                      نام
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="مثال: امیر"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      invalid={!!localError && !formData.firstName.trim()}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="lastName" className="form-label">
                      نام خانوادگی
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="مثال: غلامپور"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      invalid={!!localError && !formData.lastName.trim()}
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
                        (formData.password.length < 6 || !formData.password.trim())
                      }
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="rePassword" className="form-label">
                      تکرار رمز عبور
                    </Label>
                    <Input
                      id="rePassword"
                      name="rePassword"
                      type="password"
                      placeholder="رمز عبور را تکرار کنید"
                      value={formData.rePassword}
                      onChange={handleChange}
                      required
                      minLength={6}
                      invalid={!!localError && formData.password !== formData.rePassword}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label className="form-label">جنسیت</Label>
                    <Input
                      type="select"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">انتخاب کنید</option>
                      <option value="1">مرد</option>
                      <option value="2">زن</option>
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label for="parentRef" className="form-label">
                      کد معرف (اختیاری)
                    </Label>
                    <Input
                      id="parentRef"
                      name="parentRef"
                      type="text"
                      placeholder="مثال: 3fa85f64-5717-4562-b3fc-2c963f66afa6"
                      value={formData.parentRef}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <Button type="submit" color="primary" className="w-100" disabled={submitting}>
                    {submitting ? (
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
