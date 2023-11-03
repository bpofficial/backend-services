export class ErrorResponse<T> {
    constructor(private data: Record<string, unknown>) {}

    toFailureResponse() {
        return {
            status: 'fail',
            data: this.data,
        };
    }

    toErrorResponse() {
        return {
            status: 'error',
            data: this.data,
        };
    }
}

export class Response<T, K extends string> {
    constructor(private data: Record<K, T>) {}

    toResponse() {
        return {
            status: 'success' as const,
            data: this.data,
        };
    }
}

export class PaginatedResponse<T> {
    private next: string | null;
    private prev: string | null;
    private current: string;
    private total: number;
    private data: T[];

    constructor(
        currentUrl: string,
        data: T[],
        page: number,
        pageSize: number,
        total: number,
    ) {
        this.next =
            page * pageSize >= total
                ? null
                : this.getPageUrl(currentUrl, page + 1, pageSize);

        this.prev =
            page === 1 ? null : this.getPageUrl(currentUrl, page - 1, pageSize);

        this.current = currentUrl;
        this.data = data;
    }

    private getPageUrl(urlStr: string, page: number, pageSize: number) {
        const url = new URL(urlStr);
        url.searchParams.set('page', page.toString());
        url.searchParams.set('pageSize', pageSize.toString());
        return url.toString();
    }

    getResponse() {
        return {
            status: 'success' as const,
            data: this.data,
            paging: {
                ...(this.prev ? { prev: this.prev } : {}),
                ...(this.next ? { next: this.next } : {}),
                current: this.current,
                total: this.total,
            },
        };
    }
}
