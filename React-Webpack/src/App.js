import React, { Component } from 'react';
import { BrowserRouter as Router, Route, BrowserRouter, Link} from 'react-router-dom';
// import { HashRouter as Router, Route, HashRouter, Link} from 'react-router-dom';
import IndexPage from './routes/IndexPage';
import ListPage from './routes/ListPage';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        }
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
            <BrowserRouter>
                <div>
                    <p>Hello, React.</p>
                    <ul>
                        <li><Link to="/about">关于</Link></li>
                        <li><Link to="/list">列表页</Link></li>
                    </ul>
                    <Route path="/about" component={IndexPage}/>
                    <Route path="/list" component={ListPage}/>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;
