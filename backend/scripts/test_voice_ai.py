import os
import sys
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, project_root)
from database.supabase_function import SupabaseFunction
from database.supabase_client import SupabaseClient
from dotenv import load_dotenv
from elevenlabs.client import ElevenLabs

if __name__ == "__main__":
    
    def speak():
        load_dotenv()
        SUPABASE_ANON_KEY = SupabaseClient.get_supabase_anon()
        text = SupabaseFunction.generate_random_order(SUPABASE_ANON_KEY, 1)
        print("Text:", text['text'])

        client = ElevenLabs(api_key=os.getenv("ELEVEN_LABS_API_KEY"))
        audio = client.text_to_speech.convert(
            voice_id="ieVlOqXMeMVyCmIEzKAd",
            text=text['text'],
            model_id="eleven_multilingual_v2",
        )

        # Save to file
        with open("test_output.mp3", "wb") as f:
            for chunk in audio:
                f.write(chunk)

        print("Saved to test_output.mp3")
        os.startfile("test_output.mp3")

    speak()