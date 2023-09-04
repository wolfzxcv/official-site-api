export type IDailyFxAsiaRes = {
  id: string;
  createAt: number;
  text: string;
  image_url: string;
  video_url: null;
  author: {
    twitter_nick: string;
    photo_url: string;
  };
  event_type: 'ADD';
};

export type INewsRes = {
  id: string;
  createAt: number;
  time: string;
  text: string;
};
