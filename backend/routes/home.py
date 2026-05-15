from fastapi import APIRouter
from ytmusicapi import YTMusic

router = APIRouter()
yt = YTMusic()

@router.get("/")
def get_home():
    try:
        rows = yt.get_home(limit=5)
    except Exception:
        return []

    return [
        {
            "title": row.get("title", ""),
            "contents": [
                {
                    "type": "album" if item.get("browseId", "").startswith("MPREb") else "playlist",
                    "title": item.get("title", ""),
                    "browseId": item.get("browseId"),
                    "playlistId": item.get("playlistId"),
                    "thumbnail": item["thumbnails"][-1]["url"] if item.get("thumbnails") else None,
                    "description": item.get("description", ""),
                }
                for item in row.get("contents", [])
            ]
        }
        for row in rows
    ]