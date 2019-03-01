import React, { Component } from 'react';
import './index.scss';
import http from '../../http/http';
import { transferTime } from '../../unitl/util';
import { Table, Button, message, Modal, Input, Select } from 'antd';
import Editor from 'for-editor'

const Option = Select.Option;
const { TextArea } = Input;

export default class List extends Component {
    state = {
        columns: [
            {
                title: '序号',
                dataIndex: '',
                key: 'num',
                fixed: 'left',
                width: 100,
                render: (text, record, index) => (<span>{++index}</span>)
            },
            {
                title: '文章标题',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: '简介',
                dataIndex: 'description',
                key: 'description',
            },
            {
                title: '分类',
                dataIndex: 'classification',
                key: 'classification',
                width: 100,
            },
            {
                title: '关键字',
                dataIndex: 'keyWord',
                key: 'keyWord',
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
                render: (record) => (<span>{transferTime(record)}</span>)
            },
            {
                title: '操作',
                dataIndex: '',
                key: 'option',
                fixed: 'right',
                width: 200,
                render: (text, record, index) => (
                    <span className="list-btn-wrap">
                        <Button shape="circle" icon="edit" onClick={this.editArticle.bind(this, record)} title="编辑" type="primary"></Button>
                        <Button style={{margin: '0 15px'}} onClick={this.deleteItem.bind(this, record)} shape="circle" icon="delete" type="danger"></Button>
                        <Button shape="circle" icon="snippets" type="primary"></Button>
                    </span>
                )
            }
        ],
        page: {
            pageSize: 10,
            currentPage: 1,
            total: 0,
        },
        listData: [],
        value: '',
        visible: false,
        currentTitle: '添加文章',
        currentItem: null,
        infos: {
            articleTitle: '',
            keyword: '',
            des: '',
            type: '',
            value: '',
        },
        typeList: [
            {
                id: 1,
                value: '技术'
            },
            {
                id: 2,
                value: '随笔'
            }
        ]
    }
    componentDidMount () {
        this.getList();
    }
    getList () {
        http.get(`/article/getList`, {currentPage: this.state.page.currentPage, pageSize: this.state.page.pageSize})
        .then(res => {
            if (res.success === 1) {
                this.setState({listData: res.data.data});
            } else {
                message.error(res.message.message);
            }
        })
        .catch(error => {
            message.error(`获取数据失败，请稍后重试！`);
        })
    }
    handleChange(value) {
        this.setState(state => state.infos.value = value)
    }
    addTitle (e) {
        const value = e.target.value;
        this.setState((state) => state.infos.articleTitle = value)
    }
    addDes (e) {
        const value = e.target.value;
        this.setState((state) => state.infos.des = value)
    }
    deleteItem (item) {
        http.delete(`/article/delete`, {id: item.articleId})
        .then(res => {
            if (res.success === 1) {
                message.success('删除成功！');
                this.getList();
            } else {
                message.error(res.message.message);
            }
        })
        .catch(error => {
            message.error(`删除失败，请重试！`);
        })
    }
    changeType (value) {
        let type = '';
        for (let i of this.state.typeList) {
            if (i.id === value) {
                type = i.value;
            }
        }
        this.setState((state) => state.infos.type = type)
    }
    changeGjz (e) {
        const value = e.target.value;
        this.setState((state) => state.infos.keyword = value)
    }
    addArticle = () => {
        this.setState({visible: true, currentTitle: '添加文章'});
    }
    editArticle = (item) => {
        this.setState(state => {
            state.infos.articleTitle = item.title;
            state.infos.type = item.classification;
            state.infos.keyword = item.keyWord;
            state.infos.des = item.description;
            state.infos.value = item.content;
            return state.infos;
        })
        this.setState({visible: true, currentTitle: '编辑文章', currentItem: item});
    }
    handleCancel = () => {
        let obj = {
            articleTitle: '',
            keyword: '',
            des: '',
            type: '',
            value: '',
        };
        this.setState({visible: false, infos: obj});
    }
    changePage = (page, pageSize) => {
        this.setState(state => state.page.currentPage = page);
    }
    handleOk = () => {
        if (this.state.currentTitle === '编辑文章') {
            let params = {...this.state.infos};
            params.id = this.state.currentItem.articleId;
            http.put('/article/update', params)
            .then(res => {
                if (res.success === 1) {
                    this.getList();
                    message.success('修改成功！');
                }
            })
            .catch(error => {
                message.error('修改失败，请稍后重试！');
            })
        } else {
            http.post('/article/add', this.state.infos)
            .then(res => {
                if (res.success === 1) {
                    message.success('添加成功！');
                    this.getList();
                } else {
                    message.error(res.message.message);
                }
            })
            .catch(error => {
                message.error(error.message.message);
            })
        }
        this.handleCancel();
    }
    render () {
        const { value } = this.state.infos
        return (
            <div className="article-list-wrap">
                <div className="article-list-top">
                    <Button onClick={this.addArticle} type="primary">添加文章</Button>
                </div>
                <Table
                    rowKey = {(record) => record.createTime}
                    columns={this.state.columns}
                    pagination={
                        {
                        size: 'small',
                        total: this.state.page.total, 
                        defaultCurrent: this.state.page.currentPage,
                        showQuickJumper: true,
                        onChange: this.state.changePage
                        }
                    }
                    dataSource={this.state.listData}
                />
                <Modal
                    title={this.state.currentTitle}
                    visible={this.state.visible}
                    okText="保存"
                    cancelText="取消"
                    width="80%"
                    getContainer={() => document.querySelector('.article-list-wrap')}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                    <div className="form-box">
                        <div className="item">
                            <label>标题:</label>
                            <Input 
                                className="input-title" 
                                value={this.state.infos.articleTitle} 
                                placeholder="请输入文章标题" 
                                onChange={this.addTitle.bind(this)}
                            />
                        </div>
                        <div className="item">
                            <label>分类:</label>
                            <Select value={this.state.infos.type} style={{ width: 250 }} onChange={this.changeType.bind(this)}>
                                {
                                    this.state.typeList.map((item, index) => (
                                        <Option key={item.id} value={item.id}>{item.value}</Option>
                                    ))
                                }
                            </Select>
                        </div>
                    </div>
                    <div className="form-box">
                        <div className="item">
                            <label>关键:</label>
                            <Input 
                                style={{ width: 250 }} 
                                onChange={this.changeGjz.bind(this)}
                                value={this.state.infos.keyword} 
                                placeholder="添加关键字(以逗号分隔)" 
                            />
                        </div>
                        <div className="item">
                            <label>描述:</label>
                            <TextArea 
                                rows={4} 
                                onChange={this.addDes.bind(this)}
                                value={this.state.infos.des} 
                                style={{width: 250, verticalAlign: 'top'}} 
                            />
                        </div>
                    </div>
                    <Editor value={value} onChange={this.handleChange.bind(this)} />
                </Modal>
            </div>
        )
    }
}