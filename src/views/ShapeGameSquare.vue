<template>
  <div class="square" :style="{ backgroundImage: `url(${shapeGameSquareBg})` }">
    <BackButton :name="pageRoute" />
    <HomeButton />
    <canvas id="dots" class="desenho"></canvas>



    <main class="muito-bem">
      <section>
        <article>
          <img :src="Gatinho" alt="Gatinho">
        </article>

        <div>
          <img :src="MuitoBem" alt="Muito Bem">
          <img :src="Proxima" @click='voltaPraHome' alt="Seta">
        </div>

      </section>
    </main>

  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const voltaPraHome = () => router.push("/connecting-dots/");

import Gatinho from '../assets/images/0-smile.jpeg'
import MuitoBem from '../assets/images/2-muito-bem.jpeg'
import Proxima from '../assets/images/1-proxima.jpeg'

import { onMounted, ref } from "vue";
import shapeGameSquareBg from "../assets/images/shapeGameSquareBg.png";
import BackButton from "../components/BackButton.vue";
import HomeButton from "../components/HomeButton.vue";

const pageRoute = ref("/connecting-dots/shape");

let dots = [];
let guideDots = [];
let currentIndex = 0;
let drawingCompleted = false;

let lastPos = { x: 100, y: 160 };
let currentPos = { x: 100, y: 160 };
let dotSize = 12;

const guidePoints = [
  { x: 21, y: 25 },
  { x: 400, y: 25 },
  { x: 400, y: 390 },
  { x: 23, y: 390 },
];

class Dot {
  constructor(x, y, strokeColor) {
    this.x = x;
    this.y = y;
    this.strokeColor = strokeColor;
  }
  connect(px, py, ctx) {
    ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = 10; // Especifique a largura da linha aqui
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(px, py);
    ctx.stroke();
  }
  plot(ctx) {
    ctx.fillStyle = "rgb(226, 126, 110)";
    ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = 3; // Especifique a largura da borda aqui
    ctx.beginPath();
    ctx.arc(this.x, this.y, dotSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  within(px, py) {
    let d = Math.sqrt(Math.pow(px - this.x, 2) + Math.pow(py - this.y, 2));
    return d < dotSize;
  }
}

onMounted(() => {
  const canvas = document.getElementById("dots");
  const context = canvas.getContext("2d");
  canvas.width = 420;
  canvas.height = 420;

  for (let i = 0; i < guidePoints.length; i++) {
    guideDots.push(new Dot(guidePoints[i].x, guidePoints[i].y, "rgb(120, 120, 120)"));
  }

  canvas.addEventListener("mousedown", (event) => {
    currentPos.x = event.clientX - canvas.getBoundingClientRect().left;
    currentPos.y = event.clientY - canvas.getBoundingClientRect().top;
    mousePressed();
  });

  canvas.addEventListener("mousemove", (event) => {
    currentPos.x = event.clientX - canvas.getBoundingClientRect().left;
    currentPos.y = event.clientY - canvas.getBoundingClientRect().top;
  });

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < guideDots.length; i++) {
      guideDots[i].plot(context);
    }

    for (let i = 0; i < dots.length; i++) {
      dots[i].plot(context);
      if (i > 0) {
        dots[i].connect(dots[i - 1].x, dots[i - 1].y, context);
      }
    }

    if (currentIndex === 0) {
      context.fillStyle = "rgb(226, 126, 110)";
      context.strokeStyle = "#E27E6E";
      context.lineWidth = 2;
      context.font = "24px Arial";
    } 
    
    else if (!drawingCompleted) {
      context.strokeStyle = "rgb(226, 126, 110)";
      context.lineWidth = 5;
      context.beginPath();
      context.moveTo(lastPos.x, lastPos.y);
      context.lineTo(currentPos.x, currentPos.y);
      context.stroke();
    } 
    
    else {
      fillVertex(context);
      context.fillStyle = "rgb(226, 126, 110)";
      context.strokeStyle = "rgb(222, 222, 222)";
      context.lineWidth = 10;
    }

    requestAnimationFrame(draw);
  }

  function fillVertex(ctx) {
    ctx.strokeStyle = "rgb(90, 90, 90)";
    ctx.fillStyle = "rgb(226, 126, 110)";
    ctx.lineWidth = 2; // Especifique a largura da linha aqui
    ctx.beginPath();
    for (let i = 0; i < dots.length; i++) {
      ctx.lineTo(dots[i].x, dots[i].y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  function mousePressed() {
    if (!drawingCompleted && guideDots[currentIndex].within(currentPos.x, currentPos.y)) {
      dots.push(new Dot(currentPos.x, currentPos.y, "#E27E6E"));
      currentIndex++;
      lastPos.x = currentPos.x;
      lastPos.y = currentPos.y;

      if (currentIndex === guideDots.length) {
        dots.push(new Dot(guideDots[0].x, guideDots[0].y, "#E27E6E"));
        document.querySelector('.muito-bem').classList.add('active')
        drawingCompleted = true;
      }

      if (currentIndex > guideDots.length) {
         
        
      }
    }
  }

  draw();
});
</script>

<style scoped>
.square {
  height: 100vh;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  overflow: hidden;
  display: grid;
  place-items: center;
}
#dots {
  z-index: 1000;
  width: 450px;
  height: 430px;
  position: relative;
  top: 3.3rem;
}

/* .desenho.active {
  background:red;
} */

.muito-bem {
  position:absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width:80vw;
  margin:auto;
  margin:auto;
  display:none;
  z-index:1000;
  place-items:center;
  height:100vh;
}

.muito-bem.active {
  display:grid;
}

.muito-bem section {
  display:grid;
  place-items:center;
}

.muito-bem img {
  object-fit:cover;
}

.muito-bem article {
  animation:just-appear .3s linear forwards;
}

.muito-bem article img {
  width:28rem;
  height:27rem;
  border-radius:.5rem; 
}

.muito-bem div {
  display:flex;
  justify-content:space-between;
  align-items:center;
  width:600px;
  position:relative;
  left:3.4rem;
  top:-.5rem;
  animation:from-bottom .3s linear forwards;
}

.muito-bem div img:first-child {
  width:31rem;
}

.muito-bem div img:last-child {
  cursor:pointer;
  border-radius:1rem;
  transition:.2s;
}

.muito-bem div img:last-child:hover {
  transform:scale(1.1);
  transition:.2s;
}

@keyframes just-appear {
  from {
    opacity:0;
    transform:translateY(-2rem);
  }

  to {
    opacity:1;
    transform:translateY(0);
  }
}

@keyframes from-bottom {
  from {
    opacity:0;
    transform:translateY(2rem);
  }

  to {
    opacity:1;
    transform:translateY(0);
  }
}
</style>
