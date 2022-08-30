export abstract class Usecase<T> {
    abstract execute(...args: any[]): T;
}

/**
 * 2. 유스케이스 인터페이스를 만든다.
 */