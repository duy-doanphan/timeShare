import {
    ModalForm,
    ProForm, ProFormMoney,
    ProFormSelect,
    ProFormText, ProFormTextArea, ProFormUploadButton, ProFormUploadDragger
} from '@ant-design/pro-components'
import {Col, ConfigProvider, Form, message, notification, Row, Spin, Tooltip} from 'antd'
import {isMobile} from 'react-device-detect'
import {useEffect, useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {TiDelete} from "react-icons/ti";
import vi_VN from 'antd/locale/vi_VN'
import {Image} from "antd";

const ModalTimeShare = (props) => {
    const {openModal, setOpenModal, reloadTable, dataInit, setDataInit} = props
    const [isLoading, setIsLoading] = useState(false)
    const [imageList, setImageList] = useState([])

    useEffect(() => {
        if (dataInit?.images) {
            setImageList(dataInit.images)
        }
    }, []);


    const [form] = Form.useForm()

    const uploadButton = (
        <div
            style={{
                width: '100px', // tương đương với 'w-full'
                height: '100px', // tương đương với 'h-24'
                marginBottom: '5px',
                border: '1px dashed #ccc',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            onClick={() => {
                const input = document.createElement('input')
                input.type = 'file'
                input.accept = 'image/*'
                input.multiple = false
                input.onchange = async (e) => {
                    const file = e.target.files[0]
                    if (file) {
                        setIsLoading(true)
                        // const res = await callUploadSingleFile(file)
                        setIsLoading(false)
                        const newImageList = [...imageList]
                        newImageList.push(file)
                        setImageList(newImageList)
                        // if (res?.data) {
                        //     const newImageList = [...imageList]
                        //     newImageList.push(res.data)
                        //     setImageList(newImageList)
                        // }
                    }
                }
                input.click()
            }}
        >
            {isLoading ? (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <div>
                        <Spin size='small'/>
                    </div>
                    <div>Loading</div>
                </div>
            ) : (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <PlusOutlined/>
                    <div>Upload</div>
                </div>
            )}
        </div>
    )

    const submitTimeShare = async (valuesForm) => {
        const {
            name,
            description,
            address,
            place,
            status,
            rooms,
        } = valuesForm

        if (dataInit?.id) {
            //update
            const timeShare = {
                id: dataInit.id,
                name,
                description,
                address,
                place,
                status,
                rooms
            }
            console.log('timeShare', timeShare)
            //todo call api update timeShare
            handleReset()
            message.success('Update timeShare successfully')
        } else {
            //create
            const timeShare = {
                name,
                description,
                address,
                place,
                status,
                rooms
            }
            console.log('timeShare', timeShare)
            //todo call api create timeShare
            handleReset()
            message.success('Create timeShare successfully')
        }

    }

    const handleReset = async () => {
        form.resetFields()
        form.setFieldsValue({})
        setDataInit(null)
        setOpenModal(false)
    }

    return (
        <>
            <ModalForm
                title={<>{dataInit?.id ? 'Update TimeShare' : 'Create New TimeShare'}</>}
                open={openModal}
                modalProps={{
                    onCancel: () => {
                        handleReset()
                    },
                    afterClose: () => {
                        console.log('afterClose')
                        handleReset()
                    },
                    destroyOnClose: true,
                    width: isMobile ? '100%' : 900,
                    keyboard: false,
                    maskClosable: false,
                    okText: <>{dataInit ? 'Update' : 'Create'}</>,
                    cancelText: 'Cancel'
                }}
                scrollToFirstError={true}
                preserve={false}
                form={form}
                onFinish={submitTimeShare}
                initialValues={dataInit ? dataInit : {}}
            >
                <Row gutter={16}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label='Name'
                            name='name'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input name of TimeShare !'
                                }
                            ]}
                            placeholder='Name'
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label='Address'
                            name='address'
                            rules={[
                                {
                                    required: !dataInit,
                                    message: 'Please input address'
                                }
                            ]}
                            placeholder='address'
                        />
                    </Col>
                    <Col lg={24} md={12} sm={24} xs={24}>
                        <ProFormTextArea
                            label='Description'
                            name='description'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input description!'
                                },
                            ]}
                            placeholder='Description'
                        />
                    </Col>
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <ProFormMoney
                            customSymbol={'*'}
                            locale={'en-US'}
                            label='Rooms'
                            name='rooms'
                            min={1}
                            rules={[
                                {required: true, message: 'Please input rooms!'}
                            ]}
                            placeholder='Rooms'
                        />
                    </Col>
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <ProFormText
                            label='Place'
                            name='place'
                            rules={[
                                {required: true, message: 'Please input placed!'}
                            ]}
                            placeholder='Place'
                        />
                    </Col>
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <ProFormSelect
                            name='status'
                            label='Status'
                            valueEnum={{
                                Available: 'Available',
                                Booked: 'Booked',
                            }}
                            placeholder='Status'
                            rules={[{required: true, message: 'Please select a status'}]}
                        />
                    </Col>
                    <Col lg={24}>
                        <p style={{marginBottom: '5px'}}>Images</p>
                        <div style={{display: "flex", gap: 5}}>
                            {imageList?.map((photo, index) => (
                                <ConfigProvider locale={vi_VN}>
                                    <Image
                                        src={photo}
                                        alt='image'
                                        style={{
                                            borderRadius: '5%',
                                            width: '100px',
                                            height: '100px',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </ConfigProvider>
                            ))}
                            {imageList.length < 5 && uploadButton}
                        </div>
                    </Col>
                </Row>
            </ModalForm>
        </>
    )
}

export default ModalTimeShare
