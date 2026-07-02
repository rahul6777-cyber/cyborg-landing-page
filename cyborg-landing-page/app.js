/* ==========================================================================
   CYBERCORE INTERACTION SYSTEM
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. DATA STORES: AUGMENTATION NODES DATA
    // ----------------------------------------------------------------------
    const augmentData = {
        brain: {
            id: "#N-0177",
            title: "NEURAL LINK CORE",
            status: "SYNCHRONIZED // ACTIVE",
            statusClass: "online",
            desc: "Seamlessly bridges the human motor cortex and cognitive layers directly to decentralized digital grids. Grants instant telepathic computing capabilities, synaptic acceleration (+400%), and hardware device control without physical interfaces.",
            integration: 98,
            power: "15W",
            powerVal: 15,
            latency: "< 1ms",
            latencyVal: 2,
            type: "CEREBRAL // LAYER_01",
            material: "CARBON-GOLGI LATTICE"
        },
        eye: {
            id: "#O-8840",
            title: "OCULUS-V VISOR",
            status: "CALIBRATED // ONLINE",
            statusClass: "online",
            desc: "Advanced multispectral ocular implants replacing biological eyes. Features real-time high-speed HUD telemetry, thermal signature tracking, electromagentic spectrum visibility, and dynamic projectile path forecasting.",
            integration: 100,
            power: "42W",
            powerVal: 42,
            latency: "1.2ms",
            latencyVal: 12,
            type: "OCULAR // SENSORY",
            material: "SAPPHIRE-GLASS / GRAPHENE GRAPH"
        },
        heart: {
            id: "#H-9902",
            title: "NANO-CORE PULSAR",
            status: "OPTIMAL // STABLE",
            statusClass: "online",
            desc: "Solid-state quantum battery core replacing biological cardiac muscle. Continuously filters bloodstream of toxins and pathogens, releases medical micro-drones, and generates infinite power reserves (+500 years battery life).",
            integration: 96,
            power: "GENERATING",
            powerVal: 95,
            latency: "0ms",
            latencyVal: 0,
            type: "CARDIOVASCULAR // ENGINE",
            material: "TITANIUM-DIBORIDE SHIELD"
        },
        arm: {
            id: "#A-0442",
            title: "APEX EXO-SKELETOR",
            status: "ENGAGED // ACTIVE",
            statusClass: "online",
            desc: "High-torque carbon fiber limb replacement containing active hydraulic servos. Multiplies physical lifting strength exponentially (up to 4.5 metric tons) and includes integrated tools like sub-dermal plasma cutters.",
            integration: 92,
            power: "120W",
            powerVal: 75,
            latency: "4.8ms",
            latencyVal: 48,
            type: "MUSCULOSKELETAL // LIMB",
            material: "AEROSPACE-GRADE CARBON MATRIX"
        },
        legs: {
            id: "#L-2391",
            title: "THRUSTER GREAVES",
            status: "STANDBY // ARMED",
            statusClass: "online",
            desc: "Sub-knee limb augmentations with integrated kinetic dampening thrusters and compression shock absorbers. Enables high-velocity sprinting, leaps of up to 15 meters, and near-zero impact trauma on falling.",
            integration: 89,
            power: "85W",
            powerVal: 55,
            latency: "9.5ms",
            latencyVal: 80,
            type: "KINETIC // LIMB",
            material: "TITANIUM-NICKEL SHAPE MEMORY"
        }
    };

    // ----------------------------------------------------------------------
    // 2. WEB AUDIO API SYNTHESIZER
    // ----------------------------------------------------------------------
    let audioCtx = null;
    let mainHumOsc1 = null;
    let mainHumOsc2 = null;
    let humGainNode = null;
    let soundEnabled = false;

    const soundToggle = document.getElementById('soundToggle');

    function initAudio() {
        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create ambient drone hum (low frequency)
            mainHumOsc1 = audioCtx.createOscillator();
            mainHumOsc2 = audioCtx.createOscillator();
            humGainNode = audioCtx.createGain();
            const humFilter = audioCtx.createBiquadFilter();

            mainHumOsc1.type = 'sawtooth';
            mainHumOsc1.frequency.setValueAtTime(55, audioCtx.currentTime); // A1 note
            
            mainHumOsc2.type = 'sine';
            mainHumOsc2.frequency.setValueAtTime(55.6, audioCtx.currentTime); // detuned for chorus

            humFilter.type = 'lowpass';
            humFilter.frequency.setValueAtTime(120, audioCtx.currentTime);

            humGainNode.gain.setValueAtTime(0, audioCtx.currentTime); // Start muted

            // Connect nodes
            mainHumOsc1.connect(humFilter);
            mainHumOsc2.connect(humFilter);
            humFilter.connect(humGainNode);
            humGainNode.connect(audioCtx.destination);

            // Start oscillators
            mainHumOsc1.start();
            mainHumOsc2.start();
        } catch (e) {
            console.warn("Web Audio API not supported on this browser", e);
        }
    }

    function toggleAudio() {
        if (!audioCtx) {
            initAudio();
        }

        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const icon = soundToggle.querySelector('i');
        const text = soundToggle.querySelector('.btn-hud-label');

        if (!soundEnabled) {
            // Turn on hum
            soundEnabled = true;
            icon.className = 'fa-solid fa-volume-high';
            text.textContent = 'AUDIO ON';
            if (humGainNode) {
                humGainNode.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 1);
            }
            playBeep(600, 'sine', 0.15, 0.08);
            setTimeout(() => playBeep(900, 'sine', 0.1, 0.05), 80);
        } else {
            // Turn off hum
            soundEnabled = false;
            icon.className = 'fa-solid fa-volume-xmark';
            text.textContent = 'AUDIO OFF';
            if (humGainNode) {
                humGainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
            }
            playBeep(400, 'sine', 0.15, 0.1);
        }
    }

    function playBeep(frequency, type = 'sine', volume = 0.1, duration = 0.08, sweep = false) {
        if (!soundEnabled || !audioCtx) return;

        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
        
        if (sweep) {
            // futuristic sweep sound
            osc.frequency.exponentialRampToValueAtTime(frequency * 0.2, audioCtx.currentTime + duration);
        }

        gain.gain.setValueAtTime(volume, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    }

    soundToggle.addEventListener('click', toggleAudio);

    // Attach hover sound effects to all buttons and interactive cards
    const hoverElements = document.querySelectorAll('.btn, .nav-link, .color-dot, .hotspot, .service-card, .customizer-toggle');
    hoverElements.forEach(elem => {
        elem.addEventListener('mouseenter', () => {
            playBeep(1200, 'sine', 0.03, 0.03);
        });
        elem.addEventListener('click', () => {
            playBeep(880, 'triangle', 0.08, 0.07);
        });
    });

    // ----------------------------------------------------------------------
    // 3. INTERACTIVE LAB HOTSPOT SYSTEM
    // ----------------------------------------------------------------------
    const hotspots = document.querySelectorAll('.hotspot');
    const specId = document.getElementById('spec-id');
    const specTitle = document.getElementById('spec-title');
    const specStatusText = document.getElementById('spec-status');
    const specStatusIndicator = document.querySelector('.status-indicator');
    const specDesc = document.getElementById('spec-desc');
    const fillIntegration = document.getElementById('metric-bar-integration');
    const valIntegration = document.getElementById('metric-val-integration');
    const fillPower = document.getElementById('metric-bar-power');
    const valPower = document.getElementById('metric-val-power');
    const fillLatency = document.getElementById('metric-bar-latency');
    const valLatency = document.getElementById('metric-val-latency');
    const highlightType = document.getElementById('spec-module-type');
    const highlightMaterial = document.getElementById('spec-material');
    const btnSyncNode = document.getElementById('btnSyncNode');

    function selectNode(nodeName) {
        const data = augmentData[nodeName];
        if (!data) return;

        // Set active hotspot visually
        hotspots.forEach(h => {
            if (h.dataset.node === nodeName) {
                h.classList.add('active');
            } else {
                h.classList.remove('active');
            }
        });

        // Update panel text
        specId.textContent = data.id;
        specTitle.textContent = data.title;
        specStatusText.textContent = data.status;
        specDesc.textContent = data.desc;

        // Update progress bars
        fillIntegration.style.width = `${data.integration}%`;
        valIntegration.textContent = `${data.integration}%`;

        fillPower.style.width = `${data.powerVal}%`;
        valPower.textContent = data.power;

        fillLatency.style.width = `${data.latencyVal}%`;
        valLatency.textContent = data.latency;

        highlightType.textContent = data.type;
        highlightMaterial.textContent = data.material;

        // Play digital switch beep sound
        playBeep(980, 'sine', 0.1, 0.12, true);
    }

    hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', () => {
            const node = hotspot.dataset.node;
            selectNode(node);
        });
    });

    btnSyncNode.addEventListener('click', () => {
        const curTitle = specTitle.textContent;
        playBeep(1400, 'sine', 0.15, 0.3, false);
        btnSyncNode.querySelector('span').textContent = 'SYNCHRONIZING...';
        btnSyncNode.disabled = true;

        setTimeout(() => {
            btnSyncNode.querySelector('span').textContent = 'SYNCHRONIZATION COMPLETE';
            playBeep(2000, 'sine', 0.1, 0.08);
            setTimeout(() => playBeep(2500, 'sine', 0.1, 0.08), 80);
            
            setTimeout(() => {
                btnSyncNode.querySelector('span').textContent = 'SYNCHRONIZE ACCELERATOR';
                btnSyncNode.disabled = false;
            }, 2000);
        }, 1500);
    });

    // ----------------------------------------------------------------------
    // 4. FLOATING INTERFACE CUSTOMIZER PANEL
    // ----------------------------------------------------------------------
    const customizer = document.getElementById('themeCustomizer');
    const customizerToggle = document.getElementById('customizerToggle');
    const colorDots = document.querySelectorAll('.color-dot');
    const hudGridToggle = document.getElementById('hudGridToggle');
    const hudGridOverlay = document.querySelector('.hud-grid-overlay');

    customizerToggle.addEventListener('click', () => {
        customizer.classList.toggle('open');
    });

    colorDots.forEach(dot => {
        dot.addEventListener('click', () => {
            // Update active dot
            colorDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');

            // Swap body themes
            const newTheme = dot.dataset.theme;
            document.body.className = '';
            document.body.classList.add(newTheme);

            playBeep(880, 'triangle', 0.08, 0.06);
        });
    });

    hudGridToggle.addEventListener('change', () => {
        if (hudGridToggle.checked) {
            hudGridOverlay.classList.remove('hidden');
        } else {
            hudGridOverlay.classList.add('hidden');
        }
    });

    // Close customizer if clicked outside
    document.addEventListener('click', (e) => {
        if (!customizer.contains(e.target) && customizer.classList.contains('open')) {
            customizer.classList.remove('open');
        }
    });

    // ----------------------------------------------------------------------
    // 5. RESPONSIVE NAVIGATION MOBILE DRAWER
    // ----------------------------------------------------------------------
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        mobileMenuBtn.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            mobileMenuBtn.classList.remove('active');
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Active Section Navigation Tracking (Scroll Spy)
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let currentSec = '';
        const scrollPos = window.scrollY + 100;

        sections.forEach(sec => {
            const secTop = sec.offsetTop;
            const secHeight = sec.clientHeight;
            if (scrollPos >= secTop && scrollPos < secTop + secHeight) {
                currentSec = sec.getAttribute('id');
            }
        });

        if (currentSec) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSec}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // ----------------------------------------------------------------------
    // 6. CYBERNETIC COMMAND SHELL TERMINAL
    // ----------------------------------------------------------------------
    const terminalBody = document.getElementById('terminalBody');
    const terminalInput = document.getElementById('terminalInput');

    function appendTerminalLine(text, className = '') {
        const line = document.createElement('div');
        line.className = `terminal-output-line ${className}`;
        line.innerHTML = text;
        terminalBody.appendChild(line);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = terminalInput.value.trim();
            terminalInput.value = '';

            if (cmd === '') return;

            // Output command prompt entered
            appendTerminalLine(`guest@cybercore:~$ ${cmd}`, 'text-glow');
            playBeep(880, 'sine', 0.05, 0.05);

            // Command Processing Engine
            setTimeout(() => {
                processCommand(cmd.toLowerCase());
            }, 100);
        }
    });

    function processCommand(fullCmd) {
        const args = fullCmd.split(' ');
        const primaryCmd = args[0];

        switch (primaryCmd) {
            case 'help':
                appendTerminalLine('List of valid terminal diagnostics:');
                appendTerminalLine('  <span class="text-success">help</span>              Show this directory list.');
                appendTerminalLine('  <span class="text-success">status</span>            Check main grid status parameters.');
                appendTerminalLine('  <span class="text-success">diagnose</span>          Execute scan diagnostic check.');
                appendTerminalLine('  <span class="text-success">augment [node]</span>     Force installation sync of biological node.');
                appendTerminalLine('                        [Nodes: brain, eye, heart, arm, legs]');
                appendTerminalLine('  <span class="text-success">clear</span>             Flush terminal buffer.');
                break;

            case 'clear':
                terminalBody.innerHTML = '';
                break;

            case 'status':
                appendTerminalLine('--- CYBERCORE DIAGNOSTIC UTILITY ---', 'text-system');
                appendTerminalLine(`SYS.BOOT_TIME: ${new Date().toISOString()}`);
                appendTerminalLine(`ACCENT_MATRIX: ${document.body.className.toUpperCase().replace('-', '_')}`);
                appendTerminalLine('CORE_TEMPERATURE: 36.5°C [STABLE]');
                appendTerminalLine('SYNAPSE_CAPACITY: 489.1 TFLOPS');
                appendTerminalLine('NEURAL_GRID_LATENCY: ' + document.getElementById('ping-value').textContent);
                appendTerminalLine('MAIN_SERVER_SYNC: Synchronized [99.8%]');
                appendTerminalLine('SYSTEM_INTEGRITY: 100% SECURE', 'text-success');
                break;

            case 'diagnose':
                appendTerminalLine('Initializing digital-cellular diagnostics...', 'text-system');
                playBeep(1500, 'triangle', 0.1, 0.5, true);
                
                let percent = 0;
                const diagLine = document.createElement('div');
                diagLine.className = 'terminal-output-line text-system';
                diagLine.textContent = 'Scanning biological synapse channels... [0%]';
                terminalBody.appendChild(diagLine);
                terminalInput.disabled = true;

                const interval = setInterval(() => {
                    percent += 20;
                    diagLine.textContent = `Scanning biological synapse channels... [${percent}%]`;
                    playBeep(1200 + percent * 4, 'sine', 0.05, 0.04);
                    terminalBody.scrollTop = terminalBody.scrollHeight;

                    if (percent >= 100) {
                        clearInterval(interval);
                        appendTerminalLine('Diagnostic finished. Clean scan. Zero cellular anomalies.', 'text-success');
                        terminalInput.disabled = false;
                        terminalInput.focus();
                    }
                }, 300);
                break;

            case 'augment':
                const targetNode = args[1];
                if (!targetNode || !['brain', 'eye', 'heart', 'arm', 'legs'].includes(targetNode)) {
                    appendTerminalLine('Syntax Error: augment [brain | eye | heart | arm | legs]', 'text-error');
                } else {
                    appendTerminalLine(`System request: Load and sync module [${targetNode.toUpperCase()}]`, 'text-system');
                    selectNode(targetNode);
                    appendTerminalLine(`Synchronization of ${targetNode.toUpperCase()} module confirmed. Specs loaded in UI panel.`, 'text-success');
                }
                break;

            default:
                appendTerminalLine(`Command not recognized: '${primaryCmd}'. Type 'help' for instructions.`, 'text-error');
        }
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    // ----------------------------------------------------------------------
    // 7. REAL-TIME HUD TELEMETRY SIMULATION
    // ----------------------------------------------------------------------
    // Latency Ping Updates
    setInterval(() => {
        const pingVal = document.getElementById('ping-value');
        if (pingVal) {
            const randPing = Math.floor(Math.random() * 8) + 8; // 8ms to 15ms
            pingVal.textContent = `${randPing}ms`;
        }
    }, 4000);

    // Sync percentages
    setInterval(() => {
        const syncPct = document.getElementById('sys-sync-pct');
        if (syncPct) {
            const randSync = (99.6 + Math.random() * 0.35).toFixed(3);
            syncPct.textContent = `${randSync}%`;
        }
    }, 5000);

    // System stats temp fluctuate
    setInterval(() => {
        const sysTemp = document.getElementById('sys-temp');
        if (sysTemp) {
            const randTemp = (36.2 + Math.random() * 0.6).toFixed(1);
            sysTemp.textContent = `${randTemp}°C`;
        }
    }, 3000);

    // Dynamic Geolocation telemetry
    const locations = [
        "NEO-TOKYO // CORE_3", "NEW-NEW-YORK // SECTOR_8", 
        "BERLIN-UNDERGROUND // CLOUD_D", "SEOUL // SECTOR_7",
        "CYBERCORE-SPATIAL // NODE_99"
    ];
    const userLoc = document.getElementById('user-loc');
    if (userLoc) {
        userLoc.textContent = locations[Math.floor(Math.random() * locations.length)];
    }

    // ----------------------------------------------------------------------
    // 8. BACKGROUND TECH CANVAS NETWORKS
    // ----------------------------------------------------------------------
    const canvas = document.getElementById('tech-bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const particles = [];
        const maxParticles = 65;

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.radius = Math.random() * 1.5 + 0.5;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                // Get primary theme color from root variable dynamically
                const accentColor = getComputedStyle(document.body).getPropertyValue('--primary').trim();
                ctx.fillStyle = accentColor;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Initialize particles
        for (let i = 0; i < maxParticles; i++) {
            particles.push(new Particle());
        }

        function drawConnections() {
            const accentColor = getComputedStyle(document.body).getPropertyValue('--primary').trim();
            ctx.strokeStyle = accentColor;
            ctx.lineWidth = 0.45;

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.globalAlpha = 1 - (dist / 150); // fade lines out
                        ctx.stroke();
                    }
                }
            }
            ctx.globalAlpha = 1.0;
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            drawConnections();
            requestAnimationFrame(animate);
        }

        // Handle canvas resize
        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        // Start particle loop
        animate();
    }

    // ----------------------------------------------------------------------
    // 9. CTA NEWSLETTER LINK VALIDATIONS
    // ----------------------------------------------------------------------
    const subscribeForm = document.getElementById('subscribeForm');
    const subscriberEmail = document.getElementById('subscriberEmail');
    const formFeedback = document.getElementById('formFeedback');

    if (subscribeForm) {
        subscribeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = subscriberEmail.value.trim();
            if (email === '') return;

            playBeep(1200, 'sine', 0.15, 0.2);
            formFeedback.textContent = "SYNCHRONIZING WITH SECURE SERVER...";
            formFeedback.className = "form-feedback";

            setTimeout(() => {
                formFeedback.textContent = "SYNC LINK SECURED. WELCOME TO THE SYNDICATE.";
                formFeedback.className = "form-feedback success";
                subscriberEmail.value = '';
                playBeep(1600, 'sine', 0.1, 0.1);
                setTimeout(() => playBeep(2100, 'sine', 0.1, 0.08), 60);
                
                // Print entry to terminal console
                appendTerminalLine(`Neural uplink synchronized: ${email}`, 'text-success');
            }, 1500);
        });
    }
});
