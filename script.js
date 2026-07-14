document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('carouselTrack');
    const items = document.querySelectorAll('.track-item');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const carouselContainer = document.querySelector('.carousel-3d'); // 监听整个容器

    const totalItems = items.length;
    const angleStep = 360 / totalItems; // 每张图片的角度间隔 (60度)
    
    let currentRotation = 0;
    let autoPlayInterval;

    // 更新正面高亮样式
    function updateFrontFace() {
        // 计算哪张图片在正前方
        const normalizedAngle = ((currentRotation % 360) + 360) % 360;
        // 四舍五入找到最近的索引
        const frontIndex = Math.round(normalizedAngle / angleStep) % totalItems;
        
        items.forEach((item, i) => {
            item.classList.toggle('front', i === frontIndex);
        });
    }

    // 旋转轨道核心函数
    function rotateTrack(direction) {
        currentRotation += direction * angleStep;
        // 应用变换：先向后移动(Z轴负值)，再旋转
        track.style.transform = `translateZ(-350px) rotateY(${currentRotation}deg)`;
        updateFrontFace();
    }

    // 自动轮播
    function startAutoPlay() {
        // 防止重复开启定时器
        if (autoPlayInterval) return;
        autoPlayInterval = setInterval(() => {
            rotateTrack(1); // 自动向左旋转 (方向可根据喜好调整)
        }, 1200);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }

    // --- 事件绑定 ---

    // 1. 鼠标悬停暂停，离开继续
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);

    // 2. 按钮控制
    prevBtn.addEventListener('click', () => {
        rotateTrack(-1);
        // 可选：点击后重置自动轮播计时器，避免点击后马上又自动转
        stopAutoPlay();
        startAutoPlay();
    });
    
    nextBtn.addEventListener('click', () => {
        rotateTrack(1);
        stopAutoPlay();
        startAutoPlay();
    });

    // 初始化
    // 初始位置需要把轨道推到圆心后方，距离等于半径
    track.style.transform = `translateZ(-350px) rotateY(0deg)`;
    updateFrontFace();
    startAutoPlay();
});