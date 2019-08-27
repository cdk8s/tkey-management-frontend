import React, { Component } from 'react';
import { Input, Form, Button, Select, DatePicker, Icon } from 'antd';
import { SelectProps, OptionProps } from 'antd/lib/select';
import { InputProps } from 'antd/lib/input';
import { PickerProps } from 'antd/lib/date-picker/interface';
import { FormComponentProps } from 'antd/lib/form/Form';
import moment from 'moment';
import './index.less';

export interface IItem {
  type: string,
  id: string,
  label: string,
}

interface IInput extends IItem {
  attribute?: InputProps
}

interface ISelectOption {
  value: any,
  label: string,
  disabled?: boolean
}

interface ISelect extends IItem {
  options: Array<ISelectOption>
  attribute?: SelectProps
  optionAttribute?: OptionProps
}

interface IDatePick extends IItem {
  attribute?: PickerProps
}

interface IProps extends FormComponentProps {
  searchItems: Array<IItem>

  getValue(value: object): void
}

class HehSearch extends Component<IProps, {}> {

  onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.getValue(values);
      }
    });
  };

  onReset = () => {
    this.props.form.resetFields();
  };

  renderInput = (item: IInput) => {
    const { form } = this.props;
    return (
      <div className='form_item_wrapper' style={{ width: 300 }} key={item.id}>
        <div className='form_item_label'>
          <label htmlFor={item.id}>{item.label}</label>
        </div>
        <div className='form_item_component'>
          <Form.Item colon={false}>
            {
              form.getFieldDecorator(item.id)(
                <Input {...item.attribute}/>,
              )
            }
          </Form.Item>
        </div>
      </div>
    );
  };

  renderSelect = (item: ISelect) => {
    const { form } = this.props;
    return (
      <div className='form_item_wrapper' style={{ width: 300 }} key={item.id}>
        <div className='form_item_label'>
          <label htmlFor={item.id}>{item.label}</label>
        </div>
        <div className='form_item_component'>
          <Form.Item colon={false}>
            {
              form.getFieldDecorator(item.id)(
                <Select {...item.attribute}>
                  {
                    item.options && item.options.map((child: ISelectOption) => (
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
        </div>
      </div>
    );
  };

  renderDatePicker = (item: IDatePick) => {
    const { form } = this.props;
    return (
      <div className='form_item_wrapper' style={{ width: 300 }} key={item.id}>
        <div className='form_item_label'>
          <label htmlFor={item.id}>{item.label}</label>
        </div>
        <div className='form_item_component'>
          <Form.Item colon={false}>
            {
              form.getFieldDecorator(item.id)(
                <DatePicker style={{ width: '100%' }} {...item.attribute}/>,
              )
            }
          </Form.Item>
        </div>
      </div>
    );
  };

  renderRangePicker = (item: IDatePick) => {
    const { form } = this.props;
    return (
      <div className='form_item_wrapper' style={{ width: 300 }} key={item.id}>
        <div className='form_item_label'>
          <label htmlFor={item.id}>{item.label}</label>
        </div>
        <div className='form_item_component'>
          <Form.Item colon={false}>
            {
              form.getFieldDecorator(item.id)(
                <DatePicker.RangePicker
                  ranges={{
                    ['本日']: [moment(), moment()],
                    ['本周']: [moment().startOf('week'), moment().endOf('week')],
                    ['本月']: [moment().startOf('month'), moment().endOf('month')],
                    ['本季度']: [moment().startOf('quarter'), moment().endOf('quarter')],
                    ['本年']: [moment().startOf('year'), moment().endOf('year')],
                  }}
                  style={{ width: '100%' }}
                  {...item.attribute}
                />,
              )
            }
          </Form.Item>
        </div>
      </div>
    );
  };

  renderText = (item: IItem) => {
    return (
      <p>{item.label}</p>
    );

  };

  render() {
    const { searchItems } = this.props;
    return (
      <Form onSubmit={this.onSubmit}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {
            searchItems && searchItems.map((item: any) => {
              switch (item.type) {
                case 'input':
                  return this.renderInput(item);
                case 'select':
                  return this.renderSelect(item);
                case 'datePicker':
                  return this.renderDatePicker(item);
                case 'rangePicker':
                  return this.renderRangePicker(item);
                default:
                  return this.renderText(item);
              }
            })
          }
          <div className='tac' style={{ marginLeft: 20 }}>
            <Form.Item>
              <Button htmlType='submit' type='primary'><Icon type='search'/>搜索</Button>
              <Button onClick={this.onReset} type='default' className='ml10'><Icon type='delete'/>重置</Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    );
  }
}

const FormWrapper = Form.create<IProps>()(HehSearch);

export default FormWrapper;
