import { Usecase } from "src/base/usecase.interface";
import { CounterRepository } from "../counter-repository.interface";

import { Counter } from "../entities/counter.entity";

export abstract class DeleteCounterUsecase implements Usecase<void> {
    abstract execute(...args: any[]): void;
}

export class DeleteCounterUsecaseImpl implements DeleteCounterUsecase {
    constructor(private counterRepository: CounterRepository) {}

    execute(counterId: string): void {
        return this.counterRepository.deleteCounter(counterId);
    }
}

