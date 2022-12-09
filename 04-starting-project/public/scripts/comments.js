const loadButtonEle = document.getElementById("load-comments-button");
const commentsSectionEle = document.getElementById("comments");

//this for the form and its posting
const commentsFormEle = document.querySelector("#comments-form form");
const commentTitleEle = document.getElementById("title");
const commentTextEle = document.getElementById("text");
function createList(comments) {
  const commentsList = document.createElement("ol");

  for (const comment of comments) {
    const commentElement = document.createElement("li");
    commentElement.innerHTML = `
    <article class="comment-item">
    <h2>${comment.title}</h2>
    <p>${comment.text}</p>
    </article>
  `;
    commentsList.appendChild(commentElement);
  }
  return commentsList;
}

async function fetchComments() {
  const postId = loadButtonEle.dataset.postid;

  try {
    const response = await fetch(`/posts/${postId}/comments`);
    if (!response.ok) {
      alert("fecting commnets failed");
      return;
    }
    const data = await response.json();
    if (data && data.length > 0) {
      commentsSectionEle.innerHTML = "";
      commentsSectionEle.appendChild(createList(data));
    } else {
      commentsSectionEle.firstElementChild.textContent =
        "We couldn't find comments.Add one maybe?";
    }
  } catch (error) {
    alert("Technical error occurred");
  }
}

async function saveComment(event) {
  event.preventDefault();
  const postId = commentsFormEle.dataset.postid;
  const enteredTitle = commentTitleEle.value;
  const enteredText = commentTitleEle.value;

  const comments = { title: enteredTitle, text: enteredText };
  try {
    const response = await fetch(`/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify(comments),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      fetchComments();
    } else {
      alert("smthg went wrong");
    }
  } catch (error) {
    alert("Tehnical error");
  }
}

loadButtonEle.addEventListener("click", fetchComments);
commentsFormEle.addEventListener("submit", saveComment);
