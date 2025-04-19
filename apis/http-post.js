import http from "k6/http";

export default function () {
  const credentials = {
    username: "rash_" + Date.now(),
    first_name: "rash",
    password: "secret_" + Date.now(),
  };

  http.post(
    "https://test-api.k6.io/user/register/",
    JSON.stringify(credentials),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  let response = http.post(
    "https://test-api.k6.io/auth/token/login/",

    JSON.stringify({
      username: credentials.username,
      password: credentials.password,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const accessToken = response.json().access;
  console.log(accessToken);

  http.get("https://test-api.k6.io/my/crocodiles/", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  let crocResponse = http.post(
    "https://test-api.k6.io/my/crocodiles/",
    JSON.stringify({
      name: "sonn",
      sex: "M",
      date_of_birth: "1998-10-01",
    }),
    {
      headers: {
        Authorization: "Bearer " + accessToken,
        'Content-Type':'application/json'
      },
    }
  );

  let newCrocId= crocResponse.json().id
   http.get(
    `https://test-api.k6.io/my/crocodiles/${newCrocId}/`,
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  );

  let crocResponsePut = http.put(
    `https://test-api.k6.io/my/crocodiles/${newCrocId}/`,
    JSON.stringify({
      name: "sonn updated api",
      sex: "M",
      date_of_birth: "1998-10-01",
    }),
    {
      headers: {
        Authorization: "Bearer " + accessToken,
        'Content-Type':'application/json'
      },
    }
  );

  let crocResponsePatch = http.patch(
    `https://test-api.k6.io/my/crocodiles/${newCrocId}/`,
    JSON.stringify({
      name: "sonn updated patch",
    }),
    {
      headers: {
        Authorization: "Bearer " + accessToken,
        'Content-Type':'application/json'
      },
    }
  );

}
