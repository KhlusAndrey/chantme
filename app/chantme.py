import os
import openai
# from dotenv import load_dotenv
import argparse


# load_dotenv()
SYSTEM_MESSAGE = "Keep it in the point and don't go off-topic."
MAX_INPUT_LENGTH = 20


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", "-i", type=str, required=True)
    args = parser.parse_args()
    user_input = args.input
    # generate_chant_davinci(user_input)
    chat_history = []
    while user_input != "":
        generate_chant_gpt35(user_input, chat_history, SYSTEM_MESSAGE)
        user_input = input()
        validate_input_length(user_input)


# This model allow hold of context of previous user requests
def generate_chant_gpt35(prompt: str, chat_history: list, system_message: str = None):
    first_team, second_team = prompt.split(',') # We get two teams names from frontend devided by ','
    full_prompt = f"Generate chant for the {first_team} football team playing against other football club {second_team}. If possible using {first_team} country language, or English"
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
    print(content)
    print(response)
    return content


def generate_chant_davinci(prompt: str) -> str:
    validate_input_length(prompt)
    openai.api_key = os.getenv("OPENAI_API_KEY")
    full_prompt = f"Generate competitive chant for the football team {prompt} fans playing against football club Real Madrid"
    response = openai.Completion.create(model="text-davinci-003", prompt=full_prompt, max_tokens=100)
    content = response["choices"][0]["text"].strip()
    print(content)
    print(response)
    return content


def validate_input_length(user_input: str) -> None:
    if len(user_input) > MAX_INPUT_LENGTH:
        raise ValueError(f'You write is too long. Must be under {MAX_INPUT_LENGTH}.')


if __name__ == "__main__":
    main()
