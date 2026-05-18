from fastapi import APIRouter, HTTPException
import yt_dlp
from ytmusicapi import YTMusic

router = APIRouter()
cache = {}
ytmusic = YTMusic()

@router.get("/stream/{video_id}")
def get_stream_url(video_id: str):
    if video_id in cache:
        print("Cache hit:", video_id)
        return cache[video_id]

    url = f"https://music.youtube.com/watch?v={video_id}"

    ydl_opts = {
        'format': 'bestaudio[acodec^=mp4a]/bestaudio[acodec=opus]/bestaudio',
        'quiet': True,
        'no_warnings': True,
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=False)

        formats = info.get('formats', [])

        # Pure audio formats jo url wale hain
        audio_only = [
            f for f in formats
            if f.get('vcodec') == 'none'
            and f.get('acodec') not in (None, 'none')
            and f.get('url')
        ]

        if not audio_only:
            raise HTTPException(status_code=404, detail="No audio stream found")

        # mp4a prefer karo (React Native ke saath best compatible)
        mp4a = [f for f in audio_only if 'mp4a' in (f.get('acodec') or '')]
        best = mp4a[0] if mp4a else audio_only[0]

        result = {
            "stream_url": best['url'],
            "title": info.get('title'),
            "duration": info.get('duration'),
        }

    cache[video_id] = result
    return result


@router.get("/cache/clear")
def clear_cache():
    cache.clear()
    return {"message": "Cache cleared"}


@router.get("/related/{video_id}")
def get_related_songs(video_id: str):
    watch = ytmusic.get_watch_playlist(videoId=video_id, limit=10)

    songs = []
    for track in watch.get('tracks', [])[1:]:
        songs.append({
            "videoId": track.get('videoId'),
            "title": track.get('title'),
            "artist": track.get('artists', [{}])[0].get('name', ''),
            "thumbnail": track.get('thumbnail', [{}])[-1].get('url', ''),
            "duration": track.get('length'),
        })

    return {"songs": songs}