// Skill data configuration file
// Used to manage data for the skill display page

export interface Skill {
	id: string;
	name: string;
	description: string;
	icon: string; // Iconify icon name
	category: "frontend" | "backend" | "database" | "tools" | "other";
	level: "beginner" | "intermediate" | "advanced" | "expert";
	experience: {
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
            "深入理解 ARM Cortex-M 架构，熟练使用标准库及 HAL 库进行外设驱动开发，包括 UART, I2C, SPI, PWM 等。",
        icon: "simple-icons:stmicroelectronics", // 意法半导体图标
        category: "backend",
        level: "advanced",
        experience: { years: 1, months: 6 },
        projects: ["bionic-butterfly-control", "uav-fc-system"],
        color: "#03234B",
    },
    {
        id: "embedded-c",
        name: "Embedded C",
        description:
            "精通底层 C 语言开发，熟悉寄存器操作、内存映射及实时操作系统 (RTOS) 的基本原理。",
        icon: "logos:c",
        category: "backend",
        level: "advanced",
        experience: { years: 2, months: 0 },
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
        name: "Python / Bot",
        description:
            "熟练应用异步编程处理并发，精通 Nonebot2 框架。在 maibot 与 Astrbot 项目中有丰富的插件架构与 API 对接经验。",
        icon: "logos:python",
        category: "backend",
        level: "advanced",
        experience: { years: 1, months: 10 },
        projects: ["acpoke_plugin", "maibot-plugins"],
        color: "#3776AB",
    },
    {
        id: "cpp",
        name: "C++ (ACM)",
        description:
            "ACM 赛训背景，具备扎实的数据结构与算法功底。擅长逻辑分析与代码性能优化。",
        icon: "logos:c-plusplus",
        category: "backend",
        level: "intermediate",
        experience: { years: 2, months: 0 },
        color: "#00599C",
    },

    // 效率工具 (Tools)
    {
        id: "linux",
        name: "Linux / Shell",
        description:
            "熟悉 Linux 开发环境，能够进行交叉编译环境搭建及服务器自动化部署。",
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
            "熟练使用 Git 进行版本管理，习惯于开源社区协作，能够配置 GitHub Actions 自动化工作流。",
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
		return total + skill.experience.years * 12 + skill.experience.months;
	}, 0);
	return {
		years: Math.floor(totalMonths / 12),
		months: totalMonths % 12,
	};
};
