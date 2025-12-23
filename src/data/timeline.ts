// Timeline data configuration file
// Used to manage data for the timeline page

export interface TimelineItem {
	id: string;
	title: string;
	description: string;
	type: "education" | "work" | "project" | "achievement";
	startDate: string;
	endDate?: string; // If empty, it means current
	location?: string;
	organization?: string;
	position?: string;
	skills?: string[];
	achievements?: string[];
	links?: {
		name: string;
		url: string;
		type: "website" | "certificate" | "project" | "other";
	}[];
	icon?: string; // Iconify icon name
	color?: string;
	featured?: boolean;
}

export const timelineData: TimelineItem[] = [
    {
        id: "current-study",
        title: "电子信息工程 - 本科在读",
        description:
            "主修电子信息工程，深入学习电路分析、信号处理及嵌入式系统开发。目前专注于 STM32 系列芯片的应用与开发。",
        type: "education",
        startDate: "2024-09-01", // 请根据你的实际入学年份修改
        location: "福建·漳州",
        organization: "厦门大学嘉庚学院",
        skills: ["C/C++", "STM32", "电路设计", "嵌入式开发"],
        achievements: [
            "专业核心课表现优异",
            "掌握基于 ARM Cortex-M 内核的硬件编程",
            "活跃于校内科研与工程实践项目"
        ],
        icon: "material-symbols:school",
        color: "#059669",
        featured: true,
    },
    {
        id: "uav-association",
        title: "无人机协会副会长",
        description:
            "负责协会日常技术管理与活动组织，带领成员研究无人机飞行控制系统及开源硬件开发。",
        type: "work",
        startDate: "2025-10-23",
        organization: "无人机协会",
        position: "副会长",
        skills: ["团队管理", "无人机技术", "项目统筹"],
        achievements: [
            "组织多次校级无人机技术交流与展示活动",
            "指导新手成员完成四轴飞行器基础搭建",
            "负责协会技术路线规划与硬件采购"
        ],
        icon: "material-symbols:flight-takeoff",
        color: "#2563EB",
        featured: true,
    },
    {
        id: "robot-contest-2024",
        title: "全国大学生机械创新大赛 (机创赛)",
        description:
            "参与“仿生蝴蝶”赛道，负责仿生结构的嵌入式控制系统开发，实现高精度动作模拟。",
        type: "project",
        startDate: "2025-11-01",
        organization: "机创赛项目组",
        position: "控制算法/嵌入式开发",
        skills: ["STM32", "电机控制", "仿生算法"],
        achievements: [
            "自主设计基于 STM32 的蝴蝶翅膀振动控制逻辑",
            "解决轻量化结构下的电源管理难题"
        ],
        icon: "material-symbols:precision-manufacturing",
        color: "#7C3AED",
        featured: true,
    },
    {
        id: "maibot-plugin-dev",
        title: "maibot 项目组插件开发",
        description:
            "作为 maibot 项目组成员，利用 Python 开发多款实用插件，提升社区用户交互体验。",
        type: "work",
        startDate: "2025-05-17",
        organization: "maibot 开源社区",
        skills: ["Python", "Nonebot2", "API 集成"],
        achievements: [
            "开发并维护多款高频使用插件，例如戳一戳插件广受人喜爱",
            "优化插件异步处理逻辑，降低延迟",
            "目前正参与 Astrbot 的前沿研究与适配"
        ],
        icon: "material-symbols:smart-toy",
        color: "#EA580C",
    },
    {
        id: "acm-contest",
        title: "ACM 校级程序设计竞赛",
        description:
            "参加校级算法竞赛，磨炼基础算法逻辑与 C/C++ 编程能力。",
        type: "achievement",
        startDate: "2025-04-01",
        endDate: "2025-05-20",
        organization: "信息科学与技术学院",
        skills: ["C++", "数据结构", "算法分析"],
        achievements: [
            "在规定时间内完成算法题目",
            "提升了逻辑严密性与代码运行效率"
        ],
        icon: "material-symbols:emoji-events",
        color: "#D97706",
    },
];

// Get timeline statistics
export const getTimelineStats = () => {
	const total = timelineData.length;
	const byType = {
		education: timelineData.filter((item) => item.type === "education")
			.length,
		work: timelineData.filter((item) => item.type === "work").length,
		project: timelineData.filter((item) => item.type === "project").length,
		achievement: timelineData.filter((item) => item.type === "achievement")
			.length,
	};

	return { total, byType };
};

// Get timeline items by type
export const getTimelineByType = (type?: string) => {
	if (!type || type === "all") {
		return timelineData.sort(
			(a, b) =>
				new Date(b.startDate).getTime() -
				new Date(a.startDate).getTime(),
		);
	}
	return timelineData
		.filter((item) => item.type === type)
		.sort(
			(a, b) =>
				new Date(b.startDate).getTime() -
				new Date(a.startDate).getTime(),
		);
};

// Get featured timeline items
export const getFeaturedTimeline = () => {
	return timelineData
		.filter((item) => item.featured)
		.sort(
			(a, b) =>
				new Date(b.startDate).getTime() -
				new Date(a.startDate).getTime(),
		);
};

// Get current ongoing items
export const getCurrentItems = () => {
	return timelineData.filter((item) => !item.endDate);
};

// Calculate total work experience
export const getTotalWorkExperience = () => {
	const workItems = timelineData.filter((item) => item.type === "work");
	let totalMonths = 0;

	workItems.forEach((item) => {
		const startDate = new Date(item.startDate);
		const endDate = item.endDate ? new Date(item.endDate) : new Date();
		const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
		const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
		totalMonths += diffMonths;
	});

	return {
		years: Math.floor(totalMonths / 12),
		months: totalMonths % 12,
	};
};
