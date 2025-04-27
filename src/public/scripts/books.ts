// const title1 = document.querySelector(".titleClass") as HTMLHeadingElement;
const content1 = document.querySelector(".content") as HTMLDivElement;
const bookOptions = document.getElementById("Options") as HTMLSelectElement;
const search1 = document.getElementById("search") as HTMLButtonElement;
const searchInput1 = document.getElementById("searchInput") as HTMLInputElement;
const formId1 = document.getElementById("formId") as HTMLFormElement;

interface Book {
    bookId: string;
    title: string;
}

// on search for a bookId
formId1.addEventListener('submit',async (e: SubmitEvent)=>{
    e.preventDefault();
    const val = searchInput1.value;
    if(val!= ""){
        let res = await fetch(`/lib/books/${val}`);
        const data = await res.json();
        console.log(`${data}`)
        if(typeof data != "string"){
            createTable1([data]);
        }else{
            alert("No books found with the given id");
        }
        searchInput1.value = "";
        return;
    }else{
        alert("Enter id to search");
        return;
    }
});


bookOptions.addEventListener('change',optionsFunction);
// on change of options dropdown
async function optionsFunction(e:Event): Promise <void>{
    const target = e.target as HTMLSelectElement;
    const selectedOption = target.value;

    switch(selectedOption){
        case 'get':  // to get the specific book
                    fetch('/lib/books').then(async(res) => {
                        const data: Book[] = await res.json();
                        createTable1(data);

                    }).catch(err =>{
                        console.log(err.message);
                    });
                    break;
        case 'post': addBook(); // for creating a book entry
                    break;
        case 'delete':  deleteOrUpdateBook("Delete"); // delete a book
                     break;
        case 'update': deleteOrUpdateBook("Update"); // updating a book
                    break;
    }
}
// basic view for update and delete to accept bookId
function deleteOrUpdateBook(option: "Delete" | "Update"):void{  
    const form = document.createElement("form") as HTMLFormElement;
    form.id = "formId";
    const bookId = document.createElement("input") as HTMLInputElement;
    bookId.type ="text";
    bookId.placeholder = "Enter the Book Id" ;
    const add = document.createElement("input") as HTMLInputElement;
    add.type="submit";
    add.value=`${option} Book`;
    form.appendChild(bookId);
    form.appendChild(add);

    content1.textContent = "";
    content1.appendChild(form);

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
// next step of update to allow user to edit book title
async function update(id:String): Promise <void>{
    const book = await fetch(`/lib/books/${id}`);
    const bookData: Book = await book.json();
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
        content1.textContent = "";
        content1.appendChild(form);

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

// create or post for new book
function addBook() : void{
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

    content1.textContent = "";
    content1.appendChild(form);

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
// displaying all books in a table 
function createTable1(data:Book []) :void{
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
    content1.textContent = "";
    content1.appendChild(table);
}