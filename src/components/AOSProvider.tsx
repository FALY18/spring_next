"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSProvider() {
	useEffect(() => {
		let initialized = false;

		const initAOS = () => {
			if (!initialized) {
	AOS.init({
		duration: 800,
		once: false, 
	});
	initialized = true;
			}
		};

		const onScroll = () => {
			initAOS();
			AOS.refresh(); 
		};

		window.addEventListener("scroll", onScroll);

		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return null;
}
