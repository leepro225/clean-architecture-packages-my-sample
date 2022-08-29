import * as core from "core";
import * as di from "di";

import { LocalStorageServiceImpl } from "../services/local-storage-service.impl";

const localStorageServiceImpl = new LocalStorageServiceImpl();

const counterFactory = new di.CounterFactory(localStorageServiceImpl);
