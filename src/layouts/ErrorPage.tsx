import React from 'react';
import Exception from './../components/Exception/index';

const Exception404 = () => (
  <Exception
    type="404"
    desc='未能连接到后台'
    isNeedBtn={false}
  />
);

export default Exception404;
