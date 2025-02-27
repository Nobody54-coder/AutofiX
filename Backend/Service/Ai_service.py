import openai
from config import OPENAI_API_KEY

openai.api_key = OPENAI_API_KEY

def fix_code(code: str) -> str:
    """
    Use OpenAI's API to fix the provided code.
    Adjust the prompt and parameters as needed.
    """
    prompt = (
        "You are an expert Python developer. Fix the following code and provide an improved version:\n\n"
        f"{code}\n\nFixed Code:"
    )
    try:
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=300,
            temperature=0.3,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )
        fixed_code = response.choices[0].text.strip()
        return fixed_code
    except Exception as e:
        return f"Error in AI code fixing: {str(e)}"
