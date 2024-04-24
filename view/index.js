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
        myObj
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
    axios.get("http://localhost:3000/get-expenses")
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
    const expenseItem = document.createElement("li");
    expenseItem.appendChild(
      document.createTextNode(
        `${expenseDetails.expenseAmount} - ${expenseDetails.description} - ${expenseDetails.category}`
      )
    );
  
    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    expenseItem.appendChild(deleteBtn);
  
    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit"));
    expenseItem.appendChild(editBtn);
  
    const expenseList = document.querySelector("ul");
    expenseList.appendChild(expenseItem);
  
    deleteBtn.addEventListener("click", function (event) {
      let id=expenseDetails.id;
      axios.delete(`http://localhost:3000/delete-expense/${id}`)
           .then(res => {
            expenseList.removeChild(event.target.parentElement)
        })
           .catch(err => console.log(err))
    });
  
    editBtn.addEventListener("click", function (event) {
      
      document.getElementById("expA").value = expenseDetails.expenseAmount;
      document.getElementById("des").value = expenseDetails.description;
      document.getElementById("cat").value = expenseDetails.category;
    
      let id=expenseDetails.id;
      
      axios.delete(`http://localhost:3000/delete-expense/${id}`)
           .then(res => {
            expenseList.removeChild(event.target.parentElement)
        })
           .catch(err => console.log(err))
    });
  }