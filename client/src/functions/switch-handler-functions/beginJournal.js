import handleNavigation from '../handleNavigation';

export default function beginJournal(e, history) {
  e.preventDefault();
  handleNavigation(history, '/new-journal')
}