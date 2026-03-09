document.addEventListener('DOMContentLoaded', () => {
    // 2. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const spans = menuToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // 4. Enhanced Background Canvas Animation (Professional Plexus Effect)
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const mouse = { x: null, y: null, radius: 150 };

        // Get colors from CSS variables
        const style = getComputedStyle(document.documentElement);
        const neonBlue = style.getPropertyValue('--neon-blue').trim() || '#00d2ff';
        
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });

        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 30) + 1;
                this.vx = (Math.random() - 0.5) * 0.8;
                this.vy = (Math.random() - 0.5) * 0.8;
            }

            draw() {
                ctx.fillStyle = neonBlue;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            update() {
                // Movement
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

                // Mouse interaction (Repulsion)
                if (mouse.x != null && mouse.y != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;
                    let maxDistance = mouse.radius;
                    let force = (maxDistance - distance) / maxDistance;
                    let directionX = forceDirectionX * force * this.density;
                    let directionY = forceDirectionY * force * this.density;

                    if (distance < mouse.radius) {
                        this.x -= directionX;
                        this.y -= directionY;
                    }
                }
            }
        }

        function init() {
            particles = [];
            let numberOfParticles = (canvas.width * canvas.height) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        }

        function connect() {
            let opacityValue = 1;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let dx = particles[a].x - particles[b].x;
                    let dy = particles[a].y - particles[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        opacityValue = 1 - (distance / 150);
                        ctx.strokeStyle = `rgba(0, 210, 255, ${opacityValue * 0.2})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            connect();
            requestAnimationFrame(animate);
        }

        init();
        animate();
    }

    // 5. Active Nav Highlight
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath.endsWith(linkPath)) link.classList.add('active');
    });

    // 6. Intersection Observer for Fade-In
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

    // --- Chatbot Implementation ---
    const initChatbot = () => {
        const chatbotHTML = `
            <div class="chatbot-widget">
                <div class="chat-window" id="chatWindow">
                    <div class="chat-header">
                        <div class="dot"></div>
                        <span>ELITE AI Assistant</span>
                    </div>
                    <div class="chat-messages" id="chatMessages">
                        <div class="message bot">Hi there! 👋 I'm the ELITE HACKERS assistant. How can I help you today?</div>
                    </div>
                    <div class="chat-input-area">
                        <input type="text" id="chatInput" placeholder="Type a message...">
                        <button class="send-btn" id="sendBtn">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </div>
                </div>
                <button class="chat-toggle" id="chatToggle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                </button>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);

        const toggle = document.getElementById('chatToggle');
        const window = document.getElementById('chatWindow');
        const input = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendBtn');
        const messages = document.getElementById('chatMessages');

        const responses = {
            "hello": "Hello! How can I assist you with ELITE HACKERS projects today?",
            "members": "We have an amazing team! You can check them out on our Members page.",
            "projects": "We're working on AI, IoT, and Web projects. Visit the Projects page for details.",
            "contact": "You can reach us through the Contact page or email us at info@elitehackers.tech",
            "default": "That's interesting! Feel free to explore our portfolio to learn more about our work."
        };

        const addMessage = (text, sender) => {
            const msgDiv = document.createElement('div');
            msgDiv.className = `message ${sender}`;
            msgDiv.textContent = text;
            messages.appendChild(msgDiv);
            messages.scrollTop = messages.scrollHeight;
        };

        const handleSend = () => {
            const text = input.value.trim().toLowerCase();
            if (!text) return;

            addMessage(input.value, 'user');
            input.value = '';

            // Simple bot logic
            setTimeout(() => {
                let response = responses.default;
                for (const key in responses) {
                    if (text.includes(key)) {
                        response = responses[key];
                        break;
                    }
                }
                addMessage(response, 'bot');
            }, 600);
        };

        toggle.addEventListener('click', () => {
            window.classList.toggle('active');
        });

        sendBtn.addEventListener('click', handleSend);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });
    };

    // --- Scroll to Top Functionality ---
    const initScrollTop = () => {
        const scrollTopBtn = document.createElement('div');
        scrollTopBtn.className = 'scroll-top';
        scrollTopBtn.innerHTML = `
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
        `;
        document.body.appendChild(scrollTopBtn);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    };

    initScrollTop();
    initChatbot();
});
