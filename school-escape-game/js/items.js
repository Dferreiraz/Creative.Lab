/* ==========================================================================
   ESCAPE DA ESCOLA — CHAVES, FRUTINHA E SISTEMA DE PARTÍCULAS (js/items.js)
   ========================================================================== */

class KeyItem {
    constructor(id, tileX, tileY, color, label) {
        this.id = id;
        this.x = tileX * 40 + 20;
        this.y = tileY * 40 + 20;
        this.radius = 12;
        this.color = color;
        this.label = label;
        this.collected = false;
        this.bobTimer = Math.random() * Math.PI * 2;
    }

    update(dt) {
        this.bobTimer += dt * 4;
    }

    draw(ctx) {
        if (this.collected) return;

        ctx.save();
        const offsetY = Math.sin(this.bobTimer) * 4;
        ctx.translate(this.x, this.y + offsetY);

        // Brilho ao redor da chave
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 12;

        // Anel da chave
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, -4, 6, 0, Math.PI * 2);
        ctx.stroke();

        // Haste da chave
        ctx.beginPath();
        ctx.moveTo(0, 2);
        ctx.lineTo(0, 10);
        ctx.lineTo(4, 10);
        ctx.moveTo(0, 6);
        ctx.lineTo(3, 6);
        ctx.stroke();

        ctx.restore();
    }
}

class FruitItem {
    constructor(tileX, tileY) {
        this.x = tileX * 40 + 20;
        this.y = tileY * 40 + 20;
        this.radius = 14;
        this.collected = false;
        this.respawnTimer = 0;
        this.respawnDelay = 15; // Renasce após 15s se coletada
        this.bobTimer = 0;
    }

    update(dt) {
        this.bobTimer += dt * 5;
        if (this.collected) {
            this.respawnTimer -= dt;
            if (this.respawnTimer <= 0) {
                this.collected = false;
            }
        }
    }

    draw(ctx) {
        if (this.collected) return;

        ctx.save();
        const offsetY = Math.sin(this.bobTimer) * 5;
        ctx.translate(this.x, this.y + offsetY);

        // Glow Rosa
        ctx.shadowColor = '#f43f5e';
        ctx.shadowBlur = 15;

        // Corpo da Moranguinho / Frutinha Especial
        ctx.fillStyle = '#f43f5e';
        ctx.beginPath();
        ctx.arc(0, 2, 10, 0, Math.PI * 2);
        ctx.fill();

        // Folhinha verde no topo
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.ellipse(0, -8, 6, 3, 0, 0, Math.PI * 2);
        ctx.fill();

        // Pinta pontinhos amarelos na fruta
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(-3, 0, 1, 0, Math.PI * 2);
        ctx.arc(3, 1, 1, 0, Math.PI * 2);
        ctx.arc(0, 5, 1, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}

class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    reset() {
        this.particles = [];
    }

    addDust(x, y) {
        this.particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            size: Math.random() * 3 + 2,
            color: 'rgba(148, 163, 184, 0.4)',
            life: 1.0,
            decay: Math.random() * 0.05 + 0.03
        });
    }

    addSparkle(x, y, color) {
        this.particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5 - 0.5,
            size: Math.random() * 4 + 2,
            color: color,
            life: 1.0,
            decay: Math.random() * 0.06 + 0.04
        });
    }

    addPickupBurst(x, y, color) {
        for (let i = 0; i < 24; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 4 + 2;
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: Math.random() * 5 + 3,
                color: color,
                life: 1.0,
                decay: Math.random() * 0.03 + 0.02
            });
        }
    }

    addConfetti(x, y) {
        const colors = ['#f43f5e', '#3b82f6', '#10b981', '#fbbf24', '#a855f7'];
        for (let i = 0; i < 60; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 6 + 2;
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 2,
                size: Math.random() * 6 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                life: 1.0,
                decay: Math.random() * 0.015 + 0.01
            });
        }
    }

    update(dt) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= p.decay;
            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    draw(ctx) {
        ctx.save();
        for (const p of this.particles) {
            ctx.globalAlpha = Math.max(0, p.life);
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    }
}
