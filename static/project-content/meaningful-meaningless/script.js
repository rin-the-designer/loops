// Canvas Gallery System
document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("gallery-canvas");
  const ctx = canvas.getContext("2d");

  // ===== Config =====
  let VIEWPORT_WIDTH = window.innerWidth;
  let VIEWPORT_HEIGHT = window.innerHeight;
  let CANVAS_SIZE = Math.max(VIEWPORT_WIDTH, VIEWPORT_HEIGHT) * (3 / 10);

  // Layout (derived from canvas size)
  let DESCRIPTION_WIDTH = CANVAS_SIZE * (3 / 10);
  let DESCRIPTION_HEIGHT = CANVAS_SIZE * (2 / 10);
  let GAP_CANVAS_DESCRIPTION = CANVAS_SIZE * (1 / 10);
  let GAP_ARTWORK_GROUPS = CANVAS_SIZE * (2 / 10);

  // Typography (derived from description width)
  let DESCRIPTION_PADDING = DESCRIPTION_WIDTH * (1 / 20);
  let FONT_SIZE_TITLE = DESCRIPTION_WIDTH * (1 / 20);
  let FONT_SIZE_DETAILS = FONT_SIZE_TITLE * (5 / 6);
  let LINE_HEIGHT = FONT_SIZE_TITLE;
  let GAP_ARTIST_YEAR = FONT_SIZE_TITLE * (2 / 3);
  let GAP_LANGUAGE_SECTIONS = GAP_ARTIST_YEAR * 2;

  // Animation
  const EASING_SPEED = 0.03;

  // High-DPI
  const dpr = window.devicePixelRatio || 1;

  function setupCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";
    if (typeof artworks !== "undefined") calculatePositions();
  }

  // View state
  let isZoomed = false;
  let scale = 1;
  let offsetX = 0;
  let offsetY = 0;
  let targetScale = 1;
  let targetOffsetX = 0;
  let targetOffsetY = 0;

  // Data
  const artworks = [
    {
      id: "A1",
      "artist-kr": "김인종 1998-",
      "title-kr": "<무의미>",
      year: "2025",
      "medium-kr": "디스플레이에 코드",
      "size-kr": "화면 너비 x 화면 높이",
      "artist-en": "Rin Kim 1998-",
      "title-en": "Meaningless",
      "medium-en": "JavaScript on <canvas>",
      "size-en": "View width x View height",
    },
    {
      id: "A2",
      "artist-kr": "김인종 1998-",
      "title-kr": "<유의미>",
      year: "2025",
      "medium-kr": "디스플레이에 코드",
      "size-kr": "화면 너비 x 화면 높이",
      "artist-en": "Rin Kim 1998-",
      "title-en": "Meaningful",
      "medium-en": "JavaScript on <canvas>",
      "size-en": "View width x View height",
    },
  ];

  // Init + resize
  setupCanvas();
  window.addEventListener("resize", () => {
    VIEWPORT_WIDTH = window.innerWidth;
    VIEWPORT_HEIGHT = window.innerHeight;
    CANVAS_SIZE = Math.max(VIEWPORT_WIDTH, VIEWPORT_HEIGHT) * (3 / 10);
    DESCRIPTION_WIDTH = CANVAS_SIZE * (3 / 10);
    DESCRIPTION_HEIGHT = CANVAS_SIZE * (2 / 10);
    GAP_CANVAS_DESCRIPTION = CANVAS_SIZE * (1 / 10);
    GAP_ARTWORK_GROUPS = CANVAS_SIZE * (2 / 10);
    DESCRIPTION_PADDING = DESCRIPTION_WIDTH * (1 / 20);
    FONT_SIZE_TITLE = DESCRIPTION_WIDTH * (1 / 20);
    FONT_SIZE_DETAILS = FONT_SIZE_TITLE * (5 / 6);
    LINE_HEIGHT = FONT_SIZE_TITLE;
    GAP_ARTIST_YEAR = FONT_SIZE_TITLE * (2 / 3);
    GAP_LANGUAGE_SECTIONS = GAP_ARTIST_YEAR * 2;
    setupCanvas();
  });

  // Layout calc
  function calculatePositions() {
    const isWidthLonger = VIEWPORT_WIDTH > VIEWPORT_HEIGHT;
    const canvasWidth = canvas.getBoundingClientRect().width;
    const canvasHeight = canvas.getBoundingClientRect().height;

    artworks.forEach((artwork) => {
      artwork.canvasWidth = CANVAS_SIZE;
      artwork.canvasHeight = CANVAS_SIZE;
      artwork.descriptionWidth = DESCRIPTION_WIDTH;
      artwork.descriptionHeight = DESCRIPTION_HEIGHT;
    });

    const artworkGroupWidth =
      CANVAS_SIZE + GAP_CANVAS_DESCRIPTION + DESCRIPTION_WIDTH;

    if (isWidthLonger) {
      const totalWidth =
        artworks.length * artworkGroupWidth +
        (artworks.length - 1) * GAP_ARTWORK_GROUPS;
      const startX = (canvasWidth - totalWidth) / 2;

      artworks.forEach((artwork, index) => {
        const groupX =
          startX + index * (artworkGroupWidth + GAP_ARTWORK_GROUPS);
        artwork.canvasX = groupX;
        artwork.canvasY = (canvasHeight - CANVAS_SIZE) / 2;
        artwork.descriptionX = groupX + CANVAS_SIZE + GAP_CANVAS_DESCRIPTION;
        artwork.descriptionY =
          artwork.canvasY + CANVAS_SIZE - artwork.descriptionHeight;
        artwork.canvasCenterX = artwork.canvasX + artwork.canvasWidth / 2;
        artwork.canvasCenterY = artwork.canvasY + artwork.canvasHeight / 2;
        artwork.descriptionCenterX =
          artwork.descriptionX + artwork.descriptionWidth / 2;
        artwork.descriptionCenterY =
          artwork.descriptionY + artwork.descriptionHeight / 2;
      });
    } else {
      const totalHeight =
        artworks.length * CANVAS_SIZE +
        (artworks.length - 1) * GAP_ARTWORK_GROUPS;
      const startY = (canvasHeight - totalHeight) / 2;

      artworks.forEach((artwork, index) => {
        artwork.canvasX = (canvasWidth - artworkGroupWidth) / 2;
        artwork.canvasY = startY + index * (CANVAS_SIZE + GAP_ARTWORK_GROUPS);
        artwork.descriptionX =
          artwork.canvasX + CANVAS_SIZE + GAP_CANVAS_DESCRIPTION;
        artwork.descriptionY =
          artwork.canvasY + CANVAS_SIZE - artwork.descriptionHeight;
        artwork.canvasCenterX = artwork.canvasX + artwork.canvasWidth / 2;
        artwork.canvasCenterY = artwork.canvasY + artwork.canvasHeight / 2;
        artwork.descriptionCenterX =
          artwork.descriptionX + artwork.descriptionWidth / 2;
        artwork.descriptionCenterY =
          artwork.descriptionY + artwork.descriptionHeight / 2;
      });
    }
  }

  function drawRect(x, y, width, height) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.closePath();
  }

  // Artwork canvas
  function drawArtworkCanvas(artwork) {
    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.scale(scale, scale);

    // Base panel
    ctx.shadowColor = "rgba(0, 0, 0, 1)";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = CANVAS_SIZE * (1 / 20);
    ctx.shadowOffsetY = CANVAS_SIZE * (1 / 20);
    ctx.fillStyle = "#ffffff";
    drawRect(
      artwork.canvasX,
      artwork.canvasY,
      artwork.canvasWidth,
      artwork.canvasHeight
    );
    ctx.fill();
    ctx.shadowColor = "transparent";

    // Artwork content
    if (artwork.id === "A1" && typeof drawA1 === "function") {
      drawA1(
        ctx,
        artwork.canvasX,
        artwork.canvasY,
        artwork.canvasWidth,
        artwork.canvasHeight
      );
    } else if (artwork.id === "A2" && typeof drawA2 === "function") {
      drawA2(
        ctx,
        artwork.canvasX,
        artwork.canvasY,
        artwork.canvasWidth,
        artwork.canvasHeight
      );
    } else {
      ctx.fillStyle = "#333333";
      ctx.font = "16px Pretendard Variable, Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        artwork.id.toUpperCase(),
        artwork.canvasX + artwork.canvasWidth / 2,
        artwork.canvasY + artwork.canvasHeight / 2
      );
    }

    ctx.restore();
  }

  // Description panel
  function drawDescription(artwork) {
    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.scale(scale, scale);

    ctx.shadowColor = "rgba(0, 0, 0, 1)";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = DESCRIPTION_WIDTH * (1 / 10);
    ctx.shadowOffsetY = DESCRIPTION_WIDTH * (1 / 10);
    ctx.fillStyle = "#ffffff";
    drawRect(
      artwork.descriptionX,
      artwork.descriptionY,
      artwork.descriptionWidth,
      artwork.descriptionHeight
    );
    ctx.fill();
    ctx.shadowColor = "transparent";

    ctx.fillStyle = "#000000";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    const maxWidth = artwork.descriptionWidth - DESCRIPTION_PADDING * 2;
    let currentY = artwork.descriptionY + DESCRIPTION_PADDING;

    function drawWrappedText(text, fontSize, isBold = false) {
      ctx.font = `${
        isBold ? "bold" : ""
      } ${fontSize}px Pretendard Variable, Inter, sans-serif`;
      const words = text.split(" ");
      let line = "";
      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + " ";
        if (ctx.measureText(testLine).width > maxWidth && i > 0) {
          ctx.fillText(
            line,
            artwork.descriptionX + DESCRIPTION_PADDING,
            currentY
          );
          line = words[i] + " ";
          currentY += LINE_HEIGHT;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, artwork.descriptionX + DESCRIPTION_PADDING, currentY);
      currentY += LINE_HEIGHT;
    }

    // Korean Text
    drawWrappedText(
      artwork["artist-kr"] + ", " + artwork["title-kr"],
      FONT_SIZE_TITLE,
      true
    );
    currentY += GAP_ARTIST_YEAR;
    drawWrappedText(
      artwork.year + ", " + artwork["medium-kr"] + ", " + artwork["size-kr"],
      FONT_SIZE_DETAILS,
      false
    );

    // Gap
    currentY += GAP_LANGUAGE_SECTIONS;

    // English Text
    drawWrappedText(
      artwork["artist-en"] + ", " + artwork["title-en"],
      FONT_SIZE_TITLE,
      true
    );
    currentY += GAP_ARTIST_YEAR;
    drawWrappedText(
      artwork.year + ", " + artwork["medium-en"] + ", " + artwork["size-en"],
      FONT_SIZE_DETAILS,
      false
    );

    ctx.restore();
  }

  // Hit-tests
  function isPointInDescription(x, y, artwork) {
    const sx = (x - offsetX) / scale;
    const sy = (y - offsetY) / scale;
    return (
      sx >= artwork.descriptionX &&
      sx <= artwork.descriptionX + artwork.descriptionWidth &&
      sy >= artwork.descriptionY &&
      sy <= artwork.descriptionY + artwork.descriptionHeight
    );
  }
  function isPointInArtworkCanvas(x, y, artwork) {
    const sx = (x - offsetX) / scale;
    const sy = (y - offsetY) / scale;
    return (
      sx >= artwork.canvasX &&
      sx <= artwork.canvasX + artwork.canvasWidth &&
      sy >= artwork.canvasY &&
      sy <= artwork.canvasY + artwork.canvasHeight
    );
  }

  // Zoom helpers
  function computeDynamicScale(targetWidth, targetHeight) {
    const shorterViewport = Math.min(
      canvas.getBoundingClientRect().width,
      canvas.getBoundingClientRect().height
    );
    const desired = shorterViewport * 0.9;
    const basis = Math.max(targetWidth, targetHeight);
    return desired / basis;
  }
  function zoomToCenter(centerX, centerY, targetWidth, targetHeight) {
    isZoomed = true;
    targetScale = computeDynamicScale(targetWidth, targetHeight);
    const viewCenterX = canvas.getBoundingClientRect().width / 2;
    const viewCenterY = canvas.getBoundingClientRect().height / 2;
    targetOffsetX = viewCenterX - centerX * targetScale;
    targetOffsetY = viewCenterY - centerY * targetScale;
  }
  function zoomToDescription(artwork) {
    zoomToCenter(
      artwork.descriptionCenterX,
      artwork.descriptionCenterY,
      artwork.descriptionWidth,
      artwork.descriptionHeight
    );
  }
  function zoomToArtworkCanvas(artwork) {
    zoomToCenter(
      artwork.canvasCenterX,
      artwork.canvasCenterY,
      artwork.canvasWidth,
      artwork.canvasHeight
    );
  }
  function closeZoom() {
    isZoomed = false;
    targetScale = 1;
    targetOffsetX = 0;
    targetOffsetY = 0;
  }

  // Draw loop
  function animate() {
    scale += (targetScale - scale) * EASING_SPEED;
    offsetX += (targetOffsetX - offsetX) * EASING_SPEED;
    offsetY += (targetOffsetY - offsetY) * EASING_SPEED;

    ctx.fillStyle = "#191919";
    ctx.fillRect(
      0,
      0,
      canvas.getBoundingClientRect().width,
      canvas.getBoundingClientRect().height
    );

    artworks.forEach((artwork) => {
      drawArtworkCanvas(artwork);
      drawDescription(artwork);
    });

    requestAnimationFrame(animate);
  }

  // Events
  function getMousePosition(e) {
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }
  function findHoveredTarget(x, y) {
    for (let artwork of artworks) {
      if (isPointInDescription(x, y, artwork))
        return { type: "description", artwork };
      if (isPointInArtworkCanvas(x, y, artwork))
        return { type: "canvas", artwork };
    }
    return null;
  }
  canvas.addEventListener("click", function (e) {
    const { x, y } = getMousePosition(e);

    const hit = findHoveredTarget(x, y);

    // If already zoomed: switch to new target if any; otherwise close
    if (isZoomed) {
      if (hit && hit.type === "description") {
        zoomToDescription(hit.artwork);
      } else if (hit && hit.type === "canvas") {
        zoomToArtworkCanvas(hit.artwork);
      } else {
        closeZoom();
      }
      return;
    }

    // Not zoomed yet
    if (!hit) return;

    if (hit.type === "description") {
      zoomToDescription(hit.artwork);
    } else if (hit.type === "canvas") {
      zoomToArtworkCanvas(hit.artwork);
    }

    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape") {
        closeZoom();
      }
    });
  });
  canvas.addEventListener("mousemove", function (e) {
    const { x, y } = getMousePosition(e);
    const hit = findHoveredTarget(x, y);
    canvas.style.cursor = hit ? "pointer" : "default";
  });

  // Start
  animate();
});
