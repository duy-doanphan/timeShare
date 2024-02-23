import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons'
import {Button, Popconfirm, Space, message, notification, Tag} from 'antd'
import {useState, useRef} from 'react'
import dayjs from 'dayjs'
import queryString from 'query-string'
// import { useAppDispatch, useAppSelector } from '@/redux/hook.ts'
// import ViewDetailUser from '@/components/admin/user/viewDetail'
import ModalTimeShare from "../../../Components/Admin/TimeShares/Modal";
import DataTable from "../../Share/dataTable";
import ViewDetailTimeShare from "../../../Components/Admin/TimeShares/ViewDetail";

const timeShares = [
    {
        id: 1,
        name: "Beautiful Beachfront Villa",
        address: "123 Ocean Avenue, Paradise City",
        description: "A stunning villa with direct access to a private beach.",
        rooms: 3,
        status: "Available",
        images: [
            "https://picsum.photos/200/300",
            "https://picsum.photos/200/300",
        ],
        place: "Dreamland",
        createdAt: "2021-01-01T12:00:00Z",
        updatedAt: "2021-01-01T12:00:00Z",
    },
    {
        id: 2,
        name: "Mountain Cabin Retreat",
        address: "456 Pine Tree Lane, Serenity Valley",
        description: "Cozy cabin nestled in the mountains, perfect for a retreat.",
        rooms: 2,
        status: "Booked",
        images: [
            "https://picsum.photos/200/300",
            "https://picsum.photos/200/300",
        ],
        place: "Tranquiland",
        createdAt: "2021-01-01T12:00:00Z",
        updatedAt: "2021-01-01T12:00:00Z",
    },
]

