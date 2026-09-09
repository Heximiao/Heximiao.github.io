import type { APIRoute } from "astro";

const robotsTxt = `
# Public pages and blog posts may be indexed, including by AI crawlers.
# Keep albums and their original image files out of crawler indexes.
User-agent: *
Allow: /
Disallow: /albums/
Disallow: /images/albums/

# Anthropic crawler identities documented by Anthropic.
User-agent: ClaudeBot
Disallow: /

User-agent: Claude-User
Disallow: /

User-agent: Claude-SearchBot
Disallow: /

Sitemap: ${new URL("sitemap-index.xml", import.meta.env.SITE).href}
`.trim();

export const GET: APIRoute = () => {
	return new Response(robotsTxt, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
};
