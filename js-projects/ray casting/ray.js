"use strict";

class ray {
	constructor(x, y, dir) {
		this.x = x;
		this.y = y;
		this.dir = dir;
	}
	
	show(toX, toY) {
		ctx.lineWidth = 5;
		ctx.strokeStyle = '#f803';
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(toX, toY);
		ctx.stroke();
		ctx.closePath();
	}
	
	cast() {
		let hit = null;
		let closest = Infinity;
		
		for(let index in walls) {
			const x1 = walls[index].x1;
			const x2 = walls[index].x2;
			const y1 = walls[index].y1;
			const y2 = walls[index].y2;

			const x3 = this.x;
			const y3 = this.y;
			const x4 = this.x + this.dir.right;
			const y4 = this.y + this.dir.down;

			const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

			const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
			const u = (-1 * ((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3))) / denom;

			if(t >= 0 && t <= 1 && u >= 0) {
				const checking = {x: x1 + t * (x2 - x1), y: y1 + t * (y2 - y1)};
				
				if(Math.sqrt(((checking.x - x3) * (checking.x - x3)) + ((checking.y - y3) * (checking.y - y3))) < closest) {
					closest = Math.sqrt(((checking.x - x3) * (checking.x - x3)) + ((checking.y - y3) * (checking.y - y3)));
					
					hit = checking;
				}
			}
		}
		
		if(hit) {
			return hit;
		}
		
		return {x: this.x + this.dir.right * 1000, y: this.y + this.dir.down * 1000};
	}
}