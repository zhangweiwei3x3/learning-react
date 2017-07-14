/**
 * anchor : zww
 * time   : 2016-09-06
 */
import Drag from '../../../src/components/Drag';

class SelectSort extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            dragging1: false,
            index1: -1,
            data1: [],
            dragging2: false,
            index2: -1,
            data2: []
        };
    }

    dragStart1(index) {
        this.setState({dragging1: true, index1: index});
    }

    dragStart2(index) {
        this.setState({dragging2: true, index2: index});
    }

    change1(data, index) {
        if (this.state.dragging2) {
            var dataArr = this.state.data2.splice(this.state.index2, 1);

            this.state.data1.splice(index, 0, dataArr[0]);

            this.setState({dragging2: false, index2: -1, data2: this.state.data2, data1: this.state.data1});
        } else {
            this.state.dragging1 && this.setState({dragging1: false, index1: -1});
        }

        this.props.onChange(this.props.data1, this.props.data2);
    }
    change2(data, index) {
        if (this.state.dragging1) {
            var dataArr = this.state.data1.splice(this.state.index1, 1);
            
            this.state.data2.splice(index, 0, dataArr[0]);

            this.setState({dragging1: false, index1: -1, data1: this.state.data1, data2: this.state.data2});
        } else {
            this.state.dragging2 && this.setState({dragging2: false, index2: -1});
        }

        this.props.onChange(this.state.data1, this.state.data2);
    }

    componentWillMount() {
        this.setState({data1: this.props.data1, data2: this.props.data2});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({data1: nextProps.data1, data2: nextProps.data2});
    }

    render() {
        const columns = this.props.columns;

        return (
            <div>
                <Drag columns={columns} data={this.state.data1} dragging={this.state.dragging2} dragStart={this.dragStart1.bind(this)} onChange={this.change1.bind(this)} />
                <Drag columns={columns} data={this.state.data2} dragging={this.state.dragging1} dragStart={this.dragStart2.bind(this)} onChange={this.change2.bind(this)} />
            </div>
        );
    }
}

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

const data1 = [
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
const data2 = [
    {
        id: 21,
        name: 'name1',
        operation: '编辑名称'
    },
    {
        id: 22,
        name: 'name2',
        operation: '编辑名称'
    },
    {
        id: 23,
        name: 'name3',
        operation: '编辑名称'
    },
    {
        id: 24,
        name: 'name4',
        operation: '编辑名称'
    },
    {
        id: 25,
        name: 'name5',
        operation: '编辑名称'
    }
];


function change2(data1, data2) {
    console.log(22222, data1, data2);
}
ReactDOM.render(<SelectSort columns={columns} data1={data1} data2={data2} onChange={change2} />, document.getElementById('html-body2'));
