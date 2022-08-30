import { useCallback, useState } from "react";

type CounterProps = {
    deleteCounter(): void;
}

const Counter = ({ deleteCounter }: CounterProps) => {
    const [count, setCount] = useState<number>(0);

    const decrementCount = useCallback(() => {
        setCount(count - 1);
    }, [count]);

    const incrementCount = useCallback(() => {
        setCount(count + 1);
    }, [count]);

    return (
        <div className="counter">
            <div className="counter-label">
                <div className="counter-label-box">
                    <span>카운터 라벨</span>

                    <div>
                        <button onClick={() => { deleteCounter() }}>❌</button>
                    </div>
                </div>
            </div>

            <div className="counter-amount">
                <span style={{ width: "70%" }}>
                    { count }
                </span>
            </div>

            <div className="counter-body" style={{ marginTop: "1rem" }}>
                <div className="counter-button" style={{ width: "20%" }}>
                    <button 
                        className="decrement"
                        onClick={decrementCount}
                    >
                        dec - 1
                    </button>
                </div>

                <div className="counter-button" style={{ width: "20%" }}>
                    <button 
                        className="increment"
                        onClick={incrementCount}
                    >
                        inc + 1
                    </button>
                </div>
            </div>
        </div>

    )
};

export default Counter;