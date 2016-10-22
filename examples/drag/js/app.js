/**
 * anchor : zww
 * time   : 2016-09-06
 */
'use strict';

import Drag from '../../../src/Drag';

const columns = [
    {columnName: 'id', displayName: '栏目id', className: 'class1'},
    {columnName: 'name', displayName: '栏目名称', className: 'class2'},
    {columnName: 'operation', displayName: '操作', className: 'class3'}
];

const data = [
    {
        id: 1,
        name: 'name1',
        operation: '编辑名称'
    },
    {
        id: 2,
        name: 'name2',
        operation: '编辑名称'
    },
    {
        id: 3,
        name: 'name3',
        operation: '编辑名称'
    },
    {
        id: 4,
        name: 'name4',
        operation: '编辑名称'
    },
    {
        id: 5,
        name: 'name5',
        operation: '编辑名称'
    }
];

function change(data) {
    console.log(111111111, data);
}

ReactDOM.render(<Drag columns={columns} data={data} onChange={change} />, document.getElementById('html-body'));