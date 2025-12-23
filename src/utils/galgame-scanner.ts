export async function scanGalgames() {
  // 使用 import.meta.glob 扫描 md 文件，eager: true 确保同步加载内容
  const modules = import.meta.glob('../content/galgame/*.md', { eager: true });
  
  const galgames = Object.entries(modules).map(([filepath, post]: any) => {
    // 从路径提取 ID (文件名)
    const id = filepath.split('/').pop()?.replace('.md', '') || '';
    
    return {
      id: id,
      data: post.frontmatter, // 对应 md 顶部的配置
      Content: post.Content,   // 渲染后的 HTML 组件
    };
  });

  // 按日期降序排序
  return galgames.sort((a, b) => 
    new Date(b.data.releaseDate).getTime() - new Date(a.data.releaseDate).getTime()
  );
}