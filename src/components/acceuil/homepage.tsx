"use client";
import AOSProvider from "../AOSProvider";
import { Component } from "./cercle";
import { Componentdgr } from "./diagram";
import withAuth from "@/lib/withAuth";

function Home() {
	return (
		<>
			<AOSProvider />
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
				<div className="space-y-4 p-4" data-aos="fade-up">
					<Componentdgr />
				</div>
				<div className="space-y-4 p-[40px]" data-aos="fade-left">
					<Component />
				</div>
			</div>
		</>
	);
}

export default withAuth(Home, ['admin', 'client']);
