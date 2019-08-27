import React, { Component } from 'react';
import classNames from 'classnames';
import Link from 'umi/link';
import { Button } from 'antd';
import config from './typeConfig';

import './index.less';

interface IExceptionProps {
  type?: '403' | '404' | '500';
  title?: React.ReactNode;
  desc?: React.ReactNode;
  img?: string;
  actions?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  backText?: React.ReactNode;
  redirect?: string;
}

class Exception extends Component<IExceptionProps, any> {
  static defaultProps = {
    backText: 'back to home',
    redirect: '/',
  };

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      className,
      backText,
      type,
      title,
      desc,
      img,
      actions,
      redirect = '',
      ...rest
    } = this.props;
    const pageType = type && type in config ? type : '404';
    const clsString = classNames('exception', className);
    return (
      <div className={clsString} {...rest}>
        <div className='imgBlock'>
          <div
            className='imgEle'
            style={{ backgroundImage: `url(${img || config[pageType].img})` }}
          />
        </div>
        <div className='content'>
          <h1>{title || config[pageType].title}</h1>
          <div className='desc'>{desc || config[pageType].desc}</div>
          <div className='actions'>
            <Link to={redirect}>
              <Button type="primary">{backText}</Button>,
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Exception;
