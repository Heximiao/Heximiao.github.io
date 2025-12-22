// Project data configuration file
// Used to manage data for the project display page

export interface Project {
	id: string;
	title: string;
	description: string;
	image: string;
	category: "web" | "mobile" | "desktop" | "other";
	techStack: string[];
	status: "completed" | "in-progress" | "planned";
	liveDemo?: string;
	sourceCode?: string;
	startDate: string;
	endDate?: string;
	featured?: boolean;
	tags?: string[];
	visitUrl?: string; // 添加前往项目链接字段
}

export const projectsData: Project[] = [
	{
		id: "maibot_plugin",
		title: "maibot plugin",
		description:
			"为麦麦bot开发的插件，提供多种实用功能以增强用户体验。",
		image: "https://opengraph.githubassets.com/1/Heximiao/acpoke_plugin",
		category: "web",
		techStack: ["Python", "Nonebot2"],
		status: "completed",
		liveDemo: "https://github.com/Heximiao/acpoke_plugin",
		sourceCode: "https://github.com/Heximiao/acpoke_plugin", // 更改为GitHub链接
		visitUrl: "https://github.com/Heximiao/acpoke_plugin", // 添加前往项目链接
		startDate: "2025-07-01",
		endDate: "2025-12-01",
		featured: true,
		tags: ["Nonebot2", "A-SOUL", "Plugin"],
	},
	{
        id: "astrbot-analysis",
        title: "AstrBot QQ 群日报分析",
        description:
            "参与开发的 AstrBot 插件，实现对 QQ 群聊消息的每日自动化汇总与 AI 深度分析，生成可视化日报。",
        image: "https://opengraph.githubassets.com/1/SXP-Simon/astrbot-qq-group-daily-analysis",
        category: "other",
        techStack: ["Python", "AstrBot", "LLM"],
        status: "completed",
        liveDemo: "https://github.com/SXP-Simon/astrbot-qq-group-daily-analysis",
        sourceCode: "https://github.com/SXP-Simon/astrbot-qq-group-daily-analysis",
        visitUrl: "https://github.com/SXP-Simon/astrbot-qq-group-daily-analysis",
        startDate: "2024-11-01", 
        featured: true,
        tags: ["AI", "Plugin", "Data Analysis"],
    },
    {
        id: "maibot-plugin-repo",
        title: "Mai-with-u Plugin Repo",
        description:
            "参与维护的麦麦 bot 插件库，汇集了多种为社区打造的功能增强插件。",
        image: "https://opengraph.githubassets.com/1/Mai-with-u/plugin-repo",
        category: "other",
        techStack: ["Python", "Nonebot2", "Community"],
        status: "in-progress",
        liveDemo: "https://github.com/Mai-with-u/plugin-repo",
        sourceCode: "https://github.com/Mai-with-u/plugin-repo",
        visitUrl: "https://github.com/Mai-with-u/plugin-repo",
        startDate: "2025-01-01",
        featured: true,
        tags: ["Nonebot2", "Open Source", "Maintenance"],
    },
];

// Get project statistics
export const getProjectStats = () => {
	const total = projectsData.length;
	const completed = projectsData.filter(
		(p) => p.status === "completed",
	).length;
	const inProgress = projectsData.filter(
		(p) => p.status === "in-progress",
	).length;
	const planned = projectsData.filter((p) => p.status === "planned").length;

	return {
		total,
		byStatus: {
			completed,
			inProgress,
			planned,
		},
	};
};

// Get projects by category
export const getProjectsByCategory = (category?: string) => {
	if (!category || category === "all") {
		return projectsData;
	}
	return projectsData.filter((p) => p.category === category);
};

// Get featured projects
export const getFeaturedProjects = () => {
	return projectsData.filter((p) => p.featured);
};

// Get all tech stacks
export const getAllTechStack = () => {
	const techSet = new Set<string>();
	projectsData.forEach((project) => {
		project.techStack.forEach((tech) => {
			techSet.add(tech);
		});
	});
	return Array.from(techSet).sort();
};
