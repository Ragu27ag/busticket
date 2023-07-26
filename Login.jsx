import { useFormik } from "formik";
import React, { useState } from "react";
import backendinstance from "../Axios/axios.js";
import * as yup from "yup";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Link, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";

const Login = () => {
  let user = "";
  const [loggedin, setloggedin] = useState(user !== "");
  const navigate = useNavigate();

  const validation = yup.object().shape({
    email: yup.string().email().required("Enter the email"),
    password: yup.string().required("Enter the password"),
  });
  const formdata = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const { data } = await backendinstance.post("/users/login", values);
      console.log(data);
      if (data.msg === "Invalid Credentials") {
        alert("Invalid Credentials");
      } else {
        localStorage.setItem("user", JSON.stringify(data));
        user = JSON.parse(localStorage.getItem(user)) || {};

        formdata.resetForm();
        setloggedin(true);
      }
    },
    validationSchema: validation,
  });

  if (loggedin) {
    navigate("/");
  }

  console.log(formdata.touched.email);
  return (
    <>
      {" "}
      <Typography
        mt={2}
        sx={{ textAlign: "center", color: "#e93e3e" }}
        variant="h4"
      >
        Welcome
      </Typography>
      <p style={{ marginBottom: "0px", textAlign: "center", color: "grey" }}>
        please login or signup to continue
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          paddingTop: "50px",
        }}
      >
        <div
          style={{
            height: "400px",
            width: "300px",
            border: "1px solid grey",
            borderLeft: "1px solid #e93e3e",
            display: "flex",
            borderRadius: "8px",
            boxShadow:
              "  rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form onSubmit={formdata.handleSubmit}>
            <label htmlFor="email" style={{}}>
              Email
            </label>
            <br />
            <input
              type="email"
              name="email"
              value={formdata.values.email}
              onChange={formdata.handleChange}
              onBlur={formdata.handleBlur}
              id="email"
              // style={{ borderColor: " red" }}
            />
            {formdata.touched.email && formdata.errors.email && (
              <div
                style={{ fontSize: "12px", color: "red", position: "relative" }}
              >
                {formdata.errors.email}{" "}
                <div
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    right: "60px",
                  }}
                >
                  <ErrorOutlineIcon sx={{ fontSize: "10px" }} />
                </div>
              </div>
            )}
            <br />

            <label htmlFor="password">Password</label>
            <br />
            <input
              value={formdata.values.password}
              onChange={formdata.handleChange}
              onBlur={formdata.handleBlur}
              type="password"
              name="password"
              id="password"
            />
            {formdata.touched.password && formdata.errors.password && (
              <div
                style={{ fontSize: "12px", color: "red", position: "relative" }}
              >
                {formdata.errors.password}
                <div
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    right: "60px",
                  }}
                >
                  <ErrorOutlineIcon sx={{ fontSize: "10px" }} />
                </div>
              </div>
            )}
            <br />
            <br />
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#e93e3e", color: "white" }}
            >
              LOG IN
            </Button>
            <br />
            <br />
            <span style={{ color: "grey" }}>
              Don't have an account? &nbsp;
              <Link style={{ textDecoration: "none" }} to="/register">
                sign up
              </Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
