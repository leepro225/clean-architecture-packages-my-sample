const Counter = () => {
    return (
        <div className="counter">
    <div className="counter-label">
        <div className="counter-label-box">
            <span>카운터 라벨</span>

            <div>
                <button>❌</button>
            </div>
        </div>
    </div>

    <div className="counter-amount">
        <span style={{width: "70%"}}>
            카운터.현재카운트
        </span>
    </div>

    <div className="counter-body" style={{marginTop: "1rem"}}>
        <div className="counter-button" style={{width: "20%"}}>
            <button className="decrement">
                dec - 1
            </button>
        </div>

        <div className="counter-button" style={{width: "20%"}}>
            <button className="increment">
                inc + 1
            </button>
        </div>
    </div>
</div>

    )
};

export default Counter;