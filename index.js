function handleFormSubmit(event){
    event.preventDefault();
    let myObj=JSON.parse(localStorage.getItem("expenseDetails")) || [];
    myObj.push({
        expenseAmount: event.target.expenseAmount.value,
        description: event.target.description.value,
        category: event.target.expenses.value
    });
    localStorage.setItem("expenseDetails",JSON.stringify(myObj));
    let ul=document.querySelector("ul");
    let li =document.createElement("li");
    li.innerHTML=`${event.target.expenseAmount.value} - ${event.target.description.value} - ${event.target.expenses.value} <button type='button' class='delete-btn' data-des='${event.target.description.value}' onclick='handleDelete(event)'>Delete Expenses</button> <button type='button' class='edit-btn' data-des='${event.target.description.value}' onclick='handleEdit(event)'>Edit Expenses</button>`;
    li.id=event.target.description.value;
    ul.appendChild(li);
    document.querySelector("form").reset();
}

function handleDelete(event){
    event.preventDefault();
    let ulElem =document.querySelector("ul");
    let desc =event.target.getAttribute("data-des");
    //console.log(desc);
    let liElem = document.getElementById(desc);
    //console.log(liElem);
    ulElem.removeChild(liElem);
    let arr = JSON.parse(localStorage.getItem("expenseDetails"));
    let elem=0;
    for(let i=0;i<arr.length;i++){
        if(arr[i].description===desc){
            elem=i;
            break;
        }
    }
    arr.splice(elem,1);
    localStorage.setItem("expenseDetails",JSON.stringify(arr));
}
    
function handleEdit(event){
    event.preventDefault();
    let ulElem =document.querySelector("ul");
    let desc =event.target.getAttribute("data-des");
    let arr = JSON.parse(localStorage.getItem("expenseDetails"));
    let elem=0;
    for(let i=0;i<arr.length;i++){
        if(arr[i].description===desc){
            elem=i;
            break;
        }
    }
    document.getElementById("expA").value=arr[elem].expenseAmount;
    document.getElementById("des").value=arr[elem].description;
    document.getElementById("exp").value=arr[elem].category;
    let liElem = document.getElementById(desc);
    ulElem.removeChild(liElem);
    arr.splice(elem,1);
    localStorage.setItem("expenseDetails",JSON.stringify(arr));
}