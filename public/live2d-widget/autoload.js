/*!
 * Live2D Widget
 * https://github.com/stevenjoezhang/live2d-widget
 */

// Recommended to use absolute path for live2d_path parameter
// live2d_path 参数建议使用绝对路径
const live2d_path = '/live2d-widget/';
// const live2d_path = '/dist/';

// Method to encapsulate asynchronous resource loading
// 封装异步加载资源的方法
(function() {
    // 强制修改所有鼠标移动事件的坐标
    function lockMouse(e) {
        // 这里的 0.5 代表屏幕正中心
        // 插件拿到的坐标永远是中心点，所以头永远正对着前面
        Object.defineProperty(e, 'clientX', { value: window.innerWidth / 2 });
        Object.defineProperty(e, 'clientY', { value: window.innerHeight / 2 });
        Object.defineProperty(e, 'pageX', { value: window.innerWidth / 2 });
        Object.defineProperty(e, 'pageY', { value: window.innerHeight / 2 });
    }

    // 在捕获阶段拦截，确保比插件更早拿到事件
    window.addEventListener('mousemove', lockMouse, true);
    window.addEventListener('touchmove', lockMouse, true);
})();

function loadExternalResource(url, type) {
  return new Promise((resolve, reject) => {
    let tag;

    if (type === 'css') {
      tag = document.createElement('link');
      tag.rel = 'stylesheet';
      tag.href = url;
    }
    else if (type === 'js') {
      tag = document.createElement('script');
      tag.type = 'module';
      tag.src = url;
    }
    if (tag) {
      tag.onload = () => resolve(url);
      tag.onerror = () => reject(url);
      document.head.appendChild(tag);
    }
  });
}

(async () => {
  // If you are concerned about display issues on mobile devices, you can use screen.width to determine whether to load
  // 如果担心手机上显示效果不佳，可以根据屏幕宽度来判断是否加载
  // if (screen.width < 768) return;

  // Avoid cross-origin issues with image resources
  // 避免图片资源跨域问题
  const OriginalImage = window.Image;
  window.Image = function(...args) {
    const img = new OriginalImage(...args);
    img.crossOrigin = "anonymous";
    return img;
  };
  window.Image.prototype = OriginalImage.prototype;
  // Load waifu.css and waifu-tips.js
  // 加载 waifu.css 和 waifu-tips.js
  await Promise.all([
    loadExternalResource(live2d_path + 'waifu.css', 'css'),
    loadExternalResource(live2d_path + 'waifu-tips.js', 'js')
  ]);
  // For detailed usage of configuration options, see README.en.md
  // 配置选项的具体用法见 README.md
  initWidget({
    cdnPath: '/pio/models/',
    waifuPath: live2d_path + 'waifu-tips.json',
    
    // 关键：确保这两个路径正确，尤其是 cubism5Path
    // 如果远程加载慢，可以把这个 js 下载到本地 /live2d-widget/ 下引用
    cubism2Path: live2d_path + 'live2d.min.js', 
    cubism5Path: 'https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js',

    // 强制指定模型 ID
    modelId: 1,
    modelTexturesId: 0,

    // 尝试禁用缓存（刚才报错了 textures.cache 404，虽然不影响，但关掉更干净）
    useCache: false,
    
    tools: ['hitokoto', 'asteroids', 'switch-model', 'switch-texture', 'photo', 'info', 'quit'],
    logLevel: 'info',
    mouseFollow: false,    // 关闭鼠标跟随
    mouseClick: true,      // 保留点击动作（如果你想点她有反应的话）
    updateBodyPos: false,  // 禁止脚本更新身体位置
});
})();

console.log(`\n%cLive2D%cWidget%c\n`, 'padding: 8px; background: #cd3e45; font-weight: bold; font-size: large; color: white;', 'padding: 8px; background: #ff5450; font-size: large; color: #eee;', '');

/*
く__,.ヘヽ.        /  ,ー､ 〉
         ＼ ', !-─‐-i  /  /´
         ／｀ｰ'       L/／｀ヽ､
       /   ／,   /|   ,   ,       ',
     ｲ   / /-‐/  ｉ  L_ ﾊ ヽ!   i
      ﾚ ﾍ 7ｲ｀ﾄ   ﾚ'ｧ-ﾄ､!ハ|   |
        !,/7 '0'     ´0iソ|    |
        |.从"    _     ,,,, / |./    |
        ﾚ'| i＞.､,,__  _,.イ /   .i   |
          ﾚ'| | / k_７_/ﾚ'ヽ,  ﾊ.  |
            | |/i 〈|/   i  ,.ﾍ |  i  |
           .|/ /  ｉ：    ﾍ!    ＼  |
            kヽ>､ﾊ    _,.ﾍ､    /､!
            !'〈//｀Ｔ´', ＼ ｀'7'ｰr'
            ﾚ'ヽL__|___i,___,ンﾚ|ノ
                ﾄ-,/  |___./
                'ｰ'    !_,.:
*/
// 拦截所有传给 Live2D 的鼠标坐标