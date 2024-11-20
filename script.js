const { canvas, ctx } = prepareCanvas();

const drones = JSON.parse(localStorage.drones || '[]');

showDrones();

canvas.onclick = placeDrone;
window.onkeydown = handleRemove;
window.addEventListener('resize', showDrones);

runSimulation();

function runSimulation() {
  requestAnimationFrame(runSimulation);
  updatePositions();
  showDrones();
}

function updatePositions() {
  drones.forEach(([ x, y ], i) => {
    drones[i] = [x + rndShift(), y + rndShift()];
  });
}

function rndShift() {
  return Math.random() * 0.6 - 0.3;
}

function handleRemove(e) {
  if (e.key === 'Backspace') {
    drones.pop();
    localStorage.drones = JSON.stringify(drones);
    showDrones();  
  }
}

function placeDrone(e) {
  const drone = [e.x, e.y]
  
  drones.push(drone);
  localStorage.drones = JSON.stringify(drones);
  showDrone(...drone);
}

function showDrones() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drones.forEach(([ x, y ]) => {
    showDrone(x, y);
  });
}

function showDrone(x, y) {
  drawCircle(x, y, 2, 'yellow');
}

function drawCircle(x, y, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

function prepareCanvas() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  document.body.appendChild(canvas);

  canvas.width = window.innerWidth - 1;
  canvas.height = window.innerHeight - 1;

  window.onresize = updateSize;

  return { canvas, ctx }
}

function updateSize() {
  canvas.width = window.innerWidth - 1;
  canvas.height = window.innerHeight - 1;
}