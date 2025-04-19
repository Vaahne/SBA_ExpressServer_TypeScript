const title = document.querySelector(".titleClass");
const content = document.querySelector(".content");
const bookOptions = document.getElementById("bookOptions");
const search = document.getElementById("search");
const searchInput = document.getElementById("searchInput");
const formId = document.getElementById("formId");

// on search
formId.addEventListener('submit',async (e)=>{
    e.preventDefault();
    const val = searchInput.value;
    if(val!= ""){
        let res = await fetch(`/lib/books/${val}`);
        const data = await res.json();
        console.log(`${data}`)
        if(typeof data != "string"){
            createTable([data]);
        }else{
            alert("No books found with the given id");
        }
        searchInput.value = "";
        return;
    }else{
        alert("Enter id to search");
        return;
    }
});


bookOptions.addEventListener('change',optionsFunction);

async function optionsFunction(e){
    const selectedOption = e.target.value;

    switch(selectedOption){
        case 'get': 
                    fetch('/lib/books').then(async(res) => {
                        const data = await res.json();
                        createTable(data);

                    }).catch(err =>{
                        console.log(err.message);
                    });
                    break;
        case 'post': addBook();
                    break;
        case 'delete':  deleteOrUpdateBook("Delete");
                     break;
        case 'update': deleteOrUpdateBook("Update");
                    break;
    }
}
function deleteOrUpdateBook(option){
    const form = document.createElement("form");
    form.id = "formId";
    const bookId = document.createElement("input");
    bookId.type ="text";
    bookId.placeholder = "Enter the Book Id";
    const add = document.createElement("input");
    add.type="submit";
    add.value=`${option} Book`;
    form.appendChild(bookId);
    form.appendChild(add);

    content.textContent = "";
    content.appendChild(form);

    form.addEventListener('submit',async(e)=>{
        e.preventDefault();
        const id = bookId.value;
        if(id == ""){
            alert("Id cannot be empty");
            return;
        }
        if(option == "Delete"){ 
            const book = await fetch(`/lib/books/${id}`,{
                method: "DELETE" ,
                headers: {"content-type":"application/json"},
             });
             bookId.value = "";
            let  data = await book.json();
            if(typeof data == 'string')
                alert("Book not found!!")
            else
                 alert("Successfully Deleted a Book");
             return;
        }if(option == 'Update')
            update(id);
    });
}

async function update(id){
    const book = await fetch(`/lib/books/${id}`);
    const bookData = await book.json();
    if(typeof bookData == 'string')
        alert("No Book found!!!");
    else{
        const form = document.createElement("form");
        form.id = "formId";
        const booktitle = document.createElement("input");
        booktitle.type = "text";
        booktitle.value = bookData.title;
        const update = document.createElement("input");
        update.type="submit";
        update.value = "Update";

        form.appendChild(booktitle);
        form.appendChild(update);
        content.textContent = "";
        content.appendChild(form);

        form.addEventListener('submit',async (e)=>{
            e.preventDefault();
            let val = booktitle.value;
            if(val==""){
                alert("Title cannot be empty");
                return;
            }

            const rawData = JSON.stringify({title: val});
            const user = await fetch(`/lib/books/${id}`,{
                 method: "PATCH" ,
                headers: {"content-type":"application/json"},
                body: rawData
            });      
            alert("Successfully updated!!");
        });
    }
}


function addBook(){
    const form = document.createElement("form");
    form.id = "formId";
    const bookTitle = document.createElement("input");
    bookTitle.type ="text";
    bookTitle.placeholder = "Enter the Book Title";
    const add = document.createElement("input");
    add.type="submit";
    add.value="Add Book";
    form.appendChild(bookTitle);
    form.appendChild(add);

    content.textContent = "";
    content.appendChild(form);

    form.addEventListener('submit',async(e)=>{
        e.preventDefault();
        const title = bookTitle.value;
        if(title){
            const rawBody = JSON.stringify({
                "title": title
            });
            const book = await fetch('/lib/books',{
                method: "POST" ,
                headers: {"content-type":"application/json"},
                body: rawBody
             });
             console.log(`Added book ${book}`)
             alert("Successfully Added a Book");
             bookTitle.value = "";
             return;
        }
        alert("Book title cannot be empty");
    });
}

function createTable(data){
    const table = document.createElement("table");
    table.classList.add("tableClass");
    const trHeader = document.createElement("tr");
    const td1Header = document.createElement("th");
    td1Header.textContent = "Book_Id";
    const td2Header = document.createElement("th");
    td2Header.textContent = "Book_Title";

    trHeader.appendChild(td1Header);
    trHeader.appendChild(td2Header);
    table.appendChild(trHeader);

    data.forEach(element => {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        td1.textContent = element.bookId;
        const td2 = document.createElement("td");
        td2.textContent = element.title;

        tr.appendChild(td1);
        tr.appendChild(td2);
        table.appendChild(tr);
    });
    content.textContent = "";
    content.appendChild(table);
}