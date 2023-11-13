document.addEventListener("DOMContentLoaded", function () {
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
      const totalImageWidth = firstImg.clientWidth * carousel.childElementCount;
      const containerWidth = carousel.clientWidth;
      const scrollableWidth = totalImageWidth - containerWidth;

      // showing and hiding prev/next icon according to carousel scroll left value
      arrowIcons[0].style.display =
        carousel.scrollLeft === 0 ? "none" : "block";
      arrowIcons[1].style.display =
        carousel.scrollLeft >= scrollableWidth ? "none" : "block";
    };

    arrowIcons.forEach((icon) => {
      icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
        let direction = icon.classList.contains("fa-angle-left") ? -1 : 1;

        // if clicked icon is left, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft += direction * firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
      });
    });

    // const autoSlide = () => {
    //   // if there is no image left to scroll then return from here
    //   if (
    //     carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) >
    //       -1 ||
    //     carousel.scrollLeft <= 0
    //   )
    //     return;

    //   positionDiff = Math.abs(positionDiff); // making positionDiff value positive
    //   let firstImgWidth = firstImg.clientWidth + 14;
    //   // getting difference value that needs to add or reduce from carousel left to take middle img center
    //   let valDifference = firstImgWidth - positionDiff;

    //   if (carousel.scrollLeft > prevScrollLeft) {
    //     // if the user is scrolling to the right
    //     return (carousel.scrollLeft +=
    //       positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
    //   }
    //   // if the user is scrolling to the left
    //   carousel.scrollLeft -=
    //     positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    // };

    const autoSlide = () => {
      // if there is no image left to scroll then return from here
      if (
        carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) >
          -1 ||
        carousel.scrollLeft <= 0
      )
        return;

      positionDiff = Math.abs(positionDiff); // making positionDiff value positive

      // Calculate the center of the visible area
      const center = carousel.scrollLeft + carousel.clientWidth / 2;

      // Find the nearest image to the center
      const images = carousel.querySelectorAll("img");
      let closestImage;
      let minDistance = Number.MAX_SAFE_INTEGER;

      images.forEach((image) => {
        const imageCenter = image.offsetLeft + image.clientWidth / 2;
        const distance = Math.abs(center - imageCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestImage = image;
        }
      });

      // Scroll to the center of the closest image
      const targetScrollLeft =
        closestImage.offsetLeft +
        closestImage.clientWidth / 2 -
        carousel.clientWidth / 2;

      carousel.scrollLeft = targetScrollLeft;
    };

    const dragStart = (e) => {
      // updating global variables value on mouse down event
      isDragStart = true;
      prevPageX = e.pageX || e.touches[0].pageX;
      prevScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
      // scrolling images/carousel to the left according to the mouse pointer
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
});
