```python [callback:Python]

import secrets
import hashlib
import requests
from urllib.parse import urljoin

params # data from your request handling
storage # your own memory system

# Retrieve GET query params from your own framework / http handler
code: str = params.get('pim_url')
state: str = params.get('pim_url')

# Retrieve your app's variables with your own system
pim_url: str = storage.get("PIM_URL")
app_state: str = storage.get("APP_STATE")
client_id: str = storage.get("CLIENT_ID")
client_secret: str = storage.get("CLIENT_SECRET")

# Control the security state integrity previously defined, to avoid attacks
if state != app_state:
    return response(403, 
        {
            "error": "Forbidden",
            "error_description": "State integrity failed",
        }
    )

# Generate a new challenge code
# a sha256 concatenation of a code_identifier and the client_secret
code_identifier: str = secrets.token_hex(32)
code_challenge: str = hashlib.sha256(f"{code_identifier}{client_secret}".encode("utf-8")).hexdigest()

# Send the payload to the PIM instance, ask for an API Token
data = requests.post(
    urljoin(
        pim_url,
        "/connect/apps/v1/oauth2/token",
    ),
    data={
        "code": code,
        "grant_type": "authorization_code",
        "client_id": client_id,
        "code_identifier": code_identifier,
        "code_challenge": code_challenge,
    },
    headers={
        "Content-Type": "application/x-www-form-urlencoded",
    },
).json()

# Retrieve the fresh token and store it with your own system
token: str = data.get("access_token")
storage.set("API_TOKEN", token)

# Set the redirection response with your own framework / http server
return redirect("/")
```