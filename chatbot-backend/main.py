import os
import google.generativeai as genai
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

# Configure AI FIRST before listing models
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)

# --- AUTOMATIC MODEL DISCOVERY (Fixed) ---
def get_available_model():
    try:
        # Check specific prioritized models first
        preferred_models = ['gemini-1.5-flash', 'gemini-1.5-flash-latest', 'gemini-pro']
        available = [m.name for m in genai.list_models() if 'generateContent' in m.supported_generation_methods]
        
        for pref in preferred_models:
            # Check if preferred is in available list (handle 'models/' prefix)
            for found in available:
                if pref in found:
                    print(f"DEBUG: Selected Model -> {found}")
                    return found
        return available[0] if available else "gemini-1.5-flash"
    except Exception as e:
        print(f"DEBUG: Discovery failed: {e}")
        return "gemini-1.5-flash"

WORKING_MODEL_NAME = get_available_model()
model = genai.GenerativeModel(WORKING_MODEL_NAME)

app = FastAPI()

# --- CORS SETTINGS ---
app.add_middleware(
    CORSMiddleware, 
    allow_origins=["*"], 
    allow_methods=["*"], 
    allow_headers=["*"]
)

MY_CONTEXT = """
Identity: You are the AI Assistant for Kefyalew, a Software Engineer & Job Consultant.
Expertise: MongoDB, Express.js, React, Node.js (MERN), FastAPI, Tailwind CSS, C++, Java, PHP.

Project 1: SACCO Management System (In Development)
- Description: Financial platform handling registration, loans, and savings.
- Tech: React, Node.js, MongoDB, Express, Tailwind, Redux.
- GitHub: https://github.com/kout19/sacco-system

Project 2: Book Rental System (Completed)
- Description: Modern platform for inventory, rentals, and return workflows.
- Tech: React, Node.js, MongoDB, Express, Tailwind, Stripe.
- GitHub: https://github.com/kout19/Book_Rental

Contact Information:
- Email: koutlook19@mmail.com
- Phone: +251 903055719
- Action: Use the 'Contact Form' on this site to reach Kefyalew's dashboard directly.

Key Facts:
- Current Work: Developing the SACCO system and providing online job consulting.
- Site Tech: Dual-backend (FastAPI for AI, Express for data/dashboard).
- Instructions: Be professional, very concise, and steer users to the contact form for private inquiries.
"""

@app.get("/chat")
async def chat(user_message: str = Query(...)):
    try:
        # We wrap the content for better compatibility
        response = model.generate_content([f"{MY_CONTEXT}\n\nUser: {user_message}"])
        return {"reply": response.text}
    except Exception as e:
        return {"reply": "I'm having a brief connection issue. Please try again!", "error": str(e)}

if __name__ == "__main__":
    import uvicorn
    # FIXED: Use the 'port' variable from environment for Render
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
