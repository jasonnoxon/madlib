import React from 'react';

import Paragraph from './Paragraph';
import Input from './Input';

class App extends React.Component {
  state = {
    template: '',
    nouns: [],
    verbs: [],
    adjectives: [],
    madlib: null
  };

  keys = [
    { name: 'NOUN', type: 'nouns' },
    { name: 'VERB', type: 'verbs' },
    { name: 'ADJ', type: 'adjectives' }
  ];

  findAndUpdate = text => {
    this.keys.forEach(key => {
      let temp = [];
      //const count = text.split(key.name).length - 1;
      const regex = new RegExp(key.name, 'g');
      const count = (text.match(regex) || []).length;

      for (let i = 0; i < count; i++) {
        temp.push('');
      }

      this.setState({ [key.type]: temp, template: text });
    });
  };

  update = (type, index, value) => {
    const temp = this.state[type];
    temp[index] = value;

    this.setState({ [type]: temp });
  };

  go = () => {
    let temp = this.state.template;
    this.keys.forEach(key => {
      this.state[key.type].forEach(item => {
        const regex = new RegExp(key.name);
        temp = temp.replace(regex, item);
        console.log(temp);
      });
    });

    this.setState({ madlib: temp });
  };

  renderInputs = type => {
    return this.state[type].map((item, index) => (
      <Input
        key={index}
        index={index}
        type={type}
        item={item}
        update={this.update}
      />
    ));
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <h1>MadLibs!</h1>
        <p>
          Create your MadLib below. Use NOUN, VERB, and ADJ as placeholders for
          nouns. verbs, and adjectives.
        </p>
        <div className="ui form">
          <div className="field">
            <Paragraph findAndUpdate={this.findAndUpdate} />
          </div>
          <div className="three fields">
            <div
              className="field"
              style={{
                display: this.state.nouns.length === 0 ? 'none' : 'block'
              }}
            >
              <h3>Nouns</h3>
              {this.renderInputs('nouns')}
            </div>
            <div
              className="field"
              style={{
                display: this.state.verbs.length === 0 ? 'none' : 'block'
              }}
            >
              <h3>Verbs</h3>
              {this.renderInputs('verbs')}
            </div>
            <div
              className="field"
              style={{
                display: this.state.adjectives.length === 0 ? 'none' : 'block'
              }}
            >
              <h3>Adjectives</h3>
              {this.renderInputs('adjectives')}
            </div>
          </div>
          <pre
            style={{
              backgroundColor: '#e0e0e0',
              padding: '10px',
              display:
                this.state.madlib === null || this.state.madlib === ''
                  ? 'none'
                  : 'block'
            }}
          >
            <code>{this.state.madlib}</code>
          </pre>
          <button className="ui button positive" onClick={this.go}>
            Go!
          </button>
        </div>
      </div>
    );
  }
}

export default App;
