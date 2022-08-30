import { Counter } from "./entities/counter.entity";

export abstract class CounterRepository {
    abstract createCounter(counterInfo: Counter): Counter;

    abstract deleteCounter(counterId: string): void;

    abstract getAllCounters(): Counter[];
}

/**
 * 4. 레파지토리 인터페이스를 만든다.
 */