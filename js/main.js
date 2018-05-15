// listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// save bookmark
function saveBookmark(e) {
    // get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    siteUrl = fixUrl(siteUrl);

    // console.log("update2");

    if(!validateForm(siteName, siteUrl)){
        e.preventDefault();
        return false;
    }
  
    var bookmark = {
        name: siteName,
        url: siteUrl
    }
    // test if bookmarks is null
    if (localStorage.getItem('bookmarks') === null){
        // init array
        var bookmarks = [];
        // add to array
        bookmarks.push(bookmark);
        // set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // get bookmarks from LocalStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // add bookmark to array
        bookmarks.push(bookmark);
        // re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }    

    fetchBookmarks();
    //clear form
    document.getElementById('myForm').reset();

    e.preventDefault();
}

//delete bookmark
function deleteBookmark(url) {
    // get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // loop through bookmarks
    for (i=0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    // re-fetch bookmarks
    fetchBookmarks();
}

// fetch bookmarks
function fetchBookmarks() {
    // get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // get output id
    var bookmarksResults = document.getElementById('bookmarksResults');
    // build output
    bookmarksResults.innerHTML = '';

    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += 
        '<div class="well">' +
        '<h3 id="siteName">' + name + '</h3>' +
        '<div class="buttons">' +
        ' <a id="visit" class="btn btn-default" target="_blank" href="'+url+'">Visit</a>' +
        ' <button id="delete" onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</button>' +
        '</div>' +
        '</div>';
    }
}

function validateForm(siteName, siteUrl) {

    var expression = /^((http|https)(:\/\/))?(www.)?(\w+)(.\w{2,6})(.\w{2,6})?$/i
    var regex = new RegExp(expression);

    if (!siteName || !siteUrl) {
        showMessage('Please enter Website Name and URL');
        return false;
    } else if (!siteUrl.match(regex)){
        showMessage('Please enter valid URL');
        return false;
    } else {
        messageCheck();
        return true;
    }
}

function fixUrl(url){
    expression = /^(http:\/\/|https:\/\/)/i
    var regex = new RegExp(expression);
    if (!regex.test(url)){
        return "https://" + url;
    }
}

function showMessage(message) {

    messageCheck();

    const jumbotron = document.querySelector('.jumbotron');

    // create div
    const div = document.createElement('div');

    div.id = "errorMessage";
    // add classes
    div.className = `alert alert-danger`;    
    // add text
    div.appendChild(document.createTextNode(message));
    // get myForm
    const myForm = document.getElementById('myForm');
    // insert message
    jumbotron.insertBefore(div, myForm);
    
}

function messageCheck() {
    var check = document.getElementById('errorMessage');

    const jumbotron = document.querySelector('.jumbotron');

    if (check) {
    jumbotron.removeChild(check);  
    }  
}
