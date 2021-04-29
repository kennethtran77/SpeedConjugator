import React from 'react';

import './Sidebar.css';

class Sidebar extends React.Component {
    render() {
        return (
            <div id='sidebar'>
                <button>Pronouns</button>
                <button>Tenses</button>
                <button>Moods</button>
            </div>
        )
    }
}


export default Sidebar;