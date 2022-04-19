```python [activate:Python]

import secrets
from urllib.parse import urljoin

params # data from your request handling
storage # your own memory system

# Retrieve GET query params from your own framework / http handler
pim_url: str = params.get('pim_url')

# Retrive your app's Client ID with your own system
client_id: str = storage.get("CLIENT_ID")

# The activate URL should have the pim_url param
if not pim_url:
    # Return a Bad request response via your own framework / http server
    return response(502, {"message": "Bad request"})

# Store the PIM url value with your own system
storage.set("PIM_URL", pim_url)

# Set the access scopes, take care of the 254 chars max !
scopes: str = 'read_products write_products'

# Set a new security state secret and store it with your own system
state: str = secrets.token_hex(32)
storage.set("APP_STATE", state)

# Redirect to the PIM with "connect" options needed
redirect_url: str = urljoin(
    pim_url,
    f"/connect/apps/v1/authorize"
    f"?response_type=code"
    f"&client_id={client_id}"
    f"&scope={scopes}"
    f"&state={state}",
)
# Set the redirection response with your own framework / http server
return redirect(redirect_url)
```