import { request } from "@/util/http/http";

export interface MobileArtistDetailRes {
    id: number;
    artistName: string;
    aliasName: string;
    sex: string;
    birth: string;
    location: string;
    introduction: string;
    userId: number;
    picUrl: string;
    musicList: MusicConvert[];
}

export interface MusicConvert {
    picUrl: string;
    id: number;
    musicName: string;
    aliasName: string;
    albumId: number;
    userId: number;
    timeLength: number;
    comment: string;
    language: string;
    publishTime: string;
    updateTime: string;
    createTime: string;
}

export const getMobileArtistDetail = (artist: number) => {
    return request.get<MobileArtistDetailRes>(`/admin/singer/mobile/${artist}`);
};
