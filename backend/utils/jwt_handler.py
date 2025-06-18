from datetime import datetime, timedelta
from jose import jwt

SECRET_KEY = "mera_secret"
ALGORITHM = "HS256"

def create_token(data: dict):
    expire = datetime.utcnow() + timedelta(hours=1)
    data.update({"exp": expire})
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token: str):
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
