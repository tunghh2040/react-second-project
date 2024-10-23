import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/actions/action";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.login.isLogin);

  useEffect(() => {
    if (isLogin) {
      navigate("/home"); // nếu đã đăng nhập thì cứ truy cập vào trang login sẽ về trang Home
    }
  }, [isLogin, navigate]);

  const handleClick = () => {
    const resultAction = dispatch(login({ email, password }));
    if (login.fulfilled.match(resultAction)) {
      navigate("/home"); // Navigate on success
    } else {
      // Show error message to the user
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <>
      <Container>
        <div className="login-container col-12 col-sm-4">
          <div className="title">Log in</div>
          <input
            type="text"
            className="userName"
            placeholder="Email or UserName...eve.holt@reqres.in"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            className="password"
            placeholder="Password..."
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            className={email && password ? "active" : ""}
            disabled={email && password ? false : true}
            onClick={handleClick}
          >
            Login
          </button>
        </div>
      </Container>
      <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          draggable={true}
          pauseOnHover={false}
          theme="light"
        />
    </>
  );
}

export default Login;
