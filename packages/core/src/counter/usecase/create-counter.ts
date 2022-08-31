import { Usecase } from "src/base/usecase.interface";
import { CounterRepository } from "src/counter/counter-repository.interface";
import {injectable} from "inversify";
import "reflect-metadata";

import { Counter } from "../entities/counter.entity";

/**
 * 유스케이스의 인터페이스
 */
export abstract class CreateCounterUsecase implements Usecase<Counter> {
    abstract execute(...args: any[]): Counter;
} 

/**
 * 위 인터페이스의 구현체
 */
 @injectable()
export class CreateCounterUsecaseImpl implements CreateCounterUsecase {
    constructor(private counterRepository: CounterRepository) {}

    execute(): Counter {
        return this.counterRepository.createCounter({
            id: Math.random().toString().substring(2),
            currentCount: 0,
            decrementAmount: 1,
            incrementAmount: 1,
            label: "New Counter"
        });
    }
}

/**
 * 2 ~ 3. 유스케이스의 인터페이스를 정의하고, 구현한다.
 * 
 * 이런 방식은 데이터 흐름를 정의하는데 도움이 되고, 의존성 주입을 쉽게 할 수 있다.
 * 이 유스케이스에서는 사용자가 새로고침을 해도 잃어 버리지 않을 수 있는 카운터를 생성할 방법이 필요하다.
 * 이를 위해서는 레파지토리 인터페이스가 필요하다. CounterRepository
 * 
 * 레파지토리를 constructor를 통해 주입. execute 메소드를 실행.
 */