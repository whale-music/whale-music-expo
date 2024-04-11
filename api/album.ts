import { request } from "@/util/http/http";

export interface MusicList {
    id: number;
    musicName: string;
    aliasName: string;
    timeLength: number;
}

export interface MobileAlbumDetailRes {
    id: number;
    albumName: string;
    subType: string;
    description: string;
    company: string;
    publishTime: string;
    userId: number;
    picUrl: string;
    musicList: MusicList[];
}

export const getAlbumDetail = (albumId: number) => {
    return request.get<MobileAlbumDetailRes>(`/admin/album/mobile/${albumId}`);
};
