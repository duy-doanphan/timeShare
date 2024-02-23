import {
    Button,
    Descriptions,
    Drawer,
    Image,
    message,
    notification,
    Space,
    Tag,
    Typography
} from 'antd'
import dayjs from 'dayjs'
import {useState} from 'react'


const ViewDetailTimeShare = (props) => {
    const {onClose, open, dataInit, setDataInit, reloadTable} = props

    const [isLoading, setIsLoading] = useState(false)

    const statusColorMap = {
        Available: 'success',
        Booked: 'error',
    }
    const status = dataInit?.status
    const color = statusColorMap[status]

    return (
        <>
            <Drawer
                title='Information TimneShare'
                placement='right'
                onClose={() => {
                    onClose(false)
                    setDataInit(null)
                }}
                open={open}
                width={'45vw'}
                maskClosable={true}
            >
                <Descriptions
                    className={'mb-5'}
                    bordered
                    column={2}
                    layout='vertical'
                >
                    <Descriptions.Item label='Name'>
                        {dataInit?.name}
                    </Descriptions.Item>
                    {/*<Descriptions.Item label='Logo'>*/}
                    {/*    <Image width={100} height={100} src={dataInit?.logo ?? ''} />*/}
                    {/*</Descriptions.Item>*/}
                    <Descriptions.Item label='Description'>{dataInit?.description}</Descriptions.Item>
                    <Descriptions.Item label='Status'>
                        <Tag color={color}>{dataInit?.status}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label='Address'>
                        {dataInit && dataInit.address ? dataInit.address : ''}
                    </Descriptions.Item>
                    <Descriptions.Item label='Rooms'>
                        {dataInit && dataInit.rooms ? dataInit.rooms : 0}
                    </Descriptions.Item>
                    <Descriptions.Item label='Place'>
                        {dataInit && dataInit.place ? dataInit.place : ''}
                    </Descriptions.Item>
                    <Descriptions.Item label='Images' bordered span={2}>
                        {dataInit?.images.map((photo, index) => {
                            return (
                                <div
                                    key={index}
                                    style={{
                                        display: 'inline-block',
                                        marginRight: '16px',
                                        border: '1px solid #ddd', // Set border color
                                        width: '100px' // Set width of the image
                                    }}
                                >
                                    <Image width={100} height={100} src={photo}/>
                                </div>
                            )
                        })}
                    </Descriptions.Item>
                    <Descriptions.Item label='Created At'>
                        {dataInit && dataInit.createdAt
                            ? dayjs(dataInit.createdAt).format('DD-MM-YYYY HH:mm:ss')
                            : ''}
                    </Descriptions.Item>
                    <Descriptions.Item label='Updated At'>
                        {dataInit && dataInit.updatedAt
                            ? dayjs(dataInit.updatedAt).format('DD-MM-YYYY HH:mm:ss')
                            : ''}
                    </Descriptions.Item>
                </Descriptions>
            </Drawer>
        </>
    )
}

export default ViewDetailTimeShare
