"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Play, Pause, Volume2, VolumeX, Maximize2, Award, CheckCircle, ExternalLink, Video } from "lucide-react";
import { VideoBenchmarkItem } from "@/data/benchmarks-data";
import { Locale } from "@/lib/i18n";

interface VideoBenchmarkCardProps {
  item: VideoBenchmarkItem;
  locale: Locale;
  activeMediaId: string | null;
  onPlay: (id: string) => void;
  onPause: (id: string) => void;
}

export function VideoBenchmarkCard({
  item,
  locale,
  activeMediaId,
  onPlay,
  onPause,
}: VideoBenchmarkCardProps) {
  const isVi = locale === "vi";
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(item.durationSeconds);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Synchronize playback across media cards
  useEffect(() => {
    if (activeMediaId !== item.id && isPlaying) {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setIsPlaying(false);
    }
  }, [activeMediaId, item.id, isPlaying]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      onPause(item.id);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
      onPlay(item.id);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.duration) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div
      className={`relative flex flex-col rounded-2xl border transition-all duration-300 overflow-hidden ${
        item.isWinner
          ? "bg-[#12141a] border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.08)] ring-1 ring-emerald-500/20"
          : "bg-[#141417] border-zinc-800/80 hover:border-zinc-700/80"
      }`}
    >
      {/* Top Banner / Verdict */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-zinc-800/50">
        <div className="flex items-center gap-2">
          {item.isWinner ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Award className="h-3 w-3" />
              {isVi ? item.verdictBadge.vi : item.verdictBadge.en}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-zinc-800/80 text-zinc-300 border border-zinc-700/50">
              Rank #{item.rank} • {isVi ? item.verdictBadge.vi : item.verdictBadge.en}
            </span>
          )}
        </div>
        <span className="text-[11px] font-mono text-zinc-500">
          {(item.fileSizeBytes / 1024).toFixed(0)} KB • WebM (VP9)
        </span>
      </div>

      {/* Video Container (Strictly 100% Native HTML5, Zero Player Library) */}
      <div
        className="relative aspect-video w-full bg-black overflow-hidden group cursor-pointer"
        onClick={togglePlay}
        onMouseEnter={() => setShowControls(true)}
      >
        <video
          ref={videoRef}
          src={item.videoUrl}
          preload="metadata"
          playsInline
          controlsList="nodownload"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => {
            setIsPlaying(false);
            setCurrentTime(0);
            onPause(item.id);
          }}
          className="w-full h-full object-cover"
        />

        {/* Central Play/Pause Overlay Button */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-black shadow-lg shadow-emerald-500/30 transition-transform hover:scale-105">
              <Play className="h-6 w-6 fill-current ml-1" />
            </div>
          </div>
        )}

        {/* Custom Apple-Style Floating Player Control Bar */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 pt-6 transition-opacity duration-200 ${
            showControls || !isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Scrubber slider */}
          <input
            type="range"
            min={0}
            max={duration || item.durationSeconds}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            aria-label="Video scrubber"
            className="w-full h-1 bg-zinc-700/80 rounded-lg appearance-none cursor-pointer accent-emerald-400 mb-2"
          />

          <div className="flex items-center justify-between text-white text-xs">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="hover:text-emerald-400 transition-colors p-1"
              >
                {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
              </button>

              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
                className="hover:text-emerald-400 transition-colors p-1"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>

              <span className="text-[11px] font-mono text-zinc-300">
                {formatTime(currentTime)} / {formatTime(duration || item.durationSeconds)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/50">
                {item.resolution}
              </span>
              <button
                type="button"
                onClick={toggleFullScreen}
                aria-label="Fullscreen"
                className="hover:text-emerald-400 transition-colors p-1"
              >
                <Maximize2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tool Content & Telemetry */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <h3 className="text-lg font-semibold text-white tracking-tight">{item.name}</h3>
            <span className="text-xs font-mono text-zinc-400">{item.metrics.costPerMinute}</span>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed mb-4">
            {isVi ? item.keyTakeaway.vi : item.keyTakeaway.en}
          </p>

          {/* Quantitative Radar & Metrics */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
              <span className="block text-[10px] uppercase font-mono tracking-wider text-zinc-500">
                {isVi ? "Khớp khẩu hình (Lip-Sync)" : "Lip-Sync Accuracy"}
              </span>
              <span className="text-base font-bold text-emerald-400 font-mono">
                {item.metrics.lipSyncAccuracy}%
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
              <span className="block text-[10px] uppercase font-mono tracking-wider text-zinc-500">
                {isVi ? "Tốc độ xử lý video" : "Render Speed Ratio"}
              </span>
              <span className="text-base font-bold text-white font-mono">
                {item.metrics.renderSpeedRatio}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
              <span className="block text-[10px] uppercase font-mono tracking-wider text-zinc-500">
                {isVi ? "Cử chỉ vi mô (Micro-Gestures)" : "Micro-Gestures"}
              </span>
              <span className="text-base font-bold text-white">
                {item.metrics.microGestureScore}{" "}
                <span className="text-xs font-normal text-zinc-400">/ 10</span>
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
              <span className="block text-[10px] uppercase font-mono tracking-wider text-zinc-500">
                {isVi ? "Xóa dấu vết AI" : "Watermark Quality"}
              </span>
              <span className="text-base font-bold text-white">
                {item.metrics.watermarkQuality}
              </span>
            </div>
          </div>

          {/* Key Pros */}
          <div className="space-y-1.5 mb-5 text-xs text-zinc-300">
            {(isVi ? item.pros.vi : item.pros.en).map((pro, pIdx) => (
              <div key={pIdx} className="flex items-start gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{pro}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Affiliate Outbound CTA */}
        <Link
          href={item.affiliateUrl}
          target="_blank"
          rel="nofollow sponsored noopener"
          className={`flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition-all ${
            item.isWinner
              ? "bg-emerald-500 hover:bg-emerald-400 text-black shadow-md shadow-emerald-500/20"
              : "bg-zinc-800 hover:bg-zinc-700 text-zinc-100"
          }`}
        >
          <span>
            {isVi ? `Dùng thử ${item.name.split(" ")[0]} Miễn Phí` : `Try ${item.name.split(" ")[0]} Free`}
          </span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
