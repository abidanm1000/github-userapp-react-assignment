import './App.css';
import axios from 'axios'
import { useEffect, useState, useRef } from 'react'

// #1 npm install axios
// #2 import axios from './axios'
// #3 import useEffect hook
// #4 Make an get request to the github api using axios
// #5 How do we get reference of the input value?
// #6 import useRef and get the ref of the search input
// #7 On click of the search update the user state with the ref 
// #8 After finish search functionality how do you map the response into the code?
// #9 Get the theme switcher to work
// #10 Turn reusable sections of the app to components (Container,UserContent,UserInput.Finish rest of hw)

function App() {
  
  // console.log(response.data)

  const [userData, setUserData] = useState({})
  const [user, setUser] = useState('octocat')
  const [theme, setTheme] = useState('')

  useEffect(()=> {
    const getUser = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${user}`)
        .then((res)=>{
          setUserData(res.data)
        })
      }
      catch (error) {
        console.log(error)
      }
    }
    
    getUser()
  }, [user])
  console.log(userData)
  const userRef = useRef()

  // formatting the date
  const date = new Date(userData.created_at)
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const changeTheme = () => {
    if(theme == '') {
      setTheme('dark')
    } else {
      setTheme('')
    }
  }

  return (
      <div className={`App ${theme}`}>
        <div className='container'>


          <div className="header">
            <h4>devfinder</h4>
            <div className="darkMode" >
              <p id="modeText">DARK</p>
              <img src="./assets/icon-moon.svg" id = "dark_btn"alt="" onClick={changeTheme}/>
            </div>        
          </div>

          <div className="search" id="search_container">
            <img src="./assets/icon-search.svg" alt=""/>
            <input ref={userRef} id ="input" type="text" placeholder="Search Github username..."/>
            <div className="search_btn">
              <button id="search" onClick={()=> setUser(userRef.current.value)}
              >Search</button>
            </div>
          </div>

          <div id="error">
            <p>User not found</p>
          </div>

          <div className="content">
    
            <div className="profile">
              <div className="profile_frame">
                <img id = "avatar"src={!userData.avatar_url ? "./assets/profilePlaceholder.png" : userData.avatar_url} alt=""/>
              </div>
            </div>

            <div className="user">

              <div className="user_info">

                <div className="name" >

                  <h3 id = "name">{userData.name}</h3>

                  <div className="username">
                    <p id="login">@{userData.login}</p>
                  </div>
                </div>
          
                <div className="date">
                  <p id="date">Joined {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}</p>
                </div>
              </div>
    
              <div className="bio">
                <p id = "bio">{!userData.bio ? 'This profile has no bio' : userData.bio}</p>
              </div>


              <div className="stats_container" id="statistics">

                <div className="stats">
                  <p>Repos</p>
                  <p id="repo">{userData.public_repos}</p>
                </div>

                <div className="stats">
                  <p>Followers</p>
                  <p id="followers">{userData.followers}</p>
                </div>

                <div className="stats">
                  <p>Following</p>
                  <p id="following">{userData.following}</p>
                </div>

              </div>

              <div className="links_container">

                <div className="left">
                  <div className="info">
                    <img src="./assets/icon-location.svg" alt=""/>
                    <p id="location">{!userData.location ? 'Unavailable' : userData.location}</p>
                  </div>
                  <div className="info">
                    <img src="./assets/icon-website.svg" alt=""/>
                    <a href={userData.html_url} target="_blank" id = "blog">{userData.html_url}</a>
                  </div>
                </div>

                <div className="right">
                  <div className="info">
                    <img src="./assets/icon-twitter.svg" alt=""/>
                    <p id ="twitter">{!userData.twitter_username ? 'Unavailable' : userData.twitter_username}</p>
                  </div>
                  <div className="info">
                    <img src="./assets/icon-company.svg" alt=""/>
                  <p id= "company">{!userData.company ? 'Unavailable' : userData.company}</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
       </div>
     </div>

  );
}

export default App;
