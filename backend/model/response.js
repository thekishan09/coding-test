function JSONResponse(status, message, data) {
  return {
    status,
    message,
    data,
  };
}
module.exports = { JSONResponse };
