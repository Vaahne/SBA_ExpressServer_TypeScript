function libraryHateoas(req, res){
    return res.json({
        links : [
            {
                href: '/lib/',
                rel: 'library', 
                type: 'GET'
            },
            {
                href: '/lib/books',
                rel: 'books', 
                type: 'GET'
            },
            {
                href: '/lib/users',
                rel: 'users', 
                type: 'GET'
            },
            {
                href: '/library',
                rel: 'Library website',
                type: 'TEMPLATE'
            }
        ]
    });
}

function booksHateoas(req,res){
    return res.json({
        links: [
            {
                href: "/lib/books",
                rel : "books",
                type: "GET"
            },
            {
                href: "/lib/books",
                rel : "books",
                type: "POST"
            },
            {
                href: "/lib/books/:id",
                rel : "books",
                type: "GET"
            },
            {
                href: "/lib/books/?id=",
                rel : "books",
                type: "GET"
            },
            {
                href: "/lib/books/:id",
                rel : "books",
                type: "DELETE"
            }
        ]
    });
}

function userHateoas(req,res){
    return res.json({
        links: [
            {
                href: "/lib/users",
                rel : "users",
                type: "GET"
            },
            {
                href: "/lib/users",
                rel : "users",
                type: "POST"
            },
            {
                href: "/lib/users/:userId",
                rel : "users",
                type: "GET"
            },
            {
                href: "/lib/users/:userId",
                rel : "users",
                type: "DELETE"
            }
        ]
    });
}


function transactionHateoas(){
    return res.json({
       links: [
        {
            href: "/lib/transactions",
            rel : "transactions",
            type: "GET"
        },
        {
            href: "/lib/transactions/:id",
            rel : "transactions",
            type: "GET"
        }
        ]
    })
}
export default { libraryHateoas,booksHateoas,userHateoas};