export interface AuthObject {
  isAuthenticated: boolean;
  id: string,
  username: string;
  avatar: string
}

export interface Settings {
  onlyImage: boolean;
  hideRates: boolean;
  numImages: number;
}

export interface FeedItem {
  id: number;
  caption: string;
  images: any;
  user: string;
  comments: number;
  likes: number;
}

export interface Message {
  type: string;
  message: string;
  code?: string;
}