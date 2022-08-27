import React from "react";
import axios from "axios";

import { Block } from "./Block";
import "./index.scss";

function App() {
    const [valutes, setValutes] = React.useState({});
    const [toLeft, setToleft] = React.useState(1);
    const [toRight, setToRight] = React.useState(1);
    const [leftCur, setLeftCur] = React.useState("RUB");
    const [rigthCur, setRightCur] = React.useState("USD");

    React.useEffect(() => {
        axios.get("https://cdn.cur.su/api/latest.json/").then((res) => {
            setValutes(res.data.rates);
        });
    }, []);

    const changeFromValute = (value) => {
        setToleft(value);
    };

    const changeToValute = (value) => {
        const price = value / valutes[leftCur];
        const result = price * valutes[rigthCur];
        setToleft(result);
        setRightCur(value);
    };

    return (
        <div className="App">
            <Block
                value={toLeft}
                currency={leftCur}
                onChangeCurrency={setLeftCur}
                onChangeValue={setToleft}
            />
            <Block
                value={toRight}
                currency={rigthCur}
                onChangeCurrency={setRightCur}
                onChangeValue={changeFromValute}
            />
        </div>
    );
}

export default App;
