import { Container } from "react-bootstrap";
import homeImage from "../assets/images/home.jpeg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.login.isLogin);
  useEffect(() => {
    if (!isLogin) {
      navigate("/login"); // nếu chưa đăng nhập thì sẽ về trang login
    }
  }, [isLogin, navigate]);

  return (
    <Container>
      <img src={homeImage} alt="home"></img>
    </Container>
  );
}

export default Home;
