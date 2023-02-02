function showModal(modalElement) {
  if(!window.bootstrap) return;

  const modal = new window.bootstrap.Modal(modalElement);
  if (modal) modal.show();
}

export function registerLightbox({ modalId, imgSelector, prevSelector, nextSelector }) {
  const modalElement = document.getElementById(modalId);
  if (!modalElement) return;

  if (Boolean(modalElement.dataset.registered)) return;

  const imageElement = modalElement.querySelector(imgSelector);
  const prevButton = modalElement.querySelector(prevSelector);
  const nextButton = modalElement.querySelector(nextSelector);

  if (!imageElement || !prevButton || !nextButton) return;

  // lightbox vars
  let imgList = [];
  let currentIndex = 0;

  function showImageAtIndex(index) {
    imageElement.src = imgList[index].src;
  }

  // handle click for all imgs -> event delegation
  // img click -> find all imgs with the same album / gallery
  // determine index of selected img
  // show modal with selected img
  // handle prev / next click

  document.addEventListener('click', (event) => {
    // console.log('click', event.target)
    const { target } = event
    if (target.tagName !== 'IMG' || !target.dataset.album) return;

    imgList = document.querySelectorAll(`img[data-album="${target.dataset.album}"]`)
    currentIndex = [...imgList].findIndex((x) => x === target);
    // console.log('album image click', { target, index, imgList });

    // show image at index
    showImageAtIndex(currentIndex);
    // show modal
    showModal(modalElement)
  })

  prevButton.addEventListener('click', () => {
    // show prev image of current album
    currentIndex = (currentIndex - 1 + imgList.length) % imgList.length
    showImageAtIndex(currentIndex)
  })

  nextButton.addEventListener('click', () => {
    // show next image of current album
    currentIndex = (currentIndex + 1) % imgList.length
    showImageAtIndex(currentIndex)
  })

  modalElement.dataset.registered = 'true';
}
