/* ==========================================================================
   ESCAPE DA ESCOLA — GERENCIADOR DO MAPA (js/map.js)
   ========================================================================== */

class SchoolMap {
    constructor() {
        this.tileSize = 40;

        this.unlockedDoors = {
            10: false,
            11: false,
            12: false
        };

        this.grid = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1],
            [1,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1],
            [1,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1],
            [1,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1],
            [1,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1],
            [1,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1],
            [1,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1],
            [1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1],
            [1,4,4,4,4,4,4,4,4,4,4,4,1,5,5,5,5,5,5,5,5,5,5,5,5,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,4,4,4,4,4,4,4,4,4,4,4,1,5,5,5,5,5,5,5,5,5,5,5,5,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,4,4,4,4,4,4,4,4,4,4,4,1,5,5,5,5,5,5,5,5,5,5,5,5,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,4,4,4,4,4,4,4,4,4,4,4,1,5,5,5,5,5,5,5,5,5,5,5,5,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,4,4,4,4,4,4,4,4,4,4,4,6,5,5,5,5,5,5,5,5,5,5,5,5,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,4,4,4,4,4,4,4,4,4,4,4,1,5,5,5,5,5,5,5,5,5,5,5,5,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,4,4,4,4,4,4,4,4,4,4,4,1,5,5,5,5,5,5,5,5,5,5,5,5,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,4,4,4,4,4,4,4,4,4,4,4,1,5,5,5,5,5,5,5,5,5,5,5,5,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,4,4,4,4,4,4,4,4,4,4,4,1,5,5,5,5,5,5,5,5,5,5,5,5,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,4,4,4,4,4,4,4,4,4,4,4,1,5,5,5,5,5,5,5,5,5,5,5,5,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,99,99,99,99,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,99,99,99,99,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ];

        this.rows = this.grid.length;
        this.cols = this.grid[0].length;
        this.width = this.cols * this.tileSize;
        this.height = this.rows * this.tileSize;

        this.grid[13][5] = 10;
        this.grid[13][19] = 11;

