const reviewForm = document.getElementById('reviewForm');
const reviewsContainer = document.getElementById('reviews');

// Load reviews from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  reviews.forEach((review, index) => displayReview(review, index));
});

reviewForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const reviewText = document.getElementById('review').value;
  const rating = document.getElementById('rating').value;
  const imageInput = document.getElementById('image');
  let imageURL = '';

  if (imageInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = () => {
      imageURL = reader.result;
      saveAndDisplayReview(name, reviewText, rating, imageURL);
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    saveAndDisplayReview(name, reviewText, rating, imageURL);
  }
});

function saveAndDisplayReview(name, reviewText, rating, imageURL) {
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  const review = { name, reviewText, rating, imageURL };
  reviews.push(review);
  localStorage.setItem('reviews', JSON.stringify(reviews));
  displayReview(review, reviews.length - 1);
  reviewForm.reset();
}

function displayReview(review, index) {
  const reviewDiv = document.createElement('div');
  reviewDiv.className = 'review';
  reviewDiv.dataset.index = index;

  const nameEl = document.createElement('h3');
  nameEl.textContent = review.name;
  reviewDiv.appendChild(nameEl);

  const ratingEl = document.createElement('p');
  ratingEl.textContent = `Rating: ${'⭐'.repeat(review.rating)}`;
  reviewDiv.appendChild(ratingEl);

  const textEl = document.createElement('p');
  textEl.textContent = review.reviewText;
  reviewDiv.appendChild(textEl);

  if (review.imageURL) {
    const imageEl = document.createElement('img');
    imageEl.src = review.imageURL;
    reviewDiv.appendChild(imageEl);
  }

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';
  deleteBtn.onclick = () => deleteReview(index);
  reviewDiv.appendChild(deleteBtn);

  reviewsContainer.appendChild(reviewDiv);
}

function deleteReview(index) {
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  reviews.splice(index, 1);
  localStorage.setItem('reviews', JSON.stringify(reviews));
  refreshReviews();
}

function refreshReviews() {
  reviewsContainer.innerHTML = '';
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  reviews.forEach((review, index) => displayReview(review, index));
}
