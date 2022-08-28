import React from "react";
import axios from "axios";

import { Block } from "./Block";
import "./index.scss";

function App() {
    const [leftInput, setLeftInput] = React.useState(0);
    const [rightInput, setRightInput] = React.useState(1);
    const [leftValuteTitle, setLeftValuteTitle] = React.useState("RUB");
    const [rightValuteTitle, setRightValuteTitle] = React.useState("USD");

    const valutes = React.useRef({});

    React.useEffect(() => {
        axios.get("https://cdn.cur.su/api/latest.json/").then((res) => {
            valutes.current = res.data.rates;
            convertRightToLeft(1);
        });
    }, []);

    const convertRightToLeft = (value) => {
        setRightInput(value);
        setLeftInput(
            (
                (value / valutes.current[rightValuteTitle]) *
                valutes.current[leftValuteTitle]
            ).toFixed(2)
        );
    };

    const convertLeftToRight = (value) => {
        setLeftInput(value);
        setRightInput(
            (
                (value / valutes.current[leftValuteTitle]) *
                valutes.current[rightValuteTitle]
            ).toFixed(2)
        );
    };

    React.useEffect(() => {
        convertLeftToRight(leftInput);
    }, [leftValuteTitle]);

    React.useEffect(() => {
        convertRightToLeft(rightInput);
    }, [rightValuteTitle]);

    return (
        <div className="App">
            <Block
                value={leftInput}
                currency={leftValuteTitle}
                onChangeCurrency={setLeftValuteTitle}
                onChangeValue={convertLeftToRight}
            />
            <Block
                value={rightInput}
                currency={rightValuteTitle}
                onChangeCurrency={setRightValuteTitle}
                onChangeValue={convertRightToLeft}
            />
        </div>
    );
}

export default App;
