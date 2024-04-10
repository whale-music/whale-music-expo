import { request } from "@/util/http/http";

export interface NewMusicRes {
    musicId: number;
    musicName: string;
    picUrl: string;
}

export const getNewMusic = async () => {
    return request.get<NewMusicRes[]>(`/admin/recommend/new/musics`);
};

export interface NewArtistRes {
    artistId: number;
    artistName: string;
    picUrl: string;
}

export const getNewArtist = async () => {
    return request.get<NewArtistRes[]>(`/admin/recommend/new/artists`);
};

export interface NewAlbumRes {
    albumId: number;
    albumName: string;
    picUrl: string;
}

export const getNewAlbums = async () => {
    return request.get<NewAlbumRes[]>(`/admin/recommend/new/albums`);
};
