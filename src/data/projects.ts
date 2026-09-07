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
		id: "astrbot-plugin-wifepicker",
		title: "AstrBot 活跃成员抽老婆插件",
		description:
			"基于 AstrBot 的群聊互动插件，从近期发言的活跃群友中抽取今日老婆，并生成群成员羁绊关系图谱。",
		image: "https://opengraph.githubassets.com/1/Heximiao/astrbot-plugin-wifepicker",
		category: "other",
		techStack: ["Python", "AstrBot"],
		status: "in-progress",
		liveDemo: "https://github.com/Heximiao/astrbot-plugin-wifepicker",
		sourceCode: "https://github.com/Heximiao/astrbot-plugin-wifepicker",
		visitUrl: "https://github.com/Heximiao/astrbot-plugin-wifepicker",
		startDate: "2026-02-09",
		featured: true,
		tags: ["AstrBot", "群聊互动", "Plugin"],
	},
	{
		id: "astrbot-plugin-atrifeed",
		title: "AstrBot 亚托莉陪伴插件",
		description:
			"基于 AstrBot 框架开发的亚托莉陪伴插件，为聊天机器人增添角色陪伴体验。",
		image: "https://opengraph.githubassets.com/1/Heximiao/astrbot_plugin_atrifeed",
		category: "other",
		techStack: ["Python", "AstrBot"],
		status: "in-progress",
		liveDemo: "https://github.com/Heximiao/astrbot_plugin_atrifeed",
		sourceCode: "https://github.com/Heximiao/astrbot_plugin_atrifeed",
		visitUrl: "https://github.com/Heximiao/astrbot_plugin_atrifeed",
		startDate: "2026-02-09",
		featured: true,
		tags: ["AstrBot", "ATRI", "Plugin"],
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
