import express from 'express';
import axios from 'axios';
import 'dotenv/config';
import path, { dirname } from "path";
import { fileURLToPath } from "url";


const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.get("/", (req, res) => {
    res.render("home");
})


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} successfully!`);
})