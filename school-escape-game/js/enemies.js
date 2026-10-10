/* ==========================================================================
   ESCAPE DA ESCOLA — INIMIGOS: ALUNOS E SEGURANÇAS (js/enemies.js)
   ========================================================================== */

class StudentEnemy {
    constructor(waypoints, speed = 2.0) {
        this.waypoints = waypoints;
        this.currentWP = 0;
        this.x = waypoints[0].x * 40 + 20;
        this.y = waypoints[0].y * 40 + 20;
        this.radius = 13;
        this.speed = speed;
        this.angle = 0;
        this.animTimer = 0;
    }

    update(dt) {
        const target = this.waypoints[this.currentWP];
        const targetX = target.x * 40 + 20;
        const targetY = target.y * 40 + 20;

        const dx = targetX - this.x;
        const dy = targetY - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 4) {
            this.currentWP = (this.currentWP + 1) % this.waypoints.length;
        } else {
            this.angle = Math.atan2(dy, dx);
            this.x += (dx / dist) * this.speed;
            this.y += (dy / dist) * this.speed;
            this.animTimer += dt * 10;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        // Sombra
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(0, 4, 15, 10, 0, 0, Math.PI * 2);
        ctx.fill();

        // Pernas
        const legSwing = Math.sin(this.animTimer) * 7;
        ctx.fillStyle = '#334155';
        ctx.fillRect(-5, -9 + legSwing, 5, 7);
        ctx.fillRect(-5, 2 - legSwing, 5, 7);

        // Corpo (Uniforme Verde do Aluno)
        ctx.fillStyle = '#16a34a';
        ctx.beginPath();
        ctx.arc(0, 0, 13, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#15803d';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Cabeça
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(2, 0, 9, 0, Math.PI * 2);
        ctx.fill();

        // Cabelo Castanho
        ctx.fillStyle = '#78350f';
        ctx.beginPath();
        ctx.arc(-2, 0, 9, -Math.PI / 2, Math.PI / 2);
        ctx.fill();

        ctx.restore();
    }
}

class SecurityGuard {
    constructor(waypoints, speed = 1.8) {
        this.waypoints = waypoints;
        this.currentWP = 0;
        this.x = waypoints[0].x * 40 + 20;
        this.y = waypoints[0].y * 40 + 20;
        this.radius = 15;
        this.patrolSpeed = speed;
        this.chaseSpeed = speed * 1.5;
        this.speed = this.patrolSpeed;
        this.angle = 0;
        this.animTimer = 0;

        // Visão do Lanterna/Cone
        this.fovAngle = Math.PI / 3; // 60 graus
        this.fovDistance = 190;
        this.state = 'PATROL'; // 'PATROL' ou 'CHASE'
        this.alertTimer = 0;
    }

    update(player, map, dt, onAlertCallback) {
        // Checar linha de visão do jogador no cone da lanterna
        const canSeePlayer = this.checkVisionCone(player, map);

        if (canSeePlayer) {
            if (this.state !== 'CHASE') {
                this.state = 'CHASE';
                if (onAlertCallback) onAlertCallback();
            }
            this.alertTimer = 4.0; // Persegue por 4 segundos após perder de vista
        } else if (this.state === 'CHASE') {
            this.alertTimer -= dt;
            if (this.alertTimer <= 0) {
                this.state = 'PATROL';
            }
        }

        if (this.state === 'CHASE') {
            this.speed = this.chaseSpeed;
            // Movimenta em direção direta ao jogador
            const dx = player.x - this.x;
            const dy = player.y - this.y;
            const dist = Math.hypot(dx, dy);

            if (dist > 5) {
                this.angle = Math.atan2(dy, dx);
                const stepX = (dx / dist) * this.speed;
                const stepY = (dy / dist) * this.speed;

                // Tenta mover com deslizamento
                if (!map.checkCollision(this.x + stepX, this.y, this.radius, false)) {
                    this.x += stepX;
                }
                if (!map.checkCollision(this.x, this.y + stepY, this.radius, false)) {
                    this.y += stepY;
                }
            }
        } else { // PATROL
            this.speed = this.patrolSpeed;
            const target = this.waypoints[this.currentWP];
            const targetX = target.x * 40 + 20;
            const targetY = target.y * 40 + 20;

            const dx = targetX - this.x;
            const dy = targetY - this.y;
            const dist = Math.hypot(dx, dy);

            if (dist < 6) {
                this.currentWP = (this.currentWP + 1) % this.waypoints.length;
            } else {
                this.angle = Math.atan2(dy, dx);
                this.x += (dx / dist) * this.speed;
                this.y += (dy / dist) * this.speed;
            }
        }

        this.animTimer += dt * 10;
    }

