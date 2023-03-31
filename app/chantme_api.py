from fastapi import FastAPI, HTTPException
from chantme import generate_chant_gpt35
from mangum import Mangum
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
handler = Mangum(app)

SYSTEM_MESSAGE = "Keep it in the point and don't go off-topic."
MAX_LENGTH = 32

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/generate_chant")
async def generate_chant_api(prompt: str):
    validate_length(prompt)
    chat_history = []
    chant = generate_chant_gpt35(prompt, chat_history, SYSTEM_MESSAGE)
    return {"message": chant}


def validate_length(prompt: str):
    if len(prompt) > MAX_LENGTH:
        raise HTTPException(status_code=400,
                            detail=f"Your command name is too long, should be less {MAX_LENGTH}")

