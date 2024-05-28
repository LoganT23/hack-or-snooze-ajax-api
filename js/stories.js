"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story, showFavoriteBtn = true) {
  const hostName = story.getHostName();
  const favoriteBtn = showFavoriteBtn ? getFavoriteButtonHTML(story) : "";

  return $(`
      <li id="${story.storyId}">
        ${favoriteBtn}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Generates HTML for the favorite/unfavorite button */
function getFavoriteButtonHTML(story) {
  const isFavorite = currentUser.isFavorite(story);
  const buttonText = isFavorite ? "Unfavorite" : "Favorite";
  const buttonClass = isFavorite ? "unfavorite-btn" : "favorite-btn";
  return `<button class="${buttonClass}">${buttonText}</button>`;
}


/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}
/** HERE! v */

/** Handle story form submission */
async function handleStoryFormSubmit(evt) {
  evt.preventDefault();

  const title = $("#story-title").val();
  const author = $("#story-author").val();
  const url = $("#story-url").val();
  const username = currentUser.username;

  const newStory = { title, author, url, username };

  try {
    const storyInstance = await storyList.addStory(currentUser, newStory);
    const $story = generateStoryMarkup(storyInstance);
    $("#all-stories-list").prepend($story);

    // Hide form and reset
    $("#story-form-container").hide();
    $("#story-form")[0].reset();
  } catch (err) {
    console.error("Error adding story:", err);
  }
}

/** Handle favorite/unfavorite button click */
async function handleFavoriteClick(evt) {
  const $tgt = $(evt.target);
  const $closestLi = $tgt.closest("li");
  const storyId = $closestLi.attr("id");
  const story = storyList.stories.find(s => s.storyId === storyId);

  if ($tgt.hasClass("unfavorite-btn")) {
    await currentUser.removeFavorite(story);
    $tgt.removeClass("unfavorite-btn").addClass("favorite-btn").text("Favorite");
  } else {
    await currentUser.addFavorite(story);
    $tgt.removeClass("favorite-btn").addClass("unfavorite-btn").text("Unfavorite");
  }
}

// Event listener for favorite/unfavorite buttons
$allStoriesList.on("click", ".favorite-btn, .unfavorite-btn", handleFavoriteClick);

/** Show the list of favorite stories */
function putFavoritesListOnPage() {
  console.debug("putFavoritesListOnPage");

  $favoritesList.empty();

  for (let story of currentUser.favorites) {
    const $story = generateStoryMarkup(story, false);
    $favoritesList.append($story);
  }

  $favoritesList.show();
}

// Event listener for showing the favorites
$navFavorites.on("click", putFavoritesListOnPage);

//$("#story-form").on("submit", handleStoryFormSubmit);
