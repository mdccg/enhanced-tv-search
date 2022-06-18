export const getFavouritedShows = (): string[] => {
  const stringFavouritedShows = <string>localStorage.getItem('favouritedShows');
  const favouritedShows: string[] = JSON.parse(stringFavouritedShows) || [];
  
  return favouritedShows;
}

const saveFavouritedShows = (favouritedShows: string[]) => {
  const stringFavouritedShows = JSON.stringify(favouritedShows);
  localStorage.setItem('favouritedShows', stringFavouritedShows);
}

export const favouriteShow = (id: string) => {
  const favouritedShows = getFavouritedShows();
  if (favouritedShows.includes(id)) return;
  favouritedShows.push(id);
  saveFavouritedShows(favouritedShows);
}

export const unfavouriteShow = (id: string) => {
  const favouritedShows = getFavouritedShows();
  const updatedFavouritedShows = favouritedShows.filter((_id) => _id !== id);
  saveFavouritedShows(updatedFavouritedShows);
}

export const isFavourited = (id: string) => {
  const favouritedShows = getFavouritedShows();
  return favouritedShows.includes(id);
}