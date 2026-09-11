import http from "http";
import fs from "node:fs/promises";

const server = http.createServer((req, resp) => {

    const url = req.url;
    const typ = req.method;
        resp.statusCode = 200;
        resp.setHeader("Content-Type", "application/json");

        resp.end(JSON.stringify("Hello World"));
    }
);