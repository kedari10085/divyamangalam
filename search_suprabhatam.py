import yt_dlp

ydl_opts = {
    'quiet': True,
    'extract_flat': True,
}
with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    res = ydl.extract_info('ytsearch5:venkateswara suprabhatam original', download=False)
    if 'entries' in res:
        for entry in res['entries']:
            print(f"{entry.get('title')} | ID: {entry.get('id')} | {entry.get('duration')}s")
