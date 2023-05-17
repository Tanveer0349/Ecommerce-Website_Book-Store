import { useState } from "react";
import Layout from "../core/Layout";
import { signUp } from "../auth";
import { Link } from "react-router-dom";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const { name, email, password, error, success } = values;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, success: false });
    try {
      await signUp({ name, email, password });
      setValues({
        ...values,
        name: "",
        email: "",
        password: "",
        error: "",
        success: true,
      });
    } catch (err) {
      setValues({ ...values, error: err.response.data, success: false });
    }
  };

  const handleChange = (input) => (event) => {
    setValues({ ...values, [input]: event.target.value, error: false });
  };
  const signupForm = () => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            onChange={handleChange("name")}
            className="form-control"
            value={name}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            type="email"
            onChange={handleChange("email")}
            className="form-control"
            value={email}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            type="password"
            onChange={handleChange("password")}
            className="form-control"
            value={password}
          />
        </div>
        <button onClick={handleSubmit} className="btn btn-primary">
          Register
        </button>
      </form>
    );
  };

  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };
  const showSuccess = () => {
    return (
      <div
        className="alert alert-info"
        style={{ display: success ? "" : "none" }}
      >
        New Account Created! Please <Link to="/signin">SignIn</Link>
      </div>
    );
  };
  return (
    <Layout
      title="Signup"
      description="Signup to Node Ecommerce App"
      className="container col-md-8 offset-md-2"
    >
      {showError()}
      {showSuccess()}
      {signupForm()}
    </Layout>
  );
};

export default Signup;
