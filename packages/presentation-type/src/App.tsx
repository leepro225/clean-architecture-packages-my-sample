import {useCallback, useState, useEffect} from 'react';
import './App.css';
import Counter from "./Counter";
import * as core from "core";
import container from './di/counter.ioc';
import IDENTIFIER from './constant/identifier';

function App() {
  const [allCounters, setAllCounters] = useState<core.Counter[]>([]);
  // 카운터 유스케이스 초기화
  // const localStorageService = new LocalStorageServiceImpl();
  // const conuterRopository = new data.CounterRepositoryImpl(localStorageService); // FixMe: data 를 바라보는 게 아닌 di 를 바라보도록 수정 필요
  // const counterFactory = new di.CounterFactory(localStorageService); // FixMe: 인스턴스를 외부에서 주입받도록 변경하기 
  // let createCounterUsecase = counterFactory.getCreateCounterUsecase();  
  // let getAllCountersUsecase = counterFactory.getAllCounterUsecase(); 
  // let deleteCounterUsecase = counterFactory.getDeleteCounterUsecase(); 

  let createCounterUsecase = container.get<core.CreateCounterUsecase>(IDENTIFIER.CreateCounterUsecase);
  let deleteCounterUsecase = container.get<core.DeleteCounterUsecase>(IDENTIFIER.DeleteCounterUsecase);
  let getAllCountersUsecase = container.get<core.GetAllCountersUsecase>(IDENTIFIER.GetAllCountersUsecase);

  console.log('createCounterUsecase', createCounterUsecase)

  useEffect(() => {
    setAllCounters(getAllCountersUsecase.execute()); 
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
