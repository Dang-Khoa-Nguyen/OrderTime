from elevenlabs.client import ElevenLabs
from elevenlabs import VoiceSettings
import base64
import os
from dotenv import load_dotenv

class ElevenService:
    load_dotenv()
    
    def generate_voice(user_text, speed, tone):    
        # Get the API KEY from Eleven labs
        client = ElevenLabs(api_key=os.getenv("ELEVEN_LABS_API_KEY"))
        audio = client.text_to_speech.convert(
            voice_id="ieVlOqXMeMVyCmIEzKAd",
            text=user_text['text'],
            model_id="eleven_multilingual_v2",
            voice_settings=VoiceSettings(
                stability=0.5,
                similarity_boost=tone,
                speed=speed, 
            )
        )
        
        # Convert stream → bytes
        audio_bytes = b"".join(audio)

        # Encode to base64
        audio_base64 = base64.b64encode(audio_bytes).decode("utf-8")
        
        return audio_base64