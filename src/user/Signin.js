import { useState } from "react";
import Layout from "../core/Layout";
import { signin,authenticate, isAuthenticated } from "../auth";
import { useNavigate } from "react-router-dom";



const Signin = () => {
  const navigate=useNavigate();
  const {user}=JSON.parse(isAuthenticated());
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
  });
  const { email, password, error, loading } = values;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    try {
      const {data}=await signin({ email, password });
      redirector(user);
      const result=JSON.stringify(data);

      authenticate(result,()=>{
        setValues({
          ...values,
          loading: false,
        });
      })
   
    } catch (err) {
      setValues({ ...values, error: err.response.data, loading: false });
    }
  };

  const handleChange = (input) => (event) => {
    setValues({ ...values, [input]: event.target.value, error: false,loading:false });
  };
  const signinForm = () => {
    return (
      <form>
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
          Signin
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
  const showLoading = () => {
    if(loading) return <div className="alert alert-info">Loading. . .</div>;
  };

  const redirector = (user) => {
    if (user&&user.role==0){
      navigate('/user/dashboard');
    };
    if (user&&user.role==1){
      navigate('/admin/dashboard');
    };
  };
  return (
    <Layout
      title="Signin"
      description="Signin to Node Ecommerce App"
      className="container col-md-8 offset-md-2"
    >
      {redirector(user)}
      {showError()}
      {showLoading()}
      {signinForm()}
      
    </Layout>
  );
};

export default Signin;
