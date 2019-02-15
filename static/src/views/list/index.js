import React, { Component } from 'react';
import './index.scss';
import http from '../../http/http';
import { Table, Button, message, Modal, Upload, Input } from 'antd';

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
                render: (record) => (<span>{record}</span>)
            },
            {
                title: '操作',
                dataIndex: '',
                key: 'option',
                fixed: 'right',
                width: 200,
                render: (text, record, index) => (
                    <span className="list-btn-wrap">
                        <Button shape="circle" icon="edit" onClick={(record) => this.editArticle(record)} title="编辑" type="primary"></Button>
                        <Button style={{margin: '0 15px'}} shape="circle" icon="delete" type="danger"></Button>
                        <Button shape="circle" icon="snippets" type="primary"></Button>
                    </span>
                )
            }
        ],
        listData: [],
        visible: false,
        currentTitle: '添加文章',
        uploadProps: {
            name: 'file',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            action: '/article/upload',
            onChange(info) {
                console.log(info)
            }
        },
        articleTitle: '',
    }
    componentDidMount () {
        http.get(`/article/getList`, {})
        .then(res => {
            if (res.success === 1) {
                this.setState({listData: res.data});
            } else {
                message.error(res.message.message);
            }
        })
        .catch(error => {
            message.error(`获取数据失败，请稍后重试！`);
        })
    }
    uploadArticle = () => {

    }
    addArticle = () => {
        this.setState({visible: true, currentTitle: '添加文章'});
    }
    editArticle = () => {
        this.setState({visible: true, currentTitle: '编辑文章'});
    }
    handleCancel = () => {
        this.setState({visible: false});
    }
    handleOk = () => {
        
    }
    render () {
        return (
            <div className="article-list-wrap">
                <div className="article-list-top">
                    <Button onClick={this.addArticle} type="primary">添加文章</Button>
                </div>
                <Table
                    rowKey = {(record) => record.createTime}
                    columns={this.state.columns}
                    dataSource={this.state.listData}
                />
                <Modal
                    title={this.state.currentTitle}
                    visible={this.state.visible}
                    okText="保存"
                    cancelText="取消"
                    getContainer={() => document.querySelector('.article-list-wrap')}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                    <Upload className="upload-wrap" {...this.state.uploadProps}>
                        <Button type="primary" icon="upload" onClick={this.uploadArticle}>
                            Upload
                        </Button>
                    </Upload>
                    <Input className="input-title" value={this.state.articleTitle} placeholder="请输入文章标题" />
                </Modal>
            </div>
        )
    }
}