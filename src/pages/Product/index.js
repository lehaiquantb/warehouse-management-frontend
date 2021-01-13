import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Table, Modal, Button, Image } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import OrderSettingTable from '../../components/OrderSettingTable/index';
import { getProductPaging, getProductPFS, getListCategory } from './action';
const { Search } = Input;
const ListProduct = (props) => {
  const __listCategory = useSelector((state) => state.products.listCategory);
  const { count } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const { listProductPaging } = useSelector((state) => state.products);
  const { isProductPagingRequesting } = useSelector((state) => state.products);
  const onSearch = (value) => console.log(value);
  const [data, setData] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    defaultPageSize: 5,
    pageSizeOptions: [1, 5, 10, 20, 30],
    showSizeChanger: true,
    total: 10,
  });
  useEffect(() => {
    dispatch(getProductPaging(1, 30));
    dispatch(getListCategory());
  }, []);

  useEffect(() => {
    setData(listProductPaging);
  }, [listProductPaging]);

  useEffect(() => {
    setColumns(defaultColumns);
  }, [__listCategory]);

  useEffect(() => {
    setPagination({
      ...pagination,
      total: count,
    });
  }, [count]);
  const defaultColumns = [
    {
      key: 'PCode',
      title: 'Mã SP',
      dataIndex: 'PCode',
      show: true,
      sorter: true,
      render: (PCode) => <Link to={`/products/${PCode}`}>{PCode}</Link>,
    },
    {
      key: 'image',
      title: 'Ảnh',
      dataIndex: 'image',
      render: (image) => <Image width={40} src={image} />,
      show: true,
    },
    {
      key: 'name',
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      sorter: true,
      render: (name) => `${name}`,
      className: 'no-wrap-space',
      show: true,
    },
    {
      key: 'category',
      title: 'Loại',
      dataIndex: 'category',
      render: (category) => {
        if (category && category.name) {
          return `${category.name}`;
        }
      },
      filters: __listCategory.map((item) => {
        console.log(item);
        return { text: item.name, value: item._id };
      }),
      show: true,
    },
    {
      key: 'price',
      title: 'Giá nhập gần nhất',
      dataIndex: 'price',
      render: (price) => price.formatMoney(),
      show: true,
    },
    {
      key: 'quantity',
      title: 'Số lượng',
      dataIndex: 'quantity',
      show: true,
    },
    {
      key: 'status',
      title: 'Trạng thái',
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
  const [columns, setColumns] = useState(defaultColumns);

  const fullColumns = [
    {
      key: 'PCode',
      title: 'Mã SP',
      dataIndex: 'PCode',
      show: true,
      sorter: true,
      render: (PCode) => <Link to={`\products\\${PCode}`}>{PCode}</Link>,
    },
    {
      key: 'image',
      title: 'Ảnh',
      dataIndex: 'image',
      render: (image) => <Image width={40} src={image} />,
      show: true,
    },
    {
      key: 'name',
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      sorter: true,
      render: (name) => `${name}`,
      className: 'no-wrap-space',
      show: true,
    },
    {
      key: 'category',
      title: 'Loại',
      dataIndex: 'category',
      render: (category) => {
        if (category && category.name) {
          return `${category.name}`;
        }
      },
      show: true,
    },
    {
      key: 'price',
      title: 'Giá nhập gần nhất',
      dataIndex: 'price',
      render: (price) => price.formatMoney(),
      show: true,
    },
    {
      key: 'quantity',
      title: 'Số lượng',
      dataIndex: 'quantity',
      show: true,
    },
    {
      key: 'status',
      title: 'Trạng thái',
      dataIndex: 'status',

      render: (status) => {
        if (status == 'active')
          return <span style={{ color: '#20a917' }}>Đang giao dịch</span>;
        else return <span style={{ color: '#ea1a1a' }}>Ngừng giao dịch</span>;
      },
      show: true,
    },
    {
      key: 'createdAt',
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      render: (createdAt) => createdAt.formatDate(),
      show: false,
    },
    {
      key: 'updatedAt',
      title: 'Ngày sửa',
      dataIndex: 'updatedAt',
      render: (updatedAt) => updatedAt.formatDate(),
      show: false,
    },
    {
      key: 'createdBy',
      title: 'Tạo bởi',
      dataIndex: 'createdBy',
      show: false,
    },
    {
      key: 'modifiedBy',
      title: 'Sửa bởi',
      dataIndex: 'modifiedBy',
      show: false,
    },
    {
      key: 'description',
      title: 'Mô tả',
      dataIndex: 'description',
      className: 'no-wrap-space',
      show: false,
    },
  ];
  const cbOrderSettingColumns = (cl = defaultColumns) => {
    setColumns(cl);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
    dispatch(getProductPFS({ pagination, filters, sorter }));
  };

  return (
    <div>
      <OrderSettingTable
        fullColumns={fullColumns}
        defaultColumns={defaultColumns}
        cbOrderSettingColumns={cbOrderSettingColumns}
      />
      <Search placeholder="input search text" onSearch={onSearch} enterButton />
      <Table
        columns={columns}
        rowKey={(record) => record.key}
        key={(record) => record.key}
        dataSource={data}
        pagination={pagination}
        loading={isProductPagingRequesting}
        scroll={{ x: 1000 }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default ListProduct;
