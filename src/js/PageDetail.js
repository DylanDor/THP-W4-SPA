const PageDetail = (argument) => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, "-");

    const displayGame = (gameData) => {
      console.log(gameData);
      const { name, background_image, developers, released, description, tags, genres, publishers, platforms, website, rating, rating_top, ratings_count, stores} = gameData;
      const articleDOM = document.querySelector(".page-detail");
      articleDOM.innerHTML = `
      <div class="banner">
        <img src="${background_image}">
        <form action="${website}">
          <button class="btn">Check Website</button>
        </form>
      </div>
      <div class="flex s-btwn">
        <h2>${name},</h2>
        <h4 class="rating bold">${rating}/${rating_top} - ${ratings_count} votes</h4>
      </div>
      <div class="bold" id="description">${description}</div>
      <div class="flex s-btwn">
        <div>
          <p class="bold">Release Date</p>
          <p>${released}</p>
        </div>
        <div>
          <p class="bold">Developer</p>
          <p>
            ${developers.map((dev) => dev.name).join(", ")}
          </p>
        </div>
        <div>
          <p class="bold">Platforms</p>
          <p>
          ${platforms.map((platform) => platform.platform.name).join(", ")}
          </p>
        </div>
        <div>
          <p class="bold">Publiser</p>
          <p>${publishers.map((publisher) => publisher.name).join(", ")}</p>
        </div>
      </div>
      <div class="flex s-btwn">
        <div>
          <p class="bold">Genre</p>
          <p>${genres.map((genre) => genre.name).join(", ")}</p>
        </div>
        <div>
          <p class="bold">Tags</p>
          <p>${tags.map((tag) => tag.name).join(", ")}</p>
        </div>
      </div>
      <div>
        <h3>BUY</h3>
        <p>${stores.map((store) => store.store.name).join("<br>")}</p>
      </div>
      `;
    };

    const fetchGame = (url, argument) => {
      fetch(`${url}/${argument}?key=e0b50dc652cd429fbc40879b4124a03e`)
        .then((response) => response.json())
        .then((responseData) => {
          displayGame(responseData);
        });
    };

    fetchGame('https://api.rawg.io/api/games', cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-detail">
      </section>
    `;

    preparePage();
  };

  render();
};

export default PageDetail;