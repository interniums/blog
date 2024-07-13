import { useRef, useState } from 'react'
import fetchPost from '../utils/fetchPost'

export default function CreateCategory() {
  const category_input = useRef(null)
  const [data, setData] = useState({
    category: '',
  })

  const handleData = (event) => {
    const name = event.target.name
    setData({ ...data, [name]: event.target.value })
  }

  const fetchCategory = async () => {
    try {
      const message = await fetchPost({
        name: data.category,
        destination: 'create/category',
      })
    } catch (err) {
    } finally {
      category_input.current.value = ''
    }
  }

  return (
    <div className="grid justify-center items-center p-12 h-max">
      <div className="create_page_container">
        <label htmlFor="add_category">Add Category</label>
        <input
          className="create_page_input"
          type="text"
          placeholder="Add  category."
          name="category"
          id="category"
          ref={category_input}
          onChange={(e) => {
            handleData(e)
          }}
        />
        <button
          onClick={fetchCategory}
          className="create_page_button bg-green-100"
        >
          Submit
        </button>
      </div>
    </div>
  )
}
