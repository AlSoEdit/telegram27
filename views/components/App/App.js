'use strict';

import React from 'react';
import FormsContainer from '../FormsContainer/FormsContainer';
import Header from '../Header/Header';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <FormsContainer/>
            </div>
        );
    }
}
