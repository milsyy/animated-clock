const clock = () => {
  const now = new Date();
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // Setup canvas
  ctx.save(); // Save default state
  ctx.clearRect(0, 0, 500, 500);
  ctx.translate(250, 250); // put 0,0 in the middle
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
  ctx.strokeStyle = "#800000";
  ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
  ctx.stroke(); // outline appears thinner due to the fill being on top of the stroke, call fill first to avoid this
  ctx.fill();
  ctx.restore();

  // Draw hour lines
  ctx.save();
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6);
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
  ctx.strokeStyle = "#800000";
  ctx.lineWidth = 12;
  ctx.moveTo(-20, 0);
  ctx.lineTo(75, 0);
  ctx.stroke();

  ctx.restore();

  // Draw minute hand
  ctx.save();

  ctx.beginPath();
  ctx.rotate((Math.PI / 30) * min) + (Math.PI / 360) * sec;
  ctx.strokeStyle = "#800000";
  ctx.lineWidth = 12;
  ctx.moveTo(-20, 0);
  ctx.lineTo(113, 0);
  ctx.stroke();

  ctx.restore();

  // Draw second hand
  ctx.save();

  ctx.beginPath();
  ctx.fillStyle = "#f56f3b";
  ctx.arc(0, 0, 7, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.rotate((Math.PI / 30) * sec);
  ctx.strokeStyle = "#f56f3b";
  ctx.lineWidth = 6;
  ctx.moveTo(-20, 0);
  ctx.lineTo(115, 0);
  ctx.stroke();
  ctx.restore();

  ctx.restore(); // Restore default state

  requestAnimationFrame(clock);
};

requestAnimationFrame(clock);
