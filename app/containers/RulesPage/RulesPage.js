import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import LoadingIndicator from 'components/LoadingIndicator';
import RulesBox from 'components/RulesBox';
import Article from 'components/Article';
import './style.scss';

const Rules = ({ rules }) => {
  const rulesList = !isLoaded(rules)
  ? <LoadingIndicator />
  : isEmpty(rules)
    ? ''
    : Object.keys(rules).map(
      (key, id) => (
        <RulesBox
          key={key}
          id={id}
          iconClass={rules[key].icon}
          categoryName={rules[key].category}
          content={rules[key].content}
        />
      )
    )
  return (
    <div className="rulesPage">
      {/* {rulesList} */}
      <Article title="Připravujeme" content="Nové pravidla jsme ještě nestihli přesunout na nové stránky. Během pár dní zde již budou..." />
    </div>
  );
}

export default compose(
  firestoreConnect([
    {
      collection: 'rules',
      orderBy: 'order',
    }
  ]),
  connect((state) => ({
    rules: state.firestore.ordered.rules,
  }))
)(Rules);
