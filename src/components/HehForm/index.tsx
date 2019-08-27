import React, {Component} from 'react';
import {
  Input,
  Form,
  Row,
  Col,
  Select,
  DatePicker,
  InputNumber,
  Checkbox,
  Radio,
  Cascader,
  Switch,
  Icon,
  Tooltip,
  Upload,
  Button, Modal
} from 'antd';
import {SelectProps, OptionProps} from 'antd/lib/select';
import {InputProps, TextAreaProps} from 'antd/lib/input';
import {UploadProps} from 'antd/lib/upload';
import {PickerProps} from 'antd/lib/date-picker/interface';
import {FormComponentProps, GetFieldDecoratorOptions} from 'antd/lib/form/Form';
import {FormItemProps} from 'antd/lib/form/FormItem';
import {InputNumberProps} from 'antd/lib/input-number';
import {CheckboxProps, CheckboxGroupProps} from 'antd/lib/checkbox';
import {RadioProps, RadioGroupProps} from 'antd/lib/radio/interface';
import {CascaderProps} from 'antd/lib/cascader';
import {SwitchProps} from 'antd/lib/switch';
import './index.less';
import * as moment from 'moment';

export interface IItem {
  type: string,
  id: string,
  label: string | React.ReactNode,
  defaultValue?: any
}

interface IInput extends IItem {
  formItemOptions?: FormItemProps
  operation?: React.ReactNode
  tips?: string | React.ReactNode
  formDecoratorOptions?: GetFieldDecoratorOptions
  attribute?: InputProps
}

interface ISelect extends IItem {
  formItemOptions?: FormItemProps
  options?: Array<{
    value: any,
    label: string,
    disabled?: boolean
  }>
  tips?: string | React.ReactNode
  attribute?: SelectProps
  optionAttribute?: OptionProps
  formDecoratorOptions?: GetFieldDecoratorOptions
}

interface IDatePick extends IItem {
  formItemOptions?: FormItemProps
  tips?: string | React.ReactNode
  formDecoratorOptions?: GetFieldDecoratorOptions
  attribute?: PickerProps
}

interface IInputNumber extends IItem {
  formItemOptions?: FormItemProps
  tips?: string | React.ReactNode
  attribute?: InputNumberProps
  formDecoratorOptions?: GetFieldDecoratorOptions
}

interface ICheckBox extends IItem {
  options?: Array<{
    value: string
    label: string
  }>
  tips?: string | React.ReactNode
  formItemOptions?: FormItemProps
  formDecoratorOptions?: GetFieldDecoratorOptions
  groupAttribute?: CheckboxGroupProps
  attribute?: CheckboxProps
}

interface IRadio extends IItem {
  options?: Array<{
    value: string
    label: string
  }>
  tips?: string | React.ReactNode
  formItemOptions?: FormItemProps
  formDecoratorOptions?: GetFieldDecoratorOptions
  groupAttribute?: RadioGroupProps
  attribute?: RadioProps
}


interface ICascader extends IItem {
  options?: never[]
  tips?: string | React.ReactNode
  formItemOptions?: FormItemProps
  formDecoratorOptions?: GetFieldDecoratorOptions
  attribute?: CascaderProps
}

interface ISwitch extends IItem {
  formItemOptions?: FormItemProps
  tips?: string | React.ReactNode
  formDecoratorOptions?: GetFieldDecoratorOptions
  attribute?: SwitchProps
}

interface IProps extends FormComponentProps {
  form: any
  formItems: Array<IItem>
  rowCols?: number
}

interface ITextarea extends IItem {
  formItemOptions?: FormItemProps
  operation?: React.ReactNode
  tips?: string | React.ReactNode
  formDecoratorOptions?: GetFieldDecoratorOptions
  attribute?: TextAreaProps
}

