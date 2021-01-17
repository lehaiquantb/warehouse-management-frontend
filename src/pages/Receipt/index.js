import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Table, Modal, Button, Image, Tag } from 'antd';
import {
  SettingOutlined,
  EditTwoTone,
  DeleteTwoTone,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import OrderSettingTable from '../../components/OrderSettingTable/index';
import { getReceiptPFS, getSupplierPFS } from './action';
const { Search } = Input;
const ListReceipt = (props) => {
  const { count } = useSelector((state) => state.receipts);
  const dispatch = useDispatch();

  const { listReceiptPaging } = useSelector((state) => state.receipts);
  const { isDeletingReceipt } = useSelector((state) => state.receipts);
  const { isReceiptPagingRequesting } = useSelector((state) => state.receipts);
  const { listSupplierPaging } = useSelector((state) => state.receipts);
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
      getReceiptPFS({ pagination: pagination, filters: {}, sorter: {} }),
    );
    dispatch(
      getSupplierPFS({ pagination: pagination, filters: {}, sorter: {} }),
    );
  }, []);

  useEffect(() => {
    setData(listReceiptPaging);
  }, [listReceiptPaging]);

  useEffect(() => {
    setPagination({
      ...pagination,
      total: count,
    });
  }, [count]);

  const defaultColumns = [
    {
      key: 'RCode',
      title: 'Mã đơn',
      dataIndex: 'RCode',
      width: 100,
      show: true,
      sorter: true,
      render: (RCode) => <Link to={`/receipts/${RCode}`}>{RCode}</Link>,
    },
    {
      key: 'supplier',
      title: 'Tên nhà cung cấp',
      width: 200,
      dataIndex: 'supplier',

      render: (supplier) => `${supplier.name}`,
      filters: listSupplierPaging.map((item) => {
        return { text: item.name, value: item._id };
      }),
      show: true,
    },
    {
      key: 'status',
      title: 'Trạng thái',
      dataIndex: 'stockStatus',
      width: 100,
      render: (stockStatus, record) => {
        if (stockStatus == 'DONE' && record.paymentStatus == 'DONE')
          return <span style={{ color: '#20a917' }}>Hoàn thành</span>;
        else if (stockStatus == 'NOT_YET' && record.paymentStatus == 'NOT_YET')
          return <span style={{ color: '#0a77bb' }}>Đã duyệt</span>;
        else return <span style={{ color: '#f19403' }}>Đang giao dịch</span>;
      },
      show: true,
    },
    {
      key: 'paymentStatus',
      title: 'Thanh toán',
      dataIndex: 'paymentStatus',
      width: 140,
      render: (paymentStatus) => {
        if (paymentStatus == 'DONE')
          return <span style={{ color: '#20a917' }}>Đã thanh toán</span>;
        else if (paymentStatus == 'NOT_YET')
          return <span style={{ color: '#0a77bb' }}>Chưa thanh toán</span>;
        else
          return <span style={{ color: '#f19403' }}>Thanh toán một phần</span>;
      },
      filters: [
        { text: 'Đã thanh toán', value: 'DONE' },
        { text: 'Thanh toán một phần', value: 'PARTIAL' },
        { text: 'Chưa thanh toán', value: 'NOT_YET' },
      ],
      show: true,
    },
    {
      key: 'stockStatus',
      title: 'Nhập kho',
      width: 100,
      dataIndex: 'stockStatus',
      render: (stockStatus) => {
        if (stockStatus == 'DONE')
          return <span style={{ color: '#20a917' }}>Đã nhập hàng</span>;
        else return <span style={{ color: '#0a77bb' }}>Chờ nhập hàng</span>;
      },
      filters: [
        { text: 'Đã nhập hàng', value: 'DONE' },
        { text: 'Chờ nhập hàng', value: 'NOT_YET' },
      ],
      show: true,
    },
    {
      key: 'totalMoney',
      title: 'Tổng tiền',
      width: 120,
      dataIndex: 'totalMoney',
      render: (totalMoney) => totalMoney.formatMoney(),
      show: true,
    },
  ];

  const actionColumn = {
    key: 'action',
    title: 'Thao tác',
    dataIndex: 'RCode',
    width: 100,
    fixed: 'right',
    render: (RCode, record) => (
      <>
        {record.paymentStatus == 'DONE' && record.stockStatus == 'DONE' ? (
          ''
        ) : (
          <Link to={`/receipts/${RCode}/edit`}>
            <EditTwoTone />
          </Link>
        )}
      </>
    ),
  };

  let nc = defaultColumns.slice();
  nc.push(actionColumn);

  const [columns, setColumns] = useState(nc);

  useEffect(() => {
    console.log(listSupplierPaging);
    setColumns(nc);
  }, [listSupplierPaging]);

  const fullColumns = [
    {
      key: 'RCode',
      title: 'Mã đơn',
      dataIndex: 'RCode',
      width: 100,
      show: true,
      sorter: true,
      render: (RCode) => <Link to={`/receipts/${RCode}`}>{RCode}</Link>,
    },
    {
      key: 'supplier',
      title: 'Tên nhà cung cấp',
      width: 200,
      dataIndex: 'supplier',
      render: (supplier) => `${supplier.name}`,
      filters: listSupplierPaging.map((item) => {
        return { text: item.name, value: item._id };
      }),
      show: true,
    },
    {
      key: 'status',
      title: 'Trạng thái',
      dataIndex: 'stockStatus',
      width: 100,
      render: (stockStatus, record) => {
        if (stockStatus == 'DONE' && record.paymentStatus == 'DONE')
          return <span style={{ color: '#20a917' }}>Hoàn thành</span>;
        else if (stockStatus == 'NOT_YET' && record.paymentStatus == 'NOT_YET')
          return <span style={{ color: '#0a77bb' }}>Đã duyệt</span>;
        else return <span style={{ color: '#f19403' }}>Đang giao dịch</span>;
      },
      show: true,
    },
    {
      key: 'paymentStatus',
      title: 'Thanh toán',
      dataIndex: 'paymentStatus',
      width: 140,
      render: (paymentStatus) => {
        if (paymentStatus == 'DONE')
          return <span style={{ color: '#20a917' }}>Đã thanh toán</span>;
        else if (paymentStatus == 'NOT_YET')
          return <span style={{ color: '#0a77bb' }}>Chưa thanh toán</span>;
        else
          return <span style={{ color: '#f19403' }}>Thanh toán một phần</span>;
      },
      filters: [
        { text: 'Đã thanh toán', value: 'DONE' },
        { text: 'Thanh toán một phần', value: 'PARTIAL' },
        { text: 'Chưa thanh toán', value: 'NOT_YET' },
      ],
      show: true,
    },
    {
      key: 'stockStatus',
      title: 'Nhập kho',
      width: 100,
      dataIndex: 'stockStatus',
      render: (stockStatus) => {
        if (stockStatus == 'DONE')
          return <span style={{ color: '#20a917' }}>Đã nhập hàng</span>;
        else return <span style={{ color: '#0a77bb' }}>Chờ nhập hàng</span>;
      },
      filters: [
        { text: 'Đã nhập hàng', value: 'DONE' },
        { text: 'Chờ nhập hàng', value: 'NOT_YET' },
      ],
      show: true,
    },
    {
      key: 'totalMoney',
      title: 'Tổng tiền',
      width: 120,
      dataIndex: 'totalMoney',
      render: (totalMoney) => totalMoney.formatMoney(),
      show: true,
    },
    {
      key: 'note',
      title: 'Ghi chú',
      width: 120,
      dataIndex: 'note',
      show: false,
      ellipsis: true,
    },
    {
      key: 'tags',
      title: 'Tags',
      width: 120,
      dataIndex: 'tags',
      render: (tags) => {
        return (
          <div>
            {tags.map((tag) => (
              <Tag>{tag}</Tag>
            ))}
          </div>
        );
      },
      show: false,
      ellipsis: true,
    },
    {
      key: 'createdAt',
      title: 'Ngày duyệt',
      width: 120,
      dataIndex: 'createdAt',
      render: (createdAt) => createdAt.formatDate(),
      show: false,
    },
    {
      key: 'stockAt',
      title: 'Ngày nhập kho',
      width: 120,
      dataIndex: 'updateStockStatusAt',
      render: (updateStockStatusAt, record) => {
        if (record.stockStatus == 'DONE')
          returnupdateStockStatusAt.formatDate();
        else return '';
      },
      show: false,
    },
    {
      key: 'stockAt',
      title: 'Ngày hoàn thành',
      width: 120,
      dataIndex: 'updatePaymentStatusAt',
      render: (updatePaymentStatusAt, record) => {
        if (record.paymentStatus == 'DONE') updatePaymentStatusAt.formatDate();
        else return '';
      },
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
  ];
  const cbOrderSettingColumns = (cl = defaultColumns) => {
    setColumns(cl);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
    dispatch(getReceiptPFS({ pagination, filters, sorter }));
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
        loading={isReceiptPagingRequesting}
        onChange={handleTableChange}
        scroll={{ x: 1100 }}
      />
    </div>
  );
};

export default ListReceipt;
