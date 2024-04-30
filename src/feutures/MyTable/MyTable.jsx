import React from 'react';
import PropTypes from 'prop-types';
import {Table} from "react-bootstrap";
import s from './MyTable.module.css'

const MyTable = ({children, ...props}) => {
    return (
        <Table {...props} className={`${s.my__table} ${props.className}`}>
            {children}
        </Table>
    );
};

MyTable.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

export default MyTable;