interface IUpload extends IItem {
  formItemOptions?: FormItemProps
  operation?: React.ReactNode
  tips?: string | React.ReactNode
  formDecoratorOptions?: GetFieldDecoratorOptions
  attribute?: UploadProps
  url?: string
  uploadType?: 'img' | 'file' | 'drag'
}

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class HehForm extends Component<IProps, {}> {
  state = {
    previewVisible: false,
    previewImage: '',
  };

  formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 6},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 18}
    },
  };

  onPreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  renderImgUpload = (item: any) => {
    const {previewVisible, previewImage} = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus"/>
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action={item.url}
          listType="picture-card"
          onPreview={this.onPreview}
        >
          {uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={() => this.setState({previewVisible: false})}>
          <img alt="example" style={{width: '100%'}} src={previewImage}/>
        </Modal>
      </div>
    )
  };


  renderInput = (item: IInput) => {
    const {form, rowCols = 4} = this.props;
    let newLabel = item.label;
    if (item.tips) {
      newLabel = (
        <span>
          {item.label}&nbsp;
          <Tooltip title={item.tips}>
            <Icon style={{verticalAlign: 'middle', color: '#faad14'}} type="question-circle-o"/>
          </Tooltip>
        </span>
      );
    }
    return (
      <Col span={24 / rowCols} key={item.id}>
        <Form.Item colon={false} label={newLabel} {...this.formItemLayout} {...item.formItemOptions}>
          {
            form.getFieldDecorator(item.id, {
              initialValue: item.defaultValue,
              ...item.formDecoratorOptions,
            })(
              <Input style={{width: item.operation ? '75%' : '100%'}} {...item.attribute}/>,
            )
          }
          {
            item.operation ?
              <span style={{display: 'inline-block', width: '25%', textAlign: 'right'}}>{item.operation}</span>
              : null
          }
        </Form.Item>
      </Col>
    );
  };

  renderTextarea = (item: ITextarea) => {
    const {form, rowCols = 4} = this.props;
    let newLabel = item.label;
    if (item.tips) {
      newLabel = (
        <span>
          {item.label}&nbsp;
          <Tooltip title={item.tips}>
            <Icon style={{verticalAlign: 'middle', color: '#faad14'}} type="question-circle-o"/>
          </Tooltip>
        </span>
      );
    }
    return (
      <Col span={24 / rowCols} key={item.id}>
        <Form.Item colon={false} label={newLabel} {...this.formItemLayout} {...item.formItemOptions}>
          {
            form.getFieldDecorator(item.id, {
              initialValue: item.defaultValue,
              ...item.formDecoratorOptions,
            })(
              <Input.TextArea style={{width: item.operation ? '75%' : '100%'}} {...item.attribute}/>,
            )
          }
          {
            item.operation ?
              <span style={{display: 'inline-block', width: '25%', textAlign: 'right'}}>{item.operation}</span>
              : null
          }
        </Form.Item>
      </Col>
    );
  };

  renderSelect = (item: ISelect) => {
    const {form, rowCols = 4} = this.props;
    let newLabel = item.label;
    if (item.tips) {
      newLabel = (
        <span>
          {item.label}&nbsp;
          <Tooltip title={item.tips}>
            <Icon style={{verticalAlign: 'middle', color: '#faad14'}} type="question-circle-o"/>
          </Tooltip>
        </span>
      );
    }
    return (
      <Col span={24 / rowCols} key={item.id}>
        <Form.Item label={newLabel} {...this.formItemLayout} {...item.formItemOptions}>
          {
            form.getFieldDecorator(item.id, {
              initialValue: item.defaultValue,
              ...item.formDecoratorOptions,
            })(
              <Select className='w100' {...item.attribute}>
                {
                  item.options && item.options.map((child) => (
                    <Select.Option
                      {...item.optionAttribute}
                      disabled={child.disabled}
                      value={child.value}
                      key={child.value}
                    >
                      {child.label}
                    </Select.Option>
                  ))
                }
              </Select>,
            )
          }
        </Form.Item>
      </Col>
    );
  };

  renderDatePicker = (item: IDatePick) => {
    const {form, rowCols = 4} = this.props;
    let newLabel = item.label;
    if (item.tips) {
      newLabel = (
        <span>
          {item.label}&nbsp;
          <Tooltip title={item.tips}>
            <Icon style={{verticalAlign: 'middle', color: '#faad14'}} type="question-circle-o"/>
          </Tooltip>
        </span>
      );
    }
    return (
      <Col span={24 / rowCols} key={item.id}>
        <Form.Item label={newLabel} {...this.formItemLayout} {...item.formItemOptions}>
          {
            form.getFieldDecorator(item.id, {
              initialValue: item.defaultValue ? moment(item.defaultValue) : undefined,
              ...item.formDecoratorOptions,
            })(
              <DatePicker style={{width: '100%'}} {...item.attribute}/>,
            )
          }
        </Form.Item>
      </Col>
    );
  };

  renderRangePicker = (item: IDatePick) => {
    const {form, rowCols = 4} = this.props;
    let newLabel = item.label;
    if (item.tips) {
      newLabel = (
        <span>
          {item.label}&nbsp;
          <Tooltip title={item.tips}>
            <Icon style={{verticalAlign: 'middle', color: '#faad14'}} type="question-circle-o"/>
          </Tooltip>
        </span>
      );
    }
    return (
      <Col span={24 / rowCols} key={item.id}>
        <Form.Item label={newLabel} {...this.formItemLayout} {...item.formItemOptions}>
          {
            form.getFieldDecorator(item.id, {
              initialValue: item.defaultValue,
              ...item.formDecoratorOptions,
            })(
              <DatePicker.RangePicker style={{width: '100%'}} {...item.attribute}/>,
            )
          }
        </Form.Item>
      </Col>
    );
  };

  renderInputNumber = (item: IInputNumber) => {
    const {form, rowCols = 4} = this.props;
    let newLabel = item.label;
    if (item.tips) {
      newLabel = (
        <span>
          {item.label}&nbsp;
          <Tooltip title={item.tips}>
            <Icon style={{verticalAlign: 'middle', color: '#faad14'}} type="question-circle-o"/>
          </Tooltip>
        </span>
      );
    }
    return (
      <Col span={24 / rowCols} key={item.id}>
        <Form.Item colon={false} label={newLabel} {...this.formItemLayout} {...item.formItemOptions}>
          {
            form.getFieldDecorator(item.id, {
              initialValue: item.defaultValue,
              ...item.formDecoratorOptions,
            })(
              <InputNumber className='w100' {...item.attribute}/>,
            )
          }
        </Form.Item>
      </Col>
    );
  };

  renderCheckBox = (item: ICheckBox) => {
    const {form, rowCols = 4} = this.props;
    let newLabel = item.label;
    if (item.tips) {
      newLabel = (
        <span>
          {item.label}&nbsp;
          <Tooltip title={item.tips}>
            <Icon style={{verticalAlign: 'middle', color: '#faad14'}} type="question-circle-o"/>
          </Tooltip>
        </span>
      );
    }
    return (
      <Col span={24 / rowCols} key={item.id}>
        <Form.Item label={newLabel} {...this.formItemLayout} {...item.formItemOptions}>
          {
            form.getFieldDecorator(item.id, {
              initialValue: item.defaultValue,
              ...item.formDecoratorOptions,
            })(
              <Checkbox.Group
                {...item.groupAttribute}
              >
                {
                  item.options && item.options.map(child => (
                    <Checkbox key={child.label} value={child.value}>{child.label}</Checkbox>
                  ))
                }
              </Checkbox.Group>,
            )
          }
        </Form.Item>
      </Col>
    );
  };

  renderRadio = (item: IRadio) => {
    const {form, rowCols = 4} = this.props;
    let newLabel = item.label;
    if (item.tips) {
      newLabel = (
        <span>
          {item.label}&nbsp;
          <Tooltip title={item.tips}>
            <Icon style={{verticalAlign: 'middle', color: '#faad14'}} type="question-circle-o"/>
          </Tooltip>
        </span>
      );
    }
    return (
      <Col span={24 / rowCols} key={item.id}>
        <Form.Item colon={false} label={newLabel} {...this.formItemLayout} {...item.formItemOptions}>
          {
            form.getFieldDecorator(item.id, {
              initialValue: item.defaultValue,
              ...item.formDecoratorOptions,
            })(
              <Radio.Group
                {...item.groupAttribute}
              >
                {
                  item.options && item.options.map(child => (
                    <Radio key={child.label} value={child.value}>{child.label}</Radio>
                  ))
                }
              </Radio.Group>,
            )
          }
        </Form.Item>
      </Col>
    );
  };

  renderCascader = (item: ICascader) => {
    const {form, rowCols = 4} = this.props;
    let newLabel = item.label;
    if (item.tips) {
      newLabel = (
        <span>
          {item.label}&nbsp;
          <Tooltip title={item.tips}>
            <Icon style={{verticalAlign: 'middle', color: '#faad14'}} type="question-circle-o"/>
          </Tooltip>
        </span>
      );
    }
    return (
      <Col span={24 / rowCols} key={item.id}>
        <Form.Item colon={false} label={newLabel} {...this.formItemLayout} {...item.formItemOptions}>
          {
            form.getFieldDecorator(item.id, {
              initialValue: item.defaultValue,
              ...item.formDecoratorOptions,
            })(
              <Cascader className='w100' options={item.options} {...item.attribute}/>,
            )
          }
        </Form.Item>
      </Col>
    );
  };

  renderSwitch = (item: ISwitch) => {
    const {form, rowCols = 4} = this.props;
    let newLabel = item.label;
    if (item.tips) {
      newLabel = (
        <span>
          {item.label}&nbsp;
          <Tooltip title={item.tips}>
            <Icon style={{verticalAlign: 'middle', color: '#faad14'}} type="question-circle-o"/>
          </Tooltip>
        </span>
      );
    }
    return (
      <Col span={24 / rowCols} key={item.id}>
        <Form.Item colon={false} label={newLabel} {...this.formItemLayout} {...item.formItemOptions}>
          {
            form.getFieldDecorator(item.id, {
              initialValue: item.defaultValue,
              ...item.formDecoratorOptions,
            })(
              <Switch {...item.attribute}/>,
            )
          }
        </Form.Item>
      </Col>
    );
  };

  renderUpload = (item: IUpload) => {
    const {form, rowCols = 4} = this.props;
    let newLabel = item.label;
    if (item.tips) {
      newLabel = (
        <span>
          {item.label}&nbsp;
          <Tooltip title={item.tips}>
            <Icon style={{verticalAlign: 'middle', color: '#faad14'}} type="question-circle-o"/>
          </Tooltip>
        </span>
      );
    }
    return (
      <Col span={24 / rowCols} key={item.id}>
        <Form.Item colon={false} label={newLabel} {...this.formItemLayout} {...item.formItemOptions}>
          {
            form.getFieldDecorator(item.id, {
              initialValue: item.defaultValue,
              ...item.formDecoratorOptions,
            })(
              item.uploadType === 'img' ?
                this.renderImgUpload(item) :
                <Upload
                  action={item.url}
                >
                  <Button>
                    <Icon type="upload"/> Click to Upload
                  </Button>
                </Upload>
            )
          }
        </Form.Item>
      </Col>
    );
  };

  renderText = (item: IItem) => {
    return (
      <p>{item.label}</p>
    );

  };

  render() {
    const {formItems} = this.props;
    return (
      <Row>
        {
          formItems && formItems.map((item) => {
            switch (item.type) {
              case 'input':
                return this.renderInput(item);
              case 'select':
                return this.renderSelect(item);
              case 'datePicker':
                return this.renderDatePicker(item);
              case 'rangePicker':
                return this.renderRangePicker(item);
              case 'inputNumber':
                return this.renderInputNumber(item);
              case 'checkbox':
                return this.renderCheckBox(item);
              case 'radio':
                return this.renderRadio(item);
              case 'cascader':
                return this.renderCascader(item);
              case 'switch':
                return this.renderSwitch(item);
              case 'textarea':
                return this.renderTextarea(item);
              case 'upload':
                return this.renderUpload(item);
              default:
                return this.renderText(item);
            }
          })
        }
      </Row>
    );
  }
}


export default HehForm;
