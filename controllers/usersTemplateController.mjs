// renders title , content to the users view template
function userTemplate(req,res){
    let options = {
        title: "Library Users",
        content: renderContentUser,
        page: "users"
    }
    res.render("users",options);  //users.library view
}

// content to be displayed on the click of user on nav bar
function renderContentUser(){ 
    return `<h1>User Operations</h1>   <form id="formId" > 
                <select id="Options" >
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