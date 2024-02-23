import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import React from 'react'

const NotFoundPage = () => {
    const navigate = useNavigate()
    const style = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }

    return (
        <Result
            style={style}
            status='404'
            title='404'
            subTitle='Sorry, the page you visited does not exist.'
            extra={
                <Button type='primary' onClick={() => navigate('/')}>
                    Back Home
                </Button>
            }
        />
    )
}
export default NotFoundPage
