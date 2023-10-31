import { firstValueFrom, Observable } from 'rxjs';

export async function OtoPromise<T>(observable: Observable<T>): Promise<T> {
    return await firstValueFrom(observable);
}
