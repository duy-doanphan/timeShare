import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, message, Tag } from 'antd';
import { useState, useRef, useEffect } from 'react';
import dayjs from 'dayjs';
import queryString from 'query-string';
import ModalTimeShare from "../../../Components/Admin/TimeShares/Modal";
import DataTable from "../../Share/dataTable";
import ViewDetailTimeShare from "../../../Components/Admin/TimeShares/ViewDetail";
import axios from 'axios';

const TimeSharePage = () => {
    const [openModal, setOpenModal] = useState(false);
    const [dataInit, setDataInit] = useState(null);
    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [timeShares, setTimeShares] = useState(null);

    const tableRef = useRef();

    useEffect(() => {
        axios.get(`/timeshare/GetAllTimeshare`)
            .then((response) => {
                setTimeShares(response.data.result);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleDeleteTimeShare = async (id) => {
        message.success('Delete TimeShare successfully');
        reloadTable();
    };

    const reloadTable = () => {
        tableRef?.current?.reload();
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            width: 50,
            align: 'center',
            render: (text, record, index) => {
                return <>{index + 1}</>;
            },
            hideInSearch: true
        },
        {
            title: 'Name',
            dataIndex: 'timeshareName',
            sorter: true,
            ellipsis: true,
            width: 350,
            render: (text, record, index) => {
                return (
                    <a
                        href='#'
                        onClick={() => {
                            setOpenViewDetail(true);
                            setDataInit(record);
                        }}
                    >
                        {record.timeshareName}
                    </a>
                );
            }
        },
        {
            title: 'Address',
            dataIndex: 'address',
            render: (text, record) => {
                return <>{record.address}</>;
            },
            sorter: false,
            hideInSearch: true
        },
        {
            title: 'Place',
            dataIndex: 'place',
            hideInSearch: true,
            render: (text, record) => {
                return <>{record.place}</>;
            },
        },
        {
            title: 'Rooms',
            dataIndex: 'rooms',
            width: 100,
            align: 'center',
            hideInSearch: true
        },
        {
            title: 'Status',
            width: 100,
            align: 'start',
            dataIndex: 'timeshareStatus',
            filterMultiple: false,
            render: (text, record) => {
                const statusColorMap = {
                    'Available': 'success',
                    'Booked': 'error'
                };
                const color = statusColorMap[record.timeshareStatus] || 'default';
                return (
                    <Tag color={color}>{record.timeshareStatus}</Tag>
                );
            }
        },
        {
            title: 'Actions',
            hideInSearch: true,
            width: 50,
            render: (_value, record) => (
                <Space>
                    <EditOutlined
                        style={{
                            fontSize: 20,
                            color: '#ffa500'
                        }}
                        onClick={() => {
                            setOpenModal(true);
                            setDataInit(record);
                        }}
                    />
                    <Popconfirm
                        placement='leftTop'
                        title={'Are you sure delete this TimeShare?'}
                        description={'Are you sure to delete this TimeShare?'}
                        onConfirm={() => handleDeleteTimeShare(record.timeshareId)}
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
    ];

    const buildQuery = (params, sort, filtery) => {
        const clone = {...params};

        Object.keys(clone).forEach((key) => {
            if (!clone[key]) {
                delete clone[key];
            }
        });

        let temp = queryString.stringify(clone);

        let sortBy = '';
        if (sort && sort.timeshareName) {
            sortBy = sort.timeshareName === 'ascend' ? 'sortBy=timeshareName' : 'sortBy=-timeshareName';
        }

        if (Object.keys(sortBy).length === 0) {
            temp = `${temp}&sortBy=-updatedAt`;
        } else {
            temp = `${temp}&${sortBy}`;
        }

        return temp;
    };

    return (
        <>
            <DataTable
                actionRef={tableRef}
                headerTitle='List TimeShare'
                rowKey='timeshareId'
                loading={false}
                columns={columns}
                dataSource={timeShares}
                request={async (params, sort, filter) => {
                    const query = buildQuery(params, sort, filter);
                }}
                scroll={{x: true}}
                pagination={{
                    current: 1,
                    pageSize: 10,
                    showSizeChanger: true,
                    total: 1,
                    showTotal: (total, range) => {
                        return (
                            <div>
                                {' '}
                                {range[0]}-{range[1]} on {total} rows
                            </div>
                        );
                    }
                }}
                toolBarRender={(_action, _rows) => {
                    return (
                        <Button
                            icon={<PlusOutlined/>}
                            type='primary'
                            onClick={() => {
                                setOpenModal(true);
                            }}
                        >
                            Add New
                        </Button>
                    );
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
    );
};

export default TimeSharePage
