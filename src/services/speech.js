import store from '@/vuex'

export const speech = (text) => {
  let speech = new SpeechSynthesisUtterance(text)
  speech.voiceURI = 'native'
  speech.lang = store.state.language
  window.speechSynthesis.speak(speech)
}
