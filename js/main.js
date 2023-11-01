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
    let imageWidth = firstImg.clientWidth + 14;
    let threshold = imageWidth;
    arrowIcons[0].style.display = carousel.scrollLeft === 0 ? "none" : "block";
    arrowIcons[1].style.display =
      carousel.scrollLeft >= scrollWidth ? "none" : "block";
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
    if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth)
      return;

    // Calculate the width of the first image including margins and paddings
    let firstImage = carousel.querySelector("img");
    let firstImageWidth = firstImage.clientWidth + 14; // Including margins and paddings

    // Calculate the current index of the centered image
    let currentIndex = Math.round(
      (carousel.scrollLeft + carousel.clientWidth / 2) / firstImageWidth
    );

    // Calculate the target index based on the scroll direction
    let targetIndex = Math.floor(
      (carousel.scrollLeft + carousel.clientWidth / 2) / firstImageWidth
    );

    // Calculate the target scroll position to center the current image
    let targetScrollLeft =
      targetIndex * firstImageWidth -
      (carousel.clientWidth - firstImageWidth) / 2;

    // Animate scrolling to the target position (optional, can be removed if not needed)
    const scrollOptions = {
      left: targetScrollLeft,
      behavior: "smooth", // Add smooth scrolling behavior if desired
    };
    carousel.scrollTo(scrollOptions);

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
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
  };

  const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");
    if (!isDragging) return;
    isDragging = false;
    autoSlide();
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

  carousel.addEventListener("scroll", () => {
    showHideIcons();
  });

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("touchstart", dragStart);
  document.addEventListener("mousemove", dragging);
  carousel.addEventListener("touchmove", dragging);
  document.addEventListener("mouseup", dragStop);
  carousel.addEventListener("touchend", dragStop);
});
