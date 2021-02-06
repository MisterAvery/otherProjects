"use strict";
 
class Dot {
	constructor(pos, mass) {
		this.pos = pos;
		this.vel = {down: 0, right: 0};
		this.acl = {down: 0, right: 0};
		this.m = mass;
		this.r = Math.sqrt(this.m) * 10;
	}

	addForce(force) {
		if(force != gravity) {
			this.acl.down += force.down / this.m;
			this.acl.right += force.right / this.m;
		} else {
			this.acl.down += force.down;
			this.acl.right += force.right;
		}
	}

	show() {
		ctx.strokeStyle = '#ffffff';
		ctx.lineWidth = 2;

		ctx.fillStyle = '#11a4f2';
		ctx.beginPath();
		ctx.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	}

	move() {
		if(this.pos.y >= height - this.r) {
			this.pos.y = height - this.r;
			this.vel.down *= -0.7;

			this.vel.right /= slipCo * (gravity.down * this.m);
		} else if(this.pos.y <= this.r) {
			this.pos.y = this.r;
			this.vel.down *= -1;
		}

		if(this.pos.x >= width - this.r) {
			this.pos.x = width - this.r;
			this.vel.right *= -0.7;
		} else if(this.pos.x <= this.r) {
			this.pos.x = this.r;
			this.vel.right *= -0.7;
		}

		this.vel.right += this.acl.right;
		this.vel.down += this.acl.down;

		this.pos.x += this.vel.right;
		this.pos.y += this.vel.down;
	}
}
