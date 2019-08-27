import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import Exception from './index';

const Exception403 = () => (
  <Exception
    type="403"
    desc={formatMessage({ id: 'app.exception.description.403' })}
    backText={formatMessage({ id: 'app.exception.back' })}
  />
);

export default Exception403;
