export const apiResponse = (
  res,
  { result = null, status, authToken = null, error = false }
) => {
  if (error) {
    const errorMessage = error instanceof Error ? error.message : error;
    return res.status(status).json({ success: false, error: errorMessage });
  }
  if (authToken) {
    // Calculate expiration date (30 days from now)
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);

    res.cookie("authToken", authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: expirationDate,
    });
    return res.status(status).json({ success: true, result: authToken });
  }
  return res.status(status).json({ success: true, result });
};
