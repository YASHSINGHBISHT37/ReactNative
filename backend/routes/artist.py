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

    # Get more songs
    songs_data = artist.get("songs", {})
    songs_browse_id = songs_data.get("browseId")
    params = songs_data.get("params")  # ← this is the missing piece

    print("browseId:", songs_browse_id)
    print("params:", params)

    if songs_browse_id and params:
        try:
            more_songs = yt.get_artist_songs(channel_id, songs_browse_id, params)
            songs = more_songs[:8]
        except Exception as e:
            print("get_artist_songs error:", e)
            songs = songs_data.get("results", [])
    else:
        songs = songs_data.get("results", [])

    print("final songs count:", len(songs))

    return {
        "name": artist.get("name", ""),
        "description": artist.get("description", ""),   
        "views": artist.get("views", ""),
        "subscribers": artist.get("subscribers", ""),
        "monthlyListeners": artist.get("monthlyListeners", ""),
        "thumbnail": artist["thumbnails"][-1]["url"] if artist.get("thumbnails") else None,
        "songs": songs,
        "albums": artist.get("albums", {}).get("results", []),
        "singles": artist.get("singles", {}).get("results", []),
        "related": artist.get("related", {}).get("results", []),
    }