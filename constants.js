export const API_CONFIG =
  '?ts=5&apikey=2f225bdb022d750f3c0410cb37d40d7a&hash=237e354ff9f74afba8e537ddf69f2aa7';

const BASE_URL = 'http://gateway.marvel.com/v1/public/';
export const CHARACTERS_URL =
  BASE_URL + 'characters' + API_CONFIG + '&limit=40';
export const SINGLE_CHARACTER_URL =
  BASE_URL + 'characters' + API_CONFIG + '&nameStartsWith=';
export const COMICS_URL = BASE_URL + 'comics' + API_CONFIG + '&limit=100';

export const COMIC_CHARACTERS = BASE_URL + 'comics';
