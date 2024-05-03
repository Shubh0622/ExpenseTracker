const token = localStorage.getItem('token');

function handleFormSubmit(event){
    event.preventDefault();
    const expenseAmount = event.target.expenseAmount.value;
    const description = event.target.description.value;
    const category = event.target.category.value;
    const myObj=({
        expenseAmount,
        description,
        category
    });
    
    axios
        .post('http://localhost:3000/add-expense',
        myObj,
        { headers: {"Authorization": token}}
    )
    .then((response) => {
        displayExpenseOnScreen(response.data.newExpenseDetail)
    })
    .catch((error) =>{
        document.body.innerHTML=document.body.innerHTML+"<h4>Something Went Wrong!</h4>";
        console.log(error);
    })
    document.querySelector("form").reset();
}

window.addEventListener("DOMContentLoaded",()=>{
  
  axios.get("http://localhost:3000/get-expenses",{ headers: {"Authorization": token}})
  .then(res =>{
    for(let i=0;i<res.data.allExpenses.length;i++){
      displayExpenseOnScreen(res.data.allExpenses[i]);
    }
  })
  .catch(err=>{
    console.log(err);
  })
});


  function displayExpenseOnScreen(expenseDetails) {
    // const expenseItem = document.createElement("li");
    const expensesList = document.getElementById("expenses-list");
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense-item");
    
    expenseItem.innerHTML = `
      <span><strong>Amount:</strong> $${expenseDetails.expenseAmount}</span>
      <span><strong>Description:</strong> ${expenseDetails.description}</span>
      <span><strong>Category:</strong> ${expenseDetails.category}</span>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    `;

    expensesList.appendChild(expenseItem);

    const editButton = expenseItem.querySelector(".edit-btn");
    const deleteButton = expenseItem.querySelector(".delete-btn");
  
    deleteButton.addEventListener("click", function (event) {
      let id=expenseDetails.id;
      axios.delete(`http://localhost:3000/delete-expense/${id}`,{ headers: {"Authorization": token}})
           .then(res => {
            expensesList.removeChild(event.target.parentElement)
        })
           .catch(err => console.log(err))
    });
  
    editButton.addEventListener("click", function (event) {
      
      document.getElementById("amount").value = expenseDetails.expenseAmount;
      document.getElementById("description").value = expenseDetails.description;
      document.getElementById("category").value = expenseDetails.category;
    
      let id=expenseDetails.id;
      
      axios.delete(`http://localhost:3000/delete-expense/${id}`,{ headers: {"Authorization": token}})
           .then(res => {
            expensesList.removeChild(event.target.parentElement)
        })
           .catch(err => console.log(err))
    });
  }