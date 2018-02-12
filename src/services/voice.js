import store from '@/vuex'

// speech text
export const speech = (text) => {
  return new Promise((resolve, reject) => {
    let speech = new SpeechSynthesisUtterance(text)
    speech.voiceURI = 'native'
    speech.lang = store.state.language
    window.speechSynthesis.speak(speech)
    speech.onend = () => {
      resolve()
    }
    speech.onerror = () => {
      reject(new Error())
    }
  })
}

// listen for text
export const listen = () => {
  return new Promise((resolve, reject) => {
    let speech = null
    let recognition = new webkitSpeechRecognition() // eslint-disable-line
    recognition.interimResults = true
    recognition.lang = store.state.language
    recognition.start()
    recognition.onresult = (event) => {
      for (var i = event.resultIndex; i < event.results.length; i++) {
        speech = event.results[i][0].transcript
      }
    }
    recognition.onend = () => {
      recognition.stop()
      if (speech) resolve(speech)
      else reject(new Error())
    }
    recognition.onerror = () => {
      reject(new Error())
    }
  })
}
