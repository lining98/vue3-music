export interface ISearchHotDetail {
  seachWord: string;
  score: number;
  content: string;
  source: number;
  iconType: number;
  iconUrl?: string;
  url: string;
  alg: string;
}

export interface ISearchSuggest {
  albums: SearchSuggestAlbums[];
  artists: SearchSuggestArtists[];
  songs: SearchSuggestSongs[];
  order: string[];
}
interface SearchSuggestAlbumsArtist {
  id: number;
  name: string;
  picUrl: string;
  alias: string[];
  albumSize: number;
  picId: number;
  fansGroup: null;
  img1v1Url: string;
  img1v1: number;
  // transNames: ["超越","111"];
  transNames: string[];
  trans: string;
}
interface SearchSuggestAlbums {
  id: number;
  name: string;
  artist: SearchSuggestAlbumsArtist;
  publishTime: number;
  size: number;
  copyrightId: number;
  status: number;
  picId: number;
  mark: number;
}
interface SearchSuggestArtists {
  id: number;
  name: string;
  picUrl: string;
  alias: string[];
  albumSize: number;
  picId: number;
  fansGroup: null;
  img1v1Url: string;
  accountId: number;
  img1v1: number;
  trans: null;
}
interface SearchSuggestSongs {
  id: number;
  name: string;
  artists: SearchSuggestSongsArtists[];
  album: SearchSuggestSongsAlbum;
  duration: number;
  copyrightId: number;
  status: number;
  alias: [];
  rtype: number;
  ftype: number;
  mvid: number;
  fee: number;
  rUrl: null;
  mark: number;
}
interface SearchSuggestSongsArtists {
  id: number;
  name: string;
  picUrl?: any;
  alias: any[];
  albumSize: number;
  picId: number;
  img1v1Url: string;
  img1v1: number;
  trans?:any;
}
interface SearchSuggestSongsAlbum {
  id: number;
  name: string;
  artist: SearchSuggestSongsAlbumArtist;
  publishTime: number;
  size: number;
  copyrightId: number;
  status: number;
  picId: number;
  alia: string[];
  mark: number;
}

interface SearchSuggestSongsAlbumArtist {
  id: number;
  name: string;
  picUrl?: any;
  alias: any[];
  albumSize: number;
  picId: number;
  fansGroup?: any;
  img1v1Url: string;
  img1v1: number;
  trans?: any;
}
