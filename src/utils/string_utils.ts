import {
  types as jsonTypes,
  genres as jsonGenres,
  languages as jsonLanguages
} from './../translations/dict.json';

export const isEmpty = (string: string | null) => {
  const regExp = new RegExp(/^(\s+)?$/);

  if (!string) {
    return true;
  }

  return regExp.test(string);
}

export const getTranslatedType = (type: string) =>
  (<any>jsonTypes)[type] ?? type;

export const getFormattedGenres = (genres: string[]): string => {
  if (genres.length === 1) {
    let genre: string = genres[0];
    return (<any>jsonGenres)[genre] ?? genre;
  }

  const translatedGenres = genres.map((genre, index) => {
    const translatedGenre: string = (<any>jsonGenres)[genre] ?? genre;
  
    return index > 0 ? translatedGenre.toLowerCase() : translatedGenre;
  });
  
  const formattedGenres = translatedGenres.splice(0, genres.length - 1).join(', ')
    + ' e ' + translatedGenres.splice(-1);
  
  return formattedGenres;
}

export const getTranslatedLanguage = (language: string) =>
  (<any>jsonLanguages)[language] ?? language;