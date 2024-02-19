import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import {
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
} from "@material-ui/core";

function Signup() {
  const history = useHistory();
  toast.configure();

  const userSchema = yup.object().shape({
    firstname: yup.string().required("First Name is required"),
    lastname: yup.string().required("Last Name is required"),
    email: yup
      .string()
      .email("Email is not valid")
      .required("Email is required"),
    password: yup.string().min(8).max(20).required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const onSubmitForm = async (data) => {
    try {
      const response = await fetch("http://18.170.65.18:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // If response is not ok, throw an error
        throw new Error("Failed to signup");
      } else {
        console.log(response.body);
        // Redirect to dashboard
        history.push("/dashboard");
        toast.success("You Registered Successfully");
      }

      // Show success message
    } catch (err) {
      console.error("Signup Error:", err.message);
      // Show error message
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="container" style={{ width: "50%", paddingTop: "40px" }}>
      <Typography variant="h3" align="center" style={{ paddingTop: "30px" }}>
        Sign Up
      </Typography>
      <Card style={{ maxWidth: 700, margin: "0 auto", padding: "20px 5px" }}>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  name="firstname"
                  variant="outlined"
                  fullWidth
                  error={!!errors.firstname}
                  helperText={errors.firstname?.message}
                  {...register("firstname")}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  name="lastname"
                  variant="outlined"
                  fullWidth
                  error={!!errors.lastname}
                  helperText={errors.lastname?.message}
                  {...register("lastname")}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  {...register("email")}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  {...register("password")}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signup;
