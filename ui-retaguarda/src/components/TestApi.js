import React, { useState, useEffect } from "react";
import axios from "axios";

const TestApi = () => {
  const currentDate = new Date().toString();
  const [apiResponse, setApiResponse] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3040/api")
      .then((response) => {
        const contentType = response.headers["content-type"];
        if (contentType && contentType.indexOf("application/json") !== -1) {
          setApiResponse(JSON.stringify(response.data, null, 2));
        } else {
          setApiResponse(response.data);
        }
      })
      .catch((error) => setApiResponse(error));
  }, []);

  return (
    <div>
      <pre>{currentDate}</pre>
      <pre>{apiResponse}</pre>
    </div>
  );
};

export default TestApi;
