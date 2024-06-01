import jwt from "jsonwebtoken";

const authTokenGenerator = (
  data = null,
  options = { expiresIn: process.env.AUTH_TOKEN_EXPIRY }
) => {
  if (!data)
    throw new Error("Error In AuthTokenGenerator :: Auth Data is Not Passed");
  return jwt.sign({ userId: data }, process.env.JWT_STR, {
    ...options,
  });
};
const verifyAuthToken = (token) => {
  if (!token)
    throw new Error("Error In verfiyAuthToken :: Token is Not Passed");
  return jwt.verify(token, process.env.JWT_STR);
};
const JWT = { authTokenGenerator, verifyAuthToken };
export default JWT;
