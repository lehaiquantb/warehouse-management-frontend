import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
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
  notification,
  Steps,
  Timeline,
  Collapse,
  Descriptions,
} from 'antd';
import { isExist } from '../../helpers/check';
import { formatCurrency } from '../../helpers/format';
import {
  createReceipt,
  searchProduct,
  searchSupplier,
  getReceiptByRCode,
  updateReceiptByRCode,
} from './action';
import {
  CreditCardTwoTone,
  CreditCardFilled,
  UserOutlined,
  CloseOutlined,
  CaretRightOutlined,
  CaretRightFilled,
} from '@ant-design/icons';
import { IMG_DEFAULT_BASE64 } from '../../helpers/constant';
import {
  notifFailure,
  notifFailureMes,
} from '../../components/notification/Notification';
//import { Input, Label, FormFeedback } from 'reactstrap';
const { Step } = Steps;
const { Panel } = Collapse;
const EditReceipt = (props) => {
  const [form] = Form.useForm();
  const spRef = useRef(null);
  let { RCode } = useParams();
  const user = useSelector((state) => state.user);
  const { isSearchingProduct, isSearchingSupplier } =
    useSelector((state) => state.receipts) || false;
  const { listProductSearch, listSupplierSearch } =
    useSelector((state) => state.receipts) || [];
  const { countProductSearch, countSupplierSearch } =
    useSelector((state) => state.receipts) || 0;
  const { receiptDetail } = useSelector((state) => state.receipts);
  const [currentStep, setCurrentStep] = useState({
    step: 0,
    time0: '',
    time1: '',
    time2: '',
    time3: '',
  });
  const [payments, setPayments] = useState([]);
  const [optionProducts, setOptionProducts] = useState([]);
  const [optionSuppliers, setOptionSuppliers] = useState([]);
  const [supplier, setSupplier] = useState({});
  const [listTag, setListTag] = useState([]);
  const [resetValue, setResetValue] = useState('');
  const [isCostPriceLatest, setIsCostPriceLatest] = useState(false);
  const [products, setProducts] = useState([]);
  const [isAddPayment, setIsAddPayment] = useState(false);
  const [errorPaidMoney, setErrorPaidMoney] = useState('validating');
  const [stockStatus, setStockStatus] = useState('NOT_YET');
  const [initialStockStatus, setInitialStockStatus] = useState('NOT_YET');
  const [paymentStatus, setPaymentStatus] = useState('NOT_YET');
  const [infoPaid, setInfoPaid] = useState({ paid: 0, remain: 0 });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReceiptByRCode(RCode));
  }, []);

  const updateCurrentStep = () => {
    let currentStep = { step: 0, time0: '', time1: '', time2: '', time3: '' };
    let time0 = moment(receiptDetail.createdAt).format('DD/MM/YYYY hh:mm');
    let time1 = moment(receiptDetail.createdAt).format('DD/MM/YYYY hh:mm');
    let time2, time3;
    if (
      moment(receiptDetail.updateStockStatusAt).isAfter(
        receiptDetail.updatePaymentStatusAt,
      )
    ) {
      time3 = moment(receiptDetail.updateStockStatusAt).format(
        'DD/MM/YYYY hh:mm',
      );
      time2 = moment(receiptDetail.updatePaymentStatusAt).format(
        'DD/MM/YYYY hh:mm',
      );
    } else {
      time2 = moment(receiptDetail.updateStockStatusAt).format(
        'DD/MM/YYYY hh:mm',
      );
      time3 = moment(receiptDetail.updatePaymentStatusAt).format(
        'DD/MM/YYYY hh:mm',
      );
    }
    if (
      receiptDetail.stockStatus == 'NOT_YET' &&
      receiptDetail.paymentStatus == 'NOT_YET'
    ) {
      currentStep.step = 0;
      currentStep.time0 = time0;
    } else if (
      receiptDetail.stockStatus == 'DONE' &&
      receiptDetail.paymentStatus == 'DONE'
    ) {
      currentStep.step = 3;
      currentStep.time0 = time0;
      currentStep.time1 = time1;
      currentStep.time2 = time2;
      currentStep.time3 = time3;
    } else if (receiptDetail.stockStatus == 'DONE') {
      currentStep.step = 2;
      currentStep.time0 = time0;
      currentStep.time1 = time1;
      currentStep.time2 = time2;
    } else {
      currentStep.step = 1;
      currentStep.time0 = time0;
      currentStep.time1 = time1;
    }
    setCurrentStep(currentStep);
  };

  const updateProducts = () => {
    const initialProducts = receiptDetail.productReceipts.map((item) => {
      let p = item.product;
      p.costPrice = item.costPrice.formatMoney();
      p.quantityPerProduct = item.quantityPerProduct.formatMoney();
      p.totalMoney = (item.costPrice * item.quantityPerProduct).formatMoney();
      return p;
    });
    setProducts(initialProducts, []);
  };

  useEffect(() => {
    if (isExist(receiptDetail)) {
      updateCurrentStep();
      setPayments(receiptDetail.payments);
      setSupplier(receiptDetail.supplier);
      form.setFieldsValue({
        RCode: receiptDetail.RCode,
        note: receiptDetail.note,
        tags: receiptDetail.tags,
      });
      updateProducts();
      setStockStatus(receiptDetail.stockStatus);
      setInitialStockStatus(receiptDetail.stockStatus);
      setPaymentStatus(receiptDetail.paymentStatus);
      let paid = 0,
        remain = 0;
      receiptDetail.payments.forEach((item) => {
        paid += item.paidMoney;
      });
      remain = receiptDetail.totalMoney - paid;
      setInfoPaid({ paid, remain });
    }
  }, [receiptDetail]);

  const cardStyle = {
    marginBottom: '20px',
  };

  const onChangePaidMoney = (e) => {
    let formatP = document.getElementById('paidMoney').value;
    let paidMoneyBefores = document.getElementsByClassName('paid-money-before');
    let paidMoney =
      parseInt(formatP.replace(/\,/gm, '').replace(/[^0-9,]/gm, '')) || 0;
    let paidBeforeAndNow = paidMoney;
    for (const item of paidMoneyBefores) {
      paidBeforeAndNow += item.textContent.moneyToInt();
    }
    const maxMoney =
      parseInt(
        document
          .getElementById('total-money')
          .textContent.replace(/\,/gm, '')
          .replace(/[^0-9,]/gm, ''),
      ) || 0;
    if (paidBeforeAndNow >= maxMoney) {
      document.getElementById('paidMoney').value = (
        maxMoney -
        (paidBeforeAndNow - paidMoney)
      ).formatMoney();
    } else document.getElementById('paidMoney').value = paidMoney.formatMoney();
  };

  const onChangePrice = (e) => {
    let formatP = e.target.value;
    const paidMoney = formatP.replace(/\,/gm, '').replace(/[^0-9,]/gm, '');
    e.target.value = formatCurrency(paidMoney);
    return;
  };

  const onFinish = async (values) => {
    console.log('Success:', values);
    if (!isExist(supplier)) {
      notifFailureMes('Bạn cần thêm nhà cung cấp để tạo đơn');
      return;
    }
    if (!isExist(products)) {
      notifFailureMes('Bạn cần thêm ít nhất 1 sản phẩm để tạo đơn');
      return;
    }

    const totalMoney =
      parseInt(
        document
          .getElementById('total-money')
          .textContent.replace(/\,/gm, '')
          .replace(/[^0-9,]/gm, ''),
      ) || 0;
    if (totalMoney < infoPaid.paid) {
      notifFailureMes('Tổng tiền không được nhỏ hơn số tiền đã thanh toán');
      return;
    }
    let payments = [];
    let _paymentStatus = paymentStatus;
    let paidMoneyBefores = document.getElementsByClassName('paid-money-before');
    let paidBefore = 0;
    for (const item of paidMoneyBefores) {
      paidBefore += item.textContent.moneyToInt();
    }
    if (values.paidMoney && values.paymentMethod) {
      const p = document.getElementById('paidMoney').value.moneyToInt();

      payments.push({
        createdBy: user.email,
        modifiedBy: user.email,
        paymentMethod: values.paymentMethod,
        paidMoney: p,
        status: 'DONE',
      });

      _paymentStatus = p + paidBefore < totalMoney ? 'PARTIAL' : 'DONE';
    }

    let _products = [];
    products.forEach((item) => {
      let isChangedCostPrice = false;
      const quantityPerProduct =
        parseInt(document.getElementById(`i-quantity-${item.PCode}`).value) ||
        0;
      const pricePerProduct =
        parseInt(
          document
            .getElementById(`i-costPrice-${item.PCode}`)
            .value.replace(/\,/gm, '')
            .replace(/[^0-9,]/gm, ''),
        ) || 0;
      if (item.traceCostPrices && item.traceCostPrices.length > 0) {
        const priceFirst = item.price;
        const priceLatest =
          item.traceCostPrices[item.traceCostPrices.length - 1].value;
        if (pricePerProduct != priceFirst && pricePerProduct != priceLatest) {
          isChangedCostPrice = true;
        }
      }
      _products.push({
        isChangedCostPrice,
        productId: item._id,
        quantityPerProduct: quantityPerProduct,
        costPrice: pricePerProduct,
      });
    });

    let receipt = {
      createdBy: user.email,
      modifiedBy: user.email,
      note: values.note || '',
      tags: values.tags || [],
      stockStatus: stockStatus,
      totalMoney: totalMoney,
      supplier: supplier._id,
      paymentList: payments,
      paymentStatus: _paymentStatus,
      products: _products,
    };

    if (values.RCode) {
      receipt.RCode = values.RCode;
    }
    dispatch(updateReceiptByRCode(RCode, receipt));
    console.log(receipt);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onChangeQuantityPerProduct = (e, PCode) => {
    const quantityPerProduct = parseInt(e.target.value) || 0;
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
          <input
            onChange={(e) => onChangeQuantityPerProduct(e, record.PCode)}
            //size="small"
            className="ant-input ant-input-sm"
            style={{ width: '70px' }}
            type="number"
            min={1}
            disabled={initialStockStatus == 'DONE'}
            defaultValue={record.quantityPerProduct || 1}
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
            : record.price.formatMoney();
          if (!price) {
            price = 0;
          }
        }
        return (
          <input
            className="ant-input ant-input-sm"
            onChange={(e) => onChangeCostPrice(e, record.PCode)}
            id={`i-costPrice-${record.PCode}`}
            onKeyUp={(e) => onChangePrice(e)}
            style={{ width: '100px' }}
            defaultValue={record.costPrice || price}
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
            : record.price.formatMoney();
          if (!price) {
            price = 0;
          }
        }
        return (
          <span id={`s-totalMoneyPerProduct-${record.PCode}`}>
            {record.totalMoney || price}
          </span>
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

  const onChangeCostPriceAndTotalMoney = (e) => {
    products.forEach((item) => {
      const costPricePerProduct = e.target.checked
        ? item.traceCostPrices[item.traceCostPrices.length - 1].value
        : item.price;
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
    changeTotalQuantityMoney();
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
    if (isAddPayment) {
      onChangePaidMoney();
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h4>Đơn nhập kho mã {RCode}</h4>
        <Steps
          progressDot
          style={{ width: '500px' }}
          size="small"
          current={currentStep.step}
        >
          <Step title="Đặt hàng" description={currentStep.time0} />
          <Step title="Đang giao dịch" description={currentStep.time1} />
          <Step title="Nhập kho" description={currentStep.time2} />
          <Step title="Hoàn thành" description={currentStep.time3} />
        </Steps>
      </div>
      ,
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        form={form}
      >
        <Row gutter={[24, 24]}>
          <Col span={16}>
            <Card
              style={cardStyle}
              size="small"
              title="Thông tin sản phẩm"
              extra={
                <Checkbox
                  defaultChecked={true}
                  onChange={(e) => onChangeCostPriceAndTotalMoney(e)}
                >
                  Sử dụng giá nhập gần nhất
                </Checkbox>
              }
            >
              {initialStockStatus == 'DONE' ? (
                ''
              ) : (
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
                  </Col>
                </Row>
              )}

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
                <Checkbox
                  disabled={paymentStatus == 'DONE'}
                  onChange={(e) => onAddPayment(e)}
                >
                  Thanh toán với nhà cung cấp
                </Checkbox>
              }
            >
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  Đã thanh toán:&nbsp;{infoPaid.paid.formatMoney()}đ
                </Col>
                <Col span={12}>
                  Còn phải trả:&nbsp;{infoPaid.remain.formatMoney()}đ
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Timeline>
                    {payments.map((payment) => {
                      return (
                        <Timeline.Item>
                          <Collapse ghost>
                            <Panel
                              header={
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                  }}
                                >
                                  <span>
                                    Xác nhận thanh toán&nbsp;
                                    <span className="paid-money-before">
                                      {payment.paidMoney.formatMoney() || 0}
                                    </span>{' '}
                                    đ thành công <CaretRightFilled />
                                  </span>
                                  <span>
                                    {moment(payment.createdAt).format(
                                      'DD/MM/YYYY hh:mm',
                                    )}
                                  </span>
                                </div>
                              }
                              key="1"
                            >
                              <Descriptions layout="vertical">
                                <Descriptions.Item label="Số tiền thanh toán">
                                  {payment.paidMoney.formatMoney()}
                                </Descriptions.Item>
                                <Descriptions.Item label="Phương thức thanh toán">
                                  {payment.paymentMethod == 'COD' && 'COD'}
                                  {payment.paymentMethod == 'BANK' &&
                                    'Chuyển khoản'}
                                  {payment.paymentMethod == 'CASH' &&
                                    'Tiền mặt'}
                                </Descriptions.Item>
                              </Descriptions>
                            </Panel>
                          </Collapse>
                        </Timeline.Item>
                      );
                    })}
                  </Timeline>
                </Col>
              </Row>
              {isAddPayment ? (
                <Row gutter={[16, 0]}>
                  <Col span={12}>
                    <Form.Item
                      label="Hình thức thanh toán"
                      name="paymentMethod"
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
                <Checkbox
                  onChange={(e) => {
                    setStockStatus(e.target.checked ? 'DONE' : 'NOT_YET');
                  }}
                  defaultChecked={stockStatus == 'DONE'}
                  disabled={initialStockStatus == 'DONE'}
                >
                  Nhập hàng vào kho
                </Checkbox>
              }
            >
              <Row gutter={[16, 0]}>
                <Col span={12}>
                  {receiptDetail.stockStatus == 'DONE' ? (
                    <span style={{ color: '#20a917' }}>Đã nhập hàng</span>
                  ) : (
                    <span style={{ color: '#0a77bb' }}>Chờ nhập hàng</span>
                  )}
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={cardStyle} size="small" title="Thông tin nhà cung cấp">
              {paymentStatus != 'NOT_YET' ? (
                ''
              ) : (
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
              )}

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
                      <p>
                        Đã trả:{' '}
                        {supplier.paid ? supplier.paid.formatMoney() : 0}{' '}
                      </p>
                      <p>
                        Còn nợ:{' '}
                        {supplier.debt ? supplier.debt.formatMoney() : 0}{' '}
                      </p>
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
                    <InputNumber disabled style={{ width: '100%' }} min={0} />
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

export default EditReceipt;
