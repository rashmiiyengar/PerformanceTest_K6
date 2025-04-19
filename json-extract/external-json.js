import http from "k6/http";
import { check } from "k6";
import { SharedArray } from "k6/data";
import { randomItem } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";

const userCredentials = new SharedArray("Users with credentials", () => {
  return JSON.parse(open("./users.json")).users;
});

console.log(userCredentials);

export default function () {
  // userCredentials.forEach((i) => {
  // const credentials = {
  //   username: i.username,
  //   first_name: "rash",
  //   password: i.password,
  // };

  // let res = http.post(
  //   "https://test-api.k6.io/user/register/",
  //   JSON.stringify(credentials),
  //   {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );
  // check(res, {
  //   "status is 201": (r) => r.status === 201,
  // });
  let randomCredential = randomItem(userCredentials);

  let response = http.post(
    "https://test-api.k6.io/auth/token/login/",

    JSON.stringify({
      username: randomCredential.username,
      password: randomCredential.password,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const accessToken = response.json().access;
  console.log(accessToken);
}
