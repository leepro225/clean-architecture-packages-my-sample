import { Counter } from "./entities/counter.entity";

export abstract class CounterRepository {
    abstract createCounter(counterInfo: Counter): Counter;

    abstract getAllCounters(): Counter[];
}

/**
 * 4. 레파지토리를 만든다.
 */