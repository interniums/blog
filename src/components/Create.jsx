export default function Create() {
  return (
    <div>
      <form action="POST">
        {/* create category */}
        <div>
          <label htmlFor="add_category">Add Category</label>
          <input
            type="text"
            placeholder="add category"
            name="category"
            id="category"
          />
        </div>
        {/* add title */}
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" />
        </div>
        {/* add category */}
        <div>
          <label htmlFor="category">Choose Category</label>
          <input list="categories" id="category" />
          <datalist id="categories">
            <option value="travel">Travel</option>
            <option value="work">Work</option>
          </datalist>
        </div>
        {/* add content */}
        <div>
          <label htmlFor="content">Add content</label>
          <input type="text" name="content" id="content" />
        </div>
        {/* add img */}
        <div>
          <label htmlFor="img">Add img</label>
          <input type="file" />
        </div>
      </form>
    </div>
  )
}
