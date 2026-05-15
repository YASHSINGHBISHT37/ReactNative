from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import album, artist, search, home

app = FastAPI()

# Allow requests from your React Native app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(album.router,  prefix="/album")
app.include_router(artist.router, prefix="/artist")
app.include_router(search.router, prefix="/search")
app.include_router(home.router,   prefix="/home")

@app.get("/")
def root():
    return {"status": "music api is running"}