

export function initRevealOnScroll() {
    const sections = document.querySelectorAll('.section');
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); //anima só na primeira aparição
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(sec => observer.observe(sec));
}