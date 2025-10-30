/*
  main.js
  This file handles all website interactivity:
  1. Mobile Menu Toggle
  2. Header Scroll Effect
  3. Scroll-Fade-In Animations
  4. Three.js Hero 3D Animation (Desktop Only)
*/

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mobile Menu Toggle ---
    try {
        const menuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuIcon = menuButton.querySelector('svg');

        menuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('-translate-x-full');
            
            // Change icon to 'X' or 'Hamburger'
            if (mobileMenu.classList.contains('-translate-x-full')) {
                menuIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>`;
            } else {
                menuIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>`;
            }
        });
    } catch (e) {
        console.error("Mobile menu script failed:", e);
    }

    // --- 2. Header Scroll Effect (Placeholder) ---
    // The glassmorphism is handled by CSS, but you can add more effects here.
    try {
        const header = document.getElementById('main-header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                // e.g., header.classList.add('scrolled-down');
            } else {
                // e.g., header.classList.remove('scrolled-down');
            }
        }, { passive: true }); // Improves scroll performance
    } catch (e) {
        console.error("Header scroll script failed:", e);
    }

    // --- 3. Scroll-Fade-In Animations ---
    try {
        // Check if IntersectionObserver is supported
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('scroll-fade-in-visible');
                        obs.unobserve(entry.target); // Animate only once
                    }
                });
            }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

            document.querySelectorAll('.scroll-fade-in').forEach(el => {
                observer.observe(el);
            });
        } else {
            // Fallback for older browsers: just show all elements
            document.querySelectorAll('.scroll-fade-in').forEach(el => {
                el.classList.add('scroll-fade-in-visible');
            });
        }
    } catch (e) {
        console.error("IntersectionObserver script failed:", e);
    }

    // --- 4. Three.js Hero 3D Animation (Desktop Only) ---
    const canvas = document.getElementById('hero-canvas');
    // CRITICAL: Check for canvas AND screen width to disable on mobile
    if (canvas && window.innerWidth > 768) {
        let scene, camera, renderer, model, mouse;

        function init() {
            try {
                scene = new THREE.Scene();
                mouse = new THREE.Vector2(0, 0);

                // Camera
                camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                camera.position.z = 5;

                // Renderer
                renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
                renderer.setSize(window.innerWidth, window.innerHeight);
                renderer.setClearColor(0x000000, 0);

                // Lighting
                const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
                scene.add(ambientLight);
                const pointLight = new THREE.PointLight(0xffffff, 0.8);
                pointLight.position.set(5, 5, 5);
                scene.add(pointLight);

                // Create the Wireframe Model
                model = new THREE.Group();
                const geometry = new THREE.TorusKnotGeometry(1.8, 0.5, 128, 16);
                
                // Blue Wireframe
                const material1 = new THREE.MeshBasicMaterial({ 
                    color: 0x3B82F6, // accent-blue
                    wireframe: true 
                });
                const mesh1 = new THREE.Mesh(geometry, material1);
                
                // Orange Wireframe (slightly larger for effect)
                const material2 = new THREE.MeshBasicMaterial({ 
                    color: 0xF97316, // accent-orange
                    wireframe: true,
                    transparent: true,
                    opacity: 0.8
                });
                const mesh2 = new THREE.Mesh(geometry, material2);
                mesh2.scale.set(1.01, 1.01, 1.01);
                
                model.add(mesh1);
                model.add(mesh2);
                scene.add(model);

                // Event Listeners
                window.addEventListener('resize', onWindowResize, { passive: true });
                document.addEventListener('mousemove', onMouseMove, { passive: true });

                animate();

            } catch(e) {
                console.error("Three.js initialization failed:", e);
                if (canvas) canvas.style.display = 'none'; // Hide canvas if 3D fails
            }
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function onMouseMove(event) {
            // Normalize mouse position (-1 to +1)
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        }

        function animate() {
            requestAnimationFrame(animate);

            // Mouse Interaction:
            // Lerp rotation to smoothly follow the mouse
            if (model) {
                // Base rotation
                model.rotation.x += 0.0005;
                model.rotation.y += 0.001;

                // Mouse follow
                model.rotation.y += (mouse.x * 0.5 - model.rotation.y) * 0.05;
                model.rotation.x += (-mouse.y * 0.5 - model.rotation.x) * 0.05;
            }
            
            if (renderer && scene && camera) {
                renderer.render(scene, camera);
            }
        }

        init(); // Start the 3D animation

    } else if (canvas) {
        // This is a mobile device or small screen, hide the canvas.
        canvas.style.display = 'none';
        // The CSS hero gradient will show instead.
    }
});
