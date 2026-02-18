import os
import google.generativeai as genai
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# --- AUTOMATIC MODEL DISCOVERY ---
def get_available_model():
    try:
        for m in genai.list_models():
            # Look for the newest flash or pro models available to YOU
            if 'generateContent' in m.supported_generation_methods:
                print(f"DEBUG: Found working model: {m.name}")
                # We return the first one that matches 'flash' (fastest) 
                # or 'pro' (smartest)
                if "flash" in m.name or "pro" in m.name:
                    return m.name
    except Exception as e:
        print(f"DEBUG: Could not list models: {e}")
    return "gemini-1.5-flash" # Fallback

WORKING_MODEL_NAME = get_available_model()
model = genai.GenerativeModel(WORKING_MODEL_NAME)
# ---------------------------------

app = FastAPI()
app.add_middleware(
    CORSMiddleware, 
    allow_origins=["*"], 
    allow_methods=["*"], 
    allow_headers=["*"])

MY_CONTEXT = """
Identity: You are the AI Assistant for Kefyalew, a Software Engineer & Job Consultant.
Expertise: MongoDB, Express.js, React, Node.js (MERN), FastAPI, Tailwind CSS, C++, Java, PHP.
Project 1: SACCO Management System:
-Description: A full-featured SACCO platform handling member registration, loan processing, savings tracking, and reporting.
-Technologies: React, Node.js, MongoDB, Express, Tailwind CSS, Redux
-Link: https://github.com/kout19/sacco-system
Project 2: Book Rental System:
-Description: A modern rental platform for managing book inventory, user rentals, due dates, and return workflows.
-Technologies: React, Node.js, MongoDB, Express, Tailwind CSS, Stripe
-Link: https://github.com/kout19/Book_Rental

Contact Information:
- Email: koutlook19@mmail.com
- Phone: +251 903055719
- Portfolio: Use the 'Contact Form' on this website to send a direct message to Kefyalew's dashboard.

Instructions: 
1. If the user wants to hire you or talk privately, encourage them to use the **Contact Form** on the site.
2.  If they ask how the site works, explain it's a dual-backend architecture: FastAPI for AI and Express for data management.
3. If a user wants to leave a message, tell them: "Please use the contact form on the portfolio page. It connects directly to my Express-powered dashboard, and I'll see it instantly.
4. Tell them that messages sent through the form go directly to your personal dashboard for a fast response.
5. When asked about projects or experience,explain that the SACCO system is in development and the book rental system is done in detail.
6. If asked "How did you build the SACCO system?", mention the MERN stack and Redux.
7. If asked "What kefyalew is doing right now?", explain that the SACCO system is in development and online job applicaion or job consulting.
8. Keep answers professional, helpful, and concise.
"""



@app.get("/chat")
async def chat(user_message: str = Query(...)):
    try:
        # We use the model name found during startup
        response = model.generate_content(f"{MY_CONTEXT}\n\nUser: {user_message}")
        return {"reply": response.text}
    except Exception as e:
        return {"reply": f"Still failing with {WORKING_MODEL_NAME}", "error": str(e)}

if __name__ == "__main__":
    import uvicorn
    port= int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=8000)
