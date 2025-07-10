# 🧠 DeCode – Political Bias Detective

**DeCode** is an AI-powered political bias detection platform that helps users analyze news articles or tweets for bias, emotional tone, and framing. It gives instant, transparent insights into the slant of content — Left, Right, or Neutral — and visualizes emotional and linguistic patterns to promote media literacy and critical thinking.

---

## ✨ Features

### 🔍 Analyzer
- **Political Bias Classification** (Left / Right / Neutral)
- **Confidence Score** with explanation
- **Bias Heatmap**: Color-coded sentence-level highlights
- **Bias Score Gauge**: Meter from -100 to +100
- **Emotional Tone Breakdown**: Anger, fear, joy, neutral (%)
- **Biased/Emotional Word Detection**
- **Neutral Summary**: AI-generated, balanced rewrite

### 🧠 Intelligence
- **Powered by Gemini API** with mock fallback for dev testing
- **News Source Detection**: Auto-lookup and credibility scoring
- **Rich Prompt Engineering** for transparent, structured results

### 📊 Visuals & UX
- **Interactive Tone Graphs**: Pie and bar chart views
- **Dark Mode**: Smooth transitions, full support
- **Bias Analytics**: Personal dashboard showing analysis trends over time
- **Notes**: Add personal reflections to past results
- **Export to PDF**: Shareable reports for educational or journalistic use
- **Share Functionality**: Native Web Share API and clipboard fallback

### 🔐 Auth & History
- **Login & Auth**: Clerk
- **Analyzer History**: Only accessible after login
- **Saved Analysis**: View all your past analyses anytime

---

## 🚀 Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/your-username/decode-bias-detector.git
cd decode-bias-detector
````

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 4. Run the App

```bash
npm run dev
# or
yarn dev
```

---

## 🛠 Tech Stack

* **Frontend**: Next.js, Tailwind CSS, ShadCN UI, Framer Motion
* **Backend**: API Routes (Node.js + Gemini API integration)
* **Auth**: Clerk
* **AI**: Gemini API (Google) with structured prompts
* **Data Viz**: Chart.js / Recharts
* **Export/Share**: html2pdf.js, Web Share API

---




## ✅ TODO / Future Improvements

* [ ] Chrome Extension (right-click → Analyze)
* [ ] Rebuttal Generator (opposite ideology)
* [ ] Custom Prompts for advanced users
* [ ] Community Feed of trending bias
* [ ] Multi-language support
* [ ] Mobile PWA + Offline Mode

---



## 📜 License

MIT License. Use freely, improve freely, and help promote media literacy.

---

## 🙌 Credits

Built by [Rishabh Jha](https://github.com/Rishu-e-work)
Inspired by real-world bias in media and the need for transparency in modern information.

---

## 🌐 Live Demo

Coming soon 



