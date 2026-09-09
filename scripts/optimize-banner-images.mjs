import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const targets = [
	["public/assets/desktop-banner", 1920],
	["public/assets/mobile-banner", 900],
];

for (const [directory, width] of targets) {
	for (const name of await readdir(directory)) {
		if (!name.endsWith(".webp")) continue;
		const file = path.join(directory, name);
		const metadata = await sharp(file).metadata();
		if (!metadata.width || metadata.width <= width) continue;
		const temporaryFile = `${file}.optimized`;
		await sharp(file)
			.rotate()
			.resize({ width, withoutEnlargement: true })
			.webp({ quality: 78, effort: 6, smartSubsample: true })
			.toFile(temporaryFile);
	}
}