    checkVisionCone(player, map) {
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist > this.fovDistance) return false;

        // Checa ângulo relativo à lanterna do guarda
        let angleToPlayer = Math.atan2(dy, dx) - this.angle;
        // Normaliza ângulo entre -PI e PI
        while (angleToPlayer < -Math.PI) angleToPlayer += Math.PI * 2;
        while (angleToPlayer > Math.PI) angleToPlayer -= Math.PI * 2;

        if (Math.abs(angleToPlayer) > this.fovAngle / 2) return false;

        // Raycasting test para ver se paredes bloqueiam a visão
        const steps = 15;
        for (let i = 1; i <= steps; i++) {
            const testX = this.x + (dx * (i / steps));
            const testY = this.y + (dy * (i / steps));
            if (map.checkCollision(testX, testY, 2, false)) {
                return false; // Parede bloqueia visão!
            }
        }

        return true;
    }

    drawFlashlightCone(ctx, map) {
        ctx.save();
        ctx.translate(this.x, this.y);

        const rayCount = 30;
        const halfFov = this.fovAngle / 2;
        const points = [{ x: 0, y: 0 }];

        for (let i = 0; i <= rayCount; i++) {
            const rayAngle = this.angle - halfFov + (i / rayCount) * this.fovAngle;
            let rayLength = this.fovDistance;

            // Testa colisão dos raios da luz nas paredes
            for (let step = 10; step <= this.fovDistance; step += 10) {
                const testX = this.x + Math.cos(rayAngle) * step;
                const testY = this.y + Math.sin(rayAngle) * step;
                if (map.checkCollision(testX, testY, 2, false)) {
                    rayLength = step;
                    break;
                }
            }

            points.push({
                x: Math.cos(rayAngle) * rayLength,
                y: Math.sin(rayAngle) * rayLength
            });
        }

        // Desenha o polígono do feixe da lanterna
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.closePath();

        const beamColor = (this.state === 'CHASE') ? 'rgba(239, 68, 68, 0.45)' : 'rgba(253, 224, 71, 0.3)';
        ctx.fillStyle = beamColor;
        ctx.fill();

        ctx.restore();
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        // Sombra
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.beginPath();
        ctx.ellipse(0, 4, 18, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        // Pernas
        const legSwing = Math.sin(this.animTimer) * 8;
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(-6, -10 + legSwing, 6, 8);
        ctx.fillRect(-6, 2 - legSwing, 6, 8);

        // Corpo (Uniforme Azul Escuro de Segurança)
        ctx.fillStyle = '#1e1b4b';
        ctx.beginPath();
        ctx.arc(0, 0, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = (this.state === 'CHASE') ? '#ef4444' : '#4338ca';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Crachá/Distintivo Dourado
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(6, -6, 3, 0, Math.PI * 2);
        ctx.fill();

        // Cabeça
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(2, 0, 10, 0, Math.PI * 2);
        ctx.fill();

        // Quepe de Segurança
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(0, 0, 11, -Math.PI / 2, Math.PI / 2);
        ctx.fill();
        // Aba do Quepe
        ctx.fillStyle = '#000000';
        ctx.fillRect(8, -7, 6, 14);

        ctx.restore();
    }
}
