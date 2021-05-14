import {
  Edit,
  List,
  Create,
  Datagrid,
  useLogin,
  TextInput,
  TextField,
  FileInput,
  FileField,
  useNotify,
  SimpleForm,
  SelectInput,
  Notification,
  defaultTheme,
} from 'react-admin';
import { useState } from 'react';
import { TextField as Input } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

export const FontsList = (props) => {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="searchName" />
        <TextField source="description" />
        <TextField source="downloads" />
        <TextField source="thumbUrl" />
        <TextField source="charMapUrl" />
        <TextField source="rating" />
        <TextField source="type" />
        <TextField source="price" />
        <TextField source="createdAt" />
        <TextField source="updatedAt" />
      </Datagrid>
    </List>
  );
};

export const AddFont = (props) => {
  const options = [{ name: 'Free' }, { name: 'Premium' }];
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="name" required />
        <TextInput source="searchName" required />
        <TextInput
          source="description"
          options={{ multiline: true }}
          required
        />
        <TextInput source="thumbUrl" />
        <TextInput source="charMapUrl" />
        <SelectInput
          source="type"
          choices={options}
          optionText="name"
          optionValue="name"
          required
        />
        <TextInput source="price" required />
        <FileInput source="files" label="Related files" accept=".ttf" required>
          <FileField source="files" title="title" />
        </FileInput>
      </SimpleForm>
    </Create>
  );
};

export const EditFont = (props) => {
  const options = [{ name: 'Free' }, { name: 'Premium' }];
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="name" required />
        <TextInput source="searchName" required />
        <TextInput
          source="description"
          options={{ multiline: true }}
          required
        />
        <TextInput source="thumbUrl" />
        <TextInput source="charMapUrl" />
        <SelectInput
          source="type"
          choices={options}
          optionText="name"
          optionValue="name"
          required
        />
        <TextInput source="price" required />
      </SimpleForm>
    </Edit>
  );
};

export const LoginPage = ({ theme }) => {
  const [code, setCode] = useState('');
  const login = useLogin();
  const notify = useNotify();
  const submit = (e) => {
    e.preventDefault();
    // will call authProvider.login({ email, password })
    login({ code }).catch(() => notify('Something wrong!'));
  };

  return (
    <ThemeProvider theme={createMuiTheme(defaultTheme)}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <form onSubmit={submit}>
          <Input
            name="code"
            type="password"
            value={code}
            required
            label="Code"
            variant="outlined"
            onChange={(e) => setCode(e.target.value)}
          />
        </form>
      </div>
      <Notification />
    </ThemeProvider>
  );
};
