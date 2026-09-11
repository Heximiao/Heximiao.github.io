import type { APIRoute } from "astro";

const robotsTxt = `
# Only blog posts, Galgame pages, and their required static assets may be crawled.
User-agent: *
Allow: /posts/
Allow: /galgame/
Allow: /_astro/
Disallow: /

# Block Anthropic's Claude crawlers from the entire site.
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
