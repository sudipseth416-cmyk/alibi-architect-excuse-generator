/* ===================================================================
   ALIBI ARCHITECT — Application Controller (v3.0 — Ultra Enhanced)
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ——— State ———
  const state = {
    authority: 'neutral',
    urgency: 'medium',
    tone: 'emotional',
    chaos: 35,
  };

  let showBios = false;
  let isGenerating = false;
  let sessionCount = 0;

  // ——— DOM Elements ———
  const form = document.getElementById('excuse-form');
  const scenarioInput = document.getElementById('scenario');
  const chaosSlider = document.getElementById('chaos-slider');
  const chaosValue = document.getElementById('chaos-value');
  const btnGenerate = document.getElementById('btn-generate');
  const btnCopy = document.getElementById('btn-copy');
  const btnRegen = document.getElementById('btn-regen');

  // BIOS Overlay elements
  const biosOverlay = document.getElementById('bios-overlay');
  const biosLines = document.getElementById('bios-lines');
  const biosProgressBar = document.getElementById('bios-progress-bar');
  const biosCpu = document.getElementById('bios-cpu');
  const biosClock = document.getElementById('bios-clock');
  const biosStatusLabel = document.getElementById('bios-status-label');

  const outputEmpty = document.getElementById('output-empty');
  const outputLoading = document.getElementById('output-loading');
  const outputResult = document.getElementById('output-result');
  const loadingText = document.getElementById('loading-text');

  const excuseText = document.getElementById('excuse-text');
  const excuseCard = document.getElementById('excuse-card');
  const resultTimestamp = document.getElementById('result-timestamp');
  const metricBelValue = document.getElementById('metric-bel-value');
  const metricRiskBadge = document.getElementById('metric-risk-badge');
  const metricDetBadge = document.getElementById('metric-det-badge');
  const resultTags = document.getElementById('result-tags');

  // Enhanced elements
  const smartWarning = document.getElementById('smart-warning');
  const smartWarningText = document.getElementById('smart-warning-text');
  const whyText = document.getElementById('why-text');
  const whyFactors = document.getElementById('why-factors');
  const resultWarning = document.getElementById('result-warning');
  const resultWarningText = document.getElementById('result-warning-text');
  const thinkingSteps = document.querySelectorAll('.thinking-step');
  const logoTitle = document.getElementById('logo-title');
  const sessionCountEl = document.getElementById('session-count');
  const chaosIndicator = document.getElementById('chaos-indicator');
  const chaosThreatLabel = document.getElementById('chaos-threat-label');
  const toastContainer = document.getElementById('toast-container');

  // ===================================================================
  // PARTICLE BACKGROUND SYSTEM
  // ===================================================================
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 50;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.hue = Math.random() > 0.5 ? 239 : 270; // indigo or purple
        this.pulseSpeed = Math.random() * 0.02 + 0.005;
        this.pulseOffset = Math.random() * Math.PI * 2;
      }

      update(time) {
        this.x += this.speedX;
        this.y += this.speedY;
        this.currentOpacity = this.opacity * (0.5 + 0.5 * Math.sin(time * this.pulseSpeed + this.pulseOffset));

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 70%, 65%, ${this.currentOpacity})`;
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
      }
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.08;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    let animTime = 0;
    function animateParticles() {
      animTime++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update(animTime);
        p.draw();
      });

      drawConnections();
      requestAnimationFrame(animateParticles);
    }

    resizeCanvas();
    initParticles();
    animateParticles();
    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });
  }

  // ===================================================================
  // ANIMATED PANEL BORDER ROTATION
  // ===================================================================
  let panelAngle = 0;
  function animatePanelBorders() {
    panelAngle = (panelAngle + 0.5) % 360;
    document.querySelectorAll('.panel').forEach(panel => {
      panel.style.setProperty('--panel-angle', panelAngle + 'deg');
    });
    requestAnimationFrame(animatePanelBorders);
  }
  animatePanelBorders();

  // ===================================================================
  // PERIODIC LOGO GLITCH
  // ===================================================================
  function glitchLogo() {
    if (logoTitle) {
      logoTitle.classList.add('glitch');
      setTimeout(() => logoTitle.classList.remove('glitch'), 300);
    }
  }
  // Random glitch every 8–15 seconds
  function scheduleGlitch() {
    const delay = 8000 + Math.random() * 7000;
    setTimeout(() => {
      glitchLogo();
      scheduleGlitch();
    }, delay);
  }
  scheduleGlitch();

  // ===================================================================
  // TOAST NOTIFICATION SYSTEM
  // ===================================================================
  function showToast(message, icon = '✓') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-out');
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // ===================================================================
  // SCREEN FLASH EFFECT
  // ===================================================================
  function flashScreen() {
    const flash = document.createElement('div');
    flash.className = 'screen-flash';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 500);
  }

  // ——— Button Group Handlers ———
  function setupButtonGroup(groupId, stateKey) {
    const group = document.getElementById(groupId);
    if (!group) return;
    const buttons = group.querySelectorAll('.btn-option');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state[stateKey] = btn.dataset.value;

        // Ripple effect
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => btn.style.transform = '', 150);

        // Update smart warning whenever inputs change
        updateSmartWarning();
      });
    });
  }

  setupButtonGroup('authority-group', 'authority');
  setupButtonGroup('urgency-group', 'urgency');
  setupButtonGroup('tone-group', 'tone');

  // ——— Smart Warning System ———
  function updateSmartWarning() {
    const warnings = [];

    if (state.chaos > 60 && state.authority === 'strict') {
      warnings.push('⚠️ High chaos + strict authority = elevated detection risk.');
    }
    if (state.tone === 'absurd' && state.authority === 'strict') {
      warnings.push('⚠️ Absurd tone with strict authority is extremely risky.');
    }
    if (state.chaos > 80 && state.urgency === 'critical') {
      warnings.push('⚠️ Maximum chaos at critical urgency — plausibility near zero.');
    }
    if (state.chaos > 90) {
      warnings.push('⚠️ Chaos level critical — narrative integrity compromised.');
    }

    if (warnings.length > 0) {
      smartWarningText.textContent = warnings[0];
      smartWarning.classList.remove('hidden');
      // Re-trigger animation
      smartWarning.style.animation = 'none';
      requestAnimationFrame(() => {
        smartWarning.style.animation = '';
      });
    } else {
      smartWarning.classList.add('hidden');
    }
  }

  // ——— Chaos Slider (Enhanced with Dynamic Track Color + Threat Indicator) ———
  chaosSlider.addEventListener('input', () => {
    state.chaos = parseInt(chaosSlider.value, 10);
    chaosValue.textContent = state.chaos;

    // Dynamic color for the value label
    const hue = 250 - (state.chaos * 1.8); // indigo → red
    chaosValue.style.background = `linear-gradient(135deg, hsl(${hue}, 80%, 65%), hsl(${hue - 30}, 80%, 55%))`;
    chaosValue.style.webkitBackgroundClip = 'text';
    chaosValue.style.webkitTextFillColor = 'transparent';

    // Dynamic slider track gradient (green → orange → red based on value)
    const pct = state.chaos;
    let trackGradient;
    if (pct <= 33) {
      trackGradient = `linear-gradient(90deg, #10b981 0%, #06b6d4 ${pct}%, rgba(99,102,241,0.15) ${pct}%)`;
    } else if (pct <= 66) {
      trackGradient = `linear-gradient(90deg, #10b981 0%, #f59e0b ${pct}%, rgba(99,102,241,0.15) ${pct}%)`;
    } else {
      trackGradient = `linear-gradient(90deg, #10b981 0%, #f59e0b 40%, #ef4444 ${pct}%, rgba(99,102,241,0.15) ${pct}%)`;
    }
    chaosSlider.style.background = trackGradient;

    // Dynamic thumb color
    const thumbHue = 160 - (pct * 1.6); // green → red
    const thumbColor = `hsl(${Math.max(0, thumbHue)}, 70%, 55%)`;
    chaosSlider.style.setProperty('--thumb-color', thumbColor);

    // Glow pulse at high chaos
    const sliderContainer = chaosSlider.parentElement;
    if (pct > 75) {
      sliderContainer.classList.add('chaos-high');
    } else {
      sliderContainer.classList.remove('chaos-high');
    }

    // Update chaos threat indicator
    if (chaosIndicator) {
      chaosIndicator.style.setProperty('--chaos-pct', pct + '%');
      chaosIndicator.classList.remove('level-low', 'level-mid', 'level-high');
      if (pct <= 33) {
        chaosIndicator.classList.add('level-low');
        chaosThreatLabel.textContent = 'THREAT: MINIMAL';
      } else if (pct <= 66) {
        chaosIndicator.classList.add('level-mid');
        chaosThreatLabel.textContent = 'THREAT: MODERATE';
      } else {
        chaosIndicator.classList.add('level-high');
        chaosThreatLabel.textContent = 'THREAT: CRITICAL';
      }
    }

    // Update smart warning
    updateSmartWarning();
  });

  // ——— Loading Messages (Context-Aware) ———
  function getLoadingMessages() {
    const base = [
      `Analyzing ${state.authority} authority profile...`,
      `Calibrating ${state.tone} tone matrix...`,
      `Injecting chaos level ${state.chaos} entropy...`,
      'Cross-referencing alibi database...',
      `Computing ${state.urgency}-urgency risk vectors...`,
      'Optimizing emotional resonance...',
      'Evaluating detection probability...',
      'Constructing narrative payload...',
      'Verifying narrative coherence...',
      'Deploying counter-detection protocols...',
      'Running plausibility simulation...',
    ];

    // Add context-specific messages
    if (state.chaos > 70) {
      base.push('WARNING: Chaos threshold exceeded...');
      base.push('Engaging reality distortion field...');
    }
    if (state.authority === 'strict') {
      base.push('Hardening narrative for strict scrutiny...');
    }
    if (state.tone === 'absurd') {
      base.push('Disabling reality constraints...');
      base.push('Uploading creative insanity module...');
    }

    return base;
  }

  function animateLoading() {
    const messages = getLoadingMessages();
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % messages.length;
      loadingText.textContent = messages[idx];
    }, 350);
    return interval;
  }

  // ——— Thinking Phase Steps Animation ———
  function animateThinkingSteps() {
    thinkingSteps.forEach(step => {
      step.classList.remove('active', 'done');
    });

    thinkingSteps.forEach((step, i) => {
      setTimeout(() => {
        step.classList.add('active');
      }, i * 400);

      setTimeout(() => {
        step.classList.remove('active');
        step.classList.add('done');
      }, (i + 1) * 400);
    });
  }

  // ——— Scramble Text Effect (Enhanced Decrypt Reveal) ———
  const GLITCH_CHARS = '█▓▒░╳╱╲◆◇○●□■△▽⊕⊗∆∇§¶†‡⌂⌐¬¡¿αβγδεζηθ';

  function scrambleReveal(element, finalText, duration = 1000) {
    const length = finalText.length;
    const totalFrames = Math.ceil(duration / 30);
    let frame = 0;

    // Add scramble visual class
    element.classList.add('scrambling');
    excuseCard.classList.add('scrambling');

    element.textContent = '';

    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      let displayed = '';
      for (let i = 0; i < length; i++) {
        const charProgress = (progress - (i / length) * 0.5);
        if (charProgress > 0.5) {
          displayed += finalText[i];
        } else if (charProgress > 0) {
          displayed += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        } else {
          displayed += ' ';
        }
      }

      element.textContent = displayed;

      if (frame >= totalFrames) {
        clearInterval(interval);
        element.textContent = finalText;
        element.classList.remove('scrambling');
        excuseCard.classList.remove('scrambling');
      }
    }, 30);
  }

  // ——— Animate Metric Ring ———
  function animateRing(value) {
    const ring = document.querySelector('.metric-ring-fill');
    if (!ring) return;
    const circumference = 213.6;
    const offset = circumference - (value / 100) * circumference;

    ring.style.transition = 'none';
    ring.style.strokeDashoffset = circumference;

    // Dynamic color based on value
    if (value >= 70) {
      ring.style.stroke = '#10b981'; // green
    } else if (value >= 40) {
      ring.style.stroke = '#f59e0b'; // orange
    } else {
      ring.style.stroke = '#ef4444'; // red
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ring.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
        ring.style.strokeDashoffset = offset;
      });
    });
  }

  // ——— Animate Metric Value Counter ———
  function animateCounter(element, target, suffix = '%') {
    let current = 0;
    const duration = 1200;
    const startTime = performance.now();

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      current = Math.round(easedProgress * target);
      element.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = target + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  // ——— Animate Badge Pop-In ———
  function animateBadge(badge, text, className) {
    badge.textContent = text;
    badge.className = 'metric-badge ' + className + ' animate-in';

    // Re-trigger animation
    badge.style.animation = 'none';
    requestAnimationFrame(() => {
      badge.style.animation = '';
      badge.classList.add('animate-in');
    });
  }

  // ——— Render "Why This Works" ———
  function renderReasoning(reasoning) {
    if (!reasoning) return;

    const html = reasoning.explanation
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    whyText.innerHTML = html;

    whyFactors.innerHTML = '';
    reasoning.factors.forEach((factor, i) => {
      const pill = document.createElement('span');
      pill.className = `why-factor why-factor--${factor.type}`;
      pill.textContent = factor.label;
      pill.style.animationDelay = `${0.4 + i * 0.08}s`;
      pill.style.opacity = '0';
      pill.style.animation = `tagIn 0.3s var(--ease-out) ${0.4 + i * 0.08}s forwards`;
      whyFactors.appendChild(pill);
    });
  }

  // ——— Show Result ———
  function showResult(result) {
    // Hide loading, show result
    outputLoading.classList.add('hidden');
    outputResult.classList.remove('hidden');

    // Screen flash transition
    flashScreen();

    // Force re-animation
    outputResult.style.animation = 'none';
    requestAnimationFrame(() => {
      outputResult.style.animation = '';
    });

    // Scramble-reveal the excuse
    scrambleReveal(excuseText, result.excuse, 1000);

    // Timestamp
    const now = new Date();
    resultTimestamp.textContent = `Generated at ${now.toLocaleTimeString()} — ${now.toLocaleDateString()}`;

    // Animate believability ring (with delay for dramatic effect)
    setTimeout(() => {
      animateRing(result.metrics.believability);
      animateCounter(metricBelValue, result.metrics.believability);
    }, 200);

    // Risk badge with pop-in animation
    setTimeout(() => {
      animateBadge(metricRiskBadge, result.metrics.risk, result.metrics.risk.toLowerCase());
    }, 400);

    // Detection badge with pop-in animation
    setTimeout(() => {
      animateBadge(metricDetBadge, result.metrics.detection, result.metrics.detection.toLowerCase());
    }, 600);

    // Tags
    resultTags.innerHTML = '';
    result.tags.forEach((tag, i) => {
      const el = document.createElement('span');
      el.className = 'tag';
      el.textContent = tag;
      el.style.animationDelay = `${0.3 + i * 80}ms`;
      resultTags.appendChild(el);
    });

    // Render "Why This Works"
    renderReasoning(result.reasoning);

    // Render result warnings
    if (result.warnings && result.warnings.length > 0) {
      resultWarningText.textContent = result.warnings[0];
      resultWarning.classList.remove('hidden');
    } else {
      resultWarning.classList.add('hidden');
    }

    // Update session counter
    sessionCount++;
    if (sessionCountEl) {
      sessionCountEl.textContent = sessionCount;
      // Quick pulse animation on the counter
      sessionCountEl.style.transform = 'scale(1.4)';
      sessionCountEl.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
      setTimeout(() => {
        sessionCountEl.style.transform = 'scale(1)';
      }, 300);
    }

    // Glitch the logo on result
    glitchLogo();

    isGenerating = false;
    btnGenerate.classList.remove('generating');
  }

  // ——— Generate ———
  function runGeneration() {
    const scenario = scenarioInput.value.trim();
    if (!scenario) {
      scenarioInput.focus();
      scenarioInput.style.borderColor = '#ef4444';
      setTimeout(() => scenarioInput.style.borderColor = '', 1500);
      return;
    }

    isGenerating = true;
    btnGenerate.classList.add('generating');

    // Show loading
    outputEmpty.classList.add('hidden');
    outputResult.classList.add('hidden');
    outputLoading.classList.remove('hidden');

    const loadingInterval = animateLoading();
    animateThinkingSteps();

    // AI "thinking" delay (2–3 seconds)
    const delay = 2000 + Math.random() * 1000;

    setTimeout(() => {
      clearInterval(loadingInterval);

      const result = AlibiEngine.generate({
        scenario,
        authority: state.authority,
        urgency: state.urgency,
        tone: state.tone,
        chaos: state.chaos,
      });

      showResult(result);
    }, delay);
  }

  // ===================================================================
  // BIOS PANIC OVERLAY — Controller (Context-Aware)
  // ===================================================================

  function getBiosLogSequences() {
    // Context-aware BIOS logs based on current parameters
    const logs = [
      { text: '[SYS] Booting Alibi Engine v4.7.2...', type: 'log' },
      { text: '[OK]  Kernel modules loaded', type: 'success' },
      { text: '[SYS] Mounting encrypted narrative filesystem...', type: 'log' },
      { text: '[OK]  /dev/alibi0 mounted (rw,noatime)', type: 'success' },
      { text: '[NET] Establishing secure tunnel to alibi-core...', type: 'info' },
      { text: '[OK]  TLS 1.3 handshake complete — 256-bit AES', type: 'success' },
      { text: `[CPU] Analyzing ${state.authority.toUpperCase()} authority profile vector...`, type: 'info' },
      { text: `[MEM] Loading ${state.tone.toUpperCase()} tone calibration matrices...`, type: 'log' },
      { text: `[GPU] Initializing chaos entropy generator (level: ${state.chaos})...`, type: 'accent' },
    ];

    // Add chaos-specific lines
    if (state.chaos > 70) {
      logs.push({ text: '[!!!] WARNING: CHAOS LEVEL EXCEEDS SAFE THRESHOLD', type: 'error' });
      logs.push({ text: '[SYS] Engaging reality distortion protocols...', type: 'warning' });
    }

    if (state.authority === 'strict') {
      logs.push({ text: '[SEC] Hardening narrative against strict scrutiny...', type: 'warning' });
    }

    if (state.tone === 'absurd') {
      logs.push({ text: '[GPU] Loading absurdist narrative module...', type: 'accent' });
      logs.push({ text: '[!!!] REALITY CONSTRAINTS DISABLED', type: 'error' });
    }

    logs.push(
      { text: '[SYS] Injecting narrative matrix into pipeline...', type: 'accent' },
      { text: '[SEC] Scanning for trace signatures...', type: 'warning' },
      { text: '[!!!] WARNING: PASSIVE TRACE DETECTED — EVADING', type: 'error' },
      { text: '[SEC] Deploying counter-surveillance protocol...', type: 'warning' },
      { text: '[OK]  Trace neutralized — stealth mode active', type: 'success' },
      { text: `[SYS] Compiling alibi payload (urgency: ${state.urgency.toUpperCase()})...`, type: 'accent' },
      { text: '[OK]  Narrative coherence: VERIFIED', type: 'success' },
      { text: '[SYS] Alibi ready for deployment ✓', type: 'bright' },
    );

    return logs;
  }

  function launchBios(callback) {
    if (showBios) return;
    showBios = true;

    const biosLogSequences = getBiosLogSequences();

    // Reset overlay
    biosLines.innerHTML = '';
    biosProgressBar.style.width = '0%';
    biosCpu.textContent = '0';
    biosStatusLabel.textContent = '● INITIALIZING';
    biosStatusLabel.classList.remove('ready');
    biosOverlay.classList.remove('bios-fadeout', 'hidden');
    biosOverlay.setAttribute('aria-hidden', 'false');

    // Live clock
    const clockInterval = setInterval(() => {
      const now = new Date();
      biosClock.textContent = now.toLocaleTimeString('en-US', { hour12: false });
    }, 200);

    // Animate log lines one by one
    const totalLines = biosLogSequences.length;
    const lineDelay = 110;
    let lineIndex = 0;

    const lineInterval = setInterval(() => {
      if (lineIndex >= totalLines) {
        clearInterval(lineInterval);
        return;
      }

      const entry = biosLogSequences[lineIndex];
      const lineEl = document.createElement('div');
      lineEl.className = `bios-line ${entry.type}`;
      lineEl.textContent = entry.text;
      biosLines.appendChild(lineEl);

      // Auto-scroll to bottom
      biosLines.scrollTop = biosLines.scrollHeight;

      // Update progress
      const progress = Math.round(((lineIndex + 1) / totalLines) * 100);
      biosProgressBar.style.width = progress + '%';

      // Simulate CPU activity
      biosCpu.textContent = Math.min(99, Math.round(30 + Math.random() * 65));

      lineIndex++;
    }, lineDelay);

    // Total BIOS duration
    const totalDuration = totalLines * lineDelay + 500;

    // After all lines, update status then fade out
    setTimeout(() => {
      biosStatusLabel.textContent = '● READY';
      biosStatusLabel.classList.add('ready');
      biosCpu.textContent = '12';
    }, totalLines * lineDelay);

    setTimeout(() => {
      biosOverlay.classList.add('bios-fadeout');

      setTimeout(() => {
        biosOverlay.classList.add('hidden');
        biosOverlay.setAttribute('aria-hidden', 'true');
        clearInterval(clockInterval);
        showBios = false;

        if (callback) callback();
      }, 400);
    }, totalDuration);
  }

  // ——— BIOS-wrapped generation ———
  function generateWithBios() {
    if (isGenerating || showBios) return;
    const scenario = scenarioInput.value.trim();
    if (!scenario) {
      scenarioInput.focus();
      scenarioInput.style.borderColor = '#ef4444';
      // Shake animation
      scenarioInput.style.animation = 'none';
      requestAnimationFrame(() => {
        scenarioInput.style.animation = 'shake 0.4s ease';
      });
      setTimeout(() => scenarioInput.style.borderColor = '', 1500);
      return;
    }
    launchBios(() => runGeneration());
  }

  // ——— Event Listeners ———
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    generateWithBios();
  });

  btnRegen.addEventListener('click', () => {
    generateWithBios();
  });

  // Copy to clipboard with toast
  btnCopy.addEventListener('click', () => {
    const text = excuseText.textContent;
    if (!text) return;

    navigator.clipboard.writeText(text).then(() => {
      btnCopy.classList.add('copied');
      showToast('Alibi copied to clipboard', '📋');
      setTimeout(() => btnCopy.classList.remove('copied'), 2000);
    }).catch(() => {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      btnCopy.classList.add('copied');
      showToast('Alibi copied to clipboard', '📋');
      setTimeout(() => btnCopy.classList.remove('copied'), 2000);
    });
  });

  // ——— Keyboard shortcut: Ctrl+Enter to generate ———
  scenarioInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      generateWithBios();
    }
  });

  // ——— Textarea auto-resize ———
  scenarioInput.addEventListener('input', () => {
    scenarioInput.style.height = 'auto';
    scenarioInput.style.height = Math.min(scenarioInput.scrollHeight, 200) + 'px';
  });

  // ——— Initial setup ———
  chaosSlider.dispatchEvent(new Event('input'));
  updateSmartWarning();

  // Add shake keyframes dynamically
  const shakeStyle = document.createElement('style');
  shakeStyle.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-4px); }
      75% { transform: translateX(4px); }
    }
  `;
  document.head.appendChild(shakeStyle);
});
