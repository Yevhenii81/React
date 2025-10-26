<<<<<<< HEAD
import { useContext, useState } from "react";
=======
import { useContext } from "react";
>>>>>>> friend/main
import AppContext from "../../features/context/AppContext";
import Calc from "../../widgets/calc/Calc";

export default function Intro() {
<<<<<<< HEAD
    const {user} = useContext(AppContext);     // hook
    const [count, setCount] = useState(0);     // hook

    const onCountClick = () => {
        setCount(count + 1);
    };

    return <div className="text-center">
        <h1 className="display-4">Вступ. Управління станом</h1>
        <div className="row">
            <div className="col">
                <button className="btn btn-primary" onClick={onCountClick}>+1</button>
                <h3>Підсумок: {count}</h3>

                {!!user && <p>Вітання, {user.Name}</p>}
                
                <hr/>
                <CountWidget count={count} setCount={setCount} />  {/* Prop Drilling */}
            </div>
            <div className="col"><Calc /></div>
        </div>        
    </div>;
}

function CountWidget(props) {  // Prop Drilling
    return <div className="border p-2 m-3">
        Ваш підсумок: {props.count}
        <button className="btn btn-danger" onClick={() => props.setCount(0)}>Скинути</button>
    </div>
=======
    const {user, count, setCount} = useContext(AppContext);

    const onCountClick = () => {
        setCount(count + 1);
    }

    const onMinusClick = () => {
        if (count <= 0) return;
        setCount(count - 1);
    }

    return <div className="text-center">
        <h1 className="display-4">Вступление в управление состоянием.</h1>
        
        <div className="row">
            <div className="col">
                <button className="btn btn-primary" onClick={onCountClick}>+1</button>
                &nbsp;
                <button className="btn btn-primary" onClick={onMinusClick}>-1</button>

                <h3>Пидсумок: {count}</h3>
                <hr />
                {!!user && <p>Приветствуем {user.Name}</p>}

                <hr />
                <CountWidget count={count} setCount={setCount} /> {/* Prop Drilling */}
                <hr />
            </div>
            <div className="col">
                <Calc />

            </div>

        </div>
    </div>;
}

function CountWidget(props) { // Prop Drilling
    return <div className="border p-2 m-3">
        Ваш Пидсумок: {props.count}
        <br/>
        <br/>
        <button className="btn btn-danger" onClick={() => props.setCount(0)}>Скинуть</button>
    
    </div>
    
>>>>>>> friend/main
}