import {
    AppstoreOutlined,
    BankOutlined,
    BugOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons'
import {Avatar, Button, Dropdown, Layout, Menu, Space, message} from 'antd'
import React, {useEffect, useState} from 'react'
import {isMobile} from 'react-device-detect'
import {Link, Outlet, useNavigate} from 'react-router-dom'

const {Content, Sider} = Layout

const LayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false)
    const [activeMenu, setActiveMenu] = useState('dashboard')

    const [openModal, setOpenModal] = useState(false)

    const navigate = useNavigate()

    // const handleLogout = async () => {
    //     const res = await callLogout()
    //     if (res && res.data) {
    //         message.success('Đăng xuất thành công')
    //         navigate('/')
    //     }
    // }

    const items = [
        {
            label: <Link to='/admin'>Dashboard</Link>,
            key: 'dashboard',
            icon: <AppstoreOutlined/>
        },
        {
            label: <Link to='/admin/user'>Users</Link>,
            key: 'user',
            icon: <UserOutlined/>
        },
        {
            label: <Link to='/admin/time-share'>TimeShares</Link>,
            key: 'TimeShares',
            icon: <BankOutlined/>
        },
    ]

    // if (user?.role.name !== 'ADMIN') {
    //     items.splice(5, 1)
    // }

    const itemsDropdown = [
        {
            label: (
                <label style={{cursor: 'pointer'}} onClick={() => setOpenModal(true)}>
                    Change password
                </label>
            ),
            key: 'changePassword'
        },
        {
            label: (
                <label style={{cursor: 'pointer'}}
                    // onClick={() => handleLogout()}
                >
                    Logout
                </label>
            ),
            key: 'logout'
        }
    ]

    return (
        <>
            <Layout style={{minHeight: '100vh'}} className='layout-admin'>
                {!isMobile ? (
                    <Sider
                        theme='light'
                        collapsible
                        collapsed={collapsed}
                        onCollapse={(value) => setCollapsed(value)}
                    >
                        <div style={{height: 32, margin: 16, textAlign: 'center'}}>
                            <BugOutlined/> ADMIN
                        </div>
                        <Menu
                            defaultSelectedKeys={[activeMenu]}
                            mode='inline'
                            items={items}
                            onClick={(e) => setActiveMenu(e.key)}
                        />
                    </Sider>
                ) : (
                    <Menu
                        defaultSelectedKeys={[activeMenu]}
                        items={items}
                        onClick={(e) => setActiveMenu(e.key)}
                        mode='horizontal'
                    />
                )}

                <Layout>
                    {!isMobile && (
                        <div
                            className='admin-header'
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginRight: 20
                            }}
                        >
                            <Button
                                type='text'
                                icon={
                                    collapsed
                                        ? React.createElement(MenuUnfoldOutlined)
                                        : React.createElement(MenuFoldOutlined)
                                }
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64
                                }}
                            />
                            <Dropdown menu={{items: itemsDropdown}} trigger={['click']}>
                                <Space style={{cursor: 'pointer'}}>
                                    <>
                                        <Avatar>
                                            {'ADMIN'}
                                        </Avatar>
                                    </>
                                </Space>
                            </Dropdown>
                        </div>
                    )}
                    <Content style={{padding: '15px', height: 'calc(100vh - 64px)'}}>
                        <div
                            style={{height: '100%', overflowY: 'auto', overflowX: 'hidden'}}
                        >
                            <Outlet/>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}

export default LayoutAdmin
