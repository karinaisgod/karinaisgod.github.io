// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 스크롤 애니메이션
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// 모든 feature-card와 value-item에 초기 opacity 0 설정 및 observer 적용
document.querySelectorAll('.feature-card, .value-item, .stat-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// 헤더 스크롤 효과
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.background = 'rgba(10, 14, 39, 0.98)';
        header.style.boxShadow = '0 5px 30px rgba(0, 242, 254, 0.1)';
        header.style.borderBottom = '1px solid rgba(0, 242, 254, 0.2)';
    } else {
        header.style.background = 'rgba(10, 14, 39, 0.95)';
        header.style.boxShadow = 'none';
        header.style.borderBottom = '1px solid rgba(0, 242, 254, 0.1)';
    }

    lastScroll = currentScroll;
});

// 숫자 카운트업 애니메이션
const countUpAnimation = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

// 투자 섹션 통계 애니메이션
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach((stat, index) => {
                const text = stat.textContent;
                if (text.includes('+')) {
                    const num = parseInt(text.replace(/\D/g, ''));
                    stat.textContent = '0+';
                    setTimeout(() => {
                        countUpAnimation(stat, num, 2000);
                        setTimeout(() => {
                            stat.textContent = num + '+';
                        }, 2000);
                    }, index * 200);
                } else if (text.includes('%')) {
                    const num = parseInt(text);
                    stat.textContent = '0%';
                    setTimeout(() => {
                        countUpAnimation(stat, num, 2000);
                        setTimeout(() => {
                            stat.textContent = num + '%';
                        }, 2000);
                    }, index * 200);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const investmentSection = document.querySelector('.investment-stats');
if (investmentSection) {
    statsObserver.observe(investmentSection);
}

// 마우스 이동에 따른 히어로 배경 효과
const hero = document.querySelector('.hero');
const heroBg = document.querySelector('.hero-bg');

if (hero && heroBg) {
    hero.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        heroBg.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    });
}

// 버튼 클릭 파동 효과
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// 스크롤 진행 표시바 (선택사항)
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 60px;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #00f2fe 0%, #4facfe 100%);
    z-index: 9999;
    transition: width 0.1s;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

console.log('🐾 Pawket 웹사이트가 로드되었습니다!');