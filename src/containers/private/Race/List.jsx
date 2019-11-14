import React from 'react';
import {
  List as ListBase,
  Datagrid,
  FunctionField, DateField, TextField, ReferenceField,
  EditButton, ShowButton
} from 'react-admin';
import { ColorField } from 'react-admin-color-input';

import { Icon } from '@material-ui/core';

import { EventFilter } from '../shared';

const List = (props) => (
  <ListBase
    title='Strany'
    filters={ <EventFilter /> }
    { ...props }
  >
    <Datagrid>
      <TextField label='Jméno' source="name" />
      <ReferenceField label='Událost' source="event" reference='events'>
        <TextField source="name" />
      </ReferenceField>
      <TextField label='Limit' source="limit" />
      <FunctionField label='Obrázek' source="image" render={ ({ image }) => <Icon>{ image ? 'check' : 'close' }</Icon> }/>
      <ColorField label='Barva' source='color'/>
      <TextField label="Autor" source="createdby" />
      <DateField label="Vytvořeno" source="createdate" />
      <DateField label="Aktualizováno" source="lastupdate" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </ListBase>
);

export default List;