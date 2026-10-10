/* ==========================================================================
   ESCAPE DA ESCOLA — MOTOR DO JOGO (MAIS DIFÍCIL)
   ========================================================================== */

class AudioEngine {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) this.ctx = new AudioCtx();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playKeySound() {
        if (!this.enabled || !this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(587.33, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.2);
    }

    playFruitSound() {
        if (!this.enabled || !this.ctx) return;
        const now = this.ctx.currentTime;
        const freqs = [330, 440, 554, 659, 880];
        freqs.forEach((f, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(f, now + i * 0.05);
            gain.gain.setValueAtTime(0.15, now + i * 0.05);
            gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.05 + 0.1);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + i * 0.05);
            osc.stop(now + i * 0.05 + 0.1);
        });
    }

    playDoorUnlockSound() {
        if (!this.enabled || !this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(300, this.ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.2);
    }

    playAlertSound() {
        if (!this.enabled || !this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.3);
    }

    playGameOverSound() {
        if (!this.enabled || !this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.linearRampToValueAtTime(80, now + 0.6);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(now + 0.6);
    }

    playVictorySound() {
        if (!this.enabled || !this.ctx) return;
        const now = this.ctx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((f, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(f, now + i * 0.12);
            gain.gain.setValueAtTime(0.25, now + i * 0.12);
            gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.12 + 0.4);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + i * 0.12);
            osc.stop(now + i * 0.12 + 0.4);
        });
    }
}

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.audio = new AudioEngine();

        this.map = new SchoolMap();
        this.player = new Player(2 * 40 + 20, 2 * 40 + 20); // Posição inicial ajustada
        this.particleSystem = new ParticleSystem();

        this.camera = {
            x: 0,
            y: 0,
            width: this.canvas.width,
            height: this.canvas.height
        };

        this.state = 'START';
        this.gameTime = 0;

        this.input = {
            up: false,
            down: false,
            left: false,
            right: false
        };

        // Itens - Posições ajustadas para o novo mapa
        this.keys = [
            new KeyItem(10, 15, 3, '#ef4444', 'Chave 1'),  // Chave Vermelha - Área superior direita
            new KeyItem(11, 35, 6, '#3b82f6', 'Chave 2'),  // Chave Azul - Banheiro
            new KeyItem(12, 20, 18, '#eab308', 'Chave 3')  // Chave Dourada - Biblioteca/Secretaria
        ];

        this.fruit = new FruitItem(18, 10); // Frutinha no Corredor Central

        // MAIS INIMIGOS - Alunos (6 no total)
        this.students = [
            new StudentEnemy([{x: 2, y: 1}, {x: 7, y: 1}], 2.2),           // Sala 1
            new StudentEnemy([{x: 14, y: 1}, {x: 20, y: 1}], 2.0),         // Sala 2
            new StudentEnemy([{x: 22, y: 1}, {x: 28, y: 1}], 2.3),         // Sala 3
            new StudentEnemy([{x: 2, y: 6}, {x: 7, y: 6}], 1.8),           // Banheiro esquerdo
            new StudentEnemy([{x: 14, y: 6}, {x: 20, y: 6}], 2.1),         // Banheiro direito
            new StudentEnemy([{x: 22, y: 6}, {x: 28, y: 6}], 1.9)          // Área superior direita
        ];

        // MAIS GUARDAS - Seguranças (5 no total)
        this.guards = [
            new SecurityGuard([{x: 2, y: 10}, {x: 37, y: 10}], 1.8),       // Patrulha Corredor Principal (longa)
            new SecurityGuard([{x: 2, y: 11}, {x: 15, y: 11}], 2.0),       // Corredor esquerdo
            new SecurityGuard([{x: 20, y: 11}, {x: 37, y: 11}], 2.0),      // Corredor direito
            new SecurityGuard([{x: 2, y: 18}, {x: 8, y: 18}, {x: 8, y: 15}], 1.9),  // Biblioteca esquerda
            new SecurityGuard([{x: 28, y: 18}, {x: 37, y: 18}, {x: 37, y: 15}], 2.1)  // Biblioteca direita
        ];

        this.lastTime = performance.now();
    }

    init() {
        this.setupUI();
        this.bindEvents();
        requestAnimationFrame((t) => this.loop(t));
    }

    setupUI() {
        this.startScreen = document.getElementById('start-screen');
        this.gameOverScreen = document.getElementById('game-over-screen');
        this.victoryScreen = document.getElementById('victory-screen');
        this.hud = document.getElementById('hud');
        this.keysCountEl = document.getElementById('keys-count');
        this.fruitStatusEl = document.getElementById('fruit-status');
        this.fruitBarEl = document.getElementById('fruit-bar');
        this.gameTimeEl = document.getElementById('game-time');
        this.finalTimeEl = document.getElementById('final-time');
    }

    bindEvents() {
        window.addEventListener('keydown', (e) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
                e.preventDefault();
            }
            this.handleKey(e.key, true);
        });

        window.addEventListener('keyup', (e) => {
            this.handleKey(e.key, false);
        });

        document.getElementById('start-btn').addEventListener('click', () => this.startGame());
        document.getElementById('restart-btn').addEventListener('click', () => this.startGame());
        document.getElementById('victory-restart-btn').addEventListener('click', () => this.startGame());

        document.getElementById('sound-toggle').addEventListener('click', () => {
            this.audio.enabled = !this.audio.enabled;
            document.getElementById('sound-toggle').innerText = this.audio.enabled ? '🔊' : '🔇';
        });
    }

    handleKey(key, isPressed) {
        const k = key.toLowerCase();
        if (k === 'w' || key === 'ArrowUp') this.input.up = isPressed;
        if (k === 's' || key === 'ArrowDown') this.input.down = isPressed;
        if (k === 'a' || key === 'ArrowLeft') this.input.left = isPressed;
        if (k === 'd' || key === 'ArrowRight') this.input.right = isPressed;
    }

    startGame() {
        this.audio.init();
        this.state = 'PLAYING';
        this.gameTime = 0;

        this.map = new SchoolMap();
        this.player.reset(2 * 40 + 20, 2 * 40 + 20);
        this.particleSystem.reset();

        this.keys.forEach(k => k.collected = false);
        this.fruit.collected = false;

        if (this.toastEl) this.toastEl.classList.add('hidden');
        this.startScreen.classList.remove('active');
        this.startScreen.classList.add('hidden');
        this.gameOverScreen.classList.add('hidden');
        this.gameOverScreen.classList.remove('active');
        this.victoryScreen.classList.add('hidden');
        this.victoryScreen.classList.remove('active');
        this.hud.classList.remove('hidden');

        this.updateHUD();
    }

    gameOver() {
        this.state = 'GAMEOVER';
        this.audio.playGameOverSound();
        this.hud.classList.add('hidden');
        this.gameOverScreen.classList.remove('hidden');
        this.gameOverScreen.classList.add('active');
    }

    victory() {
        this.state = 'VICTORY';
        this.audio.playVictorySound();
        this.particleSystem.addConfetti(this.player.x, this.player.y);

        const mins = Math.floor(this.gameTime / 60).toString().padStart(2, '0');
        const secs = Math.floor(this.gameTime % 60).toString().padStart(2, '0');
        this.finalTimeEl.innerText = `${mins}:${secs}`;

        this.hud.classList.add('hidden');
        this.victoryScreen.classList.remove('hidden');
        this.victoryScreen.classList.add('active');
    }

    update(dt) {
        if (this.state !== 'PLAYING') return;

        this.gameTime += dt;

        this.player.update(this.input, this.map, dt, this.particleSystem);

        const targetCamX = this.player.x - this.camera.width / 2;
        const targetCamY = this.player.y - this.camera.height / 2;
        this.camera.x += (targetCamX - this.camera.x) * 0.1;
        this.camera.y += (targetCamY - this.camera.y) * 0.1;
        this.camera.x = Math.max(0, Math.min(this.camera.x, this.map.width - this.camera.width));
        this.camera.y = Math.max(0, Math.min(this.camera.y, this.map.height - this.camera.height));

        this.keys.forEach(k => {
            k.update(dt);
            if (!k.collected && Math.hypot(this.player.x - k.x, this.player.y - k.y) < (this.player.radius + k.radius)) {
                k.collected = true;
                this.player.collectKey(k.id);
                this.audio.playKeySound();
                this.particleSystem.addPickupBurst(k.x, k.y, k.color);

                if (this.player.keyCount === 3) {
                    this.showNotification("🔑 A porta de saída foi desbloqueada!", 4000);
                    this.map.unlockDoor(12);
                    this.audio.playDoorUnlockSound();
                    this.particleSystem.addPickupBurst(34 * 40 + 20, 24 * 40 + 20, '#10b981');
                    this.particleSystem.addPickupBurst(35 * 40 + 20, 24 * 40 + 20, '#10b981');
                }

                this.updateHUD();
            }
        });

        [10, 11].forEach(doorId => {
            if (this.player.keys[doorId] && !this.map.unlockedDoors[doorId]) {
                for (let r = 0; r < this.map.rows; r++) {
                    if (!this.map.grid[r]) continue;
                    for (let c = 0; c < this.map.cols; c++) {
                        if (this.map.grid[r][c] === doorId) {
                            const doorX = c * 40 + 20;
                            const doorY = r * 40 + 20;
                            if (Math.hypot(this.player.x - doorX, this.player.y - doorY) < 50) {
                                this.map.unlockDoor(doorId);
                                this.audio.playDoorUnlockSound();
                                this.particleSystem.addPickupBurst(doorX, doorY, '#fbbf24');
                            }
                        }
                    }
                }
            }
        });

        if (this.player.keyCount === 3 && !this.map.unlockedDoors[12]) {
            for (let r = 0; r < this.map.rows; r++) {
                if (!this.map.grid[r]) continue;
                for (let c = 0; c < this.map.cols; c++) {
                    if (this.map.grid[r][c] === 12) {
                        const doorX = c * 40 + 20;
                        const doorY = r * 40 + 20;
                        if (Math.hypot(this.player.x - doorX, this.player.y - doorY) < 50) {
                            this.map.unlockDoor(12);
                            this.audio.playDoorUnlockSound();
                            this.particleSystem.addPickupBurst(doorX, doorY, '#10b981');
                            this.showNotification("🚪 Porta de saída aberta!", 3000);
                        }
                    }
                }
            }
        }

        if (!this.map.unlockedDoors[12] && this.player.keyCount < 3) {
            const exitDoorX = 34.5 * 40;
            const exitDoorY = 24 * 40 + 20;
            if (Math.hypot(this.player.x - exitDoorX, this.player.y - exitDoorY) < 55) {
                if (!this.lastLockNotify || Date.now() - this.lastLockNotify > 3000) {
                    this.lastLockNotify = Date.now();
                    this.showNotification("🔒 Saída Trancada! Colete as 3 chaves pela escola.", 2500);
                }
            }
        }

        this.fruit.update(dt);
        if (!this.fruit.collected && Math.hypot(this.player.x - this.fruit.x, this.player.y - this.fruit.y) < (this.player.radius + this.fruit.radius)) {
            this.fruit.collected = true;
            this.fruit.respawnTimer = this.fruit.respawnDelay;
            this.player.eatFruit();
            this.audio.playFruitSound();
            this.particleSystem.addPickupBurst(this.fruit.x, this.fruit.y, '#f43f5e');
        }

        this.students.forEach(s => {
            s.update(dt);
            if (Math.hypot(this.player.x - s.x, this.player.y - s.y) < (this.player.radius + s.radius)) {
                this.gameOver();
            }
        });

        this.guards.forEach(g => {
            g.update(this.player, this.map, dt, () => this.audio.playAlertSound());
            if (Math.hypot(this.player.x - g.x, this.player.y - g.y) < (this.player.radius + g.radius)) {
                this.gameOver();
            }
        });

        this.particleSystem.update(dt);

        const playerCol = Math.floor(this.player.x / 40);
        const playerRow = Math.floor(this.player.y / 40);
        if (this.map.grid[playerRow] && (this.map.grid[playerRow][playerCol] === 99 || (this.map.unlockedDoors[12] && playerRow >= 25 && playerCol >= 34))) {
            this.victory();
        }

        this.updateHUD();
    }

    showNotification(msg, duration = 3500) {
        if (!this.toastEl) this.toastEl = document.getElementById('toast-notification');
        if (!this.toastMsgEl) this.toastMsgEl = document.getElementById('toast-message');
        
        if (this.toastEl && this.toastMsgEl) {
            this.toastMsgEl.innerText = msg;
            this.toastEl.classList.remove('hidden');
            
            if (this.toastTimeout) clearTimeout(this.toastTimeout);
            this.toastTimeout = setTimeout(() => {
                this.toastEl.classList.add('hidden');
            }, duration);
        }
    }

    updateHUD() {
        this.keysCountEl.innerText = `${this.player.keyCount}/3`;

        const mins = Math.floor(this.gameTime / 60).toString().padStart(2, '0');
        const secs = Math.floor(this.gameTime % 60).toString().padStart(2, '0');
        this.gameTimeEl.innerText = `${mins}:${secs}`;

        if (this.player.isSmall) {
            this.fruitStatusEl.classList.remove('inactive');
            const pct = (this.player.shrinkTimer / this.player.maxShrinkDuration) * 100;
            this.fruitBarEl.style.width = `${Math.max(0, pct)}%`;
        } else {
            this.fruitStatusEl.classList.add('inactive');
        }
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.save();
        this.ctx.translate(-this.camera.x, -this.camera.y);

        this.map.draw(this.ctx, this.camera);

        this.keys.forEach(k => k.draw(this.ctx));
        this.fruit.draw(this.ctx);

        this.guards.forEach(g => g.drawFlashlightCone(this.ctx, this.map));

        this.students.forEach(s => s.draw(this.ctx));
        this.guards.forEach(g => g.draw(this.ctx));

        this.player.draw(this.ctx);

        this.particleSystem.draw(this.ctx);

        this.drawLightingLayer();

        this.ctx.restore();
    }

    drawLightingLayer() {
        this.ctx.save();
        
        this.ctx.fillStyle = 'rgba(11, 15, 25, 0.45)';
        this.ctx.fillRect(this.camera.x, this.camera.y, this.camera.width, this.camera.height);

        const spotRadius = this.player.isSmall ? 130 : 180;
        const grad = this.ctx.createRadialGradient(
            this.player.x, this.player.y, 10,
            this.player.x, this.player.y, spotRadius
        );
        grad.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
        grad.addColorStop(1, 'transparent');

        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.fillStyle = grad;
        this.ctx.beginPath();
        this.ctx.arc(this.player.x, this.player.y, spotRadius, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.restore();
    }

    loop(currentTime) {
        const dt = Math.min((currentTime - this.lastTime) / 1000, 0.1);
        this.lastTime = currentTime;

        this.update(dt);
        this.render();

        requestAnimationFrame((t) => this.loop(t));
    }
}