const sliders = document.querySelectorAll(
  ".galery__slider, .galery__slider2, .galery__slider3"
);

sliders.forEach((carousel) => {
  const firstImg = carousel.querySelector("img");
  const arrowIcons = carousel
    .closest(".slider__box")
    .querySelectorAll(".wrapper i");
  let isDragStart = false,
    isDragging = false,
    prevPageX,
    prevScrollLeft,
    positionDiff,
    startX,
    startY;

  const showHideIcons = () => {
    let containerWidth = carousel.clientWidth;
    let scrollWidth = carousel.scrollWidth - containerWidth;

    // Calculate threshold based on image width
    let imageWidth = carousel.querySelector("img").clientWidth + 14;

    // Show/hide left arrow
    arrowIcons[0].style.display = carousel.scrollLeft === 0 ? "none" : "block";

    // Show/hide right arrow
    arrowIcons[1].style.display =
      carousel.scrollLeft >= scrollWidth - imageWidth ? "none" : "block";
  };

  // Touch swipe gestures
  carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].pageX;
    startY = e.touches[0].pageY;
  });

  carousel.addEventListener("touchmove", (e) => {
    if (!startX || !startY) return;
    let endX = e.touches[0].pageX;
    let endY = e.touches[0].pageY;
    let diffX = startX - endX;
    let diffY = startY - endY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      e.preventDefault();
      carousel.scrollLeft += diffX;
      showHideIcons();
    }

    startX = null;
    startY = null;
  });

  // Centered scroll on click
  carousel.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      const clickedImageIndex = Array.from(carousel.children).indexOf(e.target);
      const imageWidth = firstImg.clientWidth + 14;
      carousel.scrollLeft =
        clickedImageIndex * imageWidth -
        (carousel.clientWidth - imageWidth) / 2;
      showHideIcons();
    }
  });

  // Drag and auto slide logic...
  const autoSlide = () => {
    // Calculate the width of the first image including margins and paddings
    const firstImage = carousel.querySelector("img");
    const firstImageWidth = firstImage.clientWidth + 14; // Including margins and paddings

    // Calculate the current index of the centered image
    const currentIndex = Math.round(
      (carousel.scrollLeft + carousel.clientWidth / 2) / firstImageWidth
    );

    // Calculate the target scroll position to center the current image
    const targetScrollLeft =
      currentIndex * firstImageWidth -
      (carousel.clientWidth - firstImageWidth) / 2;

    // Limit the target scroll position to prevent scrolling out of bounds
    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
    const minScrollLeft = 0;
    const clampedTargetScrollLeft = Math.max(
      minScrollLeft,
      Math.min(targetScrollLeft, maxScrollLeft)
    );

    // Animate scrolling to the target position
    carousel.scrollTo({
      left: clampedTargetScrollLeft,
      behavior: "smooth",
    });

    // Update arrow visibility after scrolling
    showHideIcons();
  };

  const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
  };

  const dragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;

    // Make dragging easier for both directions
    const sensitivity = 1.5; // Adjust this value as needed
    carousel.scrollLeft = prevScrollLeft - positionDiff * sensitivity;

    showHideIcons();
  };

  const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if (!isDragging) return;

    isDragging = false;

    // Calculate the width of the first image including margins and paddings
    const firstImage = carousel.querySelector("img");
    const firstImageWidth = firstImage.clientWidth + 14; // Including margins and paddings

    // Calculate the current index of the centered image
    const currentIndex = Math.round(
      (carousel.scrollLeft + carousel.clientWidth / 2) / firstImageWidth
    );

    // Calculate the target scroll position to center the current image
    const targetScrollLeft =
      currentIndex * firstImageWidth -
      (carousel.clientWidth - firstImageWidth) / 2;

    // Limit the target scroll position to prevent scrolling out of bounds
    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
    carousel.scrollLeft = Math.min(
      maxScrollLeft,
      Math.max(0, targetScrollLeft)
    );

    // Update arrow visibility after scrolling
    showHideIcons();
  };

  arrowIcons[0].addEventListener("click", () => {
    carousel.scrollLeft -= firstImg.clientWidth + 14;
    showHideIcons();
    // Check if at the start, hide the left arrow
    if (carousel.scrollLeft === 0) {
      arrowIcons[0].style.display = "none";
    }
  });

  arrowIcons[1].addEventListener("click", () => {
    carousel.scrollLeft += firstImg.clientWidth + 14;
    showHideIcons();
    // Check if at the end, hide the right arrow
    let containerWidth = carousel.clientWidth;
    let scrollWidth = carousel.scrollWidth - containerWidth;
    let imageWidth = firstImg.clientWidth + 14;
    let threshold = imageWidth;
    if (carousel.scrollLeft >= scrollWidth - threshold) {
      arrowIcons[1].style.display = "none";
    }
  });

  let scrollingTimeout;

  carousel.addEventListener("scroll", () => {
    showHideIcons();

    if (scrollingTimeout) {
      clearTimeout(scrollingTimeout);
    }

    scrollingTimeout = setTimeout(() => {
      autoSlide();
    }, 100); // Adjust the timeout value as needed
  });

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("touchstart", dragStart);
  document.addEventListener("mousemove", dragging);
  carousel.addEventListener("touchmove", dragging);
  document.addEventListener("mouseup", dragStop);
  carousel.addEventListener("touchend", dragStop);
});
