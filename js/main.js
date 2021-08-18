const videoEl = document.querySelector(".video");
const videoImgs = videoEl.querySelectorAll(".video__img");
const imgContainerEl = videoEl.querySelector(".img-container");
const videoDotsContainer = videoEl.querySelector(".video__dots");
const videoDots = [];
const videoThumbnail = videoEl.querySelector(".video__thumbnail");

setDots(videoImgs);

function setDots(videoImgs) {
  videoImgs.forEach((videoImg, index) => {
    const videoDot = document.createElement("span");
    videoDot.classList.add("video__dots--dot");
    videoDot.dataset.index = index;
    videoDots.push(videoDot);
    videoDotsContainer.appendChild(videoDot);
  });
}

videoEl.addEventListener("mouseover", (event) => {
  videoThumbnail.classList.remove("show");
  imgContainerEl.classList.add("show");
});

videoEl.addEventListener("mouseleave", (event) => {
  videoThumbnail.classList.add("show");
  imgContainerEl.classList.remove("show");
  resetDotDisplayClasses(videoDots);
});

videoDotsContainer.addEventListener("click", (event) => {
  if (!event.target.classList.contains("video__dots--dot")) {
    return;
  }
  const dotIndex = +event.target.dataset.index;
  resetImgVisibilityClasses(videoImgs);
  resetDotDisplayClasses(videoDots);
  videoImgs[dotIndex].classList.add("show");
  videoDots[dotIndex].classList.add("current");
});

imgContainerEl.addEventListener("mousemove", (event) => {
  const videoElWidth = event.currentTarget.offsetWidth;
  const horizontalOffset = event.offsetX;
  const progress = (horizontalOffset / videoElWidth) * 100;
  resetImgVisibilityClasses(videoImgs);
  resetDotDisplayClasses(videoDots);
  setCurrentImg(progress, videoImgs, videoDots);
});

const setCurrentImg = (progress, videoImgs, videoDots) => {
  const step = 100 / videoImgs.length;

  const steps = new Array(videoImgs.length + 1)
    .fill(0)
    .map((current, index) => index * step); // => [0,25,50,75,100]

  for (let i = 0; i < steps.length - 1; i++) {
    if (between(progress, steps[i], steps[i + 1])) {
      videoImgs[i].classList.add("show");
      videoDots[i].classList.add("current");
      return;
    }
  }
};

const between = (value, min, max) => value >= min && value <= max;

const resetImgVisibilityClasses = (videoImgEls) => {
  videoImgEls &&
    videoImgEls.forEach((videoImgEl) => videoImgEl.classList.remove("show"));
};

const resetDotDisplayClasses = (videoDots) => {
  videoDots &&
    videoDots.forEach((videoDot) => videoDot.classList.remove("current"));
};
