from fastapi import APIRouter, HTTPException
from ytmusicapi import YTMusic

router = APIRouter()
yt = YTMusic()

@router.get("/{browse_id}")
def get_album(browse_id: str):
    try:
        album = yt.get_album(browse_id)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

    artist_id = album["artists"][0]["id"] if album.get("artists") else None
    artist_img = None

    if artist_id:
        try:
            artist_info = yt.get_artist(artist_id)
            thumbnails = artist_info.get("thumbnails", [])
            if thumbnails:
                artist_img = thumbnails[-1]["url"]
        except Exception:
            pass

    return {
        "name": album["title"],
        "artist": album["artists"][0]["name"] if album.get("artists") else "",
        "artistId": artist_id,
        "cover": album["thumbnails"][-1]["url"] if album.get("thumbnails") else None,
        "artistImg": artist_img,
        "description": album.get("description", ""),
        "year": album.get("year", ""),
        "trackCount": album.get("trackCount", 0),
        "duration": album.get("duration", ""),
        "songs": [
            {
                "id": str(i + 1),
                "videoId": track.get("videoId"),
                "title": track["title"],
                "artist": ", ".join(a["name"] for a in track.get("artists", [])),
                "duration": track.get("duration", ""),
                "isExplicit": track.get("isExplicit", False),
                "thumbnail": album["thumbnails"][-1]["url"] if album.get("thumbnails") else None,
            }
            for i, track in enumerate(album.get("tracks", []))
        ],
    }