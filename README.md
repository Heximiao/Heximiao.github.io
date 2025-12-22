# 🌊 Heximiao's Blog | 何夕的个人博客

这是我的个人静态博客仓库，记录技术心得与生活点滴。

## 🌐 访问地址
**直接访问：[blog.heximiao.com](https://blog.heximiao.com)**

---

## 🛠️ 技术栈
这个博客基于 [Fuwari](https://github.com/saicaca/fuwari) 模板构建，采用了当前前端最前沿的技术方案：

* **框架**: [Astro 5](https://astro.build/) (极速的静态网站生成器)
* **组件**: [Svelte 5](https://svelte.dev/) (响应式逻辑处理)
* **样式**: [Tailwind CSS](https://tailwindcss.com/)
* **部署**: [GitHub Actions](https://github.com/features/actions) + [Cloudflare](https://www.cloudflare.com/)
* **评论系统**: [Waline](https://waline.js.org/)

## 🚀 自动化部署
本项目已配置完整的 **CI/CD 工作流**：
1.  **Push** 代码至 `main` 分支。
2.  **GitHub Actions** 自动触发编译任务（Check & Build）。
3.  **Deploy** 任务自动将静态页面发布至 GitHub Pages。
4.  **Cloudflare** 全球 CDN 实时加速。

## 📂 目录结构
* `/src/content/posts/` - 所有的博客文章（Markdown 格式）都在这里。
* `/src/config.ts` - 站点全局配置文件。
* `/public/` - 存放图片、图标等静态资源。

---

感谢访问！如果觉得不错，欢迎点个 ⭐ **Star** 鼓励一下~