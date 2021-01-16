import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Modal,
  Select,
  InputNumber,
  Button,
  Space,
  Upload,
  Checkbox,
  Image,
  AutoComplete,
  Avatar,
  Table,
} from 'antd';
import { isExist } from '../../helpers/check';
import { formatCurrency } from '../../helpers/format';
import { createReceipt, searchProduct, searchSupplier } from './action';
import {
  CreditCardTwoTone,
  CreditCardFilled,
  UserOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { IMG_DEFAULT_BASE64 } from '../../helpers/constant';
//import { Input, Label, FormFeedback } from 'reactstrap';
const CreateReceipt = (props) => {
  const spRef = useRef(null);
  const user = useSelector((state) => state.user);
  const { isSearchingProduct, isSearchingSupplier } =
    useSelector((state) => state.receipts) || false;
  const { listProductSearch, listSupplierSearch } =
    useSelector((state) => state.receipts) || [];
  const { countProductSearch, countSupplierSearch } =
    useSelector((state) => state.receipts) || 0;

  const dispatch = useDispatch();
  useEffect(() => {}, []);

  const cardStyle = {
    marginBottom: '20px',
  };

  const onChangePaidMoney = (e) => {
    let formatP = document.getElementById('paidMoney').value;
    const paidMoney =
      parseInt(formatP.replace(/\,/gm, '').replace(/[^0-9,]/gm, '')) || 0;
    const maxMoney =
      parseInt(
        document
          .getElementById('total-money')
          .textContent.replace(/\,/gm, '')
          .replace(/[^0-9,]/gm, ''),
      ) || 0;
    if (paidMoney >= maxMoney) {
      document.getElementById('paidMoney').value = maxMoney.formatMoney();
      return;
    }
    document.getElementById('paidMoney').value = paidMoney.formatMoney();
    return;
  };

  const onChangePrice = (e) => {
    let formatP = e.target.value;
    const paidMoney = formatP.replace(/\,/gm, '').replace(/[^0-9,]/gm, '');
    e.target.value = formatCurrency(paidMoney);
    return;
  };

  const onFinish = async (values) => {
    const receipt = {};

    if (values.RCode) {
      receipt.RCode = values.RCode;
    }
    //dispatch(createReceipt(receipt));
    console.log('Success:', values);
    console.log(receipt);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const fields = [];
  const [optionProducts, setOptionProducts] = useState([]);
  const [optionSuppliers, setOptionSuppliers] = useState([]);
  const [supplier, setSupplier] = useState({});
  const [listTag, setListTag] = useState([]);
  const [resetValue, setResetValue] = useState('');
  const [isCostPriceLatest, setIsCostPriceLatest] = useState(false);
  const [products, setProducts] = useState([]);
  const [isAddPayment, setIsAddPayment] = useState(false);
  const [errorPaidMoney, setErrorPaidMoney] = useState('validating');

  const onChangeQuantityPerProduct = (e, PCode) => {
    const quantityPerProduct = parseInt(e) || 0;
    const pricePerProduct =
      parseInt(
        document
          .getElementById(`i-costPrice-${PCode}`)
          .value.replace(/\,/gm, '')
          .replace(/[^0-9,]/gm, ''),
      ) || 0;
    document.getElementById(`s-totalMoneyPerProduct-${PCode}`).innerHTML = (
      pricePerProduct * quantityPerProduct
    ).formatMoney();
    changeTotalQuantityMoney();
  };
  const onChangeCostPrice = (e, PCode) => {
    const pricePerProduct =
      parseInt(e.target.value.replace(/\,/gm, '').replace(/[^0-9,]/gm, '')) ||
      0;
    const quantityPerProduct =
      parseInt(document.getElementById(`i-quantity-${PCode}`).value) || 0;
    document.getElementById(`s-totalMoneyPerProduct-${PCode}`).innerHTML = (
      pricePerProduct * quantityPerProduct
    ).formatMoney();
    changeTotalQuantityMoney();
  };

  useEffect(() => {
    // console.log('productS', listProductSearch);
    const newOptionProducts = listProductSearch.map((item) => {
      return {
        key: item._id,
        value: '',
        label: (
          <div
            key={item._id}
            style={{
              border: '1px solid #dcded2',
              display: 'flex',
              padding: '2px',
              justifyContent: 'space-between',
            }}
            onClick={() => onSelectProduct(item)}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Image width={50} src={item.image} />
              &nbsp;
              <div>
                {item.name}
                <br />
                {item.PCode}
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              Số lượng: {item.quantity}
              <br />
              {item.price.formatMoney()}
            </div>
          </div>
        ),
      };
    });
    setOptionProducts(newOptionProducts);
  }, [listProductSearch]);

  useEffect(() => {
    // console.log('supplierS', listSupplierSearch);
    const newOptionSuppliers = listSupplierSearch.map((item) => {
      return {
        key: item._id,
        value: '',
        label: (
          <div
            key={item._id}
            style={{
              border: '1px solid #dcded2',
              display: 'flex',
              padding: '2px',
              justifyContent: 'space-between',
            }}
            onClick={() => onSelectSupplier(item)}
          >
            <div>
              {item.name}
              <br />
              {item.phone}
            </div>
            <div>{item.email}</div>
          </div>
        ),
      };
    });
    setOptionSuppliers(newOptionSuppliers);
  }, [listSupplierSearch]);

  useEffect(() => {
    changeTotalQuantityMoney();
  }, [products]);

  const _columns = [
    {
      key: 'PCode',
      title: 'Mã SP',
      dataIndex: 'PCode',
      render: (PCode) => <Link to={`/products/${PCode}`}>{PCode}</Link>,
    },
    {
      key: 'name',
      title: 'Tên sản phẩm',
      dataIndex: 'name',
    },
    {
      key: 'inputQuantity',
      title: 'Số lượng',
      dataIndex: 'quantity',
      render: (quantity, record) => {
        return (
          <InputNumber
            onChange={(e) => onChangeQuantityPerProduct(e, record.PCode)}
            size="small"
            style={{ width: '70px' }}
            min={1}
            defaultValue={1}
            // max={quantity}
            id={`i-quantity-${record.PCode}`}
          />
        );
      },
    },
    {
      key: 'inputCostPrice',
      title: 'Giá nhập',
      dataIndex: 'traceCostPrices',
      render: (traceCostPrices, record) => {
        let price = 0;
        if (traceCostPrices && traceCostPrices.length > 0) {
          price = isCostPriceLatest
            ? traceCostPrices[traceCostPrices.length - 1].value.formatMoney()
            : traceCostPrices[0].value.formatMoney();
          if (!price) {
            price = 0;
          }
        }
        return (
          <input
            className={
              isCostPriceLatest
                ? `ant-input ant-input-sm change-${record.PCode}`
                : `ant-input ant-input-sm df-${record.PCode}`
            }
            onChange={(e) => onChangeCostPrice(e, record.PCode)}
            id={`i-costPrice-${record.PCode}`}
            onKeyUp={(e) => onChangePrice(e)}
            style={{ width: '100px' }}
            defaultValue={isCostPriceLatest ? price : price}
          />
        );
      },
    },
    {
      key: 'totalMoneyPerProduct',
      title: 'Thành tiền',
      dataIndex: 'traceCostPrices',
      render: (traceCostPrices, record) => {
        let price = 0;
        if (traceCostPrices && traceCostPrices.length > 0) {
          price = isCostPriceLatest
            ? traceCostPrices[traceCostPrices.length - 1].value.formatMoney()
            : traceCostPrices[0].value.formatMoney();
          if (!price) {
            price = 0;
          }
        }
        return (
          <span id={`s-totalMoneyPerProduct-${record.PCode}`}>{price}</span>
        );
      },
    },
    {
      key: 'removeRow',
      title: '',
      dataIndex: '_id',
      render: (id) => {
        return (
          <CloseOutlined
            onClick={() => {
              let p = products.filter((item) => {
                return item._id != id;
              });
              setProducts([...p]);
            }}
          />
        );
      },
    },
  ];

  const onSelectProduct = (value) => {
    let isExist = false;
    products.forEach((item) => {
      if (item._id == value._id) {
        isExist = true;
      }
    });
    if (!isExist) {
      value.key = value._id;
      spRef.current.blur();
      setProducts([...products, value]);
    }
  };

  const handleSearchProduct = (value) => {
    dispatch(searchProduct(value, 1, 10));
  };

  const onFirstSearchProduct = () => {
    dispatch(searchProduct('', 1, 10));
  };

  const onSelectSupplier = (value) => {
    //console.log('onSelectSupplier', value);
    //const supplier = listSupplierSearch.find((element) => element._id == value);
    setSupplier(value);
    document.querySelector('#search-supplier').value = '';
  };

  const onFirstSearchSupplier = () => {
    dispatch(searchSupplier('', 1, 10));
  };
  const handleSearchSupplier = (value) => {
    dispatch(searchSupplier(value, 1, 10));
  };

  const onAddPayment = (e) => {
    setIsAddPayment(e.target.checked);
  };
  const onChangeStockStatus = (e) => {};

  // const onChangeInputMoney = (e) => {
  //   let formatP = document.getElementById('price').value;
  //   const price = formatP.replace(/\,/gm, '').replace(/[^0-9,]/gm, '');
  //   document.getElementById('price').value = formatCurrency(price);
  //   return;
  // };

  const onChangeCostPriceAndTotalMoney = (e) => {
    products.forEach((item) => {
      const costPricePerProduct = e.target.checked
        ? item.traceCostPrices[item.traceCostPrices.length - 1].value
        : item.traceCostPrices[0].value;
      const quantityPerProduct =
        parseInt(document.getElementById(`i-quantity-${item.PCode}`).value) ||
        0;
      document.getElementById(
        `i-costPrice-${item.PCode}`,
      ).value = costPricePerProduct.formatMoney();
      document.getElementById(
        `s-totalMoneyPerProduct-${item.PCode}`,
      ).innerHTML = (costPricePerProduct * quantityPerProduct).formatMoney();
    });
  };

  const changeTotalQuantityMoney = () => {
    let totalQuantity = 0;
    let totalMoney = 0;
    products.forEach((item) => {
      totalQuantity +=
        parseInt(document.getElementById(`i-quantity-${item.PCode}`).value) ||
        0;
      totalMoney +=
        parseInt(
          document
            .getElementById(`s-totalMoneyPerProduct-${item.PCode}`)
            .textContent.replace(/\,/gm, '')
            .replace(/[^0-9,]/gm, ''),
        ) || 0;
    });
    //console.log(totalQuantity, totalMoney);
    document.getElementById('total-quantity').innerHTML = totalQuantity;
    document.getElementById('total-money').innerHTML = totalMoney.formatMoney();
  };

  return (
    <div>
      <h4>Thêm mới đơn nhập kho</h4>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Row gutter={[24, 24]}>
          <Col span={16}>
            <Card
              style={cardStyle}
              size="small"
              title="Thông tin sản phẩm"
              extra={
                <Checkbox onChange={(e) => onChangeCostPriceAndTotalMoney(e)}>
                  Sử dụng giá nhập gần nhất
                </Checkbox>
              }
            >
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <AutoComplete
                    dropdownMatchSelectWidth={252}
                    options={optionProducts}
                    style={{ width: '100%' }}
                    onSearch={handleSearchProduct}
                    onFocus={onFirstSearchProduct}
                    ref={spRef}
                    key="pS"
                  >
                    <Input.Search
                      size="middle"
                      placeholder="Tìm kiếm sản phẩm theo tên, mã sản phẩm PCode"
                      enterButton
                      loading={isSearchingProduct}
                    />
                  </AutoComplete>
                  {/* <Form.Item
                    label="Tên nhà cung cấp"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: 'Tên nhà cung cấp là bắt buộc',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item> */}
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Table
                    size="small"
                    columns={_columns}
                    rowKey={(record) => record.key}
                    key={(record) => record.key}
                    dataSource={products}
                    pagination={false}
                    // onChange={handleTableChange}
                  />
                  <br />
                  <p>
                    Tổng số lượng:&nbsp;<span id="total-quantity">0</span>
                  </p>
                  <p>
                    Tổng tiền:&nbsp;
                    <span id="total-money">0</span>
                  </p>
                </Col>
              </Row>
            </Card>
            <Card
              style={cardStyle}
              size="small"
              title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <CreditCardFilled />
                  &nbsp;
                  <span>Thanh toán</span>
                </div>
              }
              extra={
                <Checkbox onChange={(e) => onAddPayment(e)}>
                  Thanh toán với nhà cung cấp
                </Checkbox>
              }
            >
              {isAddPayment ? (
                <Row gutter={[16, 0]}>
                  <Col span={12}>
                    <Form.Item
                      label="Hình thức thanh toán"
                      name="payment"
                      initialValue={'CASH'}
                    >
                      <Select style={{ width: '100%' }}>
                        <Select.Option value="COD">COD</Select.Option>
                        <Select.Option value="BANK">Chuyển khoản</Select.Option>
                        <Select.Option value="CASH">Tiền mặt</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Số tiền thanh toán"
                      name="paidMoney"
                      help="Số tiền thanh toán cần nhỏ hơn tổng tiền"
                      validateStatus={errorPaidMoney}
                      rules={[
                        {
                          required: true,
                          message: 'Số tiền thanh toán là trường bắt buộc',
                        },
                      ]}
                    >
                      <input
                        className="ant-input"
                        onKeyUp={(e) => onChangePaidMoney(e)}
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              ) : (
                ''
              )}
            </Card>
            <Card
              size="small"
              title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <CreditCardFilled />
                  &nbsp;
                  <span>Nhập kho</span>
                </div>
              }
              extra={
                <Checkbox onChange={onChangeStockStatus}>
                  Nhập hàng vào kho
                </Checkbox>
              }
            >
              <Row gutter={[16, 0]}>
                <Col span={12}></Col>
              </Row>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={cardStyle} size="small" title="Thông tin nhà cung cấp">
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <AutoComplete
                    style={{ width: '100%' }}
                    options={optionSuppliers}
                    onSearch={handleSearchSupplier}
                    onFocus={onFirstSearchSupplier}
                    key="sS"
                    id="search-supplier"
                  >
                    <Input.Search
                      size="middle"
                      placeholder="Tìm kiếm nhà cung cấp theo tên, mã sản phẩm SCode"
                      enterButton
                      loading={isSearchingSupplier}
                    />
                  </AutoComplete>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  {isExist(supplier) ? (
                    <>
                      <Avatar size="small" icon={<UserOutlined />} />
                      &nbsp;
                      <span style={{ color: '#0088ff', fontWeight: 'bold' }}>
                        {supplier.name || ''}
                      </span>
                      <hr />
                      <p>SĐT: {supplier.phone || ''} </p>
                      <p>Email: {supplier.email || ''} </p>
                      <p>Địa chỉ: {supplier.address || ''} </p>
                    </>
                  ) : (
                    ''
                  )}
                </Col>
              </Row>
            </Card>
            <Card size="small" title="Thông tin đơn nhập kho">
              <Row>
                <Col span={24}>
                  <Form.Item label="Mã đơn nhập kho" name="RCode">
                    <InputNumber style={{ width: '100%' }} min={0} />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <Form.Item label="Ghi chú" name="note">
                    <Input.TextArea />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <Form.Item label="TAG" name="tags">
                    <Select
                      mode="tags"
                      style={{ width: '100%' }}
                      placeholder="Thêm tag"
                    >
                      {listTag}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row gutter={[24, 24]}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
};

export default CreateReceipt;
