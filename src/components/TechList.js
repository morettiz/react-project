import React, { Component } from 'react';
import TechItem from './TechItem';

class TechList extends Component {
    state = {
        newTech: '',
        techs: [
            'Node.js',
            'ReactJS',
            'React Native',
        ],
    };

    // Executado assim que o componente aparece em tela
    componentDidMount() {
        const techs = localStorage.getItem('techs');

        if (techs) {
            this.setState({ techs: JSON.parse(techs) });
        }
    }

    // Executado sempre que houver alterações nas props ou estado
    componentDidUpdate(prevProps, prevState) {
        //this.props, this.state
        if (prevState.techs != this.state.techs) {
            localStorage.setItem('techs', JSON.stringify(this.state.techs));
        }
    }

    // Executado quando componente deixa de existir
    componentWillUnmount() {

    }

    handleInputChange = e => {
        this.setState({ newTech: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();

        this.setState({
            techs: [ ... this.state.techs, this.state.newTech],
            newTech: '',
        });
    }

    handleDelete = t => {
        this.setState({
            techs: this.state.techs.filter(tech => tech != t)
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>{this.state.newTech}</h1>
                <ul>
                    {this.state.techs.map(tech => (
                        <TechItem 
                            key={tech} 
                            tech={tech} 
                            onDelete={() => this.handleDelete(tech)} 
                        />
                    ))}
                    {/* <TechItem />  */}
                </ul>
                <input 
                    type="text" 
                    onChange={this.handleInputChange}
                    value={this.state.newTech}
                />
                <button type="submit">Send</button>
            </form>
        );
    }
}

export default TechList;