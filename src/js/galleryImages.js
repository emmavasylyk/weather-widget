import { APIpexel } from './services'
import refs from './refs'
const { form, list, loadMoreBtn } = refs

const x = new APIpexel()
// console.log(x.query)

form.addEventListener('submit', getImagesList)
// console.log(form)
function getImagesList(e) {
  e.preventDefault()
  list.innerHTML = ''
  x.resetPage()
  x.query = e.target.elements.searchImages.value
  x.getFetch(list)
  form.reset()
}

loadMoreBtn.addEventListener('click', () => {
  x.page = 1
  x.getFetch(list)
})
