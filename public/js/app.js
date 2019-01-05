
$("#scrape-btn").on("click", () => {
  // run scraper - retool
  console.log("starting scraper");
  $.ajax({
    method: "GET",
    url: "/scrape"
  })
  .then(res => {
    console.log(res);
    location.reload();
  })
  .catch(err => {
    console.log(err);
  })
});

// delete all articles on homepage
$("#delete-all-btn").on("click", () => {
  $.ajax({
    method: "PUT",
    url: "/articles/delete"
  })
  .then(res => {
    console.log("deleted all");
    location.reload();
  });
});

// delete all saved articles
$("#delete-all-saved-btn").on("click", () => {
  $.ajax({
    method: "PUT",
    url: "/saved/delete"
  })
  .then(res => {
    console.log("deleted all");
    location.reload();
  })
  .catch(err => {
    if (err) throw err;
  });
});

// bookmark and save articles
$(document).on("click", ".bookmark-link", function() {
  const thisId = $(this).attr("data-id");

  $.ajax({
    method: "PUT",
    url: `/saved/${thisId}`
  })
  .then(res => {
    console.log("saved article");
    location.reload();
  })
  .catch(err => {
    console.log(err);
  });
});

// "delete" and hide articles from view
$(document).on("click", ".close-btn", function() {
  const thisId = $(this).attr("data-id");

  $.ajax({
    method: "PUT",
    url: `/delete/${thisId}`
  })
  .then(res => {
    console.log("deleted");
    location.reload();
  })
  .catch(err => {
    console.log(err);
  });
});
