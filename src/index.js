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
                this.getLocation()
            },
            events() {
                buttonForm.addEventListener('click', (e) => {
                    this.reset()
                    const payload = inputForm.value || 'serro'
                    e.preventDefault()
                    this.get(payload)
                })
            },

            get(city) {
                const ajax = new XMLHttpRequest()
                ajax.open('GET',
                    `https://api.openweathermap.org/data/2.5/weather?q=
                    ${city}&appid=${key}&units=metric&lang=pt_br`)

                ajax.send()
                ajax.addEventListener('readystatechange', this.ready)
            },

            ready(event) {
                const ajax = event.target
                if (ajax.status === 200 && ajax.readyState === 4) {
                    const res = JSON.parse(ajax.responseText)

                    img.src = `http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`;
                    titleDescription.textContent = `${res.name} - ${res.main.temp}° ${res.weather[0].description}`
                    return
                }
                titleDescription.textContent = 'Cidade Invalida'
            },

            getLocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(this.successFunction, this.erroFunction);
                }

            },
            successFunction: function(position) {
                const lat = position.coords.latitude;
                const long = position.coords.longitude;

                const ajax = new XMLHttpRequest()
                console.log(lat, long)
                ajax.open('GET', `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=metric&lang=pt_br`)
                ajax.send()

                ajax.addEventListener('readystatechange', function(e) {
                    app().ready(e)
                })

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