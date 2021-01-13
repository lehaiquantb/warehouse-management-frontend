import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Input, Table, Modal, Button, Dropdown, Checkbox, Select } from 'antd';
import { SettingOutlined, DownOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const OrderSettingTable = (props) => {
  const dispatch = useDispatch();
  const fullColumns = props.fullColumns;
  const defaultColumns = props.defaultColumns;
  const selectValuesDefault = props.defaultColumns.map(
    (item) => item.dataIndex,
  );
  useEffect(() => {}, []);

  const getItems = (count) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
      id: `item-${k}`,
      content: `item ${k}`,
    }));

  const [items, setItems] = useState(defaultColumns);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? '#fff' : '#fff',
    display: 'flex',
    width: '100%',
    padding: 2,
    overflow: 'auto',
    justifyContent: 'space-between',
  });

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index,
    );

    setItems(newItems);
    props.cbOrderSettingColumns(newItems);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    props.cbOrderSettingColumns(items);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChangeSelectColumn = (values) => {
    let newColumns = [];
    values.forEach((element) => {
      newColumns.push(fullColumns.find((col) => col.dataIndex == element));
    });
    setItems(newColumns);
  };

  return (
    <>
      <SettingOutlined onClick={showModal} />
      <Modal
        title="Cài đặt bảng dữ liệu"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                {items.map((item, index) => (
                  <Draggable
                    key={item.dataIndex}
                    draggableId={item.dataIndex}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        style={{ border: '1px solid black' }}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        // style={getItemStyle(
                        //   snapshot.isDragging,
                        //   provided.draggableProps.style
                        // )}
                      >
                        {item.title}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Thêm cột cho bảng"
          onChange={handleChangeSelectColumn}
          defaultValue={selectValuesDefault}
        >
          {fullColumns.map((item, index) => {
            return (
              <Select.Option key={item.key} value={item.dataIndex}>
                {item.title}
              </Select.Option>
            );
          })}
        </Select>
      </Modal>
    </>
  );
};

export default OrderSettingTable;
