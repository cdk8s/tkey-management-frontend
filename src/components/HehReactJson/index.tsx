import React from "react";
import ReactJson from 'react-json-view';
import {Modal} from 'antd';

interface IProps {
  json: any
  visible?: boolean

  onCancel(): void
}

export default function (props: IProps) {
  const {json, visible = false, onCancel} = props;
  return (
    <Modal
      visible={visible}
      footer={null}
      onCancel={onCancel}
      centered={true}
      closable={false}
      style={{
        minWidth: 860
      }}
      bodyStyle={{
        minHeight: 400,
        wordBreak: 'break-all'
      }}
    >
      <ReactJson
        src={json}
        theme='flat'
        iconStyle='square'
        style={{minHeight: 400}}
        displayDataTypes={false}
        displayObjectSize={false}
        enableClipboard={true}
        collapseStringsAfterLength={false}
        name={false}
      />
    </Modal>
  )
}
