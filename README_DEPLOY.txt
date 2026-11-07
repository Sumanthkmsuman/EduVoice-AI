EDUVOICE AI — OPENAI BACKEND DEPLOYMENT

Files:
- index.html: current EduVoice AI frontend with backend URL setting
- server.js: secure OpenAI API proxy (API key stays on server)
- package.json: Node.js dependencies

Deploy backend on Render:
1. Upload/push server.js and package.json into a GitHub repository (can be a separate backend repository).
2. Render Dashboard -> New -> Web Service -> select the repository.
3. Runtime: Node. Build command: npm install. Start command: npm start.
4. Environment variables:
   OPENAI_API_KEY = your secret OpenAI API key (do not place it in index.html or GitHub)
   OPENAI_MODEL = gpt-5.6-luna (if your API project has access; otherwise set a model available to your account)
   ALLOWED_ORIGIN = https://YOUR_GITHUB_USERNAME.github.io (recommended; replace with your GitHub Pages origin)
5. Deploy. Check https://YOUR-RENDER-SERVICE.onrender.com/health; it should return status ok.
6. On the EduVoice AI website, open More -> AI Assistant. Enter your Render HTTPS service URL in the AI Server URL field, then click Save Server URL.
7. Test Ask AI.

Note:
- API usage requires OpenAI API billing/credits. ChatGPT subscription and API billing are separate.
- The backend applies a small per-IP request limit, but a public app can still incur API usage costs. Keep spending limits/monitoring enabled.
- For production use, tighten ALLOWED_ORIGIN to the exact GitHub Pages origin. Avoid putting secrets in frontend code or committed files.
- If the selected model is unavailable to your API project, set OPENAI_MODEL to an accessible model in Render environment variables.
