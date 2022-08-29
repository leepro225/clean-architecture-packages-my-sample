import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import Counter from "./Counter";
import * as core from "core";
import * as data from "data";
import { LocalStorageServiceImpl } from "./services/local-storage-service.impl";

// Fixme 이것도 코어에서 가져와야 하나?
type CreateUsecase = {
  execute(): core.Counter;
}
type GetAllUsecase = {
  execute(): core.Counter[];
}

function App() {
  const [allCounters, setAllCounters] = useState<core.Counter[]>([]);
  let createCounterUsecase:CreateUsecase;
  let getAllCountersUsecase:GetAllUsecase;

  useEffect(() => {
    // 카운터 유스케이스 초기화
    const localStorageService = new LocalStorageServiceImpl();
    const conuterRopository = new data.CounterRepositoryImpl(localStorageService); // FixMe: data 를 바라보는 게 아닌 di 를 바라보도록 수정 필요
    createCounterUsecase = new core.CreateCounterUsecaseImpl(conuterRopository); // 생성
    getAllCountersUsecase = new core.GetAllCountersUsecaseImpl(conuterRopository); // 모든 카운터 가져오기
    // 삭제
    // 변경 감지(?)
    setAllCounters(getAllCountersUsecase.execute()); // 최초 로드 시, 모든 카운터를 가져온다.
  }, []);

  const createCounter = useCallback(() => {
    const newCounter:core.Counter = createCounterUsecase.execute();
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
        <div className="counter-filter">
            <input/>
        </div>
        <div className="centered-column counter-list">
          {
            allCounters.map((item) => {
              return (
                <Counter key={item.id}/>
              )
            })
          }
        </div>
    </div>
  )
}

export default App;
