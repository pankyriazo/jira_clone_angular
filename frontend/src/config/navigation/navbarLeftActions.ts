import { NavbarLeftAction } from 'src/classes/navigation/navbar-left-action';

export const navbarLeftActions = {
    top: [
        new NavbarLeftAction('search', 'Search issues', [], () => {
            console.log('Search');
        }),
        new NavbarLeftAction('plus', 'Create issue', [], () => {
            console.log('Search');
        })
    ],
    bottom: [
        new NavbarLeftAction('help', 'About', ['is-solid'], () => {
            console.log('Search');
        }),
        new NavbarLeftAction('user', 'Logout', [], () => {
            console.log('Search');
        })
    ]
}
