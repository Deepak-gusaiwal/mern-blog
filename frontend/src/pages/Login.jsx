import React from "react";
import { Container, Section } from "../components/helper";
import { AuthForm } from "../components";

const Login = () => {
  return (
    <Section>
      <Container>
        <AuthForm type={"login"} />
      </Container>
    </Section>
  );
};

export default Login;
