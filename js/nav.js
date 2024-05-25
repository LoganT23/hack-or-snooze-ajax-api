"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

function navSubmitClick(evt) {
  console.debug("navSubmitClick", evt);
  hidePageComponents();
  $("#story-form-container").show();
}

$("#nav-submit").on("click", navSubmitClick);



// Define a function to handle the click event
/**function navSubmitClick(evt) {
  console.debug("navSubmitClick", evt);
  // Your code to handle the click event goes here
}

// Attach the event handler function to the navbar link
$("#nav-submit").on("click", navSubmitClick);

/**function navSubmitClick(evt) {
  console.debug("navSubmitClick", evt);
  // Your code to handle the click event goes here

  // For example, you might want to show the story submission form
  $("#story-form-container").show();
}
*/


