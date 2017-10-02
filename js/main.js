//Listen for form submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);

//save bookMark
function saveBookmark(e) {
  //get form values
  let siteName = document.getElementById("siteName").value;
  let siteUrl = document.getElementById("siteUrl").value;

  //pass values of siteName & siteUrl to an object
  let bookmark = {
    name: siteName,
    url: siteUrl
  };

  //Local Storage Test
  //localStorage.setItem("test","1234 ");
  //localStorage.getItem("test")

  //test if bookmark is null
  if (localStorage.getItem("bookmarks") === null) {
    //initialise array
    let bookmarks = [];
    //add to array
    bookmarks.push(bookmark);
    //set to local storage JSON object as a string  .stringify
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    //get bookmarks from local storage turning string back to JSON .parse
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    //add new bookmark to array
    bookmarks.push(bookmark);
    //set array back to local storage with previous and new added values
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  //prevent from submitting
  e.preventDefault();
}

//fetching bookmarks from local storage
function fetchBookmarks() {
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  //get output id where bookmarks will be shown
  let bookmarkResults = document.getElementById("bookmarkResults");
  //build output
  bookmarkResults.innerHTML = '';

  for(let i =0; i < bookmarks.length; i++ ){
    let name = bookmarks[i].name;
    let url = bookmarks[i].url;

    bookmarkResults.innerHTML += '<div class="well">'+
                                    '<h3>' +name+
                                    '</h3>'+
                                    '</div>';
  }
}