const TimeSharePage = () => {
    const [openModal, setOpenModal] = useState(false)
    const [dataInit, setDataInit] = useState(null)
    const [openViewDetail, setOpenViewDetail] = useState(false)

    const tableRef = useRef()

    // const isFetching = useAppSelector((state) => state.user.isFetching)
    // const meta = useAppSelector((state) => state.user.meta)
    // const users = useAppSelector((state) => state.user.result)
    // const dispatch = useAppDispatch()

    const handleDeleteTimeShare = async (id) => {
        message.success('Delete TimeShare successfully')
        reloadTable()
        // if (id) {
        //     // const res = await callDeleteUser(id)
        //     if (res && res.statusCode === 200) {
        //         message.success('Delete user successfully')
        //         reloadTable()
        //     } else {
        //         notification.error({
        //             message: 'Has error',
        //             // description: res.message
        //         })
        //     }
        // }
    }

    const reloadTable = () => {
        tableRef?.current?.reload()
    }

    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            width: 50,
            align: 'center',
            render: (text, record, index) => {
                return <>{index + 1}</>
                // return <>{index + 1 + (meta.current - 1) * meta.pageSize}</>
            },
            hideInSearch: true
        },
        {
            title: 'Name',
            dataIndex: 'name', // tên field trong data
            sorter: true, // bật chế độ sort
            ellipsis: true, // bật chế độ ẩn bớt
            width: 350,
            render: (text, record, index, action) => {
                return (
                    <a
                        href='#'
                        onClick={() => {
                            setOpenViewDetail(true)
                            setDataInit(record)
                        }}
                    >
                        {record.name}
                    </a>
                )
            }
        },
        {
            title: 'Address',
            dataIndex: 'address', // tên field trong data
            render: (text, record, index, action) => {
                return <>{`${record.address}`}</>
            },
            sorter: false,
            hideInSearch: true // ẩn ô search
        },
        {
            title: 'Place',
            dataIndex: 'place', // tên field trong data
            hideInSearch: true,
            render: (text, record, index, action) => {
                return <>{`${record.place}`}</>
            },
        },
        {
            title: 'Rooms',
            dataIndex: 'room', // tên field trong data
            // sorter: true, // bật chế độ sort
            ellipsis: true, // bật chế độ ẩn bớt
            width: 100,
            align: 'center',
            hideInSearch: true,
            render(dom, entity, index, action, schema) {
                return <>{entity.rooms}</>
            }
        },
        {
            title: 'Status',
            width: 100,
            align: 'start',
            dataIndex: 'status',
            filterMultiple: false,
            valueEnum: {
                Available: {text: 'Available'},
                Booked: {text: 'Booked'},
            },

            render(dom, entity, index, action, schema) {
                const statusColorMap = {
                    Available: 'success',
                    Booked: 'error'
                }
                const status = entity.status
                const color = statusColorMap[status] // tìm màu tương ứng
                return (
                    <>
                        <Tag color={color}>{entity.status}</Tag>
                    </>
                )
            }
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            width: 200,
            sorter: true,
            render: (text, record, index, action) => {
                return <>{dayjs(record.createdAt).format('DD-MM-YYYY HH:mm:ss')}</>
            },
            hideInSearch: true
        },
        {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            width: 200,
            sorter: true,
            render: (text, record, index, action) => {
                return <>{dayjs(record.updatedAt).format('DD-MM-YYYY HH:mm:ss')}</>
            },
            hideInSearch: true
        },
        {
            title: 'Actions',
            hideInSearch: true,
            width: 50,
            render: (_value, entity, _index, _action) => (
                <Space>
                    <EditOutlined
                        style={{
                            fontSize: 20,
                            color: '#ffa500'
                        }}
                        onClick={() => {
                            setOpenModal(true)
                            setDataInit(entity)
                        }}
                    />

                    <Popconfirm
                        placement='leftTop'
                        title={'Are you sure delete this TimeShare?'}
                        description={'Are you sure to delete this TimeShare?'}
                        onConfirm={() => handleDeleteTimeShare(entity.id)}
                        okText='Confirm'
                        cancelText='Cancel'
                    >
            <span style={{cursor: 'pointer', margin: '0 10px'}}>
              <DeleteOutlined
                  style={{
                      fontSize: 20,
                      color: '#ff4d4f'
                  }}
              />
            </span>
                    </Popconfirm>
                </Space>
            )
        }
    ]

    const buildQuery = (params, sort, filtery) => {
        const clone = {...params}

        // // Loại bỏ prop không có giá trị
        Object.keys(clone).forEach((key) => {
            if (!clone[key]) {
                delete clone[key]
            }
        })

        let temp = queryString.stringify(clone)

        //sort
        let sortBy = ''
        if (sort && sort.name) {
            sortBy = sort.name === 'ascend' ? 'sortBy=name' : 'sortBy=-name'
        }
        if (sort && sort.createdAt) {
            sortBy =
                sort.createdAt === 'ascend' ? 'sortBy=createdAt' : 'sortBy=-createdAt'
        }
        if (sort && sort.updatedAt) {
            sortBy =
                sort.updatedAt === 'ascend' ? 'sortBy=updatedAt' : 'sortBy=-updatedAt'
        }
        //
        // //mặc định sort theo updatedAt
        if (Object.keys(sortBy).length === 0) {
            temp = `${temp}&sortBy=-updatedAt`
        } else {
            temp = `${temp}&${sortBy}`
        }

        return temp
    }

    return (
        <>
            <DataTable
                actionRef={tableRef}
                headerTitle='List TimeShare'
                rowKey='id'
                loading={false}
                columns={columns}
                dataSource={timeShares}
                request={async (params, sort, filter) => {
                    const query = buildQuery(params, sort, filter)
                    // dispatch(fetchUser({ query }))
                }}
                scroll={{x: true}}
                pagination={{
                    current: 1,
                    pageSize: 10,
                    showSizeChanger: true,
                    total: 1,
                    // current: meta?.current ?? 1,
                    // pageSize: meta?.pageSize ?? 10,
                    // showSizeChanger: true,
                    // total: meta?.total ?? 1,
                    showTotal: (total, range) => {
                        return (
                            <div>
                                {' '}
                                {range[0]}-{range[1]} on {total} rows
                            </div>
                        )
                    }
                }}
                // rowSelection={true}
                toolBarRender={(_action, _rows) => {
                    return (
                        <Button
                            icon={<PlusOutlined/>}
                            type='primary'
                            onClick={() => {
                                setOpenModal(true)
                            }}
                        >
                            Add New
                        </Button>
                    )
                }}
            />

            <ModalTimeShare
                openModal={openModal}
                setOpenModal={setOpenModal}
                reloadTable={reloadTable}
                dataInit={dataInit}
                setDataInit={setDataInit}
            />
            <ViewDetailTimeShare
                onClose={setOpenViewDetail}
                open={openViewDetail}
                dataInit={dataInit}
                setDataInit={setDataInit}
            />
        </>
    )
}
export default TimeSharePage
