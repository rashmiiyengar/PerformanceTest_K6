import http from "k6/http";
import { check } from "k6";
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export default function () {
  let res = http.get("https://test-api.k6.io/public/crocodiles");

  const crocodiles = res.json();

  const crocIds = crocodiles.map((item) => item.id);

  const crocodileId=randomItem(crocIds)
  res = http.get(`https://test-api.k6.io/public/crocodiles/${crocodileId}`);

  console.log(res.headers["Allow"]);
  console.log(res.headers["Content-Type"]);
  check(res, {
    "status is 200": (r) => r.status === 200,
    "Crocodile id is ": (r) => r.json().id === crocodileId,
  });
}
