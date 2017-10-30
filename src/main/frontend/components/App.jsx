import React from 'react';
import PropTypes from 'prop-types';
import jsonld from 'jsonld';
import * as R from 'ramda';

const hasType = type => triple =>
  triple.predicate.value === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'
    && triple.object.value === type;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graph: [],
    };
  }

  componentDidMount() {
    jsonld.toRDF(this.props.data, {}, (err, quads) => {
      this.setState({
        graph: quads['@default'],
      });
    });
  }

  render() {
    const classes = R.filter(hasType('http://www.w3.org/2002/07/owl#Class'), this.state.graph);
    const concepts = R.filter(hasType('http://www.w3.org/2004/02/skos/core#Concept'), this.state.graph);

    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Classes</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((triple, index) => (
              <tr key={index}><td>{triple.subject.value}</td></tr>
            ))}
          </tbody>
        </table>
        <table className="table">
          <thead>
            <tr>
              <th>Concepts</th>
            </tr>
          </thead>
          <tbody>
            {concepts.map((triple, index) => (
              <tr key={index}><td>{triple.subject.value}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

App.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default App;
