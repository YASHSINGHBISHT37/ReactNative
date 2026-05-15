# test.py - backend folder mein banao
from ytmusicapi import YTMusic

yt = YTMusic()

# Pehle wala ID jo kaam karta tha
album = yt.get_album("MPREb_y17shKO1nZm")
print(album["title"])