"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Play, Pause, Volume2, VolumeX, CheckCircle, Award, ExternalLink, Activity } from "lucide-react";
import { AudioBenchmarkItem } from "@/data/benchmarks-data";
import { Locale } from "@/lib/i18n";

interface AudioBenchmarkCardProps {
  item: AudioBenchmarkItem;
  locale: Locale;
  activeMediaId: string | null;
  onPlay: (id: string) => void;
  onPause: (id: string) => void;
}

export function AudioBenchmarkCard({
  item,
  locale,
  activeMediaId,
  onPlay,
  onPause,
}: AudioBenchmarkCardProps) {
  const isVi = locale === "vi";
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(item.durationSeconds);
  const [isMuted, setIsMuted] = useState(false);

  // Synchronize playback when another media starts
  useEffect(() => {
    if (activeMediaId !== item.id && isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    }
  }, [activeMediaId, item.id, isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      onPause(item.id);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
      onPlay(item.id);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current && audioRef.current.duration) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={`relative flex flex-col rounded-2xl border transition-all duration-300 ${
        item.isWinner
          ? "bg-[#12141a] border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.08)] ring-1 ring-emerald-500/20"
          : "bg-[#141417] border-zinc-800/80 hover:border-zinc-700/80"
      }`}
    >
      {/* Hidden Native Audio Element (0 third-party player bloat) */}
      <audio
        ref={audioRef}
        src={item.audioUrl}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
          onPause(item.id);
        }}
      />

      {/* Top Banner / Verdict */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-zinc-800/50">
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
          {(item.fileSizeBytes / 1024).toFixed(0)} KB • MP3 64kbps
        </span>
      </div>

      {/* Main Tool Identity */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <h3 className="text-lg font-semibold text-white tracking-tight">{item.name}</h3>
            <span className="text-xs font-mono text-zinc-400">{item.metrics.costPerMinute}</span>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed mb-5">
            {isVi ? item.keyTakeaway.vi : item.keyTakeaway.en}
          </p>

          {/* Minimalist Apple-Style Custom Audio Player Deck */}
          <div className="rounded-xl bg-black/60 border border-zinc-800/80 p-4 mb-5">
            <div className="flex items-center gap-3 mb-3">
              {/* Play/Pause Button */}
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause audio" : "Play audio"}
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-200 cursor-pointer ${
                  isPlaying
                    ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                    : "bg-white text-black hover:bg-zinc-200"
                }`}
              >
                {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-0.5" />}
              </button>

              {/* Dynamic Animated Waveform Visualization */}
              <div className="flex-1 flex items-center gap-[3px] h-9 px-2 overflow-hidden">
                {Array.from({ length: 28 }).map((_, idx) => {
                  const animHeight = isPlaying
                    ? Math.max(4, Math.sin(idx * 0.7 + currentTime * 8) * 14 + 14)
                    : (idx % 4 + 1) * 3;
                  return (
                    <span
                      key={idx}
                      style={{ height: `${animHeight}px` }}
                      className={`w-1 rounded-full transition-all duration-150 ${
                        idx / 28 <= progressPercent / 100
                          ? item.isWinner
                            ? "bg-emerald-400"
                            : "bg-zinc-200"
                          : "bg-zinc-700/60"
                      }`}
                    />
                  );
                })}
              </div>

              {/* Mute Button */}
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
                className="text-zinc-400 hover:text-white transition-colors p-1"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
            </div>

            {/* Scrubber & Timecode */}
            <div className="space-y-1">
              <input
                type="range"
                min={0}
                max={duration || item.durationSeconds}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                aria-label="Audio scrubber"
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[11px] font-mono text-zinc-500 px-0.5">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration || item.durationSeconds)}</span>
              </div>
            </div>
          </div>

          {/* Quantitative Radar & Metrics */}
          <div className="grid grid-cols-2 gap-2 mb-5">
            <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
              <span className="block text-[10px] uppercase font-mono tracking-wider text-zinc-500">
                {isVi ? "Điểm Tự Nhiên (MOS)" : "MOS Naturalness"}
              </span>
              <span className="text-base font-bold text-white">
                {item.metrics.mosScore.toFixed(2)}{" "}
                <span className="text-xs font-normal text-zinc-400">/ 5.0</span>
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
              <span className="block text-[10px] uppercase font-mono tracking-wider text-zinc-500">
                {isVi ? "Độ trễ phản hồi" : "Engine Latency"}
              </span>
              <span className="text-base font-bold text-white font-mono">
                {item.metrics.latencyMs}ms
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
              <span className="block text-[10px] uppercase font-mono tracking-wider text-zinc-500">
                {isVi ? "Khớp phát âm" : "Pronunciation"}
              </span>
              <span className="text-base font-bold text-emerald-400">
                {item.metrics.pronunciationAccuracy}%
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
              <span className="block text-[10px] uppercase font-mono tracking-wider text-zinc-500">
                {isVi ? "Độ sâu cảm xúc" : "Emotional Depth"}
              </span>
              <span className="text-base font-bold text-white">
                {item.metrics.emotionDepthScore}{" "}
                <span className="text-xs font-normal text-zinc-400">/ 10</span>
              </span>
            </div>
          </div>

          {/* Key Pros / Strengths */}
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
