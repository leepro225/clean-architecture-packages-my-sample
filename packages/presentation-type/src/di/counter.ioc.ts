import * as core from "core";
import * as di from "di";
import { Container } from "inversify";
import IDENTIFIER from "../constant/identifier";

import { LocalStorageServiceImpl } from "../services/local-storage-service.impl";

const localStorageServiceImpl = new LocalStorageServiceImpl();

const container = new Container();
const counterFactory = new di.CounterFactory(localStorageServiceImpl);

container.bind<core.CreateCounterUsecase>(IDENTIFIER.CreateCounterUsecase).toConstantValue(counterFactory.getCreateCounterUsecase());
container.bind<core.DeleteCounterUsecase>(IDENTIFIER.DeleteCounterUsecase).toConstantValue(counterFactory.getDeleteCounterUsecase());
container.bind<core.GetAllCountersUsecase>(IDENTIFIER.GetAllCountersUsecase).toConstantValue(counterFactory.getAllCounterUsecase());

export default container;