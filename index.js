// firebase initalization
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://emailsignup-7d44c-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const pingListInDB = ref(database, "pingList")


//interface variables
const userInput = document.getElementById("emailInput")
const submitBtn = document.getElementById("submitBtn")
const signupContainer = document.getElementById("signup")
const errorContainer = document.getElementById("errorContainer")
const inputMsg = document.getElementById("inputMsg")
const successContainer = document.getElementById("successContainer")

// email check
const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
let userEmail = ""
let emailValidity = false


userInput.addEventListener("click", console.log("test"))

userInput.addEventListener("change", function(event){
    // get unser email current value
    userEmail = event.target.value
    errorContainer.style.display = "none"

    if (emailRegEx.test(userEmail)) {
        userInput.style.border = "1px solid #C2D3FF"
        userInput.style.color = "black"
        userInput.style.fontWeight = "700"
        errorContainer.style.display = "none"
        emailValidity = true;
    } else {
        userInput.style.border = "1px solid rgba(255, 84, 102, 1)"
        userInput.style.color = "rgba(255, 84, 102, 1)"
        userInput.style.fontWeight = "700"
        errorContainer.style.display = "block"
        inputMsg.style.color = "#FF5466"
        inputMsg.textContent = "Please enter a valid email adress" 
    }
})


submitBtn.addEventListener("click", function() {
    if (emailValidity) {
        push(pingListInDB, userEmail)
        signupContainer.style.display = "none"
        successContainer.style.display = "block"

    } else {
        userInput.focus()
        errorContainer.style.display = "block"
        inputMsg.style.color = "#2ECC71"
        inputMsg.textContent = "You need to enter an email adress"
    }
})
