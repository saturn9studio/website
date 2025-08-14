// Documentation navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation elements
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    const sections = document.querySelectorAll('h2[id]');
    const navToggle = document.getElementById('docsNavToggle');
    const sidebar = document.getElementById('docsSidebar');
    const overlay = document.getElementById('docsOverlay');
    
    // Mobile navigation toggle
    function toggleMobileNav() {
        const arrowIcon = navToggle ? navToggle.querySelector('.arrow-icon') : null;
        
        navToggle.classList.toggle('active');
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        
        const isNowActive = sidebar.classList.contains('active');
        document.body.style.overflow = isNowActive ? 'hidden' : '';
        
        // Update arrow direction based on new state
        if (arrowIcon) {
            arrowIcon.textContent = isNowActive ? '←' : '→';
        }
    }
    
    // Close mobile navigation
    function closeMobileNav() {
        const arrowIcon = navToggle ? navToggle.querySelector('.arrow-icon') : null;
        
        navToggle.classList.remove('active');
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset arrow to right
        if (arrowIcon) {
            arrowIcon.textContent = '→';
        }
    }
    
    // Function to update active nav link
    function updateActiveNav() {
        let current = '';
        
        // Check which section is currently in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Offset for navbar
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        // Update nav link active states
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    // Event listeners
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileNav);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeMobileNav);
    }
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const targetPosition = targetSection.offsetTop - 80; // Account for navbar
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile nav after clicking a link
                if (window.innerWidth <= 768) {
                    setTimeout(closeMobileNav, 300);
                }
            }
        });
    });
    
    // Close mobile nav on window resize if switching to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileNav();
        }
    });
    
    // Update active navigation on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Initialize active nav on page load
    updateActiveNav();
});