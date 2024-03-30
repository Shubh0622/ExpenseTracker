function handleFormSubmit(event){
  event.preventDefault();
  let myObj=JSON.parse(localStorage.getItem("expenseDetails")) || [];
  myObj.push({
    expenseAmount: event.target.expenseAmount.value,
    description: event.target.description.value,
    category: event.target.expenses.value
  });
//   let users= JSON.parse(localStorage.getItem(event.target.email.value))|| [];
//   users.push(array);
  localStorage.setItem("expenseDetails",JSON.stringify(myObj));
let ul=document.querySelector("ul");
let li =document.createElement("li");
li.innerHTML=`${event.target.expenseAmount.value} - ${event.target.description.value} - ${event.target.expenses.value} <button type='button' class='delete-btn' data-des='${event.target.description.value}'>Delete Expenses</button> <button type='button' class='edit-btn' data-des='${event.target.description.value}'>Edit Expenses</button>`;
li.id=event.target.description.value;
ul.appendChild(li);
const deleteBtn = document.querySelector(".delete-btn");
  deleteBtn.addEventListener("click",function(event){
    let desc = deleteBtn.getAttribute("data-des");
    let ul=document.querySelector("ul");
    let li=document.getElementById(desc);
    ul.removeChild(li);
    //localStorage.removeItem(desc);
  });
}
//   const deleteBtn = document.querySelector(".delete-btn");
//   deleteBtn.addEventListener("click",function(event){
//     let desc = deleteBtn.getAttribute("data-des");
//     console.log(desc);
//     // const li = document.getElementById(desc);
//     // li.remove();
//     // localStorage.removeItem(desc);
//   });

//   const editBtn=document.querySelector(".edit-btn");
//   editBtn.addEventListener("click",function(event){
//     const email=editBtn.getAttribute("data-email");
//     const getItem=JSON.parse(localStorage.getItem(email));
//     document.getElementById("username").value=getItem.name;
//     document.getElementById("email").value=getItem.email;
//     document.getElementById("phone").value=getItem.phone;
//     const li=document.getElementById(email);
//     li.remove();
//     localStorage.removeItem(email);
//   })