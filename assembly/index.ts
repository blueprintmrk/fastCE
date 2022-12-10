import { Response, Request, Fastly } from "@fastly/as-compute";
import { JSON } from "assemblyscript-json"; 

const BACKEND_NAME = "origin_0";

// Make a request for some JSON
let req = new Request("https://httpbin.org/anything", {
  method: "GET",
  headers: null,
  body: null,
});
let jsonResp = Fastly.fetch(req, {
  backend: BACKEND_NAME
}).wait();

// Parse the JSON from the request
let jsonObj: JSON.Obj = changetype<JSON.Obj>(JSON.parse(jsonResp.text()));
jsonObj.set("new_field", JSON.from("content"));

let resp = new Response(String.UTF8.encode(jsonObj.toString()), {
  status: 200,
  headers: null,
});
Fastly.respondWith(resp);
