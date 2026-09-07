"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import GuestHeader from "./GuestHeader";
import TableBadge from "./TableBadge";
import FloralField from "./motifs/FloralField";
import MickeySilhouette from "./motifs/MickeySilhouette";

type Photo = {
  id: string;
  thumbnailUrl: string;
  viewUrl: string;
  createdAt: number;
};

type LoadState = "loading" | "loaded" | "error";

export default function AlbumView({ table }: { table: number }) {
  const [state, setState] = useState<LoadState>("loading");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  const fetchAlbum = useCallback(() => {
    return fetch(`/api/album?table=${table}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setPhotos(data.photos ?? []);
          setState("loaded");
        } else {
          setErrorMsg(data.error || "Couldn't load the album.");
          setState("error");
        }
      })
      .catch(() => {
        setErrorMsg("Couldn't load the album. Please check your connection.");
        setState("error");
      });
  }, [table]);

  useEffect(() => {
    fetchAlbum();
  }, [fetchAlbum]);

  const retry = () => {
    setState("loading");
    fetchAlbum();
  };

  return (
    <main className="relative min-h-dvh w-full overflow-hidden bg-cream">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 15% 0%, var(--color-blush) 0%, transparent 60%), radial-gradient(ellipse at 100% 20%, var(--color-peach-soft) 0%, transparent 55%), radial-gradient(ellipse at 10% 100%, var(--color-lilac-soft) 0%, transparent 50%)",
        }}
      />
      <MickeySilhouette className="pointer-events-none absolute -left-16 top-24 h-56 w-56 text-lilac opacity-70" />
      <FloralField />

      <div className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col items-center gap-6 px-5 pt-[max(2.5rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-6">
        <GuestHeader />
        <TableBadge table={table} />
        <p className="-mt-2 font-sans text-[11px] tracking-[0.3em] text-ink-soft uppercase">
          Table Album
        </p>

        {state === "loading" && (
          <div className="flex flex-col items-center gap-4 py-14">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-pink-light border-t-pink" />
            <p className="font-display text-lg text-ink-soft">Gathering your photos...</p>
          </div>
        )}

        {state === "error" && (
          <div className="flex flex-col items-center gap-4 py-10 text-center">
            <p className="font-display text-lg text-ink/80 px-4">{errorMsg}</p>
            <button
              onClick={retry}
              className="rounded-full bg-pink px-6 py-3 font-sans text-xs tracking-[0.2em] text-white uppercase shadow-md shadow-pink/40"
            >
              Retry
            </button>
          </div>
        )}

        {state === "loaded" && photos.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-10 text-center">
            <p className="font-display text-lg text-ink/80 px-4">
              No photos yet &mdash; be the first to add one!
            </p>
          </div>
        )}

        {state === "loaded" && photos.length > 0 && (
          <div className="grid w-full grid-cols-2 gap-2.5 sm:grid-cols-3">
            {photos.map((photo) => (
              <button
                key={photo.id}
                onClick={() => setLightbox(photo)}
                className="aspect-square overflow-hidden rounded-2xl bg-white shadow-[0_8px_20px_-10px_rgba(140,106,58,0.35)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.thumbnailUrl}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        <Link
          href={`/t/${table}`}
          className="mt-2 rounded-full border border-pink-light/70 bg-white/80 px-6 py-3 font-sans text-xs tracking-[0.2em] text-ink-soft uppercase"
        >
          Back to Camera
        </Link>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setLightbox(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox.viewUrl}
            alt=""
            className="max-h-[85dvh] max-w-full rounded-2xl object-contain"
          />
          <button
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute top-[max(1rem,env(safe-area-inset-top))] right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink shadow-md"
          >
            ✕
          </button>
        </div>
      )}
    </main>
  );
}
