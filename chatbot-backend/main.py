import os
import google.generativeai as genai
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

# 1. SETUP
api_key = os.getenv("GEMINI_API_KEY")
# Using 'rest' transport is more stable on hosted servers like Render
genai.configure(api_key=api_key, transport='rest')

# 2. INITIALIZE MODEL (We skip the 'pre-test' to avoid startup quota errors)
model = genai.GenerativeModel('gemini-1.5-flash')

app = FastAPI(title="Kefyalew Portfolio AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MY_CONTEXT = """
Identity: You are the AI Assistant for Kefyalew, a Software Engineer & Job Consultant.
Expertise: MERN Stack, FastAPI, Tailwind CSS, C++, Java, PHP.
Projects: SACCO System (In dev), Book Rental (Done).
Contact: koutlook19@mmail.com.
"""

@app.get("/chat")
async def chat(user_message: str = Query(...)):
    try:
        # Construct a simple prompt to avoid safety filters
        prompt = f"{MY_CONTEXT}\n\nUser Question: {user_message}"
        
        # Call Gemini
        response = model.generate_content(prompt)
        
        if response.text:
            return {"reply": response.text}
        return {"reply": "I'm thinking, but I couldn't generate a text response. Try again!"}

    except Exception as e:
        error_msg = str(e)
        print(f"ERROR: {error_msg}")
        
        # Check for the specific 'Location' error
        if "location" in error_msg.lower():
            return {"reply": "Google Gemini is restricted in the server's current region.", "error": error_msg}
        
        return {"reply": "Connection issue. Please try one more time.", "error": error_msg}

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
