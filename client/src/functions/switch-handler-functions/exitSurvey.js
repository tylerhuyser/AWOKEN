import handleNavigation from '../handleNavigation';

export default function exitSurvey(history, params) {
  if (params.id) {
    handleNavigation(history, '/journals')
  } else {
    handleNavigation(history, '/home')
  }
}