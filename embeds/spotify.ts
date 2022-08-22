import { EmbedSource, EnableEmbedKey } from "./";

const SPOTIFY_LINK = new RegExp(
  /https:\/\/open\.spotify\.com\/track\/.+/,
);

declare global {
  interface Window {
    MusicKit: any;
  }
}

export class SpotifyEmbed implements EmbedSource {
  name = "Spotify";
  enabledKey: EnableEmbedKey = "replaceSpotifyLinks";
  regex = SPOTIFY_LINK;

  createEmbed(link: string, container: HTMLElement) {
    const iframe = document.createElement("iframe");

    /*
        Sample:
        From: https://open.spotify.com/track/6xMmMHNpzNSVxBMC6hiFFx?si=1a29d101389b48b3
        To: <iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/6xMmMHNpzNSVxBMC6hiFFx?utm_source=generator" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
    */
      
    iframe.src = link.replace(
      "/track/",
      "/embed/track/",
    );
    iframe.setAttr("frameborder", "0");
    iframe.allow = "autoplay *; clipboard-write *; encrypted-media *; fullscreen *; picture-in-picture *";
    iframe.height = "450";
    iframe.style.width = "100%";
    iframe.style.borderRadius = "12px";
    container.classList.add("spotify");
    container.appendChild(iframe);

    return container;
  }
}
