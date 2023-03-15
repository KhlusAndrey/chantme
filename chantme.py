import os
import openai
from dotenv import load_dotenv
import argparse

load_dotenv()
SYSTEM_MESSAGE = "Answer the user with short, concise answers. Keep it in the point and don't go off-topic."
MAX_INPUT_LENGTH = 20


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", "-i", type=str, required=True)
    args = parser.parse_args()
    user_input = args.input
    chat_history = []
    while user_input != "":
        generate_chant(user_input, chat_history, SYSTEM_MESSAGE)
        user_input = input()
        if not validate_input_length(user_input):
            raise ValueError(f'You write is too long. Must be under {MAX_INPUT_LENGTH}.')


def generate_chant(prompt: str, chat_history: list, system_message: str):
    full_prompt = f"Generate chant for the {prompt} football team playing against football club Real Madrid"
    openai.api_key = os.getenv("OPENAI_API_KEY")
    user_prompt = {'role': 'user', 'content': full_prompt}
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_message},
            *chat_history,
            user_prompt
        ],
        temperature=0,
        max_tokens=100
    )
    content = response["choices"][0]["message"]["content"].strip()
    chat_history.append(user_prompt)
    chat_history.append({"role": "assistant", "content": content})

    print(response)


def validate_input_length(user_input: str) -> bool:
    return len(user_input) <= MAX_INPUT_LENGTH


if __name__ == "__main__":
    main()
