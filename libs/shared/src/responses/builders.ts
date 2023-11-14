import { Response } from 'express';

export class ResponseBuilder<T> {
    protected error?: string;
    protected status: 'success' | 'failed' | 'error';
    protected data: T;

    protected response: Response;

    constructor(res: Response) {
        this.response = res;
    }

    setData(data: T) {
        this.setStatus('success');
        this.data = data;
        return this;
    }

    setStatus(status: 'success' | 'failed' | 'error') {
        this.status = status;
        return this;
    }

    setError(message?: string) {
        this.error = message;
        this.status = 'error';
        return this;
    }

    toJSON(code?: number) {
        if (this.status === 'error') {
            return {
                status: 'error',
                data: {
                    message: this.error,
                },
            };
        }

        code && this.response.status(code);
        return this.response.json({
            status: this.status,
            data: this.data,
        });
    }
}

export class PaginatedResponseBuilder<T> extends ResponseBuilder<T> {
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

    toJSON(code?: number) {
        this.setLinks();

        code && this.response.status(code);

        return this.response.json({
            status: 'success' as const,
            data: this.data,
            paging: {
                ...(this.prev ? { prev: this.prev } : {}),
                ...(this.next ? { next: this.next } : {}),
                current: this.current,
                total: this.total,
            },
        });
    }
}
