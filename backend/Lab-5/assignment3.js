import http from "http";
import fs from "node:fs/promises";

let port = 3001;
const filePath = "file.txt";

async function readFile() {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return data;
    } catch (err) {
        console.log("Error found", err);
        return "";
    }
}

const content = await readFile();