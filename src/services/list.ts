import request from '@/utils/request';
import api from './api';

export async function clientTablePage(data: object) {
  return request(api.clientTablePage, {
    method: 'post',
    data: data,
  });
}

export async function clientTableCreate(data: object) {
  return request(api.clientTableCreate, {
    method: 'post',
    data: data,
  });
}

export async function clientTableUpdate(data: object) {
  return request(api.clientTableUpdate, {
    method: 'post',
    data: data,
  });
}

export async function clientTableDelete(data: object) {
  return request(api.clientTableDelete, {
    method: 'post',
    data: data,
  });
}

export async function clientTableDetail(data: object) {
  return request(api.clientTableDetail, {
    method: 'get',
    params: data,
  });
}

export async function clientUpdateStatus(data: object) {
  return request(api.clientUpdateStatus, {
    method: 'post',
    data: data,
  });
}

