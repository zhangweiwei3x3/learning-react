/**
 * 拖拽排序
 * 
 * anchor: zww
 * date: 2016-09-01
 *
 *   columns: 栏目（array）
 *   data: 数据（array）
 *   dragging: 是否正在拖拽（bool）
 *   dragStart: 开始拖拽的回调函数 (func)
 *   onChange: 拖拽结束的回调函数 (func)
 *   
 */
const {Component, PropTypes} = React;

// thead th
const renderThs = (columns) => {
    return columns.map((column, index) => {
        return <th className={column.className} key={index}>{column.displayName}</th>;
    });
};

// tbody td
const renderTds = (row, columns) => {
    return columns.map((column, index) => {
        var customComponent = column.customComponent;

        return !customComponent
            ? <td key={index}>{row[column.columnName]}</td>
            : <td key={index}>{column.customComponent(row)}</td>;
    });
};

// tbody tr
const renderRows = (data, columns) => {
    return data.map((row, index) => {
        return <tr draggable={!row.disabled} className={row.disabled ? 'disabled' : null} key={index}>
            {
                renderTds(row, columns)
            }
        </tr>;
    });
};

export default class Drag extends Component {
    constructor(...args) {
        super(...args);

        this.dragging = false;
        this.state = {
            data: []
        };
    }

    // 获取 tbody 下的 tr 元素
    isDisabled(elem) {
        const tableWrap = this.refs.tableWrap;

        while (elem.nodeName !== 'TR') {
            if (elem === tableWrap) {
                return true;
            }

            elem = elem.parentNode;
        }

        if (elem.parentNode.nodeName === 'THEAD') {
            return true;
        }

        return elem.getAttribute('draggable') !== 'true';
    }

    // 获取元素的位置 下标
    getIndex(elem) {
        const tableWrap = this.refs.tableWrap;
        var index = -1;

        while (elem.nodeName !== 'TR') {
            if (elem === tableWrap) {
                index = elem.getElementsByTagName('tbody')[0].childElementCount;
                break;
            }
            elem = elem.parentNode;
        }

        if (elem.parentNode.nodeName === 'THEAD') {
            index = 0;
        }

        if (index === -1) {
            let count = 1,
                size = elem.parentNode.childElementCount;

            while (elem.nextElementSibling) {
                count++;
                elem = elem.nextElementSibling;
            }
            index = size - count;
        }

        return index;
    }

    // 排序 数据
    sortData(drag, drop) {
        var data = this.props.data;

        if (drag < drop) {
            data.splice(drop + 1, 0, data[drag]);
            data.splice(drag, 1);
        } else {
            data.splice(drop, 0, data[drag]);
            data.splice(drag + 1, 1);
        }

        this.setState({data: data});
    }

    dragStart(e) {
        var index = this.getIndex(e.target);
        
        e.dataTransfer.setData('Text', index);

        this.dragging = true;

        this.props.dragStart && this.props.dragStart(index);
    }

    // ondragover 事件规定在何处放置被拖动的数据。
    // 默认地，无法将数据/元素放置到其他元素中。如果需要设置允许放置，我们必须阻止对元素的默认处理方式。
    dragover(e) {
        e.preventDefault();
    }

    drop(e) {
        const {onChange, dragging} = this.props;

        if (this.isDisabled(e.target)) {
            return;
        }

        if (dragging) {
            onChange && onChange(this.props.data, this.getIndex(e.target));
        } else {
            if (!this.dragging) {
                return;
            }
            this.dragging = false;

            var dataIndex = +e.dataTransfer.getData('Text'),
                index = this.getIndex(e.target);

            if (dataIndex === index) {
                return;
            }

            this.sortData(dataIndex, index);

            onChange && onChange(this.state.data);
        }
    }

    componentWillMount() {
        this.setState({data: this.props.data});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({data: nextProps.data});
    }

    render() {
        const columns = this.props.columns,
            data = this.state.data;

        return <div ref="tableWrap" className="table" onDragStart={this.dragStart.bind(this)} onDragOver={this.dragover.bind(this)} onDrop={this.drop.bind(this)}>
            <table className="table table-striped">
                {
                    columns[0].displayName && (
                        <thead>
                            <tr>
                                {
                                    renderThs(columns)
                                }
                            </tr>
                        </thead>
                    )
                }
                <tbody>
                    {renderRows(data, columns)}
                </tbody>
            </table>
        </div>;
    }
}

Drag.defaultProps = {
    dragging: false // 是否正在拖拽
};
if (process.env.NODE_ENV !== 'production') {
    Drag.PropTypes = {
        // 栏目
        columns: PropTypes.array,
        // 数据
        data: PropTypes.array,
        // 是否正在拖拽
        dragging: PropTypes.bool,
        // 开始拖拽的回调函数
        dragStart: PropTypes.func,
        // 拖拽结束的回调函数
        onChange: PropTypes.func
    }; 
}
