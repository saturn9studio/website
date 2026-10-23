// Mark the contents entry for the section being read
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.docs-contents a');
    const sections = Array.from(links)
        .map(link => document.getElementById(link.getAttribute('href').substring(1)))
        .filter(Boolean);

    function markCurrent() {
        let current = sections[0];
        sections.forEach(section => {
            if (section.getBoundingClientRect().top <= 120) {
                current = section;
            }
        });

        links.forEach(link => {
            if (current && link.getAttribute('href') === '#' + current.id) {
                link.setAttribute('aria-current', 'location');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    window.addEventListener('scroll', markCurrent, { passive: true });
    markCurrent();
});
