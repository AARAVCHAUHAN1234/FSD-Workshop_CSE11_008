import axios from "axios";
import { useState } from "react";

export default function Api() {
const [method, setMethod] = useState("GET");
const [url, setUrl] = useState("");
const [body, setBody] = useState("");
const [response, setResponse] = useState("");
const [loading, setLoading] = useState(false);

const sendRequest = async (e) => {
e.preventDefault();

setLoading(true);
setResponse("");

try {
  let data = undefined;

  if (body.trim() && method !== "GET" && method !== "DELETE") {
    data = JSON.parse(body);
  }

  const result = await axios({
    method: method,
    url: url,
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  });

  setResponse(JSON.stringify(result.data, null, 2));
} catch (error) {
  if (error instanceof SyntaxError) {
    setResponse("Invalid JSON in Request Body.");
  } else if (error.response) {
    setResponse(
      JSON.stringify(
        {
          status: error.response.status,
          data: error.response.data,
        },
        null,
        2
      )
    );
  } else if (error.request) {
    setResponse("No response received from the server.");
  } else {
    setResponse(error.message);
  }
} finally {
  setLoading(false);
}


};

return ( <div className="api-container"> <form
     className="api-form"
     name="Apitester"
     onSubmit={sendRequest}
   > <h1 className="api-title">
API Tester </h1>


    <p className="api-subtitle">
      Test your API endpoints
    </p>

    {/* REQUEST TYPE */}
    <label htmlFor="select">
      Request Type
    </label>

    <select
      name="select"
      id="select"
      value={method}
      onChange={(e) => setMethod(e.target.value)}
    >
      <option value="GET">GET</option>
      <option value="POST">POST</option>
      <option value="PUT">PUT</option>
      <option value="DELETE">DELETE</option>
    </select>

    {/* URL */}
    <label htmlFor="url">
      URL
    </label>

    <input
      type="text"
      id="url"
      name="url"
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      placeholder="http://localhost:3000/user"
      required
    />

    {/* REQUEST BODY */}
    <label htmlFor="add">
      Request Body
    </label>

    <textarea
      name="text"
      id="add"
      rows="5"
      value={body}
      onChange={(e) => setBody(e.target.value)}
      placeholder='{"id":2,"name":"Rahul","age":20}'
    />

    {/* SUBMIT */}
    <input
      type="submit"
      value={loading ? "Sending..." : "Send Request"}
      disabled={loading}
    />
  </form>

  {/* RESPONSE */}
  <div className="response-container">
    <h2>
      Response
    </h2>

    <pre>
      {response || "Response will appear here..."}
    </pre>
  </div>
</div>


);
}
