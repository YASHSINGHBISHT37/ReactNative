from fastapi import APIRouter, Query
from ytmusicapi import YTMusic

router = APIRouter()
yt = YTMusic()

@router.get("/")
def search(q: str = Query(...), filter: str = "songs"):
    # Filter can be: songs, albums, artists, playlists, videos
    results = yt.search(q, filter=filter, limit=20)  # 20 results
    
    return [
        {
            "type": r.get("resultType", filter),
            "browseId": r.get("browseId"),
            "videoId": r.get("videoId"),
            "playlistId": r.get("playlistId"),
            "title": r.get("title", ""),
            "artist": r["artists"][0]["name"] if r.get("artists") else "",
            "year": r.get("year", ""),
            "duration": r.get("duration", ""),
            "thumbnail": r["thumbnails"][-1]["url"] if r.get("thumbnails") else None,
            "isExplicit": r.get("isExplicit", False),
        }
        for r in results
    ]