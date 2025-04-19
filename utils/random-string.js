import http from "k6/http";
import { randomString } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";

export const options = {
  vus: 6,
  duration: "20s",
};
export default function () {
  const credentials = {
    username: "rash_" + randomString(6),
    first_name: "rash",
    password: "secret_" + randomString(6),
  };

  console.log(credentials)
  http.post(
    "https://test-api.k6.io/user/register/",
    JSON.stringify(credentials),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
