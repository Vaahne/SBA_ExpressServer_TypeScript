const title = document.querySelector(".titleClass");
const content = document.querySelector(".content");
const bookOptions = document.getElementById("bookOptions");


bookOptions.addEventListener('change',optionsFunction);

async function optionsFunction(e){
    const selectedOption = e.target.value;

    switch(selectedOption){
        case 'get': 
                    fetch('/lib/books').then(async(res) => {
                        const data = await res.json();
                        // console.log(data);
                        createTable(data);

                    }).catch(err =>{
                        console.log(err.message);
                    });
                    break;
        case 'post':  
                    
                    fetch('/lib/books',{
                        method:POST ,
                        headers: {"content-type":"application/json"},
                        body: book })
                    // const books = fetch('./lib/books');
                    break;  
    }
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
        td1.textContent = element.id;
        const td2 = document.createElement("td");
        td2.textContent = element.title;

        tr.appendChild(td1);
        tr.appendChild(td2);
        table.appendChild(tr);
    });
    content.textContent = "";
    content.appendChild(table);
}

