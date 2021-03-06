import React from 'react';
import ReactMde from 'react-mde';
import PropTypes from 'prop-types';
import { addField } from 'ra-core';
import FormControl from '@material-ui/core/FormControl';
import { compiler } from 'markdown-to-jsx';

import 'react-mde/lib/styles/css/react-mde-all.css';

const MarkdownFieldBase = ({ input: { value }, addLabel, isRequired, basePath, ...props }) => (
  <FormControl { ...props } className='ra-input-mde'>
    <ReactMde
      value={ value }
      selectedTab='preview'
      generateMarkdownPreview={ markdown => Promise.resolve(compiler(markdown)) }
      readOnly={ true }
    />
  </FormControl>
);

MarkdownFieldBase.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string.isRequired
  }).isRequired,
  props: PropTypes.object,
  addLabel: PropTypes.any,
  isRequired: PropTypes.any,
  basePath: PropTypes.any
};

const MarkdownField = addField(MarkdownFieldBase);

MarkdownField.defaultProps = {
  addLabel: true,
  fullWidth: true
};

export default MarkdownField;
