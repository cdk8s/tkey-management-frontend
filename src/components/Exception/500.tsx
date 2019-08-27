import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import Exception from './index';

const Exception500 = () => (
  <Exception
    type="500"
    desc={formatMessage({ id: 'app.exception.description.500' })}
    backText={formatMessage({ id: 'app.exception.back' })}
  />
);

export default Exception500;
