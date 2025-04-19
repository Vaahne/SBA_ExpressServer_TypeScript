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
                    <option selected >Select</option>
                    <option value="get">Get All Users</option>
                    <option value="post">Add a User</option>
                    <option value="delete">Delete Users</option>
                    <option value="update">Update User</option>
                </select>
                <input type="text" placeholder="Enter User Id" id="searchInput">
                <button id="search" type="submit">Search</button>
            </form>`;
}

export default {userTemplate};