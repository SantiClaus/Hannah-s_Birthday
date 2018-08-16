// JavaScript by GeekLaunch (https://www.youtube.com/channel/UCPXyziOUs7oglOtmCPhFSKQ)
let canvas = document.getElementById('confetti');
let title = document.getElementById('title');

canvas.width = window.innerWidth - 4;
canvas.height = window.innerHeight - 60;

let ctx = canvas.getContext('2d');
let str = 'Happy Birthday Hannah!';
let img = new Image();
let pieces = [];
let numberOfPieces = 200;
let lastUpdateTime = Date.now();
ctx.fillStyle = randomColor();

function randomColor () {
	let colors = ['red', 'lime', 'blue', 'cyan', 'fuchsia', 'yellow'];
	return colors[Math.floor(Math.random() * colors.length)];
}

title.setAttribute('id', randomColor());

function update () {
	let now = Date.now(),
		dt = now - lastUpdateTime;

	for (let i = pieces.length - 1; i >= 0; i--) {
		let p = pieces[i];

		if (p.y > canvas.height) {
			pieces.splice(i, 1);
			continue;
		}

		p.y += p.gravity;
		p.rotation += p.rotationSpeed * dt;
	}

	while (pieces.length < numberOfPieces) {
		pieces.push(new Piece(Math.random() * canvas.width, - 15));
	}

	lastUpdateTime = now;

	setTimeout(update, 1);
}

function write () {
	ctx.font = '50px TimeToParty';
	ctx.textAlign = 'center';
	ctx.fillText(str, canvas.width / 2, canvas.height / 4);
}

function draw () {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	write();

	img.src = 'cake.png';
	ctx.drawImage(img, 0, 200, canvas.width, canvas.height);


	pieces.forEach(function (p) {
		ctx.save();

		ctx.fillStyle = p.color;

		ctx.translate(p.x + p.size / 2, p.y + p.size / 2);
		ctx.rotate(p.rotation);

		ctx.fillRect(-p.size / 2,  -p.size / 2, p.size, p.size);

		ctx.restore();
	});

	requestAnimationFrame(draw);	
}

function Piece (x, y) {
	this.x = x;
	this.y = y;
	this.size = (Math.random() * 0.5 + 0.75) * 15;
	this.gravity = (Math.random() * 0.5 + 0.75) * 0.5;
	this.rotation = (Math.PI * 2) * Math.random();
	this.rotationSpeed = (Math.PI * 2) * Math.random() * 0.0005;
	this.color = randomColor();
}

while (pieces.length < numberOfPieces) {
	pieces.push(new Piece(Math.random() * canvas.width, Math.random() * canvas.height));
}

update();
draw();