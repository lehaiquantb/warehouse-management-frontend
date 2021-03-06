import React, { useEffect, useState } from 'react';
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
} from 'antd';
import {
  MinusCircleOutlined,
  PlusOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import { addCategory, getListCategory, createProduct } from './action';
import { formatCurrency } from '../../helpers/format';
import { IMG_DEFAULT_BASE64 } from '../../helpers/constant';
//import { Input, Label, FormFeedback } from 'reactstrap';
const { Option } = Select;
const CreateProduct = (props) => {
  const user = useSelector((state) => state.user);
  const { listCategory } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [isValidated, setIsValidated] = useState({
    name: { value: false, mes: 'Tên không được để trống' },
    PCode: { value: false, mes: '' },
    vendor: { value: false, mes: '' },
    price: { value: false, mes: '' },
    quantity: { value: false, mes: '' },
    status: { value: false, mes: '' },
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isShowDescriptionInput, setIsShowDescriptionInput] = useState(false);
  const [previewTitleImage, setPreviewTitleImage] = useState('Ảnh');
  const [newCategoryName, setNewCategoryName] = useState('Danh mục chung');
  const [priceValue, setPriceValue] = useState(0);
  const [listImage, setListImage] = useState([
    // {
    //   uid: '1',
    //   url: IMG_DEFAULT_BASE64,
    //   status: 'done'
    // },
  ]);

  const defaultFileList = [
    {
      uid: '1',
      name: 'default image',
      url: IMG_DEFAULT_BASE64,
      type: 'image/png',
      isImageUrl: true,
      status: 'done',
    },
  ];

  const [previewVisibleImage, setPreviewVisibleImage] = useState(false);
  const [previewImage, setPreviewImage] = useState(IMG_DEFAULT_BASE64);
  useEffect(() => {
    dispatch(getListCategory());
  }, []);

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const onChangeInput = () => {};
  const onChangeInputMoney = (e) => {
    // if (!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9','Backspace'].includes(e.key)) {
    //   document.getElementById('price').value = '';
    //   return;
    // }
    let formatP = document.getElementById('price').value;
    const price = formatP.replace(/\,/gm, '').replace(/[^0-9,]/gm, '');
    document.getElementById('price').value = formatCurrency(price);
    return;
    // setPriceValue(parseInt(price));
    // console.log(priceValue);
  };
  const cardStyle = {
    marginBottom: '20px',
  };

  const onFinish = async (values) => {
    const product = {
      name: values.name,
      createdBy: user.email,
      modifiedBy: user.email,
      options: values.options || [],
      description: values.description || '',
      vendor: values.vendor || '',
      price:
        parseInt(values.price.replace(/\,/gm, '').replace(/[^0-9,]/gm, '')) ||
        0,
      traceCostPrices: [
        {
          value:
            parseInt(
              values.price.replace(/\,/gm, '').replace(/[^0-9,]/gm, ''),
            ) || 0,
        },
      ],
      quantity: values.quantity,
      category: values.category,
      status: values.status.length == 0 ? 'inactive' : 'active',
    };

    if (values.PCode) {
      product.PCode = values.PCode;
    }

    if (values.listImage) {
      product.image = await getBase64(
        values.listImage.fileList[0].originFileObj,
      );
      product.listImage = [];
      for (let index = 1; index < values.listImage.fileList.length; index++) {
        const img = await getBase64(
          values.listImage.fileList[index].originFileObj,
        );
        product.listImage.push(img);
      }
    }
    dispatch(createProduct(product));
    console.log('Success:', values);
    console.log(product);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onOpenModalAddCategory = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    dispatch(
      addCategory({
        name: newCategoryName,
        createdBy: user.email,
        modifiedBy: user.email,
      }),
    );
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCancelModalImage = () => {
    setPreviewVisibleImage(false);
  };

  const handlePreviewImage = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview || IMG_DEFAULT_BASE64);
    setPreviewTitleImage(file.name || 'Ảnh');
    setPreviewVisibleImage(true);
  };

  const handleChangeImage = ({ fileList }) => {
    console.log(fileList);
    setListImage(fileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Thêm ảnh</div>
    </div>
  );
  return (
    <div>
      <h4>Thêm mới sản phẩm</h4>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Row gutter={[24, 24]}>
          <Col span={16}>
            <Card style={cardStyle} size="small" title="Thông tin chung">
              <Row gutter={[16, 0]}>
                <Col span={24}>
                  <Form.Item
                    label="Tên sản phẩm"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: 'Tên sản phẩm là bắt buộc',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 0]}>
                <Col span={12}>
                  <Form.Item label="Mã sản phẩm" name="PCode">
                    <InputNumber style={{ width: '100%' }} min={0} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Nhà sản xuất" name="vendor">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 0]}>
                <span
                  style={{ color: '#017fff', cursor: 'pointer' }}
                  onClick={() => {
                    setIsShowDescriptionInput(!isShowDescriptionInput);
                  }}
                >
                  Thêm mô tả
                </span>
                {isShowDescriptionInput ? (
                  <Col span={24}>
                    <Form.Item label="Mô tả" name="description">
                      <Input.TextArea />
                    </Form.Item>
                  </Col>
                ) : (
                  ''
                )}
              </Row>
            </Card>
            <Card size="small" title="Chi tiết sản phẩm">
              <Row gutter={[16, 0]}>
                <Col span={12}>
                  <Form.Item label="Số lượng" name="quantity" initialValue={0}>
                    <InputNumber style={{ width: '100%' }} min={0} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Giá nhập"
                    name="price"
                    rules={[
                      {
                        required: true,
                        message: 'Giá nhập là bắt buộc',
                      },
                    ]}
                  >
                    <input
                      className="ant-input"
                      onKeyUp={(e) => onChangeInputMoney(e)}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.List name="options">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map((field) => (
                          <Space key={field.key} align="baseline">
                            <Form.Item noStyle shouldUpdate>
                              {() => (
                                <Form.Item
                                  {...field}
                                  label="Tên thuộc tính"
                                  name={[field.name, 'name']}
                                  fieldKey={[field.fieldKey, 'name']}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Tên thuộc tính là bắt buộc',
                                    },
                                  ]}
                                >
                                  <Input />
                                </Form.Item>
                              )}
                            </Form.Item>
                            <Form.Item
                              {...field}
                              label="Giá trị"
                              name={[field.name, 'value']}
                              fieldKey={[field.fieldKey, 'value']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Giá trị là bắt buộc',
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>

                            <MinusCircleOutlined
                              onClick={() => remove(field.name)}
                            />
                          </Space>
                        ))}

                        <Form.Item>
                          <Button onClick={() => add()} icon={<PlusOutlined />}>
                            Thêm thuộc tính cho sản phẩm
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Col>
              </Row>
              <Row>
                <Form.Item label="" name="status" initialValue={['active']}>
                  <Checkbox.Group>
                    <Checkbox value="active">Cho phép bán</Checkbox>
                  </Checkbox.Group>
                </Form.Item>
              </Row>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              style={cardStyle}
              size="small"
              title="Danh mục"
              extra={
                <span
                  onClick={onOpenModalAddCategory}
                  style={{ color: '#017fff', cursor: 'pointer' }}
                >
                  Thêm danh mục
                </span>
              }
            >
              <Form.Item
                label=""
                name="category"
                initialValue="5ff9a3241de3d51944818d07"
              >
                <Select style={{ width: '100%' }}>
                  {listCategory.map((item, index) => {
                    return <Option value={item._id}>{item.name}</Option>;
                  })}
                </Select>
              </Form.Item>
            </Card>
            <Card size="small" title="Ảnh sản phẩm">
              <Row>
                <Col span={24}>
                  <Form.Item label="" name="listImage">
                    <Upload
                      beforeUpload={() => false}
                      listType="picture-card"
                      fileList={listImage}
                      onPreview={handlePreviewImage}
                      onChange={handleChangeImage}
                    >
                      {listImage.length >= 4 ? null : uploadButton}
                    </Upload>
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
      <Modal
        title="Thêm danh mục mới"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <label>Tên danh mục</label>
        <Input
          onChange={() => {
            setNewCategoryName(event.target.value);
          }}
        />
      </Modal>
      <Modal
        visible={previewVisibleImage}
        title={previewTitleImage}
        footer={null}
        onCancel={handleCancelModalImage}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default CreateProduct;
