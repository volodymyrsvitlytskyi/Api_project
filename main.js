import {
  COMICS_URL,
  SINGLE_CHARACTER_URL,
  API_CONFIG,
  COMIC_CHARACTERS,
} from './constants.js';

import { CustomError } from './error.js';
import { MainEntity, HeroEntity, FavoriteHero } from './entityClasses.js';
const header = document.querySelector('#heading');
const counter = document.querySelector('#num');
const backBtn = document.querySelector('#back');
const btn = document.querySelector('button');
const input = document.querySelector('input');
export const output = document.querySelector('#output');
const favBtn = document.querySelector('#fav');
let fetchedData;
let favoriteHeroes = JSON.parse(localStorage.getItem('favHeroes')) || [];

// closure
const getComicsCount = (data) => {
  // Outer lexical Environment includes 'data' in lexical environment and reference to outer lexical environment
  return (text) => {
    // Inner Lexical environment has reference to outer lecical environment
    // includes 'text' variable in its environment record. As it does not include 'data' variable, the engine will look into the outer lexical environment of the function.
    return text + ' ' + data.length;
  };
};

class ProjectActions {
  getData(url) {
    return fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .catch((error) => {
        let err = new CustomError(error);
        err.render();
      })
      .then((data) => {
        fetchedData = data.data.results.filter(
          (el) =>
            !el.thumbnail.path.includes('image_not_available') &&
            el.characters?.available !== 0
        );
      });
  }

  attachListener(nodeCollection, func) {
    nodeCollection.forEach((node) => node.addEventListener('click', func));
  }

  addToFavorite(id) {
    if (!favoriteHeroes.find((entity) => entity.id == id)) {
      favoriteHeroes.push(fetchedData.find((entity) => entity.id == id));
      localStorage.setItem('favHeroes', JSON.stringify(favoriteHeroes));
    }
  }

  removeFromFavorite(id) {
    favoriteHeroes = favoriteHeroes.filter((entity) => entity.id != id);
    localStorage.setItem('favHeroes', JSON.stringify(favoriteHeroes));
  }
}

class UI {
  static renderHomeUI(data) {
    output.innerHTML = '';
    backBtn.style.display = 'none';
    header.innerText = 'List of Comics';
    counter.style.display = 'block';
    counter.innerText = getComicsCount(fetchedData)('Number or comics');
    data.forEach((el) => {
      const div = document.createElement('div');
      div.classList.add('col-md-4', 'mt-4');
      const comicEntity = new MainEntity(
        `${el.thumbnail.path}.${el.thumbnail.extension}`,
        el.title,
        el.id
      );
      div.innerHTML += comicEntity.render();
      output.appendChild(div);
    });
    const charactersBtn = document.querySelectorAll('#charBtn');
    actions.attachListener(charactersBtn, (e) => {
      actions
        .getData(
          COMIC_CHARACTERS + `/${e.target.dataset.id}/characters` + API_CONFIG
        )
        .then(() => {
          UI.renderSearchResults(fetchedData);
        });
    });
  }

  static renderSearchResults(data) {
    backBtn.style.display = 'block';
    output.innerHTML = '';
    header.innerText = 'Hero Info';
    counter.style.display = 'block';
    counter.innerText = getComicsCount(fetchedData)('Number of Heroes');
    data.forEach((el) => {
      const div = document.createElement('div');
      div.classList.add('col-md-4', 'mt-4');
      const heroEntity = new HeroEntity(
        `${el.thumbnail.path}.${el.thumbnail.extension}`,
        el.name,
        el.description,
        el.id
      );
      div.innerHTML += heroEntity.render();
      output.appendChild(div);
    });
    const favBtns = document.querySelectorAll('.targetBtn');
    actions.attachListener(favBtns, (e) => {
      const target = e.target;
      target.disabled = true;
      target.innerText = 'Added';
      setTimeout(() => {
        target.disabled = false;
        target.innerText = 'Add to favorite';
      }, 500);
      actions.addToFavorite(e.target.dataset.id);
    });
  }

  static renderFavPage(data) {
    backBtn.style.display = 'block';
    output.innerHTML = '';
    header.innerText = 'My Favorite Heroes';
    counter.style.display = 'none';
    data.forEach((el) => {
      const div = document.createElement('div');
      div.classList.add('col-md-4', 'mt-4');
      const favEntity = new FavoriteHero(
        `${el.thumbnail.path}.${el.thumbnail.extension}`,
        el.name,
        el.description,
        el.id,
        el.comics.available,
        el.series.available,
        el.stories.available
      );
      div.innerHTML += favEntity.render();
      output.appendChild(div);
    });
    let removeBtn = document.querySelectorAll('.removeBtn');
    actions.attachListener(removeBtn, (e) => {
      actions.removeFromFavorite(e.target.dataset.id);
      UI.renderFavPage(favoriteHeroes);
    });
  }
}

const actions = new ProjectActions();

document.addEventListener(
  'DOMContentLoaded',
  actions.getData(COMICS_URL).then(() => {
    UI.renderHomeUI(fetchedData);
  })
);

btn.addEventListener('click', (e) => {
  e.preventDefault();
  if (input.value) {
    actions.getData(SINGLE_CHARACTER_URL + input.value).then(() => {
      UI.renderSearchResults(fetchedData);
    });
    input.value = '';
  } else {
    input.placeholder = 'Please enter a name!';
    setTimeout(() => {
      input.placeholder = 'Search character by name';
    }, 2000);
    return;
  }
});

backBtn.addEventListener('click', () =>
  actions.getData(COMICS_URL).then(() => {
    UI.renderHomeUI(fetchedData);
  })
);

favBtn.addEventListener('click', () => {
  UI.renderFavPage(favoriteHeroes);
});
