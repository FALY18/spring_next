import { useEffect, useState } from 'react';
export default function Typewriter({ words, loop = true, speed = 100, eraseSpeed = 50, delay = 1500 }: { words: string[]; loop?: boolean; speed?: number; eraseSpeed?: number; delay?: number }) {
	const [index, setIndex] = useState(0); // mot actuel
	const [subIndex, setSubIndex] = useState(0); // caractères actuels
	const [deleting, setDeleting] = useState(false);
	const [blink, setBlink] = useState(true);

	useEffect(() => {
		if (index >= words.length) return;

		if (subIndex === words[index].length + 1 && !deleting) {
			// Pause après écriture iz
			setTimeout(() => setDeleting(true), delay);
			return;
		}
		if (subIndex === 0 && deleting) {
			// incremente delete tu
			setDeleting(false);
			setIndex((prev) => (prev + 1) % words.length);
			return;
		}

		const timeout = setTimeout(() => {
			setSubIndex((prev) =>
				deleting ? prev - 1 : prev + 1
			);
		}, deleting ? eraseSpeed : speed);

		return () => clearTimeout(timeout);
	}, [subIndex, deleting, index, words, speed, eraseSpeed, delay]);

	// Cursor e
	useEffect(() => {
		const blinkInterval = setInterval(() => {
			setBlink((prev) => !prev);
		}, 500);
		return () => clearInterval(blinkInterval);
	}, []);

	return (
		<span>
			{words[index].substring(0, subIndex)}
			<span className="text-yellow-300">{blink ? '|' : ' '}</span>
		</span>
	);
}
