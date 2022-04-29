document.addEventListener("DOMContentLoaded", () => {

let searchForm = document.querySelector('#github-form')
searchForm.addEventListener('submit', e =>{
    e.preventDefault(searchGitHub(e.target.search.value))
    searchForm.reset()
})  

function searchGitHub(user){
    fetch(`https://api.github.com/search/users?q=${user}`)
    .then(res => res.json())
    .then(user => {
        let userArr = user.items
        displayUserData(userArr)
    })
}

function displayUserData(userArr){
    userArr.forEach(user => {
        const userListUl = document.getElementById('user-list')
        let userListLi = document.createElement('li')
        userListLi.innerHTML = `
        <div class = "userContent">
            <h1>User<h1>
            <h2 id="${user.login}">${user.login}</h1>
            <p>
                <a href="${user.html_url}" target="_blank">Link to profile</a>
            </p>
            <img src=${user.avatar_url}>
        </div>
        `
        userListUl.appendChild(userListLi)

        let userName = document.getElementById(`${user.login}`)
        userName.addEventListener('click', () => displayRepos(user))
    })
    
}

function displayRepos(user){
    let userRepoUl = document.getElementById('repos-list')
    let userRepoLi = document.createElement('li') 
   
    let h2 = document.createElement('h2')
    h2.textContent = `${user.login}`
    userRepoLi.appendChild(h2)

    fetch(`https://api.github.com/users/${user.login}/repos`)
    .then(res => res.json())
    
    .then(userRepo => {
       if (userRepo.length >0)
        userRepo.forEach( repo => {
            let a = document.createElement('a')
             a.href = repo.html_url 
             a.setAttribute('target', '_blank')
             a.textContent = repo.name
             let p = document.createElement('p') 
            p.appendChild(a)
            userRepoLi.append(p)
            userRepoUl.appendChild(userRepoLi)
        })
        else{
            let p = document.createElement('p')
                p.textContent = 'No repositories available'
                userRepoLi.appendChild(p)
                userRepoUl.appendChild(userRepoLi)
        }
})


}


})