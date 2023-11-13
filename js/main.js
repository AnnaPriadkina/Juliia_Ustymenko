document.addEventListener("DOMContentLoaded", function () {
  const sliders = document.querySelectorAll(
    ".galery__slider, .galery__slider2, .galery__slider3"
  );

  sliders.forEach((carousel) => {
    const firstImg = carousel.querySelector("img");
    const arrowIcons = carousel
      .closest(".slider__box")
      .querySelectorAll(".wrapper i");

    const showHideIcons = () => {
      const containerWidth = carousel.clientWidth;
      const imageWidth = firstImg.clientWidth + 14;

      // Calculate the total width of all images in the gallery
      const totalImagesWidth = carousel.scrollWidth;

      // Check if at the start, hide the left arrow
      arrowIcons[0].style.display =
        carousel.scrollLeft === 0 ? "none" : "block";

      // Check if at the end, hide the right arrow
      arrowIcons[1].style.display =
        carousel.scrollLeft >= totalImagesWidth - containerWidth - 1
          ? "none"
          : "block";
    };

    const autoSlide = () => {
      const container = carousel.parentElement;
      const containerWidth = container.clientWidth;
      const imageWidth = firstImg.clientWidth + 14;
      const currentIndex = Math.round(
        (carousel.scrollLeft + containerWidth / 2) / imageWidth
      );

      const targetScrollLeft =
        currentIndex * imageWidth - (containerWidth - imageWidth) / 2;

      const maxScrollLeft = carousel.scrollWidth - containerWidth;
      const clampedTargetScrollLeft = Math.max(
        0,
        Math.min(targetScrollLeft, maxScrollLeft)
      );

      carousel.scrollTo({
        left: clampedTargetScrollLeft,
        behavior: "smooth",
      });

      // Update arrow visibility after scrolling
      showHideIcons();
    };

    arrowIcons[0].addEventListener("click", () => {
      carousel.scrollLeft -= firstImg.clientWidth + 14;
      showHideIcons();
      if (carousel.scrollLeft === 0) {
        arrowIcons[0].style.display = "none";
      }
    });

    arrowIcons[1].addEventListener("click", () => {
      carousel.scrollLeft += firstImg.clientWidth + 14;
      showHideIcons();
      const containerWidth = carousel.clientWidth;
      const scrollWidth = carousel.scrollWidth - containerWidth;
      const imageWidth = firstImg.clientWidth + 14;
      const threshold = imageWidth;
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
  });
});
