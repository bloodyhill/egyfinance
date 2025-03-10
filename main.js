document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to current tab and content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Questionnaire functionality
    const dropdownChoice = document.getElementById('choice1');
    if (dropdownChoice) {
        dropdownChoice.addEventListener('change', function() {
            // Hide all questions except the first one
            const questions = document.querySelectorAll('.question');
            questions.forEach(q => {
                if (q.id !== 'q1') {
                    q.style.display = 'none';
                }
            });
            
            // Hide answer
            document.querySelector('.answer').style.display = 'none';
            
            // Show selected question
            const selectedValue = this.value;
            if (selectedValue && document.getElementById(selectedValue)) {
                document.getElementById(selectedValue).style.display = 'block';
            }
        });
    }
    
    // Choice buttons functionality
    const choiceButtons = document.querySelectorAll('.choice');
    choiceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            const answer = this.getAttribute('data-answer');
            
            if (target) {
                // Hide all questions
                const questions = document.querySelectorAll('.question');
                questions.forEach(q => q.style.display = 'none');
                
                // Show target question
                document.getElementById(target).style.display = 'block';
            } else if (answer) {
                // Hide all questions
                const questions = document.querySelectorAll('.question');
                questions.forEach(q => q.style.display = 'none');
                
                // Show answer
                document.getElementById('answer-text').textContent = answer;
                document.querySelector('.answer').style.display = 'block';
            }
        });
    });
    
    // Start over button
    const startOverButton = document.getElementById('start-over');
    if (startOverButton) {
        startOverButton.addEventListener('click', function() {
            // Hide all questions except the first one
            const questions = document.querySelectorAll('.question');
            questions.forEach(q => {
                q.style.display = q.id === 'q1' ? 'block' : 'none';
            });
            
            // Reset dropdown
            if (dropdownChoice) {
                dropdownChoice.value = '';
            }
            
            // Hide answer
            document.querySelector('.answer').style.display = 'none';
        });
    }
    
    // Add responsive menu toggle for mobile
    const createMobileMenu = function() {
        const header = document.querySelector('header');
        const tabs = document.querySelector('.tabs');
        
        // Create mobile menu button if it doesn't exist
        if (!document.querySelector('.mobile-menu-toggle')) {
            const menuToggle = document.createElement('div');
            menuToggle.className = 'mobile-menu-toggle';
            menuToggle.innerHTML = '☰';
            menuToggle.style.display = 'none';
            menuToggle.style.position = 'absolute';
            menuToggle.style.top = '20px';
            menuToggle.style.left = '20px';
            menuToggle.style.fontSize = '24px';
            menuToggle.style.cursor = 'pointer';
            menuToggle.style.zIndex = '100';
            
            menuToggle.addEventListener('click', function() {
                tabs.classList.toggle('tabs-mobile-visible');
            });
            
            header.style.position = 'relative';
            header.appendChild(menuToggle);
            
            // Add styles for mobile tabs
            const style = document.createElement('style');
            style.textContent = `
                @media (max-width: 768px) {
                    .mobile-menu-toggle {
                        display: block !important;
                    }
                    .tabs {
                        display: none;
                        flex-direction: column;
                        width: 100%;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        background-color: var(--primary-color);
                        z-index: 99;
                        padding: 10px 0;
                    }
                    .tabs.tabs-mobile-visible {
                        display: flex !important;
                    }
                    .tab {
                        margin: 5px 20px;
                        text-align: center;
                    }
                    .comparison-table {
                        font-size: 14px;
                    }
                    .comparison-table th, .comparison-table td {
                        padding: 0.5rem;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    };
    
    // Check screen size and add mobile menu if needed
    const checkResponsiveness = function() {
        if (window.innerWidth <= 768) {
            createMobileMenu();
        }
    };
    
    // Initial check
    checkResponsiveness();
    
    // Listen for window resize
    window.addEventListener('resize', checkResponsiveness);
    
    // Add smooth scrolling for better user experience
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            if (targetId) {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add lazy loading for better performance
    const lazyLoadElements = document.querySelectorAll('.card, .section');
    
    if ('IntersectionObserver' in window) {
        const lazyLoadObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    lazyLoadObserver.unobserve(entry.target);
                }
            });
        });
        
        lazyLoadElements.forEach(element => {
            lazyLoadObserver.observe(element);
        });
        
        // Add fade-in animation style
        const animationStyle = document.createElement('style');
        animationStyle.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .fade-in {
                animation: fadeIn 0.6s ease-out forwards;
            }
            .card, .section {
                opacity: 0;
            }
        `;
        document.head.appendChild(animationStyle);
    }
});
