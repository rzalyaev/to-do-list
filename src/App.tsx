import React from 'react';
import './App.css';

function App() {
    return (
        <div className="App">
            <div>
                <h3>What to learn</h3>
                <div>
                    <input/>
                    <button className="button">+</button>
                </div>
                <ul>
                    <li><input type="checkbox" checked={true}/> <span>HTML&CSS</span></li>
                    <li><input type="checkbox" checked={true}/> <span>JS</span></li>
                    <li><input type="checkbox" checked={false}/> <span>React</span></li>
                </ul>
                <div>
                    <button className="button">All</button>
                    <button className="button">Active</button>
                    <button className="button">Completed</button>
                </div>
            </div>
        </div>
    );
}

export default App;
