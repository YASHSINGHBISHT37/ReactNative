from fastapi import APIRouter, Query
from ytmusicapi import YTMusic

router = APIRouter()
yt = YTMusic()

@router.get("/")
def search(q: str = Query(...), filter: str = "songs"):
    results = yt.search(q, filter=filter, limit=20)

    def get_artist_name(r):
        # songs/albums have "artists" list
        if r.get("artists"):
            return r["artists"][0].get("name", "")
        # artist results have "artist" string directly
        if r.get("artist"):
            return r["artist"]
        # fallback
        return r.get("name", "")

    def get_browse_id(r):
        # artist results store it under "browseId" directly
        return r.get("browseId") or r.get("channelId")

    return [
        {
            "type": r.get("resultType", filter),
            "browseId": get_browse_id(r),
            "videoId": r.get("videoId"),
            "playlistId": r.get("playlistId"),
            "title": r.get("title") or r.get("artist") or r.get("name", ""),
            "artist": get_artist_name(r),
            "year": r.get("year", ""),
            "duration": r.get("duration", ""),
            "thumbnail": r["thumbnails"][-1]["url"] if r.get("thumbnails") else None,
            "isExplicit": r.get("isExplicit", False),
        }
        for r in results
    ]