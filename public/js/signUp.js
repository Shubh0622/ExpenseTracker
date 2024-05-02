function handleSignUp(event){
    event.preventDefault();
    const userName = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    const obj ={
        userName,
        email,
        password
    };

    axios
        .post("http://localhost:3000/user/signup",obj)
        .then(res => {
            window.location.href = "login.html";
            console.log(res.data.message)
        })
        .catch(err => {
            // console.log(err.response.data.error.errors[0].type);
            if(err.response.data.error ==="Bad Parameters, Missing Something"){
                console.log(err);
            }
            else if(err.response.data.error.errors[0].type === "unique violation"){
                const p = document.querySelector('p');
                p.innerHTML = `User Already Exist <a href="login.html">Login</a>`
                console.log(err);
            }
            else{
                console.log(err)
            }
        });
    
    document.querySelector("form").reset();
}