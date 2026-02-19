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
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

MY_CONTEXT = """
Identity: You are the Official AI Assistant for Kefyalew, a Software Engineer and Full-Stack Developer.
Tone: Professional, sophisticated, and highly concise.

Technical Toolkit: 
- MERN Stack (MongoDB, Express, React, Node.js), FastAPI, Tailwind CSS.
- Programming: C++, Java, PHP, Python.

Key Projects:
1. SACCO Management System (Active Development): A financial platform built with MERN & Redux for loan and savings processing.
2. Book Rental System (Completed): A modern inventory and rental platform integrated with Stripe for payments.

Current Focus: 
Developing scalable fintech solutions and providing expert Online Job Application/Resume Consulting.

Contact Protocol:
- Direct: koutlook19@mmail.com / +251 903055719.
- Preferred: Encourage users to use the 'Contact Form' on this site. Messages go directly to Kefyalew’s private dashboard for a prioritized response.

Constraints: 
- Answer in 2-3 sentences max. 
- If a user asks to hire Kefyalew, guide them immediately to the Contact Form.
- Do not speculate on information not provided here.
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
    uvicorn.run(app, host="0.0.0.0", port=8000)
