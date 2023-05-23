import EnemyController from "./enemy.controller.js";
import Player from "./player.js";
import BulletController from "./bullet.controller.js"

const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")
const levelContainer = document.querySelector(".level")
const retryBtn = document.querySelector(".retry")
const nextBtn = document.querySelector(".next")
let playerBulletCount = 10;
let enemyBulletCount = 4;

canvas.height = 500;
canvas.width = 700;

const background = new Image()
background.src = "images/background.png"
let level = 1

let enemyBulletController = new BulletController(canvas, enemyBulletCount, "white")
let playerBulletController = new BulletController(canvas, playerBulletCount, "red", true)
let enemyController = new EnemyController(canvas, enemyBulletController, playerBulletController)
let player = new Player(canvas, 3, playerBulletController)
let isGameOver = false
let didWin = false

playerBulletController.draw(ctx);

nextBtn.addEventListener("click", () => {
	if (didWin) {
		level += 1
		enemyBulletCount += 1
		playerBulletCount -= 1
		enemyBulletController = new BulletController(canvas, enemyBulletCount, "white")
		playerBulletController = new BulletController(canvas, playerBulletCount, "red", true)
		enemyController = new EnemyController(canvas, enemyBulletController, playerBulletController)
		player = new Player(canvas, 3, playerBulletController)
		isGameOver = false
		didWin = false
		enemyController.defaultXVelocity = level;
		levelContainer.innerHTML = enemyController.defaultXVelocity
	}

})

retryBtn.addEventListener("click", () => {
	window.location.reload();
})

function game() {
	checkGameOver()
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
	displayGameOver()
	if (!isGameOver) {
		enemyController.draw(ctx)
		player.draw(ctx)
		playerBulletController.draw(ctx);
		enemyBulletController.draw(ctx);
	}
}

function displayGameOver() {
	if (isGameOver) {
		let text = didWin ? "You Win" : "Game Over";
		let textOffset = didWin ? 3.5 : 5;

		ctx.fillStyle = "white"
		ctx.font = "70px Verdana, Geneva, Tahoma, sans-serif"
		ctx.fillText(text, canvas.width / textOffset, canvas.height / 2)
	}
}

function checkGameOver() {
	if (isGameOver) {
		return
	}
	if (enemyBulletController.collideWith(player)) {
		isGameOver = true
	}
	if (enemyController.collideWith(player)) {
		isGameOver = true
	}
	if (enemyController.enemyRows.length === 0) {
		didWin = true
		isGameOver = true
	}

}

setInterval(game, 1000 / 60)