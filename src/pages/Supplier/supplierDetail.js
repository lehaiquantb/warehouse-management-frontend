import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
  createSupplier,
  getSupplierBySCode,
  updateSupplierBySCode,
} from './action';
//import { Input, Label, FormFeedback } from 'reactstrap';
const SupplierDetail = (props) => {
  const [form] = Form.useForm();
  const user = useSelector((state) => state.user);
  const { supplierDetail } = useSelector((state) => state.suppliers);
  const { SCode } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {}, []);

  useEffect(() => {
    form.setFieldsValue({
      SCode: SCode,
      name: supplierDetail.name,
      createdBy: user.email,
      modifiedBy: user.email,
      description: supplierDetail.description || '',
      address: supplierDetail.address || '',
      taxCode: supplierDetail.taxCode || '',
      website: supplierDetail.website || '',
      address2: supplierDetail.address2 || '',
      email: supplierDetail.email || '',
      phone: supplierDetail.phone || '',
      //status: supplierDetail.status.length == 0 ? 'inactive' : 'active',
      status: supplierDetail.status || 'active',
    });
  }, [supplierDetail]);

  useEffect(() => {
    dispatch(getSupplierBySCode(SCode));
  }, []);
  const cardStyle = {
    marginBottom: '20px',
  };

  const onFinish = async (values) => {
    const supplier = {
      name: values.name,
      modifiedBy: user.email,
      description: values.description || '',
      address: values.address || '',
      taxCode: values.taxCode || '',
      website: values.website || '',
      address2: values.address2 || '',
      email: values.email || '',
      phone: values.phone || '',
      status: values.status,
    };

    if (values.SCode) {
      supplier.SCode = values.SCode;
    }
    dispatch(updateSupplierBySCode(SCode, supplier));
    console.log('Success:', values);
    console.log(supplier);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <h4>Thêm mới nhà cung cấp</h4>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        form={form}
      >
        <Row gutter={[24, 24]}>
          <Col span={16}>
            <Card style={cardStyle} size="small" title="Thông tin chung">
              <Row gutter={[16, 0]}>
                <Col span={24}>
                  <Form.Item
                    label="Tên nhà cung cấp"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: 'Tên nhà cung cấp là bắt buộc',
                      },
                    ]}
                  >
                    <Input disabled />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 0]}>
                <Col span={12}>
                  <Form.Item label="Mã nhà cung cấp" name="SCode">
                    <InputNumber disabled style={{ width: '100%' }} min={0} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[
                      {
                        pattern: new RegExp(/\d+/g),
                        message: 'Sai định dạng',
                      },
                    ]}
                  >
                    <Input disabled style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 0]}>
                <Col span={24}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Email nhà cung cấp là bắt buộc',
                      },
                      {
                        type: 'email',
                        message: 'Sai định dạng',
                      },
                    ]}
                  >
                    <Input disabled />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <Card size="small" title="Thông tin địa chỉ">
              <Row gutter={[16, 0]}>
                <Col span={12}>
                  <Form.Item
                    label="Địa chỉ"
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: 'Địa chỉ là bắt buộc',
                      },
                    ]}
                  >
                    <Input disabled style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Địa chỉ 2" name="address2">
                    <Input disabled style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>

              {/* <Row>
                <Form.Item label="" name="status" initialValue={['active']}>
                  <Checkbox.Group>
                    <Checkbox value="active">Cho phép bán</Checkbox>
                  </Checkbox.Group>
                </Form.Item>
              </Row> */}
            </Card>
          </Col>
          <Col span={8}>
            <Card style={cardStyle} size="small" title="Thông tin bổ sung">
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="Mã số thuế" name="taxCode">
                    <Input disabled />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    label="Website"
                    name="website"
                    rules={[
                      {
                        type: 'url',
                        message: 'Sai định dạng',
                      },
                    ]}
                  >
                    <Input disabled />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    label="Trạng thái"
                    name="status"
                    initialValue={['active']}
                  >
                    <Select disabled style={{ width: '100%' }}>
                      <Select.Option value="active">
                        Đang giao dịch
                      </Select.Option>
                      <Select.Option value="inactive">
                        Ngừng giao dịch
                      </Select.Option>
                      ;
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <Card size="small" title="Thông tin khác">
              <Row>
                <Col span={24}>
                  <Form.Item label="Mô tả" name="description">
                    <Input.TextArea disabled />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row gutter={[24, 24]}>
          <Button type="primary" htmlType="submit">
            <Link to={`/suppliers/${SCode}/edit`}>Chỉnh Sửa</Link>
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default SupplierDetail;
