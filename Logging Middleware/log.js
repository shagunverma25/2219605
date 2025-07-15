const axios = require("axios");
async function Log(stack, level, pkg, message, accessToken) {
  try {
    const response = await axios.post(
      "http://20.244.56.144/evaluation-service/logs",
      {
        stack,
        level,
        package: pkg,
        message
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      }
    );
    console.log("Log created successfully:",response.data);
  } catch (er) {
    console.er("Error sending log:", er.response?.data || er.message);
  }
}
module.exports = Log;