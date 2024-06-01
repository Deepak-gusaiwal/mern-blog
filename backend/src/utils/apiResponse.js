export const apiResponse = (res, { result, status, error = false }) => {
  if (error) {
    const errorMessage = error instanceof Error ? error.message : error;
    return res.status(status).json({ success: false, error: errorMessage });
  }
  return res.status(status).json({ success: true, result });
};
