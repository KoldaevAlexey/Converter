import React from "react";
import axios from "axios";

import { Block } from "./Block";
import "./index.scss";

function App() {
    const [valutes, setValutes] = React.useState({});
    const [toLeft, setToleft] = React.useState(1);
    const [toRight, setToRight] = React.useState(1);

    React.useEffect(() => {
        axios.get("https://cdn.cur.su/api/latest.json/").then((res) => {
            setValutes(res.data.rates);
        });
    }, []);

    return (
        <div className="App">
            <Block
                value={toLeft}
                currency="RUB"
                onChangeCurrency={(cur) => console.log(cur)}
                onChangeValue={setToleft}
            />
            <Block
                value={toRight}
                currency="USD"
                onChangeCurrency={(cur) => console.log(cur)}
                onChangeValue={setToRight}
            />
        </div>
    );
}

export default App;
