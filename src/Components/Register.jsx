import { useFormik } from "formik";
import React, { useState } from "react";
import backendinstance from "../Axios/axios";
import * as yup from "yup";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Register = () => {
  const [admin, setAdmin] = useState(false);
  const validation = yup.object().shape({
    name: yup
      .string()
      .min(2, "Min of 2 chars required")
      .required("Enter username"),
    email: yup.string().email().required("Enter the Email"),
    password: yup.string().required("Enter the password"),
    confirmpassword: yup.string().required("Enter the password to confirm"),
    isadmin: yup.boolean(),
    adminregno: yup.number(),
  });

  const handleAdmin = () => {
    setAdmin(!admin);
  };

  const navigate = useNavigate();
  const formdata = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
      isadmin: "",
      adminregno: "",
    },
    onSubmit: async (values) => {
      if (values.password !== values.confirmpassword) {
        alert("Passwords does not match");
      } else {
        delete values.confirmpassword;
        console.log(values);
        await backendinstance.post("/users", values);
        formdata.resetForm();
        navigate("/login");
      }
    },
    validationSchema: validation,
  });

  console.log(formdata);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "space-around",
        paddingTop: "50px",
      }}
    >
      <div style={{ width: "300px", marginBottom: "7px" }}>
        <p>Admin with the correct regno only can get the admin access </p>
        <span style={{ fontSize: "10px", color: "grey" }}>
          Note: Admin related things are given in the common UI to differentiate
          the UI accessbilty and only for learning purpose
        </span>
      </div>
      <div
        style={{
          marginTop: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          height: "500px",
          width: "300px",
          border: "1px solid grey",
          borderLeft: "1px solid #e93e3e",
          borderRadius: "8px",
          boxShadow:
            "  rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
        }}
      >
        <form onSubmit={formdata.handleSubmit}>
          <label>User Name</label>
          <br />
          <input
            type="name"
            name="name"
            value={formdata.values.name}
            onChange={formdata.handleChange}
            onBlur={formdata.handleBlur}
            id="email"
          />
          {formdata.touched.name && formdata.errors.name && (
            <div
              style={{ fontSize: "12px", color: "red", position: "relative" }}
            >
              {formdata.errors.name}{" "}
              <div
                style={{ position: "absolute", bottom: "20px", right: "4px" }}
              >
                <ErrorOutlineIcon sx={{ fontSize: "10px" }} />
              </div>
            </div>
          )}
          <br />
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={formdata.values.email}
            onChange={formdata.handleChange}
            onBlur={formdata.handleBlur}
            id="email"
          />
          {formdata.touched.email && formdata.errors.email && (
            <div
              style={{ fontSize: "12px", color: "red", position: "relative" }}
            >
              {formdata.errors.email}{" "}
              <div
                style={{ position: "absolute", bottom: "20px", right: "4px" }}
              >
                <ErrorOutlineIcon sx={{ fontSize: "10px" }} />
              </div>
            </div>
          )}
          <br />
          <label>Password</label>
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
                style={{ position: "absolute", bottom: "20px", right: "4px" }}
              >
                <ErrorOutlineIcon sx={{ fontSize: "10px" }} />
              </div>
            </div>
          )}
          <br />
          <label>Confirm Password</label>
          <br />
          <input
            value={formdata.values.confirmpassword}
            onChange={formdata.handleChange}
            onBlur={formdata.handleBlur}
            type="password"
            name="confirmpassword"
            id="confirmpassword"
          />
          {formdata.touched.confirmpassword &&
            formdata.errors.confirmpassword && (
              <div
                style={{ fontSize: "12px", color: "red", position: "relative" }}
              >
                {formdata.errors.confirmpassword}
                <div
                  style={{ position: "absolute", bottom: "20px", right: "4px" }}
                >
                  <ErrorOutlineIcon sx={{ fontSize: "10px" }} />
                </div>
              </div>
            )}
          <br />
          <input
            name="isadmin"
            id="isadmin"
            type="checkbox"
            onChange={formdata.handleChange}
            value={formdata.values.isadmin}
            onBlur={formdata.handleBlur}
            onClick={handleAdmin}
          />
          <span style={{ fontSize: "15px" }}>isadmin</span>
          <br />
          <br />
          {admin && (
            <>
              <label htmlFor="adminregno">Admin Reg No</label>
              <br />
              <input
                name="adminregno"
                id="adminregno"
                type="number"
                onBlur={formdata.handleBlur}
                onChange={formdata.handleChange}
                value={formdata.values.adminregno}
                required={admin === true}
              />
            </>
          )}
          <br />
          <br />
          <Button
            type="submit"
            variant = "contained"
            sx={{ backgroundColor: "#e93e3e", color: "white" }}
          >
            Sign UP
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
