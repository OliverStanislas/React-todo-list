import React, { Component } from 'react';
import './App.css';
import ListItem from './ListItem.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

library.add(faTrash);

class App extends Component {
    state = {
        items: [],
        currentItem: {
            text: '',
            key: ''
        }
    }

    handleInput = (e) => {
        this.setState({
            currentItem: {
                text: e.target.value,
                key: Date.now()
            }
        })
    }

    addItem = (e) => {
        e.preventDefault();
        const newItem = this.state.currentItem;
        if(newItem.text !== "") {
            const newItems = [...this.state.items, newItem];
            this.setState({
                items: newItems,
                currentItem: {
                    text: '',
                    key: ''
                }
            })
        }
    }

    deleteItem = (key) => {
        const filteredItems = this.state.items.filter(item => item.key !== key);
            this.setState({
                items:filteredItems
            })
    }

    setUpdate = (text, key) => {
        const items = this.state.items;
        items.map(item => {
            if(item.key === key) {
                item.text = text;
            }
            this.setState({
                items: items
            })
        })
    }

    render() {
        // console.log(this.state.currentItem)
        return (
            <header className="App">
                <form id="to-do-form" onSubmit={this.addItem}>
                    <input
                        type="text"
                        placeholder="Enter Text"
                        value={this.state.currentItem.text}
                        onChange={this.handleInput}
                    />
                    <button type="submit">Add</button>
                </form>
                <ListItem items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate}/>
            </header>
        )
    }
}

export default App;