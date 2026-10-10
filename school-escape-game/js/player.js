/* ==========================================================================
   ESCAPE DA ESCOLA — ENTIDADE DO JOGADOR / ESTUDANTE (js/player.js)
   ========================================================================== */

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        
        // Tamanhos
        this.normalRadius = 14;
        this.smallRadius = 7;
        this.radius = this.normalRadius;

        // Velocidades
        this.normalSpeed = 3.4;
        this.smallSpeed = 3.8;
        this.speed = this.normalSpeed;

        // Estado do Encolhimento (Frutinha)
        this.isSmall = false;
        this.shrinkTimer = 0;
        this.maxShrinkDuration = 10; // 10 segundos

        // Animação e Orientação
        this.angle = 0; // Radianos
        this.vx = 0;
        this.vy = 0;
        this.animTimer = 0;
        this.isMoving = false;
        
        // Inventário de chaves
        this.keys = {
            10: false, // Key 1
            11: false, // Key 2
            12: false  // Key 3
        };
        this.keyCount = 0;
    }

    reset(x, y) {
        this.x = x;
        this.y = y;
        this.radius = this.normalRadius;
        this.speed = this.normalSpeed;
        this.isSmall = false;
        this.shrinkTimer = 0;
        this.angle = 0;
        this.vx = 0;
        this.vy = 0;
        this.keys = { 10: false, 11: false, 12: false };
        this.keyCount = 0;
    }

    collectKey(keyId) {
        if (!this.keys[keyId]) {
            this.keys[keyId] = true;
            this.keyCount++;
            return true;
        }
        return false;
    }

    eatFruit() {
        this.isSmall = true;
        this.shrinkTimer = this.maxShrinkDuration;
        this.radius = this.smallRadius;
        this.speed = this.smallSpeed;
    }

    update(input, map, dt, particleSystem) {
        let dx = 0;
        let dy = 0;

        if (input.up) dy -= 1;
        if (input.down) dy += 1;
        if (input.left) dx -= 1;
        if (input.right) dx += 1;

        this.isMoving = (dx !== 0 || dy !== 0);

        if (this.isMoving) {
            // Normalizar vetor de movimento
            const length = Math.hypot(dx, dy);
            dx /= length;
            dy /= length;

            this.angle = Math.atan2(dy, dx);
            this.animTimer += dt * 12;

            // Movimentação com deslizamento nas paredes (Collision Sliding)
            const moveStepX = dx * this.speed;
            const moveStepY = dy * this.speed;

            // Tenta mover no eixo X
            if (!map.checkCollision(this.x + moveStepX, this.y, this.radius, this.isSmall)) {
                this.x += moveStepX;
            }

            // Tenta mover no eixo Y
            if (!map.checkCollision(this.x, this.y + moveStepY, this.radius, this.isSmall)) {
                this.y += moveStepY;
            }

            // Solta partículas sutis de poeira ao caminhar
            if (Math.random() < 0.2) {
                particleSystem.addDust(this.x, this.y + this.radius);
            }
        }

        // Atualiza Timer da Frutinha
        if (this.isSmall) {
            this.shrinkTimer -= dt;
            if (Math.random() < 0.4) {
                particleSystem.addSparkle(
                    this.x + (Math.random() - 0.5) * 16,
                    this.y + (Math.random() - 0.5) * 16,
                    '#f43f5e'
                );
            }

            if (this.shrinkTimer <= 0) {
                // Tenta voltar ao tamanho normal
                // Verifica se há espaço para des-encolher sem ficar preso numa parede!
                if (!map.checkCollision(this.x, this.y, this.normalRadius, false)) {
                    this.isSmall = false;
                    this.radius = this.normalRadius;
                    this.speed = this.normalSpeed;
                    this.shrinkTimer = 0;
                } else {
                    // Mantém pequeno até sair de um local estreito
                    this.shrinkTimer = 0.5;
                }
            }
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        const currentScale = this.isSmall ? 0.55 : 1.0;
        ctx.scale(currentScale, currentScale);

        // Sombra suave do personagem
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.beginPath();
        ctx.ellipse(0, 4, 16, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        // Animação de caminhada das pernas
        const legSwing = Math.sin(this.animTimer) * 8;
        ctx.fillStyle = '#1e293b'; // Calça jeans escura
        // Perna esquerda
        ctx.fillRect(-6, -10 + legSwing, 6, 8);
        // Perna direita
        ctx.fillRect(-6, 2 - legSwing, 6, 8);

        // Corpo / Uniforme Escolar (Jaqueta Azul)
        ctx.fillStyle = '#2563eb';
        ctx.beginPath();
        ctx.arc(0, 0, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#1d4ed8';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Mochila nas costas do estudante
        ctx.fillStyle = '#dc2626'; // Mochila vermelha
        ctx.fillRect(-14, -8, 7, 16);
        ctx.strokeStyle = '#991b1b';
        ctx.strokeRect(-14, -8, 7, 16);

        // Cabeça do Estudante (Pele)
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(2, 0, 10, 0, Math.PI * 2);
        ctx.fill();

        // Boné / Cabelo do Estudante (Visor apontando na direção do movimento)
        ctx.fillStyle = '#1e1b4b'; // Cabelo/Boné escuro
        ctx.beginPath();
        ctx.arc(0, 0, 10, -Math.PI / 2, Math.PI / 2);
        ctx.fill();

        // Aba do Boné (Direção)
        ctx.fillStyle = '#2563eb';
        ctx.fillRect(8, -6, 5, 12);

        // Olhos
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(6, -3, 1.5, 0, Math.PI * 2);
        ctx.arc(6, 3, 1.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}
