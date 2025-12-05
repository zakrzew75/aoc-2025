import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

console.log(__dirname)
app.use(express.static(__dirname + "/../public"));
app.use("/data", express.static(__dirname + "/../data"));
app.listen(3000, () => console.log("http://localhost:3000"));
