import requests

class PeekitPlayerService:
    """
    Service for player data management and Roblox identity verification.
    """

    def __init__(self, username: str):
        self.username = username
        # При инициализации сразу получаем правильный ID
        self.roblox_id = self.fetch_roblox_id(username)

    @staticmethod
    def fetch_roblox_id(username: str) -> int:
        """
        Fetches the exact Roblox User ID from the official API.
        Fixes the issue with incorrect IDs during registration.
        """
        api_url = "https://users.roblox.com/v1/usernames/users"
        payload = {
            "usernames": [username],
            "excludeBannedUsers": True
        }
        
        try:
            response = requests.post(api_url, json=payload)
            response_data = response.json().get("data", [])
            
            if response_data:
                # Возвращаем ID конкретно для запрошенного ника
                return response_data[0].get("id")
            return 0
        except Exception:
            return 0

    def get_player_data(self) -> dict:
        """Returns verified player information."""
        return {
            "username": self.username,
            "roblox_id": self.roblox_id,
            "is_verified": self.roblox_id > 0
        }

if __name__ == "__main__":
    # Проверка для ника leochpok
    player = PeekitPlayerService("leochpok")
    data = player.get_player_data()
    
    print(f"Username: {data['username']}")
    print(f"Correct ID: {data['roblox_id']}")
    print(f"Status: {'Verified' if data['is_verified'] else 'Not Found'}")
