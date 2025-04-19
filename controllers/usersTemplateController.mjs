function userTemplate(req,res){
    let options = {
        title: "Library Users",
        content: renderContentUser,
        page: "users"
    }
    res.render("users",options);  //users.library view
}

function renderContentUser(){ // render content on click of users link
    return `<h1>User Operations</h1>   <form id="formId" > 
                <select id="userOptions" >
                    <option value="get">Get All Users</option>
                    <option value="post">Add a User</option>
                    <option value="delete">Delete Users</option>
                    <option value="update">Update User</option>
                </select>
                <input type="text" placeholder="Enter User Id" id="searchInput">
                <a href="/lib/search/user" id="search" >Search</a>
            </form>`;
}

export default {userTemplate};