export interface PageResCommon<T> {
    current: number;
    size: number;
    total: number;
    content: T[];
}

export interface PageReqCommon {
    pageIndex: number;
    pageNum: number;
}
