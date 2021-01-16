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
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import OrderSettingTable from '../../components/OrderSettingTable/index';
import {
  getProductPaging,
  getProductPFS,
  getListCategory,
  deleteProductByPCode,
} from './action';
const { Search } = Input;
const ListProduct = (props) => {
  const __listCategory = useSelector((state) => state.products.listCategory);
  const { count } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const { listProductPaging } = useSelector((state) => state.products);
  const { isDeletingProduct } = useSelector((state) => state.products);
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
    dispatch(getProductPaging(pagination.current, pagination.defaultPageSize));
    dispatch(getListCategory());
  }, []);

  useEffect(() => {
    dispatch(getProductPaging(pagination.current, pagination.defaultPageSize));
  }, [isDeletingProduct]);

  useEffect(() => {
    setData(listProductPaging);
  }, [listProductPaging]);

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
      width: 100,
      show: true,
      sorter: true,
      render: (PCode) => <Link to={`/products/${PCode}`}>{PCode}</Link>,
    },
    {
      key: 'image',
      title: 'Ảnh',
      width: 60,
      dataIndex: 'image',
      render: (image) => <Image width={40} src={image} />,
      show: true,
    },
    {
      key: 'name',
      title: 'Tên sản phẩm',
      width: 200,
      dataIndex: 'name',
      sorter: true,
      show: true,
    },
    {
      key: 'category',
      title: 'Loại',
      dataIndex: 'category',
      width: 150,
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
      width: 150,
      render: (price) => price.formatMoney(),
      show: true,
    },
    {
      key: 'quantity',
      title: 'Số lượng',
      width: 100,
      dataIndex: 'quantity',
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
    dataIndex: 'PCode',
    width: 100,
    fixed: 'right',
    render: (PCode) => (
      <>
        <Link to={`/products/${PCode}/edit`}>
          <EditTwoTone />
        </Link>
        {'  '}
        <DeleteTwoTone onClick={() => confirmDelete(PCode)} />
      </>
    ),
  };

  let nc = defaultColumns.slice();
  nc.push(actionColumn);

  const [columns, setColumns] = useState(nc);
  useEffect(() => {
    setColumns(nc);
  }, [__listCategory]);
  const fullColumns = [
    {
      key: 'PCode',
      title: 'Mã SP',
      dataIndex: 'PCode',
      width: 100,
      show: true,
      sorter: true,
      render: (PCode) => <Link to={`/products/${PCode}`}>{PCode}</Link>,
    },
    {
      key: 'image',
      title: 'Ảnh',
      width: 60,
      dataIndex: 'image',
      render: (image) => <Image width={40} src={image} />,
      show: true,
    },
    {
      key: 'name',
      title: 'Tên sản phẩm',
      width: 200,
      dataIndex: 'name',
      sorter: true,
      show: true,
    },
    {
      key: 'category',
      title: 'Loại',
      dataIndex: 'category',
      width: 150,
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
      width: 150,
      render: (price) => price.formatMoney(),
      show: true,
    },
    {
      key: 'quantity',
      title: 'Số lượng',
      width: 100,
      dataIndex: 'quantity',
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
    dispatch(getProductPFS({ pagination, filters, sorter }));
  };

  const confirmDelete = (PCode) => {
    const config = {
      title: 'Xác nhận',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có chắc chắn muốn xóa sản phẩm này',
      okText: 'Xóa',
      cancelText: 'Hủy',
      confirmLoading: isDeletingProduct,
    };
    let p = PCode;

    Modal.confirm({
      ...config,
      onOk: () => {
        dispatch(deleteProductByPCode(p));
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
        
        key={(record) => record.key}
        dataSource={data}
        pagination={pagination}
        loading={isProductPagingRequesting}
        onChange={handleTableChange}
        scroll={{ x: 1100 }}
      />
      <Modal></Modal>
    </div>
  );
};

export default ListProduct;
