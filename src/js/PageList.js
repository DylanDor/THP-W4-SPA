const PageList = (argument = '') => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, '-');

    const displayResults = (articles) => {
      const resultsContent = articles.map((article) => {
        let platforms = "";
        let genres = "";
        article.parent_platforms.map(platform => {
          platforms += `<li><img src="./src/assets/${platform.platform.slug}.svg" alt="${platform.platform.name}"></li>`;
        });
        article.genres.map(genre => {
          genres += `<li>${genre.name}</li>`;
        });
        return (
          `<article class="card">
              <a href="#pagedetail/${article.id}">
                <div class="card-header">
                  <img src="${article.background_image}" alt="">
                  <div class="img-overlay">
                    <h4>${article.released}</h4>
                    <h4>${article.rating}/${article.rating_top} - ${article.ratings_count} votes</h4>
                    <ul class="flex">${genres}</ul>
                  </div>
                </div>
                <h3>${article.name}</h3>
                <ul class="flex">
                  ${platforms}
                </ul>
              </a>
          </article>`
        );
      });
      const resultsContainer = document.querySelector('.page-list .articles');
      resultsContainer.innerHTML = resultsContent.join("\n");
    };

    const fetchList = (url, argument) => {
      const finalURL = argument ? `${url}&search=${argument}` : url;
      fetch(finalURL)
        .then((response) => response.json())
        .then((responseData) => {
          displayResults(responseData.results)
        });
    };

    fetchList(`https://api.rawg.io/api/games?key=e0b50dc652cd429fbc40879b4124a03e&page_size=9`, cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <div>
        <h2>Welcome,</h2>
        <p>The Hyper Progame is the world’s premier event for computer and video games and related products. At The Hyper Progame, the video game industry’s top talent pack the Los Angeles Convention Center, connecting tens of thousands of the best, brightest, and most innovative in the interactive entertainment industry. For three exciting days, leading-edge companies, groundbreaking new technologies, and never-before-seen products will be showcased. The Hyper Progame connects you with both new and existing partners, industry executives, gamers, and social influencers providing unprecedented exposure to the entire video game industry, all under one roof. This text seems familiar.</p>
        <select class="platform-select btn">
          <option selected value="">Platform: Any</option>
          <option value="2">PlayStation</option>
          <option value="3">XBox</option>
          <option value="4">Switch</option>
          <option value="5">PC</option>
          <option value="6">Linux</option>
          <option value="7">Mobile</option>
        </select>
      </div>
      <div class="page-list">
        <div class="articles">Loading...</div>
      </div>
      <div class="container">
        <button class="btn">Show more</button>
      </div>
    `;

    preparePage();
  };

  render();

};

export default PageList;