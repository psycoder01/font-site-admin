import axios from 'axios';
import { Admin, Resource } from 'react-admin';

import { FontsList, AddFont, EditFont } from './components';

const uri = process.env.REACT_APP_SERVER_URI || '';

function App() {
  const dataProvider = {
    getList: async () => {
      const resp = await axios.get(`${uri}/fontsList`);
      const { data } = resp;
      return data;
    },
    getOne: async (resource, params) => {
      console.log(params);
      const { id } = params;
      const resp = await axios.get(`${uri}/id=${id}`);
      const { data } = resp;
      return data;
    },
    //getMany: (resource, params) => Promise,
    //getManyReference: (resource, params) => Promise,
    create: async (resource, params) => {
      let formData = new FormData();
      formData.append('font', params.data.files.rawFile);

      if (params.data.files) {
        await axios.post(`${uri}/admin/uploadFont`, formData, {
          headers: {
            'Content-Type': 'application.ttf',
          },
        });
      }
      delete params.data.files;
      const resp = await axios.post(`${uri}/admin/addFont`, params.data);
      return resp.data;
    },
    update: async (resource, params) => {
      const { id } = params.data;
      await axios.post(`${uri}/admin/updateFont/${id}`, params.data);
      return { data: params.data };
    },
    //updateMany: (resource, params) => Promise,
    delete: async (resource, params) => {
      const { id } = params;
      const resp = await axios.delete(`${uri}/admin/delFont/${id}`);
      return resp.data;
    },
    deleteMany: async (resource, params) => {
      const { ids } = params;
      const resp = await Promise.all(
        ids.map((id) => axios.delete(`${uri}/admin/delFont/${id}`)),
      );
      return { data: resp };
    },
  };

  return (
    <Admin dataProvider={dataProvider}>
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
