import { Layout, Form, Input, Button, Row, Col, Divider, Select, Card } from 'antd';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DeleteOutlined } from '@ant-design/icons';
import './App.css';


const { Content } = Layout;
const { TextArea } = Input;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const itemTypes = [
  { id: 1, name: 'button', displayName: 'Custom Button' },
  { id: 2, name: 'link', displayName: 'Custom Link' }
]
const areas = [
  'lead.detail', 'lead.list', 'contact.detail', 'contact.list', 'account.detail', 'account.list', 'opportunity.detail', 'opportunity.list'
]
const App = () => {
  const [configuration, setConfiguration] = useState([]);
  const [items, setItems] = useState([]);
  const [itemType, setItemType] = useState(null);

  const onFinish = async (values) => {
    var obj = values;
    obj['configuration'] = configuration.map(item => {
      delete item.id
      return item;
    })
    obj['items'] = items.map(item => {
      delete item.id
      delete item.type
      return item;
    })

    const fileName = "manifest";
    const json = JSON.stringify(obj);
    const blob = new Blob([json], { type: 'application/json' });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const addConfig = () => {
    var configs = [...configuration];
    configs.push({
      id: uuidv4(),
      name: '',
      displayName: '',
      defaultValue: ''
    })
    setConfiguration(configs);
  }

  const setConfigItem = (id, name, e) => {
    var configs = [...configuration];
    var item = configs.find(x => x.id === id);
    item[name] = e.target.value;
    setConfiguration(configs);
  }

  const removeConfigItem = (id) => {
    var configs = [...configuration];
    var item = configs.find(x => x.id === id);
    configs.splice(configs.indexOf(item), 1);
    setConfiguration(configs);
  }

  const addItem = () => {
    var _items = [...items];
    var type = itemTypes.find(x => x.id === itemType);
    if (type.id === 1) {
      _items.push({
        id: uuidv4(),
        typeName: type.name,
        type: type,
        areas: [],
        name: '',
        displayName: '',
        url:null
      })
    }
    else if (type.id === 2) {
      _items.push({
        id: uuidv4(),
        typeName: type.name,
        type: type,
        areas: [],
        name: '',
        displayName: '',
        url:null
      })
    }
    setItems(_items);
  }

  const removeItem = (id) => {
    var _items = [...items];
    var item = _items.find(x => x.id === id);
    _items.splice(_items.indexOf(item), 1);
    setItems(_items);
  }

  const setItemValue = (id, field, val) => {
    var configs = [...items];
    var item = configs.find(x => x.id === id);
    if (field.indexOf('.') !== -1) {
      var arr = field.split('.');
      item[arr[0]][arr[1]] = val;
    } else {
      item[field] = val;
    }
    setItems(configs);
  }

  const renderButton = (item) => {

    return (
      <div>
        <Form.Item
          label="Name"
        >
          <Input placeholder='Name' onChange={(e) => setItemValue(item.id, 'name', e.target.value)}></Input>
        </Form.Item>
        <Form.Item
          label="DisplayName"
        >
          <Input placeholder='Display Name' onChange={(e) => setItemValue(item.id, 'displayName', e.target.value)}></Input>
        </Form.Item>
        <Form.Item
          label="Areas"
        >
          <Select mode="multiple" allowClear onChange={(val) => setItemValue(item.id, 'areas', val)}>
            {areas.map(item => (<Select.Option value={item}>{item}</Select.Option>))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Url"
        >
          <Input placeholder='Url' onChange={(e) => setItemValue(item.id, 'url', e.target.value)}></Input>
        </Form.Item>
      </div>
    )
  }

  const renderLink = (item) => {

    return (
      <div>
        <Form.Item
          label="Name"
        >
          <Input placeholder='Name' onChange={(e) => setItemValue(item.id, 'name', e.target.value)}></Input>
        </Form.Item>
        <Form.Item
          label="DisplayName"
        >
          <Input placeholder='Display Name' onChange={(e) => setItemValue(item.id, 'displayName', e.target.value)}></Input>
        </Form.Item>
        <Form.Item
          label="Areas"
        >
          <Select mode="multiple" allowClear onChange={(val) => setItemValue(item.id, 'areas', val)}>
            {areas.map(item => (<Select.Option value={item}>{item}</Select.Option>))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Url"
        >
          <Input placeholder='Url' onChange={(e) => setItemValue(item.id, 'url', e.target.value)}></Input>
        </Form.Item>
      </div>
    )
  }

  const renderItem = (item) => {
    if (item.type.id === 1) {
      return renderButton(item);
    } else if (item.type.id === 2) {
      return renderLink(item);
    }
  }

  return (
    <Layout>
      <Content>
        <Form
          {...layout}
          name="extension"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row>
            <Col span={12}>
              <Form.Item
                label="Extension Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please Insert Extension Name',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Display Name"
                name="displayName"
                rules={[
                  {
                    required: true,
                    message: 'Please Insert Extension Display Name',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Version"
                name="version"
                rules={[
                  {
                    required: true,
                    message: 'Please Insert Version',
                  },
                ]}
              >
                <Input type='number' />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
              >
                <TextArea />
              </Form.Item>
            </Col>
          </Row>
          <Divider>Configuration</Divider>
          <Row>
            <Col span={12} offset={4}>
              {configuration.map(item => (
                <Row>
                  <Col>
                    <Input placeholder='name' onChange={(e) => setConfigItem(item.id, 'name', e)}></Input>
                  </Col>
                  <Col>
                    <Input placeholder='displayName' onChange={(e) => setConfigItem(item.id, 'displayName', e)}></Input>
                  </Col>
                  <Col>
                    <Input placeholder='defaultValue' onChange={(e) => setConfigItem(item.id, 'defaultValue', e)}></Input>
                  </Col>
                  <Col>
                    <Button onClick={() => removeConfigItem(item.id)}><DeleteOutlined /></Button>
                  </Col>
                </Row>
              ))}
              <Button onClick={addConfig} type="primary" htmlType='button'>
                Add Configuration Field
          </Button>
            </Col>
          </Row>
          <Divider>Items</Divider>
          <Row>
            <Col span={12} offset={4}>
              {items.map(item => (
                <Card title={item.type.displayName}>
                  {renderItem(item)}
                  <Button onClick={() => removeItem(item.id)}><DeleteOutlined /></Button>
                </Card>
              ))}
              <Row>
                <Col>
                  <Select onChange={val => setItemType(val)} style={{ width: 200 }}>
                    {itemTypes.map(item => (
                      <Select.Option value={item.id}>
                        {item.displayName}
                      </Select.Option>
                    ))}
                  </Select>
                </Col>
                <Col>
                  <Button onClick={addItem} type="primary" htmlType='button'>
                    Add Item
                  </Button>
                </Col>
              </Row>

            </Col>
          </Row>
          <Divider></Divider>
          <Row>
            <Col span={12} offset={4}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Download File
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>

      </Content>
    </Layout>

  );
};

export default App;
