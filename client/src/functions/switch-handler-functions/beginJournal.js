import handleNavigation from '../handleNavigation';

export default function beginJournal(e, history, setPendingSurvey) {
  e.preventDefault();
  setPendingSurvey(true)
  handleNavigation(history, '/new-journal')
}