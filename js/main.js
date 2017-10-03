//Listen for form submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);

//save bookMark
function saveBookmark(e) {
  //get form values
  let siteName = document.getElementById("siteName").value;
  let siteUrl = document.getElementById("siteUrl").value;

  if (!validation(siteName,siteUrl)){
    return false;
  }

  //pass values of siteName & siteUrl to an object
  let bookmark = {
    name: siteName,
    url: siteUrl
  };

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

  //clear form 
  document.getElementById('myForm').reset();

  fetchBookmarks();

  //prevent from submitting
  e.preventDefault();
}

function deleteBookmark(url) {
  //get bookmarks from localstorage
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  //loop throught bookmarks
  for (i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      //remove from array
      bookmarks.splice(i, 1);
    }
  }
  //re-set array back to local storage with previous and new added values
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  fetchBookmarks();
}

//fetching bookmarks from local storage
function fetchBookmarks() {
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  //get output id where bookmarks will be shown
  let bookmarkResults = document.getElementById("bookmarkResults");
  //build output
  bookmarkResults.innerHTML = '';

  for (let i = 0; i < bookmarks.length; i++) {
    let name = bookmarks[i].name;
    let url = bookmarks[i].url;

    bookmarkResults.innerHTML += '<div class="well">' +
      '<h3>' + name +
      ' <a class="btn btn-primary" target="blank" href="' + url + '">Visit</a> ' +
      ' <a onclick="deleteBookmark(\'' + url + '\')"class="btn btn-danger"  href="#">Delete</a> '
    '</h3>' +
    '</div>';
  }
}

function validation(siteName,siteUrl){
  if (!siteName || !siteUrl) {
    alert("Fill in the form properlly");
    return false;
  }

  //https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
  let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  let regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert("Fill in url properlly");
    return false;
  }
  return true;
}