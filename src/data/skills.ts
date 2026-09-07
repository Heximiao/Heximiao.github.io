// Skill data configuration file
// Used to manage data for the skill display page

export interface Skill {
	id: string;
	name: string;
	description: string;
	icon: string; // Iconify icon name
	category: "frontend" | "backend" | "database" | "tools" | "other";
	level: "beginner" | "intermediate" | "advanced" | "expert";
	experience?: {
		years: number;
		months: number;
	};
	projects?: string[]; // Related project IDs
	certifications?: string[];
	color?: string; // Skill card theme color
}

export const skillsData: Skill[] = [
    // 嵌入式与硬件 (Backend Category)
    {
        id: "stm32",
        name: "STM32 / ARM",
        description:
            "熟悉 STM32 单片机开发，能够使用标准库及 HAL 库配置常用外设，并在机创赛中实践嵌入式控制与电机驱动。",
        icon: "simple-icons:stmicroelectronics", // 意法半导体图标
        category: "backend",
        level: "advanced",
        experience: { years: 1, months: 0 },
        projects: ["bionic-butterfly-control", "uav-fc-system"],
        color: "#03234B",
    },
    {
        id: "mspm0g3507",
        name: "TI MSPM0G3507",
        description:
            "具备 TI MSPM0G3507 单片机开发能力，结合电赛备赛进行 C 语言程序编写、基础外设实验与板级调试。",
        icon: "material-symbols:memory",
        category: "backend",
        level: "intermediate",
        color: "#CC0000",
    },
    {
        id: "embedded-c",
        name: "Embedded C",
        description:
            "熟悉嵌入式 C 语言编程、寄存器操作与内存映射基础，能够结合单片机实验编写和调试控制程序，参加过 ACM 校赛。",
        icon: "logos:c",
        category: "backend",
        level: "advanced",
        experience: { years: 1, months: 6 },
        color: "#A8B9CC",
    },
    {
        id: "circuit-design",
        name: "电路设计/PCB",
        description:
            "具备基础的模拟与数字电路设计能力，能够使用 Altium Designer 或立创 EDA 进行原理图绘制及 PCB 布局。",
        icon: "material-symbols:memory",
        category: "other",
        level: "intermediate",
        experience: { years: 1, months: 0 },
        color: "#34D399",
    },

    // 软件与算法 (Backend/Tools)
    {
        id: "python",
        name: "Python / AstrBot",
        description:
            "持续开发 AstrBot 与 maibot 插件，熟悉异步消息处理、指令与事件响应、配置管理及 API 对接，实践群聊互动和角色养成功能。",
        icon: "logos:python",
        category: "backend",
        level: "advanced",
        experience: { years: 1, months: 10 },
        projects: ["astrbot-plugin-wifepicker", "astrbot-plugin-atrifeed", "maibot-plugin-repo"],
        color: "#3776AB",
    },
    {
        id: "sqlite",
        name: "SQLite / 数据存储",
        description:
            "在亚托莉陪伴插件中使用 SQLite 保存用户好感度、金币、背包与剧情进度，具备基础的数据表设计和增删改查实践。",
        icon: "material-symbols:database",
        category: "database",
        level: "intermediate",
        projects: ["astrbot-plugin-atrifeed"],
        color: "#0F80CC",
    },

    // 效率工具 (Tools)
    {
        id: "linux",
        name: "Linux / Shell",
        description:
            "熟悉 Linux 常用命令与开发环境，能够完成机器人运行环境配置、依赖安装和日常日志排查。",
        icon: "logos:linux-tux",
        category: "tools",
        level: "intermediate",
        experience: { years: 1, months: 2 },
        color: "#FCC624",
    },
    {
        id: "git",
        name: "Git / GitHub",
        description:
            "使用 Git 与 GitHub 管理插件代码，维护 README 和版本更新记录，并通过 Issue 与 Pull Request 参与开源交流和协作。",
        icon: "logos:git-icon",
        category: "tools",
        level: "intermediate",
        experience: { years: 1, months: 8 },
        color: "#F05032",
    },

    // 前端基础
    {
        id: "astro",
        name: "Astro / Web",
        description:
            "掌握基础的现代网页配置与 Markdown 内容管理，能通过 Astro 维护个人博客与技术文档。",
        icon: "logos:astro-icon",
        category: "frontend",
        level: "beginner",
        experience: { years: 0, months: 4 },
        color: "#FF5D01",
    },
];
// Get skill statistics
export const getSkillStats = () => {
	const total = skillsData.length;
	const byLevel = {
		beginner: skillsData.filter((s) => s.level === "beginner").length,
		intermediate: skillsData.filter((s) => s.level === "intermediate")
			.length,
		advanced: skillsData.filter((s) => s.level === "advanced").length,
		expert: skillsData.filter((s) => s.level === "expert").length,
	};
	const byCategory = {
		frontend: skillsData.filter((s) => s.category === "frontend").length,
		backend: skillsData.filter((s) => s.category === "backend").length,
		database: skillsData.filter((s) => s.category === "database").length,
		tools: skillsData.filter((s) => s.category === "tools").length,
		other: skillsData.filter((s) => s.category === "other").length,
	};

	return { total, byLevel, byCategory };
};

// Get skills by category
export const getSkillsByCategory = (category?: string) => {
	if (!category || category === "all") {
		return skillsData;
	}
	return skillsData.filter((s) => s.category === category);
};

// Get advanced skills
export const getAdvancedSkills = () => {
	return skillsData.filter(
		(s) => s.level === "advanced" || s.level === "expert",
	);
};

// Calculate total years of experience
export const getTotalExperience = () => {
	const totalMonths = skillsData.reduce((total, skill) => {
		return total + (skill.experience ? skill.experience.years * 12 + skill.experience.months : 0);
	}, 0);
	return {
		years: Math.floor(totalMonths / 12),
		months: totalMonths % 12,
	};
};
