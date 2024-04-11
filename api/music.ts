import { request } from "@/util/http/http";

interface MusicSources {
    url: string;
    id: number;
    musicId: number;
    rate: number;
    path: string;
    md5: string;
    level: string;
    encodeType: string;
    size: number;
    userId: number;
    createTime: string;
    updateTime: string;
}

export interface MobileMusicDetailRes {
    id: number;
    musicName: string;
    aliasName: string;
    picUrl: string;
    sources: MusicSources[];
}

export const getMusicInfo = (musicId: number) => {
    return request.get<MobileMusicDetailRes>(`/admin/music/mobile/detail/${musicId}`);
};
