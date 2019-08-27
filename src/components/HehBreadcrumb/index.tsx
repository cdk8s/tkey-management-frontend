import React from 'react';
import {Breadcrumb} from 'antd';
import Link from 'umi/link'

import './index.less'

interface IData {
    name: string,
    link?: string,
}

interface Interface {
    data: Array<IData>
}

const HehBreadcrumb = (props: Interface) => {
    const {data} = props;
    return (
        <div className='pd15'>
            <Breadcrumb>
                {
                    data && data.map(item => {
                        return (
                            item && item.link ? (
                                <Breadcrumb.Item key={item.name}>
                                    <Link to={item.link}>{item.name}</Link>
                                </Breadcrumb.Item>
                            ) : (
                                <Breadcrumb.Item key={item.name}>{item.name}</Breadcrumb.Item>
                            )
                        )
                    })
                }
            </Breadcrumb>
        </div>
    )
};


export default HehBreadcrumb;
