let loginBtn = document.getElementById('login-btn')
let logoutBtn = document.getElementById('logout-btn')
let token = localStorage.getItem('token')

if (token){
    loginBtn.remove()
} else {
    logoutBtn.remove()
}

logoutBtn.addEventListener('click',(e) => {
    e.preventDefault()
    localStorage.removeItem('token')
    window.location = 'http://127.0.0.1:3000/projectlist.html'
})

console.log('Hello')
let base_domain = "http://127.0.0.1:8000"
let projectsURL = 'http://127.0.0.1:8000/api/projects/'

let getProjects = () => {
    fetch(projectsURL)
        .then(response => response.json()
            .then(data => {
        console.log(data)
        buildProjects (data) //Pass in response data to buildProjects Function 
                    }
                )
            )
}

getProjects()

let buildProjects = (projects) => {
    let projectWrapper = document.getElementById("projects--wrapper")
    projectWrapper.innerHTML = ''  //RESET
    console.log(projectWrapper)
    
    for (let i = 0; projects.length > i; i++) {
      const project = projects[i];
    //   console.log(project)
        let projectCard = `
            <div class = "project--card">
                
                <img src="${base_domain}${project.featured_image}" />
                
                <div>
                    <div class="card--header">
                        <h3>${project.title}</h3>
                        <strong class = "vote--option" data-vote="up" data-project="${project.id}"  >&#43;</strong>
                        <strong class = "vote--option" data-vote="down" data-project="${project.id}" >&#8722;</strong>
                    </div>
                    <i>${project.vote_ratio}% Positive Feedback (Total Votes : <span>${project.vote_total}</span>)</i>
                    <p>${project.description}</p>
                </div>
            </div> 
        ` 
        projectWrapper.innerHTML += projectCard
    
    }

    //Add Event Listener
    addVoteEvents()    
}

let addVoteEvents = () => {
    let voteBtns = document.getElementsByClassName('vote--option')
    // console.log(voteBtns)
    let token = localStorage.getItem('token')
    for (let i = 0; voteBtns.length > i; i++) {
        voteBtns[i].addEventListener('click',(e) =>{
            // console.log('Vote was Clicked')
            let vote = e.target.dataset.vote   //dataset.vote is set in "data-vote" custom attribute
            let project = e.target.dataset.project //dataset.project is set in "data-project" custom attribute
            console.log('PROJECT: ',project,"VOTE: ", vote)
            
            fetch(
                `${base_domain}/api/projects/${project}/vote/`,
                {
                    method:'POST',
                    headers: {
                        'Content-Type':'application/json',
                        'Authorization': `Bearer ${token}`
                        
                    },
                    body: JSON.stringify({"value": vote})

                }
            )
            .then(response => response.json())
            .then(data => {
                console.log('Success:',data)
                getProjects()
            })
            
        }) ;
        
    }
}



