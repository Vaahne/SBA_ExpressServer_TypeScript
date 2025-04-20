//  renders the title , content to the books view template
function booksTemplate(req,res){
    let options = {
        title: "Library Books",
        content: renderContentForBooks,
        page: "books"
    }
    res.render("books",options); // books.library view
}


// content to be rendered on click of the books from the nav bar
function renderContentForBooks(){   // content on clicking of Book link in the nav
    return `<h1>Book Operations</h1>   <form id="formId" > 
                <select id="bookOptions" >
                    <option selected>Select </option>
                    <option value="get">Get All books</option>
                    <option value="post">Add a Book</option>
                    <option value="delete">Delete Books</option>
                    <option value="update">Update Book</option>
                </select>
                <input type="text" placeholder="Enter Book Id" id="searchInput">
                <button  id="search" type="submit" >Search</button>
            </form>`;
}

export default {booksTemplate};