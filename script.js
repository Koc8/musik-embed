function loadPlayer() {
  const platform = document.getElementById("platform").value;
  const link = document.getElementById("link").value.trim();
  const playerBox = document.getElementById("player-box");
  const downloadBox = document.getElementById("download-box");
  const downloadLink = document.getElementById("download-link");

  if (!link) {
    playerBox.innerHTML = "<p>⚠️ Masukkan link dulu!</p>";
    downloadBox.style.display = "none";
    return;
  }

  let embedCode = "";

  if (platform === "spotify") {
    const match = link.match(/track\/([a-zA-Z0-9]+)/);
    if (match) {
      const trackId = match[1];
      embedCode = `
        <iframe style="border-radius:12px" 
          src="https://open.spotify.com/embed/track/${trackId}" 
          width="100%" height="380" frameBorder="0" allowfullscreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture">
        </iframe>`;
    } else {
      embedCode = "<p>❌ Link Spotify tidak valid.</p>";
    }

    // arahkan tombol download ke situs pihak ketiga (ganti URL sesuai selera)
    downloadLink.href = `https://spotidownloader.com/en${encodeURIComponent(link)}`;
    downloadBox.style.display = "block";

  } else if (platform === "youtube") {
  // regex untuk ambil video ID
  const match = link.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
  if (match) {
    const videoId = match[1];
    embedCode = `
      <iframe width="100%" height="315"
        src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}" 
        title="YouTube video player" frameborder="0"
        allow="autoplay; encrypted-media" allowfullscreen>
      </iframe>`;

    // tombol download pihak ketiga
    downloadLink.href = `https://id.savefrom.net/1-cara-mengunduh-video-youtube${videoId}`;
    downloadBox.style.display = "block";
  } else {
    embedCode = "<p>❌ Link YouTube tidak valid.</p>";
    downloadBox.style.display = "none";
  }
}

  playerBox.innerHTML = embedCode;
}
