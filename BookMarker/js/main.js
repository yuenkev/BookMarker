// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//save bookmark
function saveBookmark(){
    //get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName, siteUrl)){
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }

//Test if bookmarks are null
if(localStorage.getItem('bookmarks') === null){
    // init array
    var bookmarks = [];
    // Add to array
    bookmarks.push(bookmark);
    // Set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
} else {
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Re-set back to LocalStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}
    //Clear Form
    document.getElementById('myForm').reset();

    // Re-fetch bookmarks
    fetchBookmarks();

    //Prevents form from submitting.
    event.preventDefault();
}

    //Delete bookmark
    function deleteBookmark(url){
        //Get bookmarks from local LocalStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //loop through bookmarks
        for(var i = 0;i < bookmarks.length;i++){
            if(bookmarks[i].url == url){
                //remove from array
                bookmarks.splice(i, 1);
            }
        }
        //Re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

        //Re-fech bookmarks
        fetchBookmarks();
    }

// Fetch bookmarksResults
function fetchBookmarks() {
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //Get Output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    //Build the output
    bookmarksResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="jumbotron">'+
                                      '<h3 class="jumbotronh3">'+name+
                                      ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
                                      ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'+
                                      '</h3>'+
                                      '</div>';
    }
}

//Validate Form
function validateForm(siteName, siteUrl) {
    if(!siteName || !siteUrl) {
        alert('Please fill in the form.');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Please use a valid URL.');
        return false;
    }
    return true;
}
