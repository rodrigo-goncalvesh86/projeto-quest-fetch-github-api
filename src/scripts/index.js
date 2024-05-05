import { getUser } from "./services/user.js"
import { getRepositories } from "./services/respositories.js"
import { getUserEvents } from "./services/events.js"

import { user } from "./objects/user.js"
import { screen } from "./objects/screen.js"

document.getElementById("btn-search").addEventListener('click', () => {
    const userName = document.getElementById("input-search").value
    if(validateEmptyInput(userName)) return
    getUserData(userName);
})

document.getElementById("input-search").addEventListener('keyup', (e) => {
    const userName = e.target.value;
    const key = e.which || e.keyCode;
    const isEnterKeyPressed = key === 13;

    if (isEnterKeyPressed) {
        if(validateEmptyInput(userName)) return
        getUserData(userName);
    }
})


function validateEmptyInput(userName){
    if(userName.length === 0){
        screen.alertUserRequired()    
        return true
    }
}

async function getUserData(userName) {

    const userResponse = await getUser(userName)
    const repositoriesResponse = await getRepositories(userName)
    const eventsResponse = await getUserEvents(userName)
    
    
    screen.removeAuthenticationMessageFromEmptyInput()
    
    if(userResponse.message === "Not Found"){
        screen.renderNotFound()
        return
    }
    
    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    user.setEvents(eventsResponse)
    
    screen.renderUser(user)
    screen.renderUserEvents(user)
}