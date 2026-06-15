"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Hero() {
	const sectionRef = useRef<HTMLElement>(null);
	const imageRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const section = sectionRef.current;
		if (!section) return;
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		gsap.registerPlugin(ScrollTrigger);

		const ctx = gsap.context(() => {
			// Premium name reveal on load
			const lines = titleRef.current?.querySelectorAll(".reveal-line > span");
			if (lines) {
				gsap.to(lines, {
					y: 0,
					duration: 1.2,
					ease: "power4.out",
					stagger: 0.12,
					delay: 0.5,
				});
			}

			if (reduced) return;

			// Cinematic camera zoom + parallax on scroll
			gsap.to(imageRef.current, {
				scale: 1.35,
				yPercent: 12,
				ease: "none",
				scrollTrigger: {
					trigger: section,
					start: "top top",
					end: "bottom top",
					scrub: true,
				},
			});

			gsap.to(titleRef.current, {
				yPercent: -40,
				opacity: 0,
				ease: "none",
				scrollTrigger: {
					trigger: section,
					start: "top top",
					end: "bottom top",
					scrub: true,
				},
			});
		}, section);

		return () => ctx.revert();
	}, []);

	return (
		<section ref={sectionRef} id="hero" className="relative flex h-screen min-h-160 items-center justify-center overflow-hidden">
			<div ref={imageRef} className="absolute inset-0 will-change-transform">
				<Image src="/hero-dj.jpg" alt="DJ tocando en vivo bajo luces de boliche" fill priority sizes="100vw" className="object-cover" />
				<div className="absolute inset-0 bg-linear-to-b from-background/40 via-background/30 to-background" />
				<div className="absolute inset-0 bg-background/30" />
			</div>

			<div ref={titleRef} className="relative z-10 px-6 text-center will-change-transform">
				<p className="mb-6 font-mono text-xs uppercase tracking-[0.5em] text-neon md:text-sm">DJ · RKT · Argentina</p>
				<h1 className="reveal-line mx-auto w-[65vw] max-w-xs md:max-w-md lg:max-w-lg">
					<span>
						<Image
							src="/logo-red.png"
							alt="Dale Persys"
							width={2000}
							height={1200}
							priority
							sizes="(max-width: 768px) 65vw, 512px"
							className="h-auto w-full"
						/>
					</span>
				</h1>
				<p className="reveal-line mx-auto mt-8 max-w-md text-pretty text-base text-muted-foreground md:text-lg">
					<span>RKT, turreo y remixes bolicheros. La pista no descansa.</span>
				</p>
			</div>

			<div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
				<span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Deslizá</span>
				<span className="h-12 w-px animate-pulse bg-linear-to-b from-neon to-transparent" />
			</div>
		</section>
	);
}
