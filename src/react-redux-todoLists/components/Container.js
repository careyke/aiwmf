/**
 * Container
 */
import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './Container.less';
import Header from './Header';
import { WrappedBody } from './Body';

export class Container extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles['container']} >
                <Header />
                <WrappedBody />
            </div>
        )
    }
}