//Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBoockmark);


//save boockMark
function saveBoockmark(e) {
    //get form values
    let siteName = document.getElementById('siteName').value;
    let siteUrl = document.getElementById('siteUrl').value;


    //pass values of siteName & siteUrl to an object
    let boockMark = {
        name: siteName,
        url: siteUrl
    };

    //Local Storage Test

    //prevent from submitting
    e.preventDefault();

    //just checking
    console.log("it works");
    console.log(boockMark);
}