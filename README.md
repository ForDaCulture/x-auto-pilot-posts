# X Automated Content Planner

## Project info

**URL**: https://lovable.dev/projects/261081d0-491b-45ab-812f-bc11c927acfb

"""# 🧠 Auto X Poster — Niche Content Generator & Scheduler

This project is an AI-powered social media automation tool that:
- Generates niche content (starting with "History") using OpenAI
- Creates branded image posts with DynaPictures (or mock image fallback)
- Schedules and posts to X (formerly Twitter) automatically
- Includes a calendar UI, sentiment analysis, and extensible niche support

---

## 📦 Features

- ✅ Real-time post generation (OpenAI)
- ✅ Sentiment analysis (Positive/Neutral/Negative tags)
- ✅ Dynamic niche selection (fetched from backend)
- ✅ Clean, responsive UI with Tailwind CSS
- ✅ Scheduler with cron expression + calendar picker
- ✅ Post preview and toast-based notifications

---

## 🛠 Tech Stack

| Area         | Stack                              |
|--------------|------------------------------------|
| Frontend     | React + TypeScript + Tailwind CSS  |
| Backend      | Node.js + Express (API endpoints)  |
| AI/ML        | OpenAI API for text + sentiment    |
| Image Gen    | DynaPictures API (or fallback)     |
| Scheduler    | node-cron + Python script (tweepy) |
| Auth (Future)| Supabase (optional)                |

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/auto-x-poster.git
cd auto-x-poster
2. Install Dependencies
Backend
bash
Always show details

Copy
cd backend
npm install
Frontend
bash
Always show details

Copy
cd frontend
npm install
3. Configure Environment Variables
Create .env files in both /backend and /frontend.

Backend .env:
env
Always show details

Copy
OPENAI_API_KEY=your-openai-api-key
DYNAPICTURES_API_KEY=your-dynapictures-key
TEMPLATE_ID=your-dynapictures-template-id
X_CONSUMER_KEY=your-x-api-consumer-key
X_CONSUMER_SECRET=your-x-api-consumer-secret
X_ACCESS_TOKEN=your-x-access-token
X_ACCESS_TOKEN_SECRET=your-x-access-token-secret
4. Run the Backend Server
bash
Always show details

Copy
cd backend
node server.js
5. Run the Frontend (React App)
bash
Always show details

Copy
cd frontend
npm run dev
Visit the app at http://localhost:5173

6. Optional: Python Script for Posting to X
Install dependencies:

bash
Always show details

Copy
pip install tweepy requests
Run it manually or via cron:

bash
Always show details

Copy
python post_to_x.py "Your tweet text here" "image_url_here"
📌 Roadmap
 Sentiment Analysis

 Dynamic Niche Support

 Post Analytics Dashboard

 Hashtag Recommender

 CTA Enhancer

 Role-Based Access (via Supabase)

🤝 Contributing
Pull requests are welcome! Please open an issue first to discuss what you’d like to change.
