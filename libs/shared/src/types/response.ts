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

class ResponseBuilder<T> {
    protected success: boolean;
    protected status: number;
    protected data: T;

    constructor(builder?: ResponseBuilder<T>) {
        Object.assign(this, builder);
    }

    setData(data: T) {
        this.data = data;
    }

    setStatus(code: number) {
        this.status = code;

        const codeCat = parseInt(code.toString()[0]);
        this.success = codeCat >= 2 && codeCat <= 3;
    }

    toJSON() {
        return {
            status: this.success ? 'success' : 'failed',
            data: this.data,
        };
    }
}

class PaginatedResponseBuilder<T> extends ResponseBuilder<T> {
    protected page: number;
    protected pageSize: number;
    protected total: number;

    protected current: string;
    protected next: string | null;
    protected prev: string | null;

    setCurrentUrl(url: string) {
        this.current = url;
    }

    setTotal(total: number) {
        this.total = total;
    }

    setPage(page: number) {
        this.page = page;
    }

    setPageSize(pageSize: number) {
        this.pageSize = pageSize;
    }

    private setLinks() {
        this.next =
            this.page * this.pageSize >= this.total
                ? null
                : this.getPageUrl(this.current, this.page + 1, this.pageSize);

        this.prev =
            this.page === 1
                ? null
                : this.getPageUrl(this.current, this.page - 1, this.pageSize);
    }

    private getPageUrl(urlStr: string, page: number, pageSize: number) {
        const url = new URL(urlStr);
        url.searchParams.set('page', page.toString());
        url.searchParams.set('pageSize', pageSize.toString());
        return url.toString();
    }

    toJSON() {
        this.setLinks();
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

export class Response<T, K extends string> {
    constructor(private data: Record<K, T>) {}

    static builder<T>() {
        return new ResponseBuilder<T>();
    }

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
