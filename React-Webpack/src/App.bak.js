import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        }
        // this.onInputChange.bind(this);
    }

    // 自己定义了一个函数
    onInputChange(event) {
        console.log(event.target.value);
        var value = event.target.value;
        this.setState({
            inputValue: value
        });
    }

    render() {
        return (
            <div>
                <input type="text" onChange={(e) => this.onInputChange(e)}/>
                <p>你当前正在输入的内容是：{this.state.inputValue}</p>
            </div>
        )
    }
}

export default App;
