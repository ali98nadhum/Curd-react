import  { useState } from 'react';
import "./Header.css";
import Container from '../Container/Container';
import { Button, Modal, Form, Input, InputNumber, notification } from "antd";

const Header = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    notification.success({
      message: 'تمت الإضافة بنجاح',
      description: 'تمت إضافة العنصر بنجاح إلى قائمتك.',
    });

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    console.log('Received values:', values);
    handleOk();
  };

  return (
    <div>
      <header>
        <Container>
          <div className="content">
            <h2>
              <span>A</span>dmin-<span>D</span>ashboard
            </h2>
            <Button
              type="primary"
              style={{ backgroundColor: "rgb(236, 156, 7)" }}
              onClick={showModal}
            >
              Add item
            </Button>
            <Modal
              title="Add New Item"
              open={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                <Form.Item
                  label="اسم المنتج"
                  name="itemName"
                  rules={[{ required: true, message: 'Please input the item name!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="سعر المنتج"
                  name="itemPrice"
                  rules={[{ required: true, message: 'Please input the item price!' }]}
                >
                  <InputNumber />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                   اضافه المنتج
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </Container>
      </header>
    </div>
  );
};

export default Header;
