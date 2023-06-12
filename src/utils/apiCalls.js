import axios from "axios";

export async function postApi(url, body = "") {
  try {
    const username = "airbyte";
    const password = "password";
    const authHeaderValue = btoa(`${username}:${password}`);
    const response = await axios.post(url, JSON.stringify(body), {
      headers: {
        Authorization: `Basic ${authHeaderValue}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
