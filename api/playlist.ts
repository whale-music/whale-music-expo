import { request } from "@/util/http/http";

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
