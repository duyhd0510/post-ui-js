import dayjs from "dayjs";
import postApi from "./api/postApi";
import { registerLightbox, setTextContent } from "./utils";

function renderPostDetail(post) {
  if (!post) return;

  // render title
  // render description
  // render author
  // render updatedAt
  // render hero image (imageUrl)
  // render edit page link

  setTextContent(document, '#postDetailTitle', post.title);
  setTextContent(document, '#postDetailDescription', post.description);
  setTextContent(document, '#postDetailAuthor', post.author);
  setTextContent(document, '#postDetailTimeSpan', dayjs(post.updatedAt).format(' - DD/MM/YYYY HH:mm'));

  const heroImage = document.getElementById('postHeroImage');
  if (heroImage) {
    heroImage.style.backgroundImage = `url("${post.imageUrl}")`;

    heroImage.addEventListener('error', () => {
      thumbnailElement.src = 'https://via.placeholder.com/1368x400?text=image'
    })
  }

  const editPageLink = document.getElementById('goToEditPageLink');
  if (editPageLink) {
    editPageLink.href = `/add-edit-post.html?id=${post.id}`;
    editPageLink.textContent = 'Edit Post';
  }
}

(async () => {
  registerLightbox({
    modalId: 'lightbox',
    imgSelector: 'img[data-id="lightboxImg"]',
    prevSelector: 'button[data-id="lightboxPrev"]',
    nextSelector: 'button[data-id="lightboxNext"]',
  });
  // get post id from url
  // fetch post datail API
  // render post detail
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const postId = searchParams.get('id');
    if (!postId) return;

    const post = await postApi.getById(postId)
    renderPostDetail(post);
  } catch (error) {
    console.log('failed to fetch post details', error)
  }
})();