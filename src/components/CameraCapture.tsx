"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import PhotoFrame from "./motifs/PhotoFrame";
import GoldButterfly from "./motifs/GoldButterfly";
import MickeyEars from "./motifs/MickeyEars";
import { compressImage } from "@/lib/compressImage";
import { uploadPhoto } from "@/lib/uploadPhoto";

type Stage = "idle" | "live" | "preview" | "uploading" | "done" | "error";

const LOADING_MESSAGES = [
  "Sprinkling a little gold dust...",
  "Tucking your photo into the memory box...",
  "Adding a touch of magic...",
];

export default function CameraCapture({ table }: { table: number }) {
  const [stage, setStage] = useState<Stage>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [loadingMsg] = useState(
    () => LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)],
  );

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const originalBlobRef = useRef<Blob | null>(null);
  const compressedBlobRef = useRef<Blob | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  useEffect(() => stopStream, [stopStream]);

  useEffect(() => {
    if (stage === "live" && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [stage]);

  const startLiveCamera = async () => {
    setErrorMsg("");
    if (!navigator.mediaDevices?.getUserMedia) {
      fileInputRef.current?.click();
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      streamRef.current = stream;
      setStage("live");
    } catch {
      fileInputRef.current?.click();
    }
  };

  const setPhoto = (blob: Blob) => {
    originalBlobRef.current = blob;
    compressedBlobRef.current = null;
    setPhotoUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(blob);
    });
    stopStream();
    setStage("preview");
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const vw = video.videoWidth || 1280;
    const vh = video.videoHeight || 1280;
    const size = Math.min(vw, vh);
    const sx = (vw - size) / 2;
    const sy = (vh - size) / 2;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, sx, sy, size, size, 0, 0, size, size);
    canvas.toBlob(
      (blob) => {
        if (blob) setPhoto(blob);
      },
      "image/jpeg",
      0.92,
    );
  };

  const handleFilePicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) setPhoto(file);
  };

  const retake = () => {
    originalBlobRef.current = null;
    compressedBlobRef.current = null;
    setPhotoUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setErrorMsg("");
    setStage("idle");
  };

  const runUpload = async () => {
    setStage("uploading");
    try {
      if (!compressedBlobRef.current) {
        if (!originalBlobRef.current) throw new Error("No photo captured");
        compressedBlobRef.current = await compressImage(originalBlobRef.current);
      }
      const result = await uploadPhoto(table, compressedBlobRef.current);
      if (result.ok) {
        setStage("done");
      } else {
        setErrorMsg(result.error);
        setStage("error");
      }
    } catch {
      setErrorMsg("Something went wrong preparing your photo. Please try again.");
      setStage("error");
    }
  };

  const takeAnother = () => {
    originalBlobRef.current = null;
    compressedBlobRef.current = null;
    setPhotoUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setErrorMsg("");
    setStage("idle");
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFilePicked}
      />
      <canvas ref={canvasRef} className="hidden" />

      {stage === "idle" && (
        <div className="flex flex-col items-center gap-6 py-6">
          <p className="text-center font-display text-lg text-ink/80 px-4">
            Capture a memory from your table &mdash; it&apos;ll land straight in our wedding album.
          </p>
          <ShutterButton onClick={startLiveCamera} label="Take a Photo" />
        </div>
      )}

      {stage === "live" && (
        <div className="flex flex-col items-center gap-6">
          <PhotoFrame className="aspect-square w-full">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="h-full w-full object-cover"
            />
          </PhotoFrame>
          <div className="flex w-full items-center justify-center gap-8">
            <button
              onClick={() => {
                stopStream();
                setStage("idle");
              }}
              className="font-sans text-xs tracking-[0.25em] text-ink-soft uppercase"
            >
              Cancel
            </button>
            <ShutterButton onClick={capturePhoto} label="Capture" compact />
            <span className="w-[3ch]" aria-hidden="true" />
          </div>
        </div>
      )}

      {stage === "preview" && photoUrl && (
        <div className="flex flex-col items-center gap-6">
          <PhotoFrame className="aspect-square w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photoUrl} alt="Your captured photo" className="h-full w-full object-cover" />
          </PhotoFrame>
          <div className="flex w-full gap-3">
            <button
              onClick={retake}
              className="flex-1 rounded-full border border-pink-light/70 bg-white/80 py-3.5 font-sans text-xs tracking-[0.2em] text-ink-soft uppercase"
            >
              Retake
            </button>
            <button
              onClick={runUpload}
              className="flex-1 rounded-full bg-pink py-3.5 font-sans text-xs tracking-[0.2em] text-white uppercase shadow-md shadow-pink/40"
            >
              Use This Photo
            </button>
          </div>
        </div>
      )}

      {stage === "uploading" && (
        <div className="flex flex-col items-center gap-4 py-14">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-pink-light border-t-pink" />
          <p className="font-display text-lg text-ink-soft">{loadingMsg}</p>
        </div>
      )}

      {stage === "done" && (
        <div className="flex flex-col items-center gap-4 py-10 text-center">
          <MickeyEars className="h-8 w-16 text-gold-light" />
          <GoldButterfly className="-mt-2 h-12 w-16" />
          <h2 className="font-script text-3xl text-pink-dark">Thank you!</h2>
          <p className="font-display text-lg text-ink/80 px-4">
            Your photo has been added to our wedding album.
          </p>
          <button
            onClick={takeAnother}
            className="mt-2 rounded-full bg-pink px-8 py-3.5 font-sans text-xs tracking-[0.2em] text-white uppercase shadow-md shadow-pink/40"
          >
            Take Another Photo
          </button>
        </div>
      )}

      {stage === "error" && (
        <div className="flex flex-col items-center gap-4 py-10 text-center">
          <p className="font-display text-lg text-ink/80 px-4">{errorMsg}</p>
          <div className="flex w-full gap-3">
            <button
              onClick={retake}
              className="flex-1 rounded-full border border-pink-light/70 bg-white/80 py-3.5 font-sans text-xs tracking-[0.2em] text-ink-soft uppercase"
            >
              Start Over
            </button>
            <button
              onClick={runUpload}
              className="flex-1 rounded-full bg-pink py-3.5 font-sans text-xs tracking-[0.2em] text-white uppercase shadow-md shadow-pink/40"
            >
              Retry
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ShutterButton({
  onClick,
  label,
  compact = false,
}: {
  onClick: () => void;
  label: string;
  compact?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={onClick}
        aria-label={label}
        className={`relative flex shrink-0 items-center justify-center rounded-full bg-pink text-white shadow-lg shadow-pink/40 transition active:scale-95 ${
          compact ? "h-16 w-16" : "h-20 w-20"
        }`}
      >
        <span className="absolute inset-1 rounded-full border-2 border-white/70" />
      </button>
      <span className="font-sans text-[11px] tracking-[0.25em] text-pink-dark uppercase whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}
