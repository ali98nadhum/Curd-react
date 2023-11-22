import "./ItemCard.css";
import { Button, Modal, Form, Input, message } from "antd";
import { useStore } from "../../store"
import { useState } from "react";

const EditItemForm = ({ visible, onCancel, onOk, initialValue }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  

  // model for updat item
  const handleOk = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      onOk(values);
      form.resetFields();
      onCancel();
    } catch (error) {
      console.error( error);
      message.error("فشل تحديث العنصر ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Item"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      confirmLoading={loading}
    >
      <Form form={form} initialValues={initialValue}>
        <Form.Item name="title" label="Name">
          <Input />
        </Form.Item>
        <Form.Item name="price" label="Price">
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};




const ItemCard = () => {

  const {loadData , setloadData} = useStore()
  const [editItem, setEditItem] = useState(null);

  // for updat item
  const handleEdit = (item) => {
    setEditItem(item);
  };

  const handleEditSubmit = (values) => {
    const updatedData = loadData.map((item) =>
      item.id === editItem.id ? { ...item, ...values } : item
    );
    setloadData(updatedData);
    setEditItem(null);
    message.success({
      content: "تم تحديث المنتج بنجاح",
      duration: 2,
      style : {
        fontSize: "18px",
      }
    })
  };

  const handleCancelEdit = () => {
    setEditItem(null);
  };


// for delete item
  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedData = loadData.filter((item) => item.id !== itemId);
        setloadData(updatedData);
        message.success({
          content: "تم حذف المنتج بنجاح",
          duration: 2,
          style : {
            fontSize: "18px",
          }
        })
      } else {
        message.error("فشل حذف المنتج");
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  


  return (
    <div>
      <div className="card-item">
        {
          loadData.map((item) => (
            
          
        <div className="card" key={item.id}>
          <img src={item.thumbnail} alt="" />
          <div className="info">
            <p> {item.title} </p>
            <p>{item.price} $</p>
          </div>
          <div className="btn-method">
            <Button type="primary" onClick={() => handleEdit(item)}>Edit</Button>
            <Button
              type="primary"
              style={{ backgroundColor: "red", borderColor: "red" }}
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </Button>
          </div>
        </div>
        ))}
      </div>
      <EditItemForm
        visible={!!editItem}
        onCancel={handleCancelEdit}
        onOk={handleEditSubmit}
        initialValue={editItem}
      />
    </div>
  );
};

export default ItemCard;
