import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import {Redirect} from 'react-router-dom';
import checktoken from '../checktoken'

import './Dashboard.css';


const { Header, Content, Footer, Sider } = Layout;


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authentication:false,
            token:false
        };
    }
    componentDidMount = async ()=>{
        let result = await checktoken(localStorage.getItem('token'));
        if(result)
            this.setState({authentication:true,token:true})
        else
            this.setState({authentication:true,token:false})
    }

    render() {
        if(this.state.authentication && this.state.token)
            return (
                <Layout>
                    <Sider
                        breakpoint="lg"
                        collapsedWidth="0"
                        onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
                    >
                        <div className="logo" >Logo</div>
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                            <Menu.Item key="1">
                                <Icon type="user" />
                                <span className="nav-text">nav 1</span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="video-camera" />
                                <span className="nav-text">nav 2</span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="upload" />
                                <span className="nav-text">nav 3</span>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Icon type="user" />
                                <span className="nav-text">nav 4</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>

                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }}>
                            This is Header
                        </Header>
                        <Content style={{ margin: '24px 16px 0' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            content
                        </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2016 Created by Ant UED
                        </Footer>
                    </Layout>
                </Layout>
            );
        else if(this.state.authentication===true && this.state.token === false)
            return <Redirect to={{pathname:"/login",state:{from:this.props.location}} }/>;
        else return <h1>正在验证</h1>
    }
}

export default Dashboard;