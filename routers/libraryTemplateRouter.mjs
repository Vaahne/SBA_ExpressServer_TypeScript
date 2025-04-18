import express from 'express';

const router = express.Router();

router.get('/booksView',(req,res)=>{
    let options = {
        title: "Library Books",
        content: renderContentForBooks,
        page: "books"
    }
    res.render("books",options); // books.library view
});

function renderContentForBooks(){   // content on clicking of Book link in the nav
    return `<h1>Book Operations</h1>   <form id="formId" > 
                <select id="bookOptions" >
                    <option value="get">Get All books</option>
                    <option value="post">Add a Book</option>
                    <option value="delete">Delete Books</option>
                    <option value="update">Update Book</option>
                </select>
                <input type="text" placeholder="Enter Book Id">
                <a href="/lib/search" id="search" >Search</a>
            </form>`;
}


router.get('/usersView',(req,res)=>{
    let options = {
        title: "Library Users",
        content: renderContentUser,
        page: "users"
    }
    res.render("users",options);  //users.library view
});

function renderContentUser(){ // render content on click of users link
    return `<h1>User Operations</h1>   <form id="formId" > 
                <select id="userOptions" >
                    <option value="get">Get All Users</option>
                    <option value="post">Add a User</option>
                    <option value="delete">Delete Users</option>
                    <option value="update">Update User</option>
                </select>
                <input type="text" placeholder="Enter User Id">
                <a href="/lib/search/user" id="search" >Search</a>
            </form>`;
}

export default router;