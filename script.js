document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
      const error = document.getElementById("error");

      if (username === "" || password === "") {
        error.textContent = "Both fields are required!";
      } else {
        localStorage.setItem("username", username);
        window.location.href = "dashboard.html";
      }
    });
  }
  const welcome = document.getElementById("welcome");
  if (welcome) {
    const user = localStorage.getItem("username");
    welcome.textContent = `Welcome, ${user}!`;

    // Fetch Weather API
    fetch("https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.0060&current_weather=true&timezone=America/New_York")
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById("card1");
        container.innerHTML = "";
        const current = data.current_weather;
        const div = document.createElement("div");
        div.className = "item";
        div.innerHTML = `🌆 New York<br>Temp: ${current.temperature}°C<br>Wind: ${current.windspeed} km/h`; 
        container.appendChild(div);
      })
      .catch(err => {
        console.error(err);
        document.getElementById("card1").textContent = "Unable to load weather";
      });

    // Fetch Crypto API
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin&vs_currencies=usd")
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById("card2");
        container.innerHTML = "";
        const btc = document.createElement("div");
        btc.className = "item";
        btc.textContent = `₿ Bitcoin: $${data.bitcoin.usd.toLocaleString()}`;
        const eth = document.createElement("div");
        eth.className = "item";
        eth.textContent = `Ξ Ethereum: $${data.ethereum.usd.toLocaleString()}`;
        const doge = document.createElement("div");
        doge.className = "item";
        doge.textContent = `Ð Dogecoin: $${data.dogecoin.usd.toFixed(4)}`;
        container.appendChild(btc);
        container.appendChild(eth);
        container.appendChild(doge);
      })
      .catch(err => {
        console.error(err);
        document.getElementById("card2").textContent = "Unable to load crypto";
      });

    // Fetch News API (Hacker News front page)
    fetch("https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=3")
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById("card3");
        container.innerHTML = "";
        data.hits.forEach(item => {
          const div = document.createElement("div");
          div.className = "item";
          const title = item.title || item.story_title || "No title";
          div.textContent = `📰 ${title.substring(0, 60)}...`;
          container.appendChild(div);
        });
      })
      .catch(err => {
        console.error("News fetch failed:", err);
        document.getElementById("card3").textContent = "Unable to load news";
      });

    // Fetch Additional API data (Todos)
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=3")
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById("apiData");
        container.innerHTML = "";
        data.forEach(item => {
          const div = document.createElement("div");
          div.className = "api-item";
          div.textContent = `✓ ${item.title}`;
          container.appendChild(div);
        });
      })
      .catch(err => console.error(err));
  }
});


function logout() {
  localStorage.removeItem("username");
  window.location.href = "index.html";
}


