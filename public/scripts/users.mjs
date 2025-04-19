const title = document.querySelector(".titleClass");
const content = document.querySelector(".content");
const userOptions = document.getElementById("userOptions");
const search = document.getElementById("search");
const searchInput = document.getElementById("searchInput");
const formId = document.getElementById("formId");

formId.addEventListener('submit',async (e)=>{
    e.preventDefault();
    const val = searchInput.value;
    if(val!= ""){
        let res = await fetch(`/lib/users/${val}`);
        const data = await res.json();
        console.log(`${data}`)
        if(typeof data != "string"){
            createTable([data]);
        }else{
            alert("No Users found with the given id");
        }
        searchInput.value = "";
        return;
    }else{
        alert("Enter id to search");
        return;
    }
});



userOptions.addEventListener('change',optionsFunction);

async function optionsFunction(e){
    const selectedOption = e.target.value;

    switch(selectedOption){
        case 'get': 
                    fetch('/lib/users').then(async(res) => {
                        const data = await res.json();
                        // console.log(data);
                        createTable(data);

                    }).catch(err =>{
                        console.log(err.message);
                    });
                    break;
        case 'post':  addUser();
                    break;
        case 'delete' : deleteOrUpdateUser("Delete");
                    break;
        case 'update': deleteOrUpdateUser("Update");
                    break;
    }
}

function deleteOrUpdateUser(option){
    const form = document.createElement("form");
    const userId = document.createElement("input");
    userId.type ="text";
    userId.placeholder = "Enter the User Id";
    const add = document.createElement("input");
    add.type="submit";
    add.value=`${option} User`;
    form.appendChild(userId);
    form.appendChild(add);

    content.textContent = "";
    content.appendChild(form);

    form.addEventListener('submit',async(e)=>{
        e.preventDefault();
        const id = userId.value;
        if(id){            
            const user = await fetch(`/lib/users/${id}`,{
                method: option.toUpperCase() ,
                headers: {"content-type":"application/json"},
             });
            //  book = await book.json();
             console.log(`Deleted user ${user}`)
             alert(`Successful User ${option} `);
             userId.value = "";
             return;
        }
        alert("User Id cannot be empty");
    });
}

function addUser(){
    const form = document.createElement("form");
    const userName = document.createElement("input");
    userName.type ="text";
    userName.placeholder = "Enter the User Name";
    const add = document.createElement("input");
    add.type="submit";
    add.value="Add User";
    form.appendChild(userName);
    form.appendChild(add);

    content.textContent = "";
    content.appendChild(form);

    form.addEventListener('submit',async(e)=>{
        e.preventDefault();
        const name = userName.value;
        if(name){
            const rawBody = JSON.stringify({
                "userName": name
            });
            const user = await fetch('/lib/users',{
                method: "POST" ,
                headers: {"content-type":"application/json"},
                body: rawBody
             });
             console.log(`Added User ${user}`)
             alert("Successfully Added a User");
             userName.value = "";
             return;
        }
        alert("User name cannot be empty");
    });
}
function createTable(data){
    const table = document.createElement("table");
    table.classList.add("tableClass");
    const trHeader = document.createElement("tr");
    const td1Header = document.createElement("th");
    td1Header.textContent = "User_Id";
    const td2Header = document.createElement("th");
    td2Header.textContent = "User Name";

    trHeader.appendChild(td1Header);
    trHeader.appendChild(td2Header);
    table.appendChild(trHeader);

    data.forEach(element => {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        td1.textContent = element.id;
        const td2 = document.createElement("td");
        td2.textContent = element.userName;

        tr.appendChild(td1);
        tr.appendChild(td2);
        table.appendChild(tr);
    });
    content.textContent = "";
    content.appendChild(table);
}

