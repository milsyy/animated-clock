const clock = () => {
  const now = new Date();
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const faceColour = document.getElementById("faceColour");
  const borderColour = document.getElementById("borderColour");
  const numberLinesColour = document.getElementById("numberLinesColour");
  const largeHandsColour = document.getElementById("largeHandsColour");
  const secondHandColour = document.getElementById("secondHandColour");

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
  ctx.fillStyle = faceColour.value;
  ctx.fill();

  ctx.restore();

  // Draw hour lines
  ctx.save();

  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6);
    ctx.strokeStyle = numberLinesColour.value;
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
      ctx.strokeStyle = numberLinesColour.value;
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
  ctx.strokeStyle = largeHandsColour.value;
  ctx.lineWidth = 14;
  ctx.moveTo(-20, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();

  ctx.restore();

  // Draw minute hand
  ctx.save();

  ctx.beginPath();
  ctx.rotate((Math.PI / 30) * min) + (Math.PI / 360) * sec;
  ctx.strokeStyle = largeHandsColour.value;
  ctx.lineWidth = 10;
  ctx.moveTo(-20, 0);
  ctx.lineTo(113, 0);
  ctx.stroke();

  ctx.restore();

  // Draw second hand
  ctx.save();

  ctx.beginPath();
  ctx.fillStyle = secondHandColour.value;
  ctx.arc(0, 0, 7, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.rotate((Math.PI / 30) * sec);
  ctx.strokeStyle = secondHandColour.value;
  ctx.lineWidth = 6;
  ctx.moveTo(-20, 0);
  ctx.lineTo(115, 0);
  ctx.stroke();
  ctx.restore();

  ctx.restore(); // Restore default state

  requestAnimationFrame(clock);
};

requestAnimationFrame(clock);
