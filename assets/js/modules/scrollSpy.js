// destaca o link do menu de acordo com a seção visivel
export function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]'); 
    const links = Array.from(document.querySelectorAll('.nav-menu a'));

    if (!sections.length || !links.length) return;

    const ById = id => links.find(a => a.getAttribute('href') === `#${id}`);

    const spy = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.id;
            const link = ById(id);
            if (!link) return;

            if (entry.isIntersecting) {
                links.forEach(a => a.classList.remove('current'));
                link.classList.add('current');
            }
        });
    }, {threshold: 0.6 });

    sections.forEach(sec => spy.observe(sec));
}