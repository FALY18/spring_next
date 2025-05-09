'use client';

import '../globals.css';
import { useEffect } from 'react';
import AOS from 'aos'; // Import correct avec des guillemets
import 'aos/dist/aos.css';
import React from 'react';

interface RootLayoutProps {
children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
useEffect(() => {
AOS.init({ duration: 800, once: true });
}, []);

return (
<div>
{children}
</div>
);
}
