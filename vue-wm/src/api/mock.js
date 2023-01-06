import Mock from 'mockjs';
import dataApi from './Mockapi/dataApi';
import storeApi from './Mockapi/storeApi';
Mock.mock('/home/getHomeData',dataApi.GetHomeData);
Mock.mock('/store/getStoreData',storeApi.GetStoreData);