import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Table, Modal, Button, Image } from 'antd';
import {
  SettingOutlined,
  EditTwoTone,
  DeleteTwoTone,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import OrderSettingTable from '../../components/OrderSettingTable/index';
import { getSupplierPFS, deleteSupplierBySCode } from './action';
const { Search } = Input;
const ListSupplier = (props) => {
  const { count } = useSelector((state) => state.suppliers);
  const dispatch = useDispatch();

  const { listSupplierPaging } = useSelector((state) => state.suppliers);
  const { isDeletingSupplier } = useSelector((state) => state.suppliers);
  const { isSupplierPagingRequesting } = useSelector(
    (state) => state.suppliers,
  );
  const onSearch = (value) => console.log(value);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    defaultPageSize: 5,
    pageSize: 5,
    pageSizeOptions: [1, 5, 10, 20, 30],
    showSizeChanger: true,
    total: 10,
  });
  useEffect(() => {
    dispatch(
      getSupplierPFS({ pagination: pagination, filters: {}, sorter: {} }),
    );
  }, []);

  useEffect(() => {
    dispatch(
      getSupplierPFS({ pagination: pagination, filters: {}, sorter: {} }),
    );
  }, [isDeletingSupplier]);

  useEffect(() => {
    setData(listSupplierPaging);
  }, [listSupplierPaging]);

  useEffect(() => {
    setPagination({
      ...pagination,
      total: count,
    });
  }, [count]);

  const defaultColumns = [
    {
      key: 'SCode',
      title: 'Mã NCC',
      dataIndex: 'SCode',
      width: 100,
      show: true,
      sorter: true,
      render: (SCode) => <Link to={`/suppliers/${SCode}`}>{SCode}</Link>,
    },
    {
      key: 'name',
      title: 'Tên nhà cung cấp',
      width: 200,
      dataIndex: 'name',
      sorter: true,
      show: true,
    },
    {
      key: 'address',
      title: 'Địa chỉ',
      dataIndex: 'address',
      width: 150,
      show: true,
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
      width: 150,
      show: true,
    },
    {
      key: 'phone',
      title: 'Số điện thoại',
      width: 130,
      dataIndex: 'phone',
      show: true,
    },
    {
      key: 'status',
      title: 'Trạng thái',
      width: 130,
      dataIndex: 'status',
      render: (status) => {
        if (status == 'active')
          return <span style={{ color: '#20a917' }}>Đang giao dịch</span>;
        else return <span style={{ color: '#ea1a1a' }}>Ngừng giao dịch</span>;
      },
      filters: [
        { text: 'Đang giao dịch', value: 'active' },
        { text: 'Ngừng giao dịch', value: 'inactive' },
      ],
      show: true,
    },
  ];

  const actionColumn = {
    key: 'action',
    title: 'Thao tác',
    dataIndex: 'SCode',
    width: 100,
    fixed: 'right',
    render: (SCode) => (
      <>
        <Link to={`/suppliers/${SCode}/edit`}>
          <EditTwoTone />
        </Link>
        {'  '}
        <DeleteTwoTone onClick={() => confirmDelete(SCode)} />
      </>
    ),
  };

  let nc = defaultColumns.slice();
  nc.push(actionColumn);

  const [columns, setColumns] = useState(nc);

  const fullColumns = [
    {
      key: 'SCode',
      title: 'Mã NCC',
      dataIndex: 'SCode',
      width: 100,
      show: true,
      sorter: true,
      render: (SCode) => <Link to={`/suppliers/${SCode}`}>{SCode}</Link>,
    },
    {
      key: 'name',
      title: 'Tên nhà cung cấp',
      width: 200,
      dataIndex: 'name',
      sorter: true,
      show: true,
    },
    {
      key: 'address',
      title: 'Địa chỉ',
      dataIndex: 'address',
      width: 150,
      show: true,
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
      width: 150,
      show: true,
    },
    {
      key: 'phone',
      title: 'Số điện thoại',
      width: 130,
      dataIndex: 'phone',
      show: true,
    },
    {
      key: 'status',
      title: 'Trạng thái',
      width: 130,
      dataIndex: 'status',
      render: (status) => {
        if (status == 'active')
          return <span style={{ color: '#20a917' }}>Đang giao dịch</span>;
        else return <span style={{ color: '#ea1a1a' }}>Ngừng giao dịch</span>;
      },
      filters: [
        { text: 'Đang giao dịch', value: 'active' },
        { text: 'Ngừng giao dịch', value: 'inactive' },
      ],
      show: true,
    },
    {
      key: 'createdAt',
      title: 'Ngày tạo',
      width: 120,
      dataIndex: 'createdAt',
      render: (createdAt) => createdAt.formatDate(),
      show: false,
    },
    {
      key: 'updatedAt',
      title: 'Ngày sửa',
      width: 120,
      dataIndex: 'updatedAt',
      render: (updatedAt) => updatedAt.formatDate(),
      show: false,
    },
    {
      key: 'createdBy',
      title: 'Tạo bởi',
      width: 120,
      dataIndex: 'createdBy',
      show: false,
      ellipsis: true,
    },
    {
      key: 'modifiedBy',
      title: 'Sửa bởi',
      width: 120,
      dataIndex: 'modifiedBy',
      show: false,
      ellipsis: true,
    },
    {
      key: 'description',
      title: 'Mô tả',
      width: 120,
      dataIndex: 'description',
      show: false,
      ellipsis: true,
    },
  ];
  const cbOrderSettingColumns = (cl = defaultColumns) => {
    setColumns(cl);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
    dispatch(getSupplierPFS({ pagination, filters, sorter }));
  };

  const confirmDelete = (SCode) => {
    const config = {
      title: 'Xác nhận',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có chắc chắn muốn xóa nhà cung cấp này',
      okText: 'Xóa',
      cancelText: 'Hủy',
      confirmLoading: isDeletingSupplier,
    };
    let s = SCode;

    Modal.confirm({
      ...config,
      onOk: () => {
        dispatch(deleteSupplierBySCode(s));
      },
    });
  };

  return (
    <div>
      <OrderSettingTable
        fullColumns={fullColumns}
        defaultColumns={defaultColumns}
        cbOrderSettingColumns={cbOrderSettingColumns}
        actionColumn={actionColumn}
      />
      <Search placeholder="input search text" onSearch={onSearch} enterButton />
      <Table
        size="small"
        columns={columns}
        rowKey={(record) => record.key}
        key={(record) => record.key}
        dataSource={data}
        pagination={pagination}
        loading={isSupplierPagingRequesting}
        onChange={handleTableChange}
        scroll={{ x: 1100 }}
      />
    </div>
  );
};

export default ListSupplier;
