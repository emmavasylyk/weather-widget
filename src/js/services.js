import axios from 'axios'
import Handlebars from 'handlebars/runtime'
Handlebars.registerHelper('tempC', function (value) {
  console.log(value)
  //   return new Handlebars.SafeString(Math.round(value - 273.15))
  //   ||
  return (value - 273.15).toFixed(1)
})
import weatherTemplate from '../templates/weatherWidget.hbs'
// console.log(Handlebars.helpers.tempCel(300))
// import { setErrorMsg } from './notif'
// console.log(setErrorMsg);
export function getWeatherData(city, place) {
  // https://openweathermap.org/api
  const baseUrl = `https://api.openweathermap.org/data/2.5/weather`
  const apiKey = `da27ba41bf40b54c891622352f858557`
  let url = baseUrl + `?q=${city}&appid=${apiKey}`
  if (!city.trim()) alert(`Enter the City`)

  axios
    .get(url)
    .then(result => {
      // console.log(result)
      return result.data
    })
    .then(data => {
      //   console.log(data)
      insertWidget(weatherTemplate, data, place)
    })
    .catch(err => console.log(err))
}

function insertWidget(template, data, place) {
  place.classList.remove('loading')
  place.insertAdjacentHTML('afterbegin', template(data))
}

export class APIpexel {
  constructor() {
    this.API_KEY = `563492ad6f91700001000001390f9fee0a794c1182a72e49e0e0eae2`
    this.BASE_URL = `https://api.pexels.com/v1`
    this.endPoint = `/search`
    this._page = 1
    this._query = ''
  }
  get query() {
    return this._query
  }
  set query(value) {
    return (this._query = value)
  }

  get page() {
    return this._page
  }
  set page(value) {
    return (this._page += value)
  }
  resetPage() {
    this._page = 1
  }

  getFetch(place) {
    axios.defaults.headers.common.Authorization = this.API_KEY
    let params = `?query=${this._query}&per_page=5&page=${this._page}`
    let url = this.BASE_URL + this.endPoint + params
    console.log('что идет в запрос: ', this._page, this._query)
    axios
      .get(url)
      //   .then(r => r.data.photos)
      .then(r => {
        return r.data.photos
      })
      .then(d => {
        // console.log(d)
        let m = this.createMUimages(d)
        place.insertAdjacentHTML('beforeend', m)
        console.log(document.documentElement)

        // делаем скролл вниз не мгновенно, с задержкой
        setTimeout(
          () =>
            window.scrollTo({
              // прокрутку делаем на всю высоту html вниз
              top: document.documentElement.offsetHeight,
              behavior: 'smooth',
            }),
          500,
        )
      })
      .catch(err => console.log(err))
  }
  createMUimages(data) {
    return data
      .map(elem => {
        //   console.log(elem) // src.original, src.tiny photographer
        const {
          photographer,
          src: { tiny, original },
        } = elem
        return `
              <li>
                <img src="${tiny}" data-src="${original}" alt="${photographer}" />
              </li>
              `
      })
      .join('')
  }
}

// export function getImages(query, place) {
//   console.log(query)
//   const API_KEY = `563492ad6f91700001000001390f9fee0a794c1182a72e49e0e0eae2`
//   const BASE_URL = `https://api.pexels.com/v1`
//   axios.defaults.headers.common.Authorization = API_KEY
//   let endPoint = `/search`
//   let page = 1
//   let params = `?query=${query}&per_page=5&page=${page}`

//   let url = BASE_URL + endPoint + params

//   axios
//     .get(url)
//     .then(r => r.data.photos)
//     .then(d => {
//       console.log(d)
//       let m = createMUimages(d)
//       place.insertAdjacentHTML('afterbegin', m)
//     })
//     .catch(err => console.log(err))
// }

// function createMUimages(data) {
//   return data
//     .map(elem => {
//       //   console.log(elem) // src.original, src.tiny photographer
//       const {
//         photographer,
//         src: { tiny, original },
//       } = elem
//       return `
//             <li>
//               <img src="${tiny}" data-src="${original}" alt="${photographer}" />
//             </li>
//             `
//     })
//     .join('')
// }