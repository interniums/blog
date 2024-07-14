import { useEffect, useState } from 'react'
import fetchPost from '../utils/fetchPost'
import fetchGet from '../utils/fetchGet'

export default function Create() {
  const [data, setData] = useState({
    title: '',
    category: '',
    content: '',
    img: [],
  })
  const [categories, setCategories] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  // console.log(data)
  // console.log(categories)
  // console.log(error)

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const message = await fetchGet({
          destination: 'create/category',
        })
        setCategories(message)
        setError(null)
      } catch (err) {
        setError(err.message)
        setCategories(null)
      } finally {
        setLoading(false)
      }
    }
    fetchCategory()
  }, [])

  const fetchData = async () => {
    try {
      const message = await fetchPost({
        title,
        category,
        content,
        img,
        destination: 'post',
      })
      console.log(message)
    } catch (err) {
    } finally {
    }
  }

  const handleData = (event) => {
    const name = event.target.name
    setData({ ...data, [name]: event.target.value })
  }

  return (
    <div className="grid justify-center items-center p-12 h-max">
      <form className="grid gap-2">
        {/* add title */}
        <div className="create_page_container">
          <label htmlFor="title">Title</label>
          <input
            placeholder="Add title."
            className="create_page_input"
            type="text"
            name="title"
            id="title"
            onChange={(e) => {
              handleData(e)
            }}
          />
        </div>
        {/* add category */}
        <div className="create_page_container">
          <label htmlFor="category">Choose Category</label>
          <input
            placeholder="Add category."
            className="create_page_input"
            list="categories"
            id="category"
            onChange={(e) => {
              handleData(e)
            }}
          />
          {categories.length > 0 ? (
            <datalist id="categories">
              {categories?.map((item) => (
                <option value={item.name} key={item._id}>
                  {item.name}
                </option>
              ))}
            </datalist>
          ) : null}
        </div>
        {/* add content */}
        <div className="create_page_container">
          <label htmlFor="content">Add content</label>
          <textarea
            cols={99}
            rows={8}
            placeholder="Add content."
            className="create_page_input resize-none"
            type="text"
            name="content"
            id="content"
            onChange={(e) => {
              handleData(e)
            }}
          />
        </div>
        {/* add img */}
        <div className="create_page_container">
          <label htmlFor="img">Add img</label>
          <input
            className="create_page_input"
            multiple
            type="file"
            onChange={(e) => {
              handleData(e)
            }}
          />
        </div>
        <button
          className="hover:bg-green-300 create_page_button bg-green-100"
          onClick={fetchData}
        >
          Submit
        </button>
      </form>
    </div>
  )
}
