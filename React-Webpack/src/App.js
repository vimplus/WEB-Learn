/**
 * @overview idnex
 * @createdAt 2017-06-04
 * @author txboy
 */

'use strict'
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, BrowserRouter, Link} from 'react-router-dom';
import IndexPage from './routers/IndexPage';
import ListPage from './routers/ListPage';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <ul>
                        <li><Link to="/">首页</Link></li>
                        <li><Link to="/list">列表页</Link></li>
                    </ul>
                    <Route path="/" exact={true} component={IndexPage}/>
                    <Route path="/list" component={ListPage}/>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;
