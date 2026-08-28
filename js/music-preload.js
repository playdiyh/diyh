const MUSIC_SESSION_KEY = 'diyh_music_playback';
const LEGACY_MUSIC_SESSION_KEYS = ['dyih_music_playback', 'growdy_music_playback'];

try {
  let raw = sessionStorage.getItem(MUSIC_SESSION_KEY);
  if (!raw) {
    for (const legacyKey of LEGACY_MUSIC_SESSION_KEYS) {
      raw = sessionStorage.getItem(legacyKey);
      if (raw) {
        sessionStorage.setItem(MUSIC_SESSION_KEY, raw);
        sessionStorage.removeItem(legacyKey);
        break;
      }
    }
  }
  if (raw) {
    const session = JSON.parse(raw);
    if (!session?.pausedByUser && session?.trackIndex != null && session.trackIndex >= 0) {
      const src = `assets/goofy${session.trackIndex + 1}.mp3`;
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'fetch';
      link.href = src;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
  }
} catch {
  // ignore
}
