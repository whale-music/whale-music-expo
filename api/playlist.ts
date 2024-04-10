import { request } from "@/util/http/http";
import { PageReqCommon, PageResCommon } from "@/api/common";

export interface PlayListAllRes {
    id: number;
    playListName: string;
    type: number;
    description: string;
    userId: number;
    sort: number;
    picUrl: string;
}

export const getUserPlaylistAll = async (userId: number) => {
    return request.get<PlayListAllRes[]>(`/admin/playlist/user/all?id=${userId}`);
};

export interface CollectInfoRes {
    nickname: string;
    collectTag: string[];
    picUrl: string;
    id: number;
    playListName: string;
    type: number;
    description: string;
    userId: number;
    sort: number;
    createTime: string;
    updateTime: string;
}

export const getPlayListInfo = (id: number) => {
    return request.get<CollectInfoRes>(`/admin/playlist/info/${id}`);
};

export interface PlaylistMusicPageReq extends PageReqCommon {
    id: number;
    musicName: string;
}

export interface PlaylistMusicPageRes {
    id: number;
    musicName: string;
    musicNameAlias: string;
    picUrl: string;
    artistIds: number[];
    artistNames: string[];
    albumId: number;
    isExist: boolean;
    isLike: boolean;
}

export const getPlaylistMusicPage = (data: PlaylistMusicPageReq) => {
    return request.post<PageResCommon<PlaylistMusicPageRes>>(`/admin/playlist/tracks/music/page`, JSON.stringify(data));
};
