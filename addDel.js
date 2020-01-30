$(document).ready(function(){
document.getElementById('btnAdd').addEventListener('click', addApiData);
document.getElementById('btnView').addEventListener('click', viewApiData);
document.getElementById('btnDelete').addEventListener('click', deleteApiData);
//document.getElementById('btnUpdate').addEventListener('click', updateApiData);
//document.getElementById('book-form').addEventListener('submit',postApiData);



 function addApiData() {
    //


    //
    let $output=$('#output');
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;

    //let key='VkrYv';
    let key='VkrYv';
    let URL='https://www.forverkliga.se/JavaScript/api/crud.php?key=' + key + '&op=insert&title=' + title + '&author=' + author;
    console.log('url', URL);
    
    fetch(URL , {
        method: 'GET'
     
      })
    .then(function(response) {
        //console.log(response.status)

        
        if (response.status >= 200 && response.status <= 299) {
            
            return response.json();
          } else {
            throw Error(response.statusText);
          }
        //return response.json();
    })
    .then(function(data) {
        counter= 0;
        if(data.status !== 'success' && counter < 5){  //if the respnse is error or in other words notSuccsess call it self again
            console.log('failed trying again' + counter) // with incremented counter and if the counter is above 5 (comment below)
            counter++;
      
            addApiData( );
        }else if(data.status !== 'success' && counter < 5){ // do not call its self again and tell the user it failed
            
                console.log("failed to add books 5/5 tries. Try again!")
        }else{ // if the book is added successfully at 5 times max tells the user it did succeeeeed
            
            console.log('Book Added on try ' + counter +'/5 tries' )
           
           console.log(data);
         
        }
      
    })
    .catch(function(error) {
        
        console.log('error');
        
    });

    /*$.ajax({
        type: 'GET',
        url:URL,
        success:function(){
            $.each(output,function(i, order){
                $output.append(order.title,order.author);

            });
        }
        
    });*/
}

function viewApiData(){
 
    let key='VkrYv';
    URL='https://www.forverkliga.se/JavaScript/api/crud.php?key=' + key + '&op=select';
    
    fetch(URL) 
    .then(function(response) {
        if (response.status >= 200 && response.status <= 299) {
            return response.json();
          } else {
            throw Error(response.statusText);
          }
    })
    .then((books)=>{
        console.log(books);
        let result= '';
        counter=0;

        if(books.status === 'success' && counter < 5) {
            for(let i=0;i<books.data.length;i++) {
                result += `
                    <div class='result'>
                    <h3>${books.data[i].title}</h3>
                    <p></b>${books.data[i].author}</p>
                    <p></b>${books.data[i].id}</p>
                    </div> `     
                    ;                  
            }
            console.log('Books shows properly');
            document.getElementById('output').innerHTML=result;
            
        }
        else{ 
            counter++;
            viewApiData(counter++);
           console.log('Books not showing properly  within' + counter +'/5 tries' ) ;
        }
    })
    .catch(function(error) {
        console.error(error);
        
    }); 
    
}

});

function deleteApiData(){
    let deleteID=document.getElementById("id").value;
    let key='VkrYv';
    URL='https://www.forverkliga.se/JavaScript/api/crud.php?key=' + key + '&op=delete&id=' + deleteID;
   
    //console.log('id', deleteID);
    fetch(URL , {
      method: 'GET',
   
    })
    .then(function(response) {
        if (response.status >= 200 && response.status <= 299) {
            return response.json();
          } else {
            throw Error(response.statusText);
          }
        //return response.json();
    })
    .then(function(data) {
        console.log(data);
       // document.getElementById('output').innerHTML=data;
   })
   .catch(function(error) {
        console.error( error);
        
    });

}
