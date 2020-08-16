import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

import { Typography, Grid, Container } from '@material-ui/core';
import { Markdown } from 'components';
import { CardFormField, required } from 'components/FormCustomizations';

const RaceSelect = ({ texts = {}, races, participants }) => (
  <Container>
    <Grid container spacing={ 4 }>
      <Grid item xs={ 12 }>
        <Typography gutterBottom variant='h4' component='h2'>Vyber si stranu</Typography>
        { texts.above ? (
          <Markdown content={ texts.above } />
        ) : (
          <Typography gutterBottom variant='body1'>
            Jen za jednu stranu opravdu stojí bojovat. Jen jedna je ta správná. Která je to však pro tebe? Zvol moudře.
            Na výběr máš následující možnosti.
          </Typography>
        ) }
      </Grid>
      { races.map(race =>
        <Field
          name='race'
          component={ CardFormField }
          key={ race.id }
          race={ race }
          participants={ participants }
          validate={ required() }
        />) }
      <Grid item xs={ 12 }>
        <Markdown content={ texts.below } />
      </Grid>
    </Grid>
  </Container>
);

RaceSelect.propTypes = {
  races: PropTypes.array,
  participants: PropTypes.array,
  texts: PropTypes.shape({
    above: PropTypes.string,
    below: PropTypes.string
  }).isRequired
};

export default RaceSelect;
