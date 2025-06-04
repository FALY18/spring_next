import { useState } from "react";

interface Props {
	src: string;
	alt: string;
	className?: string;
	style?: React.CSSProperties;
}

const ImageWithSkeleton = ({ src, alt, className = "", style }: Props) => {
	const [loaded, setLoaded] = useState(false);

	return (
		<div className={`relative ${className}`} style={style}>
			{!loaded && (
	<div className="absolute inset-0 bg-gray-300 animate-pulse rounded-md" />
			)}
			<img
	src={src}
	alt={alt}
	onLoad={() => setLoaded(true)}
	className={`w-full h-full object-cover transition-opacity duration-500 ${
		loaded ? "opacity-100" : "opacity-0"
	}`}
			/>
		</div>
	);
};

export default ImageWithSkeleton;
