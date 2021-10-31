import React from 'react';
import './App.css';
import Main from './Components/Main';
import { HashRouter } from 'react-router-dom';
import { authCheck } from './redux/authActionCreator';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => {
    return {
        authCheck: () => dispatch(authCheck())
    }
}

class App extends React.Component {
    state = {}

    static getDerivedStateFromProps(props, state) {
        props.authCheck();
        return null;
    }

    // componentDidMount() {
    //     this.props.authCheck();
    // }

    render() {
        console.log("render: authcheck");
        return (
            <div className="App">
                <HashRouter>
                    <Main />
                </HashRouter>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(App);

