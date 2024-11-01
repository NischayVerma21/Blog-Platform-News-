function createBlogElements(title, imageSrc, abstractText) {
    const container = document.getElementById('home');
  
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('container');
    
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content');
    
    const headDiv = document.createElement('div');
    headDiv.classList.add('head');
    
    const titleH1 = document.createElement('h1');
    titleH1.id = 'title';
    titleH1.textContent = `${title}`;
    headDiv.appendChild(titleH1);

    const paraDiv = document.createElement('div');
    paraDiv.classList.add('para');
    
    const abstractP = document.createElement('p');
    abstractP.id = 'abstract';
    abstractP.textContent = `${abstractText}`;
    paraDiv.appendChild(abstractP);

    headDiv.appendChild(paraDiv);
  
    const imageImg = document.createElement('img');
    imageImg.classList.add('image');
    imageImg.id = 'image';
    imageImg.src =`/uploads/${imageSrc}`;
   
  
    contentDiv.appendChild(headDiv);
    contentDiv.appendChild(imageImg);
    containerDiv.appendChild(contentDiv);
    container.appendChild(containerDiv);
  
    
  }
function addBlog(){
    fetch('/getData', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            // Use the retrieved data
            console.log('Received Data:', data);
    
            const title = data.title;
            const image = data.image;
            const abstract = data.abstract;
    
            if (title !== null && image !== null && abstract !== null) {
                console.log(title);
                console.log(image);
                console.log(abstract);
    
                // Call createBlogElements when data is complete
                createBlogElements(title, image, abstract);
            } else {
                // Data is incomplete or missing, handle this scenario
                console.log('Data is missing or incomplete.');
            }
        })
        .catch(error => console.error('Error:', error));

  
  }
  

  
  window.onload = function() {
    homie();
    };
    function homie() {
    const url = "https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=your-api-key";
    const options = {
    method: "GET",
    headers: {
      "Accept": "application/json"
    },
    };
    fetch(url, options)
    .then(response => {
      console.log('Response status:', response.status);
      if (response.ok) {
        return response.json();
      }
      return response.json().then(err => {
        console.log('Error response:', err);
        return Promise.reject({
          status: response.status,
          statusText: response.statusText,
          errorMessage: err,
        });
      });
    })
    .then(data => {
      addBlog();
      showData(data);
      
      
      
    })
    .catch(err => {
      console.error('Fetch error:', err);
    });
    }
    
    function autoMobile() {
    document.getElementById('home').innerHTML = '';
    const url = "https://api.nytimes.com/svc/topstories/v2/automobiles.json?api-key=lGHHhr8G8zn0mUxHrVXLc7CDPUxTN9Ie"  /*"https://api.nytimes.com/svc/news/v3/content/nyt/business.json?api-key=WMfcHfq9NyQu04di2Lfj0hl9Vfzjr99m"*/;
    const options = {
    method: "GET",
    headers: {
      "Accept": "application/json"
    },
    };
    fetch(url, options).then(
    response => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then(err => {
        return Promise.reject({
          status: response.status,
          statusText: response.statusText,
          errorMessage: err,
        });
      });
    })
    .then(data => {
        addBlog();
        showData(data);
      
    })
    .catch(err => {
      console.error(err);
    });
    }
    
    function business() {
    document.getElementById('home').innerHTML = '';
    const url = "https://api.nytimes.com/svc/news/v3/content/nyt/business.json?api-key=WMfcHfq9NyQu04di2Lfj0hl9Vfzjr99m";
    const options = {
    method: "GET",
    headers: {
      "Accept": "application/json"
    },
    };
    fetch(url, options).then(
    response => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then(err => {
        return Promise.reject({
          status: response.status,
          statusText: response.statusText,
          errorMessage: err,
        });
      });
    })
    .then(data => {
        addBlog();
        showData(data);
      
    
    })
    
      
    .catch(err => {
      console.error(err);
    });
    }
    
    

    
    function showData(data){
      const homeContainer = document.getElementById('home');

      for (let i = 0; i < data.num_results; i++) {
        const article = data.results[i];
        
        // Selecting the URL of the image at index 2 in the 'multimedia' array
        const imageAtIndex2 = article.multimedia[2];
        const imageUrl = imageAtIndex2 ? imageAtIndex2.url : ''; // Getting the image URL at index 2
      
        // Create elements
        const container = document.createElement('div');
        container.classList.add('container');
      
        const content = document.createElement('div');
        content.classList.add('content');
      
        const head = document.createElement('div');
        head.classList.add('head');
      
        const title = document.createElement('div');
        title.id = 'title';
        title.innerHTML = `<h1>${article.title}</h1>`;
        head.appendChild(title);
      
        const para = document.createElement('div');
        para.classList.add('para');
        para.innerHTML = `<p>${article.abstract} <br>.....<a href="${article.url}" class="showMore" target="_blank">Show More</a></p>`;
        head.appendChild(para);
      
        const image = document.createElement('div');
        image.classList.add('image');
        const img = document.createElement('img');
        img.src = imageUrl; // Set the image URL at index 2
        img.id = `tImg_${i}`;
        img.classList.add('tImg');
        image.appendChild(img);
      
        content.appendChild(head);
        content.appendChild(image);
      
        container.appendChild(content);
      
        homeContainer.appendChild(container);
      }
          
    
    }


// Function to get a specific cookie value by name
function getCookie(name) {
  const cookies = document.cookie.split(';').map(cookie => cookie.trim());
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null; // Return null if the cookie is not found
}

// Fetching the value of the 'username' cookie
const username = getCookie('username');

// Check if 'username' cookie exists and has a value
if (username) {
  console.log('Username:', username);
  document.getElementById('userName').innerHTML = `Welcome, ${username}`;
} else {
  console.log('Username cookie not found or empty!');
}


// JavaScript code to fetch data from API endpoint
fetch('/userinput')
    .then(response => response.json())
    .then(data => {
        // Handle the retrieved data
        displayData(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

function displayData(data) {
    // Display the data on the HTML page
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = JSON.stringify(data, null, 2);
}
