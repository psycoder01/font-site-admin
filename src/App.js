import { Admin, Resource } from 'react-admin';
import axios from 'axios';

import { FontsList, AddFont } from './components';

const uri = process.env.REACT_APP_SERVER_URI || '';

function App() {
  const dataProvider = {
    getList: async () => {
      const resp = await axios.get(`${uri}/fontsList`);
      const { data } = resp;
      return data;
    },
    //getOne: (resource, params) => Promise,
    //getMany: (resource, params) => Promise,
    //getManyReference: (resource, params) => Promise,
    create: async (resource, params) => {
      console.log(params);
      //const resp = await axios.post(`${uri}/admin/addFont`, params.data);
      //const { data } = resp;
      //return data;
    },
    //update: (resource, params) => Promise,
    //updateMany: (resource, params) => Promise,
    //delete: (resource, params) => Promise,
    //deleteMany: (resource, params) => Promise,
  };

  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="fontsList" list={FontsList} create={AddFont} />
    </Admin>
  );
}

export default App;
