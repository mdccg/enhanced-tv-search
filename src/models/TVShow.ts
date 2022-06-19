import api from './../services/api';

type TVShow = {
  id: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  isRunning: boolean;
  premieredDate?: Date;
  imageUrl?: string;
  thumbnailUrl?: string;
  channel: string;
};

export const getTVShowById = async (id: string): Promise<TVShow | null> => {
  try {
    const response = await api.get(`/shows/${id}`);
    const tvShow = parseTVShow(response.data);
    return tvShow;

  } catch(error) {
    console.error(error);
  }

  return null;
}

export const parseTVShow = (jsonObject: any): TVShow => {
  const { id, name, type, language, genres, status, premiered, network, webChannel, image } = jsonObject;

  let premieredDate;
  
  if (premiered) {
    const [year, month, day] = (<string>premiered).split('-').map((value) => parseInt(value));
    premieredDate = new Date(year, month - 1, day);
  }

  const isRunning = status === 'Running';
  const channel = network ? network.name : webChannel.name;

  const tvShow: TVShow = { id: `${id}`, name, type, language, genres, isRunning, channel };

  if (premiered) {
    tvShow.premieredDate = premieredDate;
  }

  if (image) {
    tvShow.imageUrl = image.original;
    tvShow.thumbnailUrl = image.medium;
  }

  return tvShow;
}

export default TVShow;