import axios from 'axios';
import { Admin, Resource } from 'react-admin';

import { network, setToken, setHeaders } from './api';
import { LoginPage, FontsList, AddFont, EditFont } from './components';

const uri = process.env.SERVER_URI || '';
const authUri = process.env.AUTH_URI || '';

function App() {
  const dataProvider = {
    getList: async () => {
      const resp = await network.get(`${uri}/fontsList`);
      const { data } = resp;
      return data;
    },
    getOne: async (resource, params) => {
      const { id } = params;
      const resp = await network.get(`${uri}/id=${id}`);
      const { data } = resp;
      return data;
    },
    //getMany: (resource, params) => Promise,
    //getManyReference: (resource, params) => Promise,
    create: async (resource, params) => {
      let formData = new FormData();
      formData.append('font', params.data.files.rawFile);

      if (params.data.files) {
        await network.post(`${uri}/admin/uploadFont`, formData, {
          headers: {
            'Content-Type': 'application.ttf',
          },
        });
      }
      delete params.data.files;
      const resp = await network.post(`${uri}/admin/addFont`, params.data);
      return resp.data;
    },
    update: async (resource, params) => {
      const { id } = params.data;
      await network.post(`${uri}/admin/updateFont/${id}`, params.data);
      return { data: params.data };
    },
    //updateMany: (resource, params) => Promise,
    delete: async (resource, params) => {
      const { id } = params;
      const resp = await network.delete(`${uri}/admin/delFont/${id}`);
      return resp.data;
    },
    deleteMany: async (resource, params) => {
      const { ids } = params;
      const resp = await Promise.all(
        ids.map((id) => network.delete(`${uri}/admin/delFont/${id}`)),
      );
      return { data: resp };
    },
  };

  const authProvider = {
    // authentication
    login: async (params) => {
      const resp = await axios.post(`${authUri}/login`, params);
      // setting token in request headers
      const token = resp.data;
      setHeaders('Authorization', token);
      setToken(token);
      return Promise.resolve();
    },
    checkError: (error) => Promise.resolve(),
    checkAuth: (params) =>
      localStorage.getItem('token') ? Promise.resolve() : Promise.reject(),
    logout: () => {
      localStorage.removeItem('token');
      return Promise.resolve();
    },
    getIdentity: () => Promise.resolve(),
    //authorization
    getPermissions: (params) => Promise.resolve(),
  };

  return (
    <Admin
      loginPage={LoginPage}
      authProvider={authProvider}
      dataProvider={dataProvider}
    >
      <Resource
        name="fontsList"
        list={FontsList}
        create={AddFont}
        edit={EditFont}
      />
    </Admin>
  );
}

export default App;
