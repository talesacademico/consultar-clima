(function() {
    'use strict';
    const inputForm = document.querySelector('[data-js="input-form"]')
    const buttonForm = document.querySelector('button')
    const titleDescription = document.querySelector('h1')
    const img = document.querySelector('.img')
    const key = 'ee71b3228acc9068241e9d46defcd254'
    const app = () => {
        return {
            init() {
                this.events()
                this.getlocalization()
            },
            events() {
                buttonForm.addEventListener('click', (e) => {
                    e.preventDefault()
                    this.reset()
                    let payload = inputForm.value || 'serro'
                    payload = 'q=' + payload
                    this.get(payload)
                })
            },

            get(payload) {
                const ajax = new XMLHttpRequest()
                ajax.open('GET',
                    `https://api.openweathermap.org/data/2.5/weather?${payload}&appid=${key}&units=metric&lang=pt_br`)
                ajax.send()
                ajax.addEventListener('readystatechange', this.ready)
            },

            ready() {
                if (this.status === 200 && this.readyState === 4) {
                    const res = JSON.parse(this.responseText)
                    img.src = `http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`;
                    titleDescription.textContent = `${res.name} - ${res.main.temp}° ${res.weather[0].description}`
                    return
                }
                titleDescription.textContent = 'Cidade Invalida'
            },

            getlocalization() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(this.successFunction, this.erroFunction);
                }

            },
            successFunction(position) {
                const lat = position.coords.latitude;
                const long = position.coords.longitude;
                const payload = `lat=${lat}&lon=${long}`
                app().get(payload)
            },

            erroFunction() {
                titleDescription.textContent = 'Insira sua cidade'
            },
            reset() {
                img.scr = ''
            },
        }
    }
    app().init()
})();