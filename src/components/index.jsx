import {
  Create,
  Edit,
  SimpleForm,
  TextInput,
  List,
  Datagrid,
  TextField,
  SelectInput,
  FileInput,
  FileField,
} from 'react-admin';

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
