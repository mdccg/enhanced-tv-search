type TVShow = {
  id: number;
  name: string;
  type: string;
  language: string;
  genres: string[];
  isRunning: boolean;
  premieredDate?: Date;
  imageUrl?: string;
  channel: string;
};

export const getTvShow = (jsonObject: any): TVShow => {
  const { id, name, type, language, genres, status, premiered, network, webChannel, image } = jsonObject;

  let premieredDate;
  
  if (premiered) {
    const [year, month, day] = (<string>premiered).split('-').map((value) => parseInt(value));
    premieredDate = new Date(year, month - 1, day);
  }

  const isRunning = status === 'Running';
  const channel = network ? network.name : webChannel.name;

  const tvShow: TVShow = { id, name, type, language, genres, isRunning, channel };

  if (premiered) {
    tvShow.premieredDate = premieredDate;
  }

  if (image) {
    tvShow.imageUrl = image.original;
  }

  return tvShow;
}

export default TVShow;