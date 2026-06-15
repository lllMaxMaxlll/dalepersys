"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

function extractYouTubeId(input: string): string | null {
	if (!input) return null;
	if (/^[\w-]{11}$/.test(input)) return input;
	const match = input.match(/(?:youtu\.be\/|v=|shorts\/|embed\/|live\/)([\w-]{11})/);
	return match ? match[1] : null;
}

// playerState de YouTube: 1 = reproduciendo, 3 = buffering
const PLAYING_STATES = [1, 3];

export function YouTubeVideo({
	url,
	title,
	meta,
	poster,
}: {
	url: string;
	title: string;
	meta: string;
	poster: string;
}) {
	const id = extractYouTubeId(url);
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const [playing, setPlaying] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		if (!id || !isLoaded) return;
		const onMessage = (e: MessageEvent) => {
			if (e.source !== iframeRef.current?.contentWindow) return;
			try {
				const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
				const state = data?.info?.playerState;
				if (typeof state === "number") setPlaying(PLAYING_STATES.includes(state));
			} catch {}
		};
		window.addEventListener("message", onMessage);
		return () => window.removeEventListener("message", onMessage);
	}, [id, isLoaded]);

	const startListening = () => {
		iframeRef.current?.contentWindow?.postMessage(
			JSON.stringify({ event: "listening", id, channel: "widget" }),
			"*",
		);
	};

	// Fallback to official YouTube maxresdefault thumbnail if local poster is one of the missing assets
	const existingAssets = [
		"/foto-1.jpg",
		"/foto-2.jpg",
		"/foto-3.jpg",
		"/hero-dj.jpg",
		"/logo-loading.png",
		"/logo-red.png",
		"/og.jpg",
		"/portrait.jpg",
		"/placeholder.svg",
	];
	const isMissingLocalPoster = poster.startsWith("/") && !existingAssets.includes(poster);
	const posterUrl = isMissingLocalPoster
		? id
			? `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
			: "/placeholder.svg"
		: poster;

	return (
		<figure>
			<div
				className={`relative aspect-video overflow-hidden rounded-2xl border transition-all duration-500 ${
					playing ? "border-neon/70 glow-pulse" : "border-border hover:border-neon/60 hover:glow-neon"
				}`}>
				{id && isLoaded ? (
					<iframe
						ref={iframeRef}
						src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&enablejsapi=1&autoplay=1`}
						title={title}
						className="absolute inset-0 h-full w-full"
						style={{ border: 0 }}
						loading="lazy"
						onLoad={startListening}
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowFullScreen
					/>
				) : (
					<button
						type="button"
						onClick={() => id && setIsLoaded(true)}
						disabled={!id}
						className={`group/btn absolute inset-0 h-full w-full text-left ${id ? "cursor-pointer" : "cursor-default"}`}
						aria-label={id ? `Reproducir ${title}` : `${title} - Próximamente`}
					>
						<Image
							src={posterUrl}
							alt={title}
							fill
							sizes="(max-width: 768px) 100vw, 50vw"
							className="object-cover opacity-70 transition-transform duration-500 group-hover/btn:scale-105"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
						<div className="absolute inset-0 flex items-center justify-center">
							<span className="flex h-16 w-16 items-center justify-center rounded-full border border-border/80 bg-background/60 text-foreground backdrop-blur-md transition-all duration-300 group-hover/btn:scale-110 group-hover/btn:border-neon group-hover/btn:bg-neon group-hover/btn:text-primary-foreground group-hover/btn:shadow-[0_0_20px_var(--neon)]">
								<Play className="h-6 w-6 fill-current" />
							</span>
						</div>
						{!id && (
							<span className="absolute right-4 top-4 rounded-full border border-border bg-background/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-sm">
								Próximamente
							</span>
						)}
					</button>
				)}
			</div>
			<figcaption className="mt-4 px-1">
				<span className="font-mono text-xs text-neon">{meta}</span>
				<h3 className="font-heading text-xl font-bold text-foreground md:text-2xl">{title}</h3>
			</figcaption>
		</figure>
	);
}
