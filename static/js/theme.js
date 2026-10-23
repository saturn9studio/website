// Day/Night toggle. Follows the system until the visitor picks one.
document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('.theme-toggle');
    if (!button) return;

    const root = document.documentElement;
    const systemNight = window.matchMedia('(prefers-color-scheme: dark)');

    function current() {
        return root.dataset.theme || (systemNight.matches ? 'night' : 'day');
    }

    function update() {
        const mode = current();
        button.dataset.mode = mode;
        button.setAttribute('aria-label', mode === 'night' ? 'Switch to light mode' : 'Switch to dark mode');
    }

    button.addEventListener('click', function() {
        const next = current() === 'night' ? 'day' : 'night';
        root.dataset.theme = next;
        try {
            localStorage.setItem('s9-theme', next);
        } catch (e) {}
        update();
    });

    systemNight.addEventListener('change', update);
    button.hidden = false;
    update();
});
