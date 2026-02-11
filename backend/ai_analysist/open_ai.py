from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("NEXT_OPEN_AI_API_KEY"))

res = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "user", "content": [
            {"type": "text", "text": 
                "Extract menu items with name and price and return following the format: JSON({name: something, price: int4}) if there are more items then store all JSON in the list and return it."},
            {"type": "image_url", "image_url": image_url}
        ]}
    ]
)

print(res.choices[0].message.content)