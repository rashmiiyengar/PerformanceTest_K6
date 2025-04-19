import http from "k6/http";

export default function () {
  const credentials = {
    username: "rash_" + Date.now(),
    first_name: "rash",
    password: "secret_" + Date.now(),
  };

  // Register user
  const registerRes = http.post(
    "https://test-api.k6.io/user/register/",
    JSON.stringify(credentials),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(`Register status: ${registerRes.status}`);

  // Login to get token
  const loginRes = http.post(
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
  console.log(`Login status: ${loginRes.status}`);
  console.log(`Login body: ${loginRes.body}`);

  if (loginRes.status !== 200) {
    console.error("Login failed!");
    return;
  }

  let accessToken = loginRes.json().access;
  console.log("Access Token: " + accessToken);

  // Get crocodiles (should be empty for new user)
  const crocsListRes = http.get("https://test-api.k6.io/my/crocodiles/", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log(`GET /my/crocodiles status: ${crocsListRes.status}`);

  // Create crocodile
  const createCrocRes = http.post(
    "https://test-api.k6.io/my/crocodiles/",
    JSON.stringify({
      name: "sonn",
      sex: "M",
      date_of_birth: "1998-10-01",
    }),
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  console.log(`Create croc status: ${createCrocRes.status}`);
  console.log(`Create croc body: ${createCrocRes.body}`);

  if (createCrocRes.status !== 201) {
    console.error("Failed to create crocodile.");
    return;
  }

  const newCrocId = createCrocRes.json().id;

  // Get created crocodile
  const getCrocRes = http.get(
    `https://test-api.k6.io/my/crocodiles/${newCrocId}/`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  console.log(`GET croc status: ${getCrocRes.status}`);

  // Update crocodile with PUT
  const updatePutRes = http.put(
    `https://test-api.k6.io/my/crocodiles/${newCrocId}/`,
    JSON.stringify({
      name: "sonn updated api",
      sex: "M",
      date_of_birth: "1998-10-01",
    }),
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  console.log(`PUT croc status: ${updatePutRes.status}`);
  console.log(`PUT croc body: ${updatePutRes.body}`);

  // Update crocodile with PATCH
  const updatePatchRes = http.patch(
    `https://test-api.k6.io/my/crocodiles/${newCrocId}/`,
    JSON.stringify({
      name: "sonn updated patch",
    }),
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  console.log(`PATCH croc status: ${updatePatchRes.status}`);
  console.log(`PATCH croc body: ${updatePatchRes.body}`);
}
