$("#scrape-btn").on("click", () => {
  // run scraper - retool
  console.log("starting scraper");
  $.ajax({
    method: "GET",
    url: "/"
  })
  .then(res => {
    console.log(res);
    location.reload();
  })
  .catch(err => {
    console.log(err);
  })
});

$("#delete-all-btn").on("click", () => {
  //todo - hide all articles on page
});

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
    url: `/article/delete/${thisId}`
  })
  .then(res => {
    console.log("deleted");
    location.reload();
  })
  .catch(err => {
    console.log(err);
  });
});
