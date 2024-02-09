import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
	logo: <span>Arbitra Pulse</span>,
	project: {
		link: "https://github.com/0xTxbi/arbitra-pulse",
	},

	docsRepositoryBase: "https://github.com/0xTxbi/arbitra-pulse",
	footer: {
		text: "Arbitra Pulse",
	},
	banner: {
		key: "arbitra-pulse-release",
		text: (
			<a
				href="https://arbitra-pulse-explorer.vercel.app"
				target="_blank"
			>
				🎉 Arbitra Pulse Explorer is live. Create an
				Account →
			</a>
		),
	},
};

export default config;
