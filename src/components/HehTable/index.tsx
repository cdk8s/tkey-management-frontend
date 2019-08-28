import React, { Fragment } from 'react';
import { Pagination, Table, Row, Col } from 'antd';
import { IProps } from './typings';

export default function(props: IProps<[]>) {
  const { data, tableOptions, pageChange, getSelectedRowKeys, selectedRowKeys, adaptation } = props;
  let { columns } = props;
  const rowSelection = {
    selectedRowKeys,
    onChange: getSelectedRowKeys,
  };
  const width = document.body.clientWidth;

  function setWidth() {
    if (adaptation && adaptation.scroll.x) {
      if (width < adaptation.scroll.x) {
        if (adaptation.fixed) {
          for (let i in adaptation.fixed) {
            columns.forEach(item => {
              if (item.dataIndex === i) {
                item.fixed = adaptation.fixed[i]
              }
            });
          }
        }
        return adaptation.scroll;
      }
    }
    return {};
  }

  return (
    <Fragment>
      <Table
        {...tableOptions}
        scroll={setWidth()}
        rowSelection={rowSelection || null}
        dataSource={data && data.list || []}
        columns={columns}
        pagination={false}
        rowKey={(record: any) => {
          if (record.id) return record.id;
          if (record.key) return record.key;
        }}
      />
      <Row style={{ padding: 10 }}>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Pagination
            onChange={pageChange ? (current, size) => pageChange(current, size) : undefined}
            onShowSizeChange={pageChange ? (current, size) => pageChange(current, size) : undefined}
            hideOnSinglePage={true}
            showQuickJumper={true}
            showSizeChanger={true}
            defaultCurrent={data && data.currentPage}
            total={data && data.total}
            showTotal={(total, range) => `${range[0]}-${range[1]} 共 ${total} 条`}
          />
        </Col>
      </Row>
    </Fragment>
  );
}

