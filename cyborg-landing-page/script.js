document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================
  // GLOBALS & CONFIGURATION
  // ==========================
  
  // Augmentations Schema
  const augmentData = {
    neural: {
      title: "Cortex-IX Processor",
      status: "GRADE A // ACTIVE",
      statusClass: "status-stable",
      desc: "Direct cybernetic integration replacing the prefrontal cortex with bio-quantum threads. Accelerates sensory-thought translation speeds and grants internal terminal visualization capability with instant remote data link.",
      specs: { latency: "0.03ms", power: "42W / hr", sync: "99.98%" },
      stats: { cognitive: 95, thermal: 38, risk: 12 }
    },
    ocular: {
      title: "Apex Ocular HUD",
      status: "MILITARY SPEC // READY",
      statusClass: "status-stable",
      desc: "Replaces standard retinas with digital photoreceptors. Grants real-time environmental analytical HUD overlay, multi-spectral vision (thermal, infrared, ultraviolet), and automatic targeting calculations.",
      specs: { latency: "0.01ms", power: "28W / hr", sync: "99.45%" },
      stats: { cognitive: 75, thermal: 45, risk: 8 }
    },
    nano: {
      title: "V3 Nanite Sub-Mesh",
      status: "SYSTEM GUARD // DORMANT",
      statusClass: "status-warning",
      desc: "Injects molecular-scale machines into the sub-dermal layer. Creates an automated self-repair grid that actively welds physical chassis cracks and biological tissue wounds using body heat energy.",
      specs: { latency: "1.20ms", power: "15W / standby", sync: "98.90%" },
      stats: { cognitive: 40, thermal: 22, risk: 24 }
    },
    motor: {
      title: "Hyperion Actuator Arm",
      status: "EXCESS LOAD // STANDBY",
      statusClass: "status-stable",
      desc: "Reinforced titanium-alloy prosthetic replacement. Features high-pressure pneumatic actuator pumps that lift up to 2.5 metric tons, integrated with micro-vibration sensory feedback systems.",
      specs: { latency: "0.05ms", power: "85W / active", sync: "99.78%" },
      stats: { cognitive: 60, thermal: 65, risk: 18 }
    }
  };

  // Customizer Base Values
  const CUSTOMIZER_BASE = {
    reflex: 100,
    defense: 100,
    intel: 100,
    battery: 100
  };

  // ==========================
  // NAVIGATION & MENU
  // ==========================
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Navbar scroll animation
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Simple scroll spy
    let fromTop = window.scrollY + 100;
    navLinks.forEach(link => {
      let section = document.querySelector(link.getAttribute('href'));
      if (
        section.offsetTop <= fromTop &&
        section.offsetTop + section.offsetHeight > fromTop
      ) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
      icon.className = "fa-solid fa-xmark";
    } else {
      icon.className = "fa-solid fa-bars";
    }
  });

  // Close mobile menu on click nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuToggle.querySelector('i').className = "fa-solid fa-bars";
    });
  });

  // ==========================
  // INTERACTIVE SYNC SYSTEM
  // ==========================
  const btnSync = document.getElementById('btn-sync-link');
  const heroBadge = document.getElementById('hero-badge');
  let isLinked = false;

  btnSync.addEventListener('click', () => {
    isLinked = !isLinked;
    if (isLinked) {
      btnSync.classList.add('connected');
      btnSync.innerHTML = `<span class="btn-text"><i class="fa-solid fa-link"></i> Linked Status</span>`;
      heroBadge.innerHTML = `<span class="blink-dot" style="background-color: var(--primary); box-shadow: 0 0 8px var(--primary);"></span> SECURE CONNECTED STATUS: ONLINE`;
      heroBadge.style.borderColor = "var(--primary)";
      heroBadge.style.color = "var(--primary)";
      
      // Print alert connection in Console if it's there
      addTerminalLine(">> Cortical Link Established successfully with local grid.", "success-line");
    } else {
      btnSync.classList.remove('connected');
      btnSync.innerHTML = `<span class="btn-text"><i class="fa-solid fa-link-slash"></i> Sync Neural Link</span>`;
      heroBadge.innerHTML = `<span class="blink-dot" style="background-color: #ff3e3e; box-shadow: 0 0 8px #ff3e3e;"></span> SECURE CONNECTED STATUS: OFFLINE`;
      heroBadge.style.borderColor = "rgba(255, 62, 62, 0.3)";
      heroBadge.style.color = "#ff3e3e";
      
      addTerminalLine("!! Cortical Link Terminated. Biological chassis disconnected.", "error-line");
    }
  });

  // ==========================
  // AUGMENTATIONS SELECTOR
  // ==========================
  const augmentItems = document.querySelectorAll('.augment-item');
  const detailTitle = document.getElementById('detail-title');
  const detailStatus = document.getElementById('detail-status');
  const detailDesc = document.getElementById('detail-desc');
  const specLatency = document.getElementById('spec-latency');
  const specPower = document.getElementById('spec-power');
  const specSync = document.getElementById('spec-sync');
  
  const barCognitive = document.getElementById('bar-cognitive');
  const barThermal = document.getElementById('bar-thermal');
  const barRisk = document.getElementById('bar-risk');
  
  const valCognitive = document.getElementById('val-cognitive');
  const valThermal = document.getElementById('val-thermal');
  const valRisk = document.getElementById('val-risk');

  augmentItems.forEach(item => {
    item.addEventListener('click', () => {
      // Set active class
      augmentItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      
      // Retrieve key data
      const moduleKey = item.getAttribute('data-module');
      const data = augmentData[moduleKey];
      
      if (!data) return;
      
      // Update Texts
      detailTitle.textContent = data.title;
      detailStatus.textContent = data.status;
      detailStatus.className = `detail-status ${data.statusClass}`;
      detailDesc.textContent = data.desc;
      specLatency.textContent = data.specs.latency;
      specPower.textContent = data.specs.power;
      specSync.textContent = data.specs.sync;
      
      // Animate progress bars
      barCognitive.style.width = `${data.stats.cognitive}%`;
      valCognitive.textContent = `${data.stats.cognitive}%`;
      
      barThermal.style.width = `${data.stats.thermal}%`;
      valThermal.textContent = `${data.stats.thermal}%`;
      
      barRisk.style.width = `${data.stats.risk}%`;
      valRisk.textContent = `${data.stats.risk}%`;
    });
  });

  // ==========================
  // CHASSIS CUSTOMIZER
  // ==========================
  const customizerToggles = document.querySelectorAll('.customizer-toggle');
  const reflexVal = document.getElementById('val-reflex');
  const defenseVal = document.getElementById('val-defense');
  const intelVal = document.getElementById('val-intel');
  const batteryVal = document.getElementById('val-battery');
  
  const reflexBar = document.getElementById('bar-reflex');
  const defenseBar = document.getElementById('bar-defense');
  const intelBar = document.getElementById('bar-intel');
  const batteryBar = document.getElementById('bar-battery');
  
  const powerIndexVal = document.getElementById('chassis-power-index');
  const safetyWarning = document.getElementById('customizer-safety-warning');

  function calculateCustomizerStats() {
    let offsetReflex = 0;
    let offsetDefense = 0;
    let offsetIntel = 0;
    let offsetBattery = 0;

    customizerToggles.forEach(toggle => {
      if (toggle.checked) {
        offsetReflex += parseInt(toggle.getAttribute('data-stat-reflex') || 0);
        offsetDefense += parseInt(toggle.getAttribute('data-stat-defense') || 0);
        offsetIntel += parseInt(toggle.getAttribute('data-stat-intel') || 0);
        offsetBattery += parseInt(toggle.getAttribute('data-stat-battery') || 0);
      }
    });

    const finalReflex = CUSTOMIZER_BASE.reflex + offsetReflex;
    const finalDefense = CUSTOMIZER_BASE.defense + offsetDefense;
    const finalIntel = CUSTOMIZER_BASE.intel + offsetIntel;
    const finalBattery = CUSTOMIZER_BASE.battery + offsetBattery;

    // Cap at reasonable scale for bar presentation
    const barReflexPerc = Math.min(Math.max(finalReflex / 2, 0), 100);
    const barDefensePerc = Math.min(Math.max(finalDefense / 2, 0), 100);
    const barIntelPerc = Math.min(Math.max(finalIntel / 2, 0), 100);
    const barBatteryPerc = Math.min(Math.max(finalBattery / 2, 0), 100);

    // Update UI text
    reflexVal.textContent = `${finalReflex}%`;
    defenseVal.textContent = `${finalDefense}%`;
    intelVal.textContent = `${finalIntel}%`;
    batteryVal.textContent = `${finalBattery}%`;

    // Update UI Progress Bar Width
    reflexBar.style.width = `${barReflexPerc}%`;
    defenseBar.style.width = `${barDefensePerc}%`;
    intelBar.style.width = `${barIntelPerc}%`;
    batteryBar.style.width = `${barBatteryPerc}%`;

    // Power Index Calculation
    const powerIndex = Math.round(100 + (offsetReflex + offsetDefense + offsetIntel) / 2);
    powerIndexVal.textContent = `POWER INDEX: ${powerIndex}`;

    // Safety check warnings
    if (finalBattery < 75) {
      safetyWarning.className = "specs-safety-alert status-warning";
      safetyWarning.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> WARNING: HEAVY MOD DRAIN. ENERGY LEVELS INSTABLE.`;
    } else {
      safetyWarning.className = "specs-safety-alert status-stable";
      safetyWarning.innerHTML = `<i class="fa-solid fa-circle-check"></i> SYSTEM INTEGRATION STATUS: SECURE & STABLE`;
    }
  }

  // Bind change listeners to toggles
  customizerToggles.forEach(toggle => {
    toggle.addEventListener('change', calculateCustomizerStats);
  });

  // Run initial calculations
  calculateCustomizerStats();

  // ==========================
  // NEURAL SCANNER CONSOLE
  // ==========================
  const btnStartScan = document.getElementById('btn-start-scan');
  const btnClearConsole = document.getElementById('btn-clear-console');
  const terminalBody = document.getElementById('terminal-body');
  const gaugePercent = document.getElementById('gauge-percent');
  const gaugeBarFill = document.getElementById('gauge-bar-fill');
  const consoleStatus = document.querySelector('.console-terminal .terminal-status');
  const pulseIndicator = document.querySelector('.console-terminal .pulse-indicator');
  
  const scanSequence = [
    { progress: 10, line: ">> Syncing synaptic interface. Initializing cellular network handshake...", class: "comment-line" },
    { progress: 25, line: ">> Connection active. Injecting cybernetic validation packets...", class: "cmd-line" },
    { progress: 38, line: ">> Scanning prefrontal cortex. Node array alignment: 99.12% accurate.", class: "comment-line" },
    { progress: 50, line: ">> WARNING: Bio-signal noise detected. Overcoming noise with dynamic filters...", class: "error-line" },
    { progress: 65, line: ">> Noise filtered. Measured synapse latency is: 0.08ms (optimal status).", class: "success-line" },
    { progress: 80, line: ">> Checking V3 Nanite sub-mesh status. Flow level: 92.4cc/min. Stable.", class: "comment-line" },
    { progress: 92, line: ">> Shield insulator status check. Graphene cage: OPERATIONAL.", class: "comment-line" },
    { progress: 100, line: ">> SCAN COMPLETE. All cybernetics sync rates verified. Sync status: OPTIMAL.", class: "success-line" }
  ];

  let scanInterval = null;

  function addTerminalLine(text, className = "") {
    const line = document.createElement('div');
    line.className = `term-line ${className}`;
    line.textContent = text;
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  btnStartScan.addEventListener('click', () => {
    // Prevent double scan
    btnStartScan.disabled = true;
    btnClearConsole.disabled = true;
    btnStartScan.querySelector('.btn-text').textContent = "SCANNING NODE...";
    
    // Clear terminal and output header
    terminalBody.innerHTML = '';
    addTerminalLine(">> Initializing Neuralis Scanning Suite v48.1...", "cmd-line");
    addTerminalLine("--------------------------------------------------", "comment-line");
    
    // Update terminal status header
    consoleStatus.innerHTML = `<span class="pulse-indicator active"></span> SCANNING`;
    
    let currentIndex = 0;
    
    // SVG circular bar perimeter is 314.16 (radius 50)
    const perimeter = 314.16;

    scanInterval = setInterval(() => {
      if (currentIndex < scanSequence.length) {
        const step = scanSequence[currentIndex];
        
        // Output text
        addTerminalLine(step.line, step.class);
        
        // Update circular gauge
        gaugePercent.textContent = `${step.progress}%`;
        const offset = perimeter - (perimeter * step.progress / 100);
        gaugeBarFill.style.strokeDashoffset = offset;
        
        currentIndex++;
      } else {
        clearInterval(scanInterval);
        
        // Restore buttons
        btnStartScan.disabled = false;
        btnClearConsole.disabled = false;
        btnStartScan.querySelector('.btn-text').innerHTML = `<i class="fa-solid fa-dna"></i> RUN NEURAL SCAN`;
        
        // Update header status
        consoleStatus.innerHTML = `<span class="pulse-indicator active" style="background-color:#27c93f; box-shadow: 0 0 6px #27c93f;"></span> ONLINE`;
        
        addTerminalLine(">> Diagnostic process closed. Secure grid line remains open.", "cmd-line");
      }
    }, 900);
  });

  btnClearConsole.addEventListener('click', () => {
    terminalBody.innerHTML = '';
    addTerminalLine(">> Buffer memory cleared. Waiting for run trigger...", "comment-line");
    gaugePercent.textContent = "0%";
    gaugeBarFill.style.strokeDashoffset = 314.16;
    consoleStatus.innerHTML = `<span class="pulse-indicator"></span> STANDBY`;
  });

  // ==========================
  // FAQ ACCORDIONS
  // ==========================
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const currentItem = question.parentElement;
      const isActive = currentItem.classList.contains('active');
      
      // Close all accordion items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });
      
      // Toggle current item
      if (!isActive) {
        currentItem.classList.add('active');
      }
    });
  });

});
