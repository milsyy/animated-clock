const canvas = document.getElementById("canvas");
const styles = JSON.parse(localStorage.getItem("clockStyles")) || {};
const faceColour = document.getElementById("faceColour");
const borderColour = document.getElementById("borderColour");
const numberLinesColour = document.getElementById("numberLinesColour");
const largeHandsColour = document.getElementById("largeHandsColour");
const secondHandColour = document.getElementById("secondHandColour");

const clock = () => {
  const now = new Date();
  const ctx = canvas.getContext("2d");

  // Setup canvas
  ctx.save(); // Save default state
  ctx.clearRect(0, 0, 400, 400);
  ctx.translate(200, 200); // put 0,0 in the middle
  ctx.rotate(-Math.PI / 2); // rotate clock -90deg

  // Set default styles
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = "#f4f4f4";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";

  // Draw clock face/border
  ctx.save();

  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.strokeStyle = borderColour.value;
  ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
  ctx.stroke(); // outline appears thinner due to the fill being on top of the stroke, call fill first to avoid this
  ctx.fillStyle = styles.faceColour;
  ctx.fill();

  ctx.restore();

  // Draw hour lines
  ctx.save();

  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6);
    ctx.strokeStyle = styles.numberLinesColour;
    ctx.moveTo(105, 0);
    ctx.lineTo(125, 0);
    ctx.stroke();
  }

  ctx.restore();

  // Draw minute lines
  ctx.save();

  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      ctx.beginPath();
      ctx.moveTo(122, 0);
      ctx.lineTo(125, 0);
      ctx.strokeStyle = styles.numberLinesColour;
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 30);
  }

  ctx.restore();

  // Get current time
  const hr = now.getHours() % 12;
  const min = now.getMinutes();
  const sec = now.getSeconds();

  // Draw hour hand
  ctx.save();

  ctx.beginPath();
  ctx.rotate((Math.PI / 6) * hr + (Math.PI / 360) * min) +
    (Math.PI / 21600) * sec;
  ctx.strokeStyle = styles.largeHandsColour;
  ctx.lineWidth = 14;
  ctx.moveTo(-20, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();

  ctx.restore();

  // Draw minute hand
  ctx.save();

  ctx.beginPath();
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctx.strokeStyle = styles.largeHandsColour;
  ctx.lineWidth = 10;
  ctx.moveTo(-20, 0);
  ctx.lineTo(113, 0);
  ctx.stroke();

  ctx.restore();

  // Draw second hand
  ctx.save();

  ctx.beginPath();
  ctx.fillStyle = styles.secondHandColour;
  ctx.arc(0, 0, 7, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.rotate((Math.PI / 30) * sec);
  ctx.strokeStyle = styles.secondHandColour;
  ctx.lineWidth = 6;
  ctx.moveTo(-20, 0);
  ctx.lineTo(115, 0);
  ctx.stroke();
  ctx.restore();

  ctx.restore(); // Restore default state

  styles.faceColour = faceColour.value;
  styles.borderColour = borderColour.value;
  styles.numberLinesColour = numberLinesColour.value;
  styles.largeHandsColour = largeHandsColour.value;
  styles.secondHandColour = secondHandColour.value;
  localStorage.setItem("clockStyles", JSON.stringify(styles));

  requestAnimationFrame(clock);
};

requestAnimationFrame(clock);

document.getElementById("save-img").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "clock.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

window.addEventListener("DOMContentLoaded", () => {
  if (Object.keys(styles).length !== 0) {
    faceColour.value = styles.faceColour;
    borderColour.value = styles.borderColour;
    numberLinesColour.value = styles.numberLinesColour;
    largeHandsColour.value = styles.largeHandsColour;
    secondHandColour.value = styles.secondHandColour;
  }
});
