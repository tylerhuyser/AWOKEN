import handleNavigation from '../handleNavigation';

export default function exitSurvey (history, setPendingSurvey) {
  setPendingSurvey(false)
  handleNavigation(history, '/home')
}