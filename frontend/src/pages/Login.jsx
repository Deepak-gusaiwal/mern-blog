import React, { useEffect } from "react";
import { Container, Section } from "../components/helper";
import { AuthForm } from "../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { userData } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();
  useEffect(() => {
    userData.isLogin && navigate("/");
  }, [userData]);
  return (
    <Section>
      <Container>
        <AuthForm type={"login"} />
      </Container>
    </Section>
  );
};

export default Login;
