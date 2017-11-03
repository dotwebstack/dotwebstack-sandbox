import React from 'react';
import PropTypes from 'prop-types';
import jsonld from 'jsonld';
import * as R from 'ramda';

const hasType = type => triple =>
  triple.predicate.value === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'
    && triple.object.value === type;

const isParentClassOf = c => triple =>
  triple.subject.value === c
    && triple.predicate.value === 'http://www.w3.org/2000/01/rdf-schema#subClassOf';

const isSubClassOf = c => triple =>
  triple.predicate.value === 'http://www.w3.org/2000/01/rdf-schema#subClassOf'
    && triple.object.value === c;

const isLabel = subject => triple =>
  triple.subject.value === subject
    && triple.predicate.value === 'http://www.w3.org/2000/01/rdf-schema#label';

const isPrefLabel = subject => triple =>
  triple.subject.value === subject
    && triple.predicate.value === 'http://www.w3.org/2004/02/skos/core#prefLabel';

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
        {classes.map((triple, index) => {
          const labelTriple = R.head(R.filter(isLabel(triple.subject.value), this.state.graph));
          const prefLabelTriple = R.head(R.filter(isPrefLabel(triple.subject.value), this.state.graph));
          const label = prefLabelTriple
            ? prefLabelTriple.object.value
            : (labelTriple ? labelTriple.object.value : triple.subject.value);

          return (
            <div className="panel panel-default" key={index}>
              <div className="panel-heading">
                <h3 className="panel-title">{label}</h3>
              </div>
              <div className="panel-body">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>URI:</td>
                      <td><a href={triple.subject.value}>{triple.subject.value}</a></td>
                    </tr>
                    <tr>
                      <td>Subklasse van:</td>
                      <td>
                        <ul>
                          {R.filter(isParentClassOf(triple.subject.value), this.state.graph).map((parentClass, index) => (
                            <li key={index}><a href={parentClass.object.value}>{parentClass.object.value}</a></li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>Heeft subklassen:</td>
                      <td>
                        <ul>
                          {R.filter(isSubClassOf(triple.subject.value), this.state.graph).map((parentClass, index) => (
                            <li key={index}><a href={parentClass.subject.value}>{parentClass.subject.value}</a></li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
        <table className="table">
          <thead>
            <tr>
              <th>Concepts</th>
            </tr>
          </thead>
          <tbody>
            {concepts.map((triple, index) => (
              <tr key={index}>
                <td>
                {triple.subject.value}
                </td>
              </tr>
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
