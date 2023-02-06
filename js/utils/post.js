import { setTextContent, truncateText } from "./common";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function createPostElement(post) {
  if (!post) return;

  // find template and clone template
  const postTemplate = document.getElementById('postTemplate');
  if (!postTemplate) return;

  const liElement = postTemplate.content.firstElementChild.cloneNode(true);
  if (!liElement) return;

  setTextContent(liElement, '[data-id="title"]', post.title);
  setTextContent(liElement, '[data-id="description"]', truncateText(post.description, 100));
  setTextContent(liElement, '[data-id="author"]', post.author);

  // calc timespan
  setTextContent(liElement, '[data-id="timeSpan"]', ` - ${dayjs(post.updatedAt).fromNow()}`);

  const thumbnailElement = liElement.querySelector('[data-id="thumbnail"]');
  if (thumbnailElement) {
    thumbnailElement.src = post.imageUrl;

    thumbnailElement.addEventListener('error', () => {
      thumbnailElement.src = 'https://via.placeholder.com/1368x400?text=image'
    })
  }

  // attach events
  const divElement = liElement.firstElementChild;
  if (divElement) {
    divElement.addEventListener('click', (event) => {
      const menu = liElement.querySelector('[data-id="menu"]');
      if (menu && menu.contains(event.target)) return
      window.location.assign(`/post-detail.html?id=${post.id}`)
    })
  }

  // add click event for edit button
  const editButton = liElement.querySelector('[data-id="edit"]');
  if (editButton) {
    editButton.addEventListener('click', (e) => {
      // e.stopPropagation();
      window.location.assign(`/add-edit-post.html?id=${post.id}`)
    })
  }

  const removeButton = liElement.querySelector('[data-id="remove"]');
  if (removeButton) {
    removeButton.addEventListener('click', (e) => {
      const customEvent = new CustomEvent('post-delete', {
        bubbles: true,
        detail: post,
      })

      removeButton.dispatchEvent(customEvent);
    })
  }

  return liElement;
}

export function renderPostList(elementId, postList) {
  if (!Array.isArray(postList)) return;

  const ulElement = document.getElementById(elementId);
  if (!ulElement) return;

  ulElement.textContent = '';

  postList.forEach((post) => {
    const liElement = createPostElement(post);
    ulElement.appendChild(liElement);
  })
}