from fastapi import APIRouter, HTTPException
from ytmusicapi import YTMusic

router = APIRouter()
yt = YTMusic()

@router.get("/{channel_id}")
def get_artist(channel_id: str):
    try:
        artist = yt.get_artist(channel_id)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

    return {
        "name": artist.get("name", ""),
        "description": artist.get("description", ""),
        "views": artist.get("views", ""),
        "subscribers": artist.get("subscribers", ""),
        "monthlyListeners": artist.get("monthlyListeners", ""),
        "thumbnail": artist["thumbnails"][-1]["url"] if artist.get("thumbnails") else None,
        "songs": artist.get("songs", {}).get("results", []),
        "albums": artist.get("albums", {}).get("results", []),
        "singles": artist.get("singles", {}).get("results", []),
        "related": artist.get("related", {}).get("results", []),
    }