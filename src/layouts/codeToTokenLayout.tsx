import React, { Component } from 'react';
import { getPageQuery } from '@/utils/utils';
import request from '@/utils/request';
import api from '@/services/api';


class CodeToTokenLayout extends Component {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { redirect_uri, code } = getPageQuery();
    if (redirect_uri && code) {
      request(api.codeToToken, {
        method: 'post',
        data: {
          redirectUri: redirect_uri,
          code,
        },
      }).then(res => {
        if (res.data.redirectUri && res.data.token) {
          localStorage.setItem(process.env.LOCAL_STORAGE_TOKEN_KEY || '', res.data.token);
          window.location.href = res.data.redirectUri;
        }
      });
    }
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div/>
    );
  }
}

export default CodeToTokenLayout;
