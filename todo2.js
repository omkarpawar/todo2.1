function submitTask(event){
    event.preventDefault();

    const taskObj={
        taskName:event.target.taskname.value,
        description:event.target.description.value,
        taskId:true
        
    }
    axios
        .post(`
           
        https://crudcrud.com/api/ba0d4a897d2b41739e2eb80f12be99c6/taskDetails
          
        `,taskObj)
                .then((res)=>{
                    displayOnScreen(res.data);
                })
                .catch((err)=>{
                    console.log(err);
                })
    
}

document.addEventListener('DOMContentLoaded',function(event){

    

    axios   
        .get(`
        

        https://crudcrud.com/api/ba0d4a897d2b41739e2eb80f12be99c6/taskDetails
        
        `)
         .then((res)=>{
            

                for(let i=0;i<res.data.length;i++){

                    if(res.data[i].taskId===true){
                        displayOnScreen(res.data[i]);

                    }else{
                        displayOnTodoDone(res.data[i]);
                    }

                        

                    
            }
             
         })
    
})

function displayOnScreen(taskObj){

    const listItem=document.createElement("li")
    listItem.setAttribute('class','list-group-item')
    listItem.appendChild(document.createTextNode(`
    
    TASK NAME : ${taskObj.taskName}
    DESCRIPTION : ${taskObj.description}
    
    `))
    
    const unorderedList=document.querySelector('ul')
    unorderedList.setAttribute('class','list-group list-group-numbered')
    unorderedList.appendChild(listItem);

    const deleteBtn=document.createElement('button');
    deleteBtn.style.marginLeft="900px";
    deleteBtn.setAttribute('class','btn btn-dark');
    deleteBtn.appendChild(document.createTextNode('Done'));
    listItem.appendChild(deleteBtn);

    
    const removeBtn=document.createElement('button');
    removeBtn.style.marginLeft="5px";
    removeBtn.setAttribute('class','btn btn-dark');
    removeBtn.appendChild(document.createTextNode('DELETE'));
    listItem.appendChild(removeBtn);
   
    

    deleteBtn.addEventListener('click',function(event){
        
        
        const taskId=taskObj._id;
        

        axios
            .put(`
            
            https://crudcrud.com/api/ba0d4a897d2b41739e2eb80f12be99c6/taskDetails/${taskId}`,
            {
                taskName:taskObj.taskName,
                description:taskObj.description,
                taskId:false
            })
             .then((res)=>{
                console.log(res.data);
             })
              .catch((err)=>{
                console.log(err);
             })         
        unorderedList.removeChild(listItem)
        displayOnTodoDone(taskObj);
             
        
    })

    removeBtn.addEventListener('click',function(event){
        const removeId=taskObj._id;
        axios
            .delete(`
            
            https://crudcrud.com/api/ba0d4a897d2b41739e2eb80f12be99c6/taskDetails/${removeId}`,
            
            )
             .then((res)=>{
                unorderedList.removeChild(listItem);
                console.log(res);
             })
              .catch((err)=>{
                console.log(err);
              })
    })


    
}

function displayOnTodoDone(taskObj){
                const listItem2=document.createElement('li');
                listItem2.setAttribute('class','list-group-item')
                listItem2.appendChild(document.createTextNode(`
                
                TASK NAME : ${taskObj.taskName}
                DESCRIPTION : ${taskObj.description}
                
                
                `))

                const unorderedList2=document.querySelector('#uldone');
                unorderedList2.setAttribute('class','list-group list-group-numbered')
                unorderedList2.appendChild(listItem2)
                unorderedList2.appendChild(listItem2)

}