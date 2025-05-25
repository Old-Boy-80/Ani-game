# 🎮 Ani-Game

Ani-Game is a web-based interactive game where players compare two randomly selected anime titles and vote for the one they think is more popular (based on the number of favorites). It’s a fun way to test your anime knowledge and discover new titles.

![screenshot](https://github.com/Old-Boy-80/Ani-game/blob/c2328379ee59628398687c34c00c70648b0305b9/src/public/preview.png) 

---

## 🚀 Features

- 🔀 Randomly fetches anime from a public API
- 🆚 Compare two anime based on popularity
- ✅ Dynamic voting and scoring logic
- 📊 Progress bar and round tracking
- 🎨 Smooth transitions and modern UI with TailwindCSS
- ⚙️ Built with Express.js, EJS templating, and Axios

---

## 🛠️ Tech Stack

- **Frontend**: HTML, TailwindCSS, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Templating**: EJS
- **API**: [Jikan API](https://docs.api.jikan.moe/) (Unofficial MyAnimeList API)
- **Fetch**: Axios (server-side) + Fetch API (client-side)

---

## 📦 Project Structure

ani-game/
├── public/ # Static assets (CSS, JS, images)
├── views/
│ ├── partials/ # Header/footer partials
│ ├── game.ejs # Game UI view
│ ├── description.ejs # Game intro description
│ ├── info.ejs # Instructional info
│ └── home.ejs # Main EJS layout
├── .env # Environment variables (API keys)
├── server.js # Express server & routing logic
├── script.js # Client-side game logic
└── README.md

---

## 📥 Installation & Running Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/ani-game.git
   cd ani-game
   ```
2. **Install dependencies:**
   ```bash 
   npm install
   ```

3. **Environment Variables:**
   ```bash
   #create a .env file in the root directory:
   PUBLIC_API_KEY=https://api.jikan.moe/v4/
   ```
4. **Run the application:**
   ```bash
   npm start
   ```

5. **Access in browser:**
   ```
   Open your browser at http://localhost:3000
   ```

---



## 🤝 Contributing

Explain how others can contribute to your project.

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/AmazingFeature`).
3.  Make your changes and commit them (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---