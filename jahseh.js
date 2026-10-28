// Intro Overlay Handler
const introOverlay = document.getElementById('intro-overlay');
const enterBtn = document.getElementById('enter-btn');

if (enterBtn) {
    enterBtn.addEventListener('click', () => {
        introOverlay.classList.add('fade-out');
    });
}

// Theme Toggle Handler
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const iconDark = document.getElementById('theme-icon-dark');
const iconLight = document.getElementById('theme-icon-light');

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        htmlElement.classList.toggle('light');
        if (htmlElement.classList.contains('light')) {
            iconDark.classList.add('hidden');
            iconLight.classList.remove('hidden');
        } else {
            iconDark.classList.remove('hidden');
            iconLight.classList.add('hidden');
        }
    });
}

// Mobile Menu Drawer Handler
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Modal Handlers
const modalBackdrop = document.getElementById('modal-backdrop');

function openModal(modalId) {
    modalBackdrop.classList.remove('hidden');
    document.querySelectorAll('.modal-content').forEach(el => el.classList.add('hidden'));
    document.getElementById('modal-' + modalId).classList.remove('hidden');
}

function closeModal() {
    modalBackdrop.classList.add('hidden');
}

if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) closeModal();
    });
}

// Three.js Intro Blackhole Simulation
const canvasIntro = document.getElementById('blackhole-intro-canvas');
if (canvasIntro && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasIntro, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Accretion Disk Particles
    const particleCount = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        const radius = 3 + Math.random() * 8;
        const theta = Math.random() * Math.PI * 2;
        positions[i] = Math.cos(theta) * radius;
        positions[i + 1] = (Math.random() - 0.5) * 0.4;
        positions[i + 2] = Math.sin(theta) * radius;

        colors[i] = 1;
        colors[i + 1] = 1;
        colors[i + 2] = 1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Center Singularity Sphere
    const sphereGeo = new THREE.SphereGeometry(1.5, 32, 32);
    const sphereMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphere);

    camera.position.z = 12;
    camera.position.y = 4;
    camera.lookAt(0, 0, 0);

    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    window.addEventListener('mousedown', (e) => {
        isDragging = true;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        targetRotationY += deltaX * 0.005;
        targetRotationX += deltaY * 0.005;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => { isDragging = false; });

    function animate() {
        requestAnimationFrame(animate);
        particleSystem.rotation.y += 0.002 + (targetRotationY * 0.1);
        particleSystem.rotation.x += (targetRotationX - particleSystem.rotation.x) * 0.05;
        targetRotationX *= 0.95;
        targetRotationY *= 0.95;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}