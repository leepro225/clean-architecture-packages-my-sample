import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import Counter from "./Counter";
import * as core from "core";
import * as di from "di";
import { LocalStorageServiceImpl } from "./services/local-storage-service.impl";

// Fixme 이것도 코어에서 가져와야 하나?
type CreateUsecase = {
  execute(): core.Counter;
}
type GetAllUsecase = {
  execute(): core.Counter[];
}
type DeleteUsecase = {
  execute(key: string): void;
}

function App() {
  const [allCounters, setAllCounters] = useState<core.Counter[]>([]);
  let createCounterUsecase: CreateUsecase;
  let getAllCountersUsecase: GetAllUsecase;
  let deleteCounterUsecase: DeleteUsecase;

  useEffect(() => {
    // 카운터 유스케이스 초기화
    const localStorageService = new LocalStorageServiceImpl();
    // const conuterRopository = new data.CounterRepositoryImpl(localStorageService); // FixMe: data 를 바라보는 게 아닌 di 를 바라보도록 수정 필요
    const counterFactory = new di.CounterFactory(localStorageService);
    createCounterUsecase = counterFactory.getCreateCounterUsecase(); // 생성 FixMe: 인스턴스를 외부에서 주입받도록 변경하기 
    getAllCountersUsecase = counterFactory.getAllCounterUsecase(); // 모든 카운터 가져오기
    deleteCounterUsecase = counterFactory.getDeleteCounterUsecase(); // 삭제
    setAllCounters(getAllCountersUsecase.execute()); // 최초 로드 시, 모든 카운터를 가져온다.
  }, []);

  const createCounter = useCallback(() => {
    createCounterUsecase.execute();
    setAllCounters(getAllCountersUsecase.execute()); 
  }, []);

  const deleteCounter = useCallback((counterId: string) => {
    deleteCounterUsecase.execute(counterId);
    setAllCounters(getAllCountersUsecase.execute()); 
  }, []);

  return (
    <div className="centered-column">
        <div>
            <button 
              className="create-counter-button" 
              onClick={createCounter}
            >
              Create Counter +
            </button>
        </div>

        <h2 style={{marginTop: "2rem"}}>Counters</h2>

        <div className="centered-column counter-list">
          {
            allCounters.map((item) => {
              return (
                <Counter 
                  key={item.id}
                  deleteCounter={() => {deleteCounter(item.id)}}
                />
              )
            })
          }
        </div>
    </div>
  )
}

export default App;
