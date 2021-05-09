export class MainEntity {
  constructor(image, name, id) {
    this.image = image;
    this.name = name;
    this.id = id;
  }

  render() {
    return `
     <div class="card comics_item" style="width: 18rem;">
    <img class="card-img-top" src=${this.image} alt=${this.name}>
    <div class="card-body">
    <h5 class="card-title">${this.name}</h5>
    <button class='btn btn-dark' id="charBtn" data-id=${this.id}>View all characters</button>
    </div>
    </div>`;
  }
}

export class HeroEntity extends MainEntity {
  constructor(image, name, description, id) {
    super(image, name);
    this.description =
      description !== '' && description !== ' '
        ? description
        : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero, aperiam?';
    this.id = id;
  }

  render() {
    return `
     <div class="card" style="width: 18rem;">
    <img class="card-img-top" src=${this.image} alt=${this.name}>
    <div class="card-body">
    <h5 class="card-title">${this.name}</h5>
    <div>
    <h3>Description</h3>
    <p>${this.description}</p>
    </div>
    <button class='btn btn-dark targetBtn' data-id=${this.id}>Add to favorite</button>
    </div>
    </div>`;
  }
}

export class FavoriteHero extends MainEntity {
  constructor(
    image,
    name,
    description,
    id,
    numOfComics,
    numOfSeries,
    numOfStories
  ) {
    super(image, name);
    this.id = id;
    this.description =
      description ||
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero, aperiam?';
    this.numOfComics = numOfComics;
    this.numOfSeries = numOfSeries;
    this.numOfStories = numOfStories;
  }

  render() {
    return `
     <div class="card comics_item" style="width: 18rem;">
    <img class="card-img-top" src=${this.image} alt=${this.name}>
    <div class="card-body">
    <h5 class="card-title">${this.name}</h5>
    <div>
    <h3>Description</h3>
    <p>${this.description}</p>
    <h4> Extra Info </h4>
    <h5>Comics available: ${this.numOfComics}</h5>
    <h5>Series available: ${this.numOfSeries}</h5>
    <h5>Stories available: ${this.numOfStories}</h5>
    <button class='btn btn-dark removeBtn' data-id=${this.id}>Remove from favorite</button>
    </div>
    </div>
    </div>`;
  }
}
