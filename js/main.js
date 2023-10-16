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
    positionDiff;

  const showHideIcons = () => {
    let containerWidth = carousel.clientWidth;
    let scrollWidth = carousel.scrollWidth - containerWidth;
    arrowIcons[0].style.display = carousel.scrollLeft === 0 ? "none" : "block";
    arrowIcons[1].style.display =
      carousel.scrollLeft >= scrollWidth ? "none" : "block";
  };

  arrowIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      let firstImgWidth = parseFloat(getComputedStyle(firstImg).width) + 14;
      carousel.scrollLeft +=
        icon.id === "left" ? -firstImgWidth : firstImgWidth;
      setTimeout(() => showHideIcons(), 60);
    });
  });

  const autoSlide = () => {
    if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth)
      return;
    positionDiff = Math.abs(positionDiff);
    let firstImgWidth = parseFloat(getComputedStyle(firstImg).width) + 14;
    let valDifference = firstImgWidth - positionDiff / 2;
    if (carousel.scrollLeft > prevScrollLeft) {
      carousel.scrollLeft +=
        positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    } else {
      carousel.scrollLeft -=
        positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
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

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("touchstart", dragStart);
  document.addEventListener("mousemove", dragging);
  carousel.addEventListener("touchmove", dragging);
  document.addEventListener("mouseup", dragStop);
  carousel.addEventListener("touchend", dragStop);
});
