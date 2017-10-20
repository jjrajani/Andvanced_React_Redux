import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';

const links = [
    { text: 'Redux Auth', to: '/', requireAuth: null },
    { text: 'Sign Out', to: '/signout', requireAuth: true },
    { text: 'Sign In', to: '/signin', requireAuth: false },
    { text: 'Feature', to: '/feature', requireAuth: true },
    { text: 'Sign Up', to: '/signup', requireAuth: false }
];

class Header extends Component {
    renderLinks = () => {
        const { isAuthed } = this.props;
        // handle undefined auth state (that i'm sure we will fix soon)
        let authed = isAuthed;
        if (!authed) {
            authed = false;
        }
        return links.reduce((html, link) => {
            if (link.requireAuth === null || link.requireAuth === authed) {
                html.push(
                    <li key={link.to} className="nav-item">
                        <Link className="nav-link" to={link.to}>
                            {link.text}
                        </Link>
                    </li>
                );
            }
            return html;
        }, []);
    };

    render() {
        const { isAuthed } = this.props;
        return (
            <nav className="navbar navbar-light">
                <ul className="nav navbar-nav">
                    <li className="nav-item" />
                    {this.renderLinks()}
                </ul>
            </nav>
        );
    }
}

function mapStateToProps({ auth }) {
    return { isAuthed: auth.authenticated };
}

export default connect(mapStateToProps)(Header);