        this.decorations = this.generateDecorations();
    }

    generateDecorations() {
        const decors = [];
        decors.push({ type: 'blackboard', x: 2 * 40, y: 1 * 40 + 5, w: 200, h: 12, text: 'MATEMÁTICA - PROVA HOJE!' });
        decors.push({ type: 'blackboard', x: 14 * 40, y: 1 * 40 + 5, w: 200, h: 12, text: 'HISTÓRIA DA ESCOLA' });

        for (let r = 3; r <= 6; r += 2) {
            for (let c = 2; c <= 7; c += 2) {
                decors.push({ type: 'desk', x: c * 40 + 6, y: r * 40 + 6, w: 28, h: 24 });
            }
        }

        for (let r = 3; r <= 6; r += 2) {
            for (let c = 14; c <= 19; c += 2) {
                decors.push({ type: 'desk', x: c * 40 + 6, y: r * 40 + 6, w: 28, h: 24 });
            }
        }

        for (let c = 2; c < 38; c += 3) {
            if (c !== 5 && c !== 19 && c !== 24) {
                decors.push({ type: 'locker', x: c * 40, y: 9 * 40, w: 36, h: 16 });
            }
        }

        for (let r = 15; r <= 23; r += 3) {
            decors.push({ type: 'bookshelf', x: 2 * 40, y: r * 40, w: 120, h: 28 });
            decors.push({ type: 'bookshelf', x: 7 * 40, y: r * 40, w: 120, h: 28 });
        }

        decors.push({ type: 'office_desk', x: 20 * 40, y: 17 * 40, w: 100, h: 50 });

        for (let c = 27; c <= 35; c += 3) {
            decors.push({ type: 'sink', x: c * 40, y: 1 * 40 + 4, w: 28, h: 20 });
        }

        decors.push({ type: 'exit_sign', x: 35 * 40 + 5, y: 24 * 40, w: 70, h: 20 });

        return decors;
    }

    unlockDoor(doorId) {
        this.unlockedDoors[doorId] = true;
        // Converte os tiles da porta em chão normal (0) para permitir passagem
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (this.grid[r][c] === doorId) {
                    this.grid[r][c] = 0;
                }
            }
        }
    }

    checkCollision(x, y, radius, isSmall = false) {
        const minCol = Math.floor((x - radius) / this.tileSize);
        const maxCol = Math.floor((x + radius) / this.tileSize);
        const minRow = Math.floor((y - radius) / this.tileSize);
        const maxRow = Math.floor((y + radius) / this.tileSize);

        for (let r = minRow; r <= maxRow; r++) {
            for (let c = minCol; c <= maxCol; c++) {
                if (r < 0 || r >= this.rows || c < 0 || c >= this.cols) {
                    return true;
                }

                const tile = this.grid[r][c];

                // Tubo de Ventilação (Tile 6) - só passa se for pequeno
                if (tile === 6) {
                    if (!isSmall) {
                        return true;
                    }
                    continue;
                }

                // Tiles 99 (Saída) - BLOQUEADOS ATÉ PEGAR AS 3 CHAVES!
                if (tile === 99) {
                    if (!this.unlockedDoors[12]) {
                        const tileX = c * this.tileSize;
                        const tileY = r * this.tileSize;
                        const closestX = Math.max(tileX, Math.min(x, tileX + this.tileSize));
                        const closestY = Math.max(tileY, Math.min(y, tileY + this.tileSize));
                        const distX = x - closestX;
                        const distY = y - closestY;
                        if ((distX * distX + distY * distY) < (radius * radius)) {
                            return { col: c, row: r, tile: tile };
                        }
                    }
                    continue;
                }

                // PAREDES E PORTAS FECHADAS
                if (tile === 1 || tile === 10 || tile === 11) {
                    const tileX = c * this.tileSize;
                    const tileY = r * this.tileSize;

                    const closestX = Math.max(tileX, Math.min(x, tileX + this.tileSize));
                    const closestY = Math.max(tileY, Math.min(y, tileY + this.tileSize));

                    const distX = x - closestX;
                    const distY = y - closestY;

                    if ((distX * distX + distY * distY) < (radius * radius)) {
                        return { col: c, row: r, tile: tile };
                    }
                }
            }
        }

        return false;
    }

    draw(ctx, camera) {
        const startCol = Math.max(0, Math.floor(camera.x / this.tileSize));
        const endCol = Math.min(this.cols - 1, Math.ceil((camera.x + camera.width) / this.tileSize));
        const startRow = Math.max(0, Math.floor(camera.y / this.tileSize));
        const endRow = Math.min(this.rows - 1, Math.ceil((camera.y + camera.height) / this.tileSize));

        for (let r = startRow; r <= endRow; r++) {
            for (let c = startCol; c <= endCol; c++) {
                const x = c * this.tileSize;
                const y = r * this.tileSize;
                const tile = this.grid[r][c];

                switch (tile) {
                    case 2:
                        ctx.fillStyle = '#b45309';
                        ctx.fillRect(x, y, this.tileSize, this.tileSize);
                        ctx.strokeStyle = '#92400e';
                        ctx.strokeRect(x, y, this.tileSize, this.tileSize);
                        break;
                    case 3:
                        ctx.fillStyle = '#0284c7';
                        ctx.fillRect(x, y, this.tileSize, this.tileSize);
                        ctx.strokeStyle = '#38bdf8';
                        ctx.strokeRect(x, y, this.tileSize, this.tileSize);
                        break;
                    case 4:
                        ctx.fillStyle = '#78350f';
                        ctx.fillRect(x, y, this.tileSize, this.tileSize);
                        ctx.strokeStyle = '#451a03';
                        ctx.strokeRect(x, y, this.tileSize, this.tileSize);
                        break;
                    case 5:
                        ctx.fillStyle = '#475569';
                        ctx.fillRect(x, y, this.tileSize, this.tileSize);
                        ctx.strokeStyle = '#334155';
                        ctx.strokeRect(x, y, this.tileSize, this.tileSize);
                        break;
                    case 99:
                        if (!this.unlockedDoors[12]) {
                            ctx.fillStyle = '#064e3b';
                            ctx.fillRect(x, y, this.tileSize, this.tileSize);
                            ctx.fillStyle = '#10b981';
                            ctx.font = 'bold 16px Outfit';
                            ctx.textAlign = 'center';
                            ctx.fillText('🔒', x + 20, y + 28);
                            ctx.textAlign = 'left';
                        } else {
                            ctx.fillStyle = '#059669';
                            ctx.fillRect(x, y, this.tileSize, this.tileSize);
                            ctx.fillStyle = '#10b981';
                            if ((r + c) % 2 === 0) ctx.fillRect(x + 10, y + 10, 20, 20);
                        }
                        break;
                    case 6:
                        ctx.fillStyle = '#1e293b';
                        ctx.fillRect(x, y, this.tileSize, this.tileSize);
                        ctx.strokeStyle = '#64748b';
                        ctx.lineWidth = 2;
                        ctx.strokeRect(x + 4, y + 4, this.tileSize - 8, this.tileSize - 8);
                        ctx.beginPath();
                        ctx.moveTo(x + 8, y + 14); ctx.lineTo(x + 32, y + 14);
                        ctx.moveTo(x + 8, y + 20); ctx.lineTo(x + 32, y + 20);
                        ctx.moveTo(x + 8, y + 26); ctx.lineTo(x + 32, y + 26);
                        ctx.stroke();
                        ctx.lineWidth = 1;
                        break;
                    default:
                        ctx.fillStyle = '#1e293b';
                        ctx.fillRect(x, y, this.tileSize, this.tileSize);
                        ctx.strokeStyle = '#334155';
                        ctx.strokeRect(x, y, this.tileSize, this.tileSize);
                        break;
                }

                if (tile === 1) {
                    ctx.fillStyle = '#0f172a';
                    ctx.fillRect(x, y, this.tileSize, this.tileSize);
                    ctx.fillStyle = '#334155';
                    ctx.fillRect(x + 2, y + 2, this.tileSize - 4, this.tileSize - 4);
                } else if (tile === 10) {
                    ctx.fillStyle = '#ef4444';
                    ctx.fillRect(x + 4, y + 4, this.tileSize - 8, this.tileSize - 8);
                    ctx.fillStyle = '#fca5a5';
                    ctx.font = 'bold 12px Outfit';
                    ctx.fillText('1', x + 10, y + 24);
                } else if (tile === 11) {
                    ctx.fillStyle = '#3b82f6';
                    ctx.fillRect(x + 4, y + 4, this.tileSize - 8, this.tileSize - 8);
                    ctx.fillStyle = '#93c5fd';
                    ctx.font = 'bold 12px Outfit';
                    ctx.fillText('2', x + 10, y + 24);
                }
            }
        }

        this.decorations.forEach(dec => {
            if (dec.x + dec.w >= camera.x && dec.x <= camera.x + camera.width &&
                dec.y + dec.h >= camera.y && dec.y <= camera.y + camera.height) {
                this.drawDecoration(ctx, dec);
            }
        });
    }

    drawDecoration(ctx, dec) {
        ctx.save();
        switch (dec.type) {
            case 'blackboard':
                ctx.fillStyle = '#064e3b';
                ctx.fillRect(dec.x, dec.y, dec.w, dec.h);
                ctx.strokeStyle = '#78350f';
                ctx.lineWidth = 3;
                ctx.strokeRect(dec.x, dec.y, dec.w, dec.h);
                ctx.fillStyle = '#e2e8f0';
                ctx.font = '10px sans-serif';
                ctx.fillText(dec.text, dec.x + 10, dec.y + 9);
                break;
            case 'desk':
                ctx.fillStyle = '#d97706';
                ctx.fillRect(dec.x, dec.y, dec.w, dec.h);
                ctx.fillStyle = '#92400e';
                ctx.fillRect(dec.x + 2, dec.y + 2, dec.w - 4, 4);
                break;
            case 'locker':
                ctx.fillStyle = '#0284c7';
                ctx.fillRect(dec.x, dec.y, dec.w, dec.h);
                ctx.strokeStyle = '#0369a1';
                ctx.strokeRect(dec.x, dec.y, dec.w, dec.h);
                break;
            case 'bookshelf':
                ctx.fillStyle = '#451a03';
                ctx.fillRect(dec.x, dec.y, dec.w, dec.h);
                const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
                for (let i = 0; i < dec.w - 8; i += 8) {
                    ctx.fillStyle = colors[(i / 8) % colors.length];
                    ctx.fillRect(dec.x + 4 + i, dec.y + 4, 6, dec.h - 8);
                }
                break;
            case 'office_desk':
                ctx.fillStyle = '#334155';
                ctx.fillRect(dec.x, dec.y, dec.w, dec.h);
                ctx.fillStyle = '#94a3b8';
                ctx.fillRect(dec.x + 10, dec.y + 10, 30, 20);
                break;
            case 'sink':
                ctx.fillStyle = '#cbd5e1';
                ctx.beginPath();
                ctx.arc(dec.x + dec.w / 2, dec.y + dec.h / 2, dec.w / 3, 0, Math.PI * 2);
                ctx.fill();
                break;
            case 'exit_sign':
                ctx.fillStyle = '#10b981';
                ctx.fillRect(dec.x, dec.y, dec.w, dec.h);
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 12px Outfit';
                ctx.fillText(' SAÍDA', dec.x + 8, dec.y + 14);
                break;
        }
        ctx.restore();
    }
}