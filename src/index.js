import express from 'express';
import axios from 'axios';
import 'dotenv/config';
import path, { dirname } from "path";
import { fileURLToPath } from "url";


const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;
const baseAPIURL = process.env.PUBLIC_API_KEY;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.get("/", async (req, res) => {
    const score = parseInt(req.query.score) || 0;
    const level = parseInt(req.query.level) || 1;

    try {
        const [response1, response2] = await Promise.all([
            axios.get(`${baseAPIURL}random/anime`, {
                params: {
                    type: 'tv',
                    rating: ['g', 'pg', 'pg13'],
                    sfw: true
                }
            }),
            axios.get(`${baseAPIURL}random/anime`, {
                params: {
                    type: 'tv',
                    sfw: true
                }
            })
        ]);

        if (response1.data.data.mal_id === response2.data.data.mal_id) {
            return res.redirect(`/?score=${score}&level=${level}`);
        }

        res.render("home", {
            ResO: response1.data,
            ResT: response2.data,
            score,
            level
        });
    } catch (error) {
        console.error('Error fetching anime:', error);
        res.status(500).render('error', { error: 'Failed to fetch anime data. Please try again.' });
    }
})

app.get("/game-over", (req, res) => {
    const score = parseInt(req.query.score) || 0;
    res.render("game-over", { score });
});


app.get("/api/anime-pair", async(req, res) => {
    try {
    const [res1, res2] = await Promise.all([
      axios.get(baseAPIURL + "random/anime", {
        params: { type: 'tv', rating: ['g', 'pg', 'pg13'] }
      }),
      axios.get(baseAPIURL + "random/anime", {
        params: { type: 'tv', sfw: true }
      })
    ]);

    res.json({ ResO: res1.data, ResT: res2.data });
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch anime pair" });
  }
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} successfully!`);
})