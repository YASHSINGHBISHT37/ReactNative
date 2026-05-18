from ytmusicapi import YTMusic
yt = YTMusic()
album = yt.get_album('MPREb_oj3xX6DIoZQ')
for track in album['tracks']:
    print(track['title'], '|', track['videoId'])
"