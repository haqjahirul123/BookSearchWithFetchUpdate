let key = "";
let title = "";
let author = "";
let counter = 0;

window.addEventListener('load', () => {
    document.getElementById("get").addEventListener("click", e => {
         clearErrors();
        axios.get('https://www.forverkliga.se/JavaScript/api/crud.php?requestKey')
        .then(res => {key=res.data.key
           showKey(res);
        })
        .catch ()
       
  });

 document.getElementById("btnAdd").addEventListener("click", e => {
    clearErrors();
     //e.preventDefault();
    title = document.getElementById("title").value
    author = document.getElementById("author").value
    loopForAddingBook(counter);
    


   
});

document.getElementById("btnView").addEventListener("click", e => {
    clearErrors();
    e.preventDefault();
    loopForShowingBook(counter);
    
    
})
});


function  loopForAddingBook(counter) {
    counter++
    axios.get("https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key=" +key +"&title=" +title +"&author=" +author)
    .then(res => {res.data
    addBook(res.data);

    })
}

function loopForShowingBook(counter) {
    counter++
    axios.get("https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=" +key )
    .then(res => {res.data
    showData(res.data);
    
    });


}
function clearErrors() {
  document.getElementById('keyView').innerHTML = ``;
  document.getElementById('bookAdd').innerHTML = ``;
  document.getElementById('bookView').innerHTML = ``;

}

function showKey(res) {
    console.log(res.data.status);
    
        if (res.data.status === "success") {
            document.getElementById('keyView').innerHTML += `
            <div class="card-body">
            <h5>Succes Achieve:(${res.status})</h5>Key Collected
            </div>
            `;
        }
        else {
            document.getElementById('keyView').innerHTML += `
            <div class="card-body">
            <pre><h5 id="error">Error:</h5>Något gick fel, försök igen!</pre>
            </div>
            `;
        }
  }

function addBook(res) {
      
    if (res.status === "success") {
        document.getElementById('bookAdd').innerHTML += `
         <div class="card-body">
           <h5>Book added properly to liabary database</h5>
        </div>
         `;
         console.log("Added on: " + counter + " Try");
         counter=0;
         document.getElementById("title").value=""
         document.getElementById("author").value=""
        }
    else {
       
         if (counter!==5) {
            document.getElementById('bookAdd').innerHTML += `
            <div class="card-body">
                <pre><h5 id="error">Error:</h5>${res.message}</pre>
           </div>
            `;
            loopForAddingBook(counter);
         }
         else {
            counter=0;
         }
         
         
         
        }



}

function showData(res) {

    if (res.status === "success") {
        let list = "<h5> Book Available at Libary:</h5>"
        res.data.map(book => {list += "<li("+book.id+")}>" +book.title +" Written By: "+ book.author+"<li>"+ "<br>"})
        // res.data.map(book => {list += "<button type=button class=btn btn-danger onClick={deleteBook("+book.id+")}>Ta Bort</button>"})
        // res.data.map(book => {list += "<button type=button class=btn btn-danger onClick={deleteBook("+book.id+")}>Ändra Bok</button>"})
        document.getElementById('bookView').innerHTML += `
        <div class="card-body">
        <pre><ol>${list}</ol></pre>
        </div>
        `;
        console.log("Viewed on: " + counter + " Number Of Try");
        console.log(res.data);
        
        counter=0;
    }
    else {
        document.getElementById('bookView').innerHTML += `
        <div class="card-body">
        <pre><h5 id="error">Error:</h5>${JSON.stringify (res.message)}</pre>
        </div>
        `;
        if (counter!==5) {
            loopForShowingBook(counter);
         }
         else {
            counter=0;
         }
    }
    
     
     
     
}

// function deleteBook(book) {
//     clearErrors();
//     counter = 0;
//     deleteRequest();
//     function deleteRequest() {
//         if (counter !== 4){
//             axios.get ("https://www.forverkliga.se/JavaScript/api/crud.php?op=delete&key=" +key +"&id=" + book)
//         .then(res => {
//             if(res.data.status === 'success') {
//                 document.getElementById('res-showdata').innerHTML += `
//                 <div class="card-body">
//                 <pre><h5>Lyckades:</h5>Boken togs bort!</pre>
//                 </div>
//                 `;
//                 let data = res.data.data;
    
//             } else {
//                 document.getElementById('res-showdata').innerHTML += `
//                 <div class="card-body">
//                 <pre><h5 id="error">Error:</h5>${JSON.stringify (res.data.message)}</pre>
//                 </div>
//                 `;
//                 deleteRequest();
//                 counter++
//             }
//             console.log(res)
//         }
//         )
//         console.log(book);  

//         }
//     }
     

// }

// function modifyBook(book) {
//     clearErrors();
//     counter = 0;
//     title = document.querySelector("#exampleInputName2").value;
//     author = document.querySelector("#exampleInputName").value;
//     sendModifyRequest();
    
//     //` ${key} `
//     function sendModifyRequest() {
//         if (counter !== 4){
//         axios.get ("https://www.forverkliga.se/JavaScript/api/crud.php?op=update&key=" +key +"&id=" + book+"&title=" +title +"&author=" +author)
//         .then(res => {
//             if(res.data.status === 'success') {
//                 document.getElementById('res-showdata').innerHTML += `
//                 <div class="card-body">
//                 <pre><h5>Lyckades:</h5>Boken är nu ändrad!</pre>
//                 </div>
//                 `;
//                 let data = res.data.data;
    
//             } else {
//                 document.getElementById('res-showdata').innerHTML += `
//                 <div class="card-body">
//                 <pre><h5 id="error">Error:</h5>${JSON.stringify (res.data.message)}</pre>
//                 </div>
//                 `;
//                 sendModifyRequest();
//                 counter++
//             }
//             console.log(res)
//         }
//         )
//         console.log(book);  

//         }
//     }
// };