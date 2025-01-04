import { useState, useCallback, memo } from "react"

const BlogForm = ({ createBlog }) => {
    const [blogTitle, setBlogTitle] = useState('')
    const [blogAuthor, setBlogAuthor] = useState('')
    const [blogUrl, setBlogUrl] = useState('')

    console.log("render");

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: blogTitle,
            author: blogAuthor,
            url: blogUrl
        })

        setBlogTitle('')
        setBlogAuthor('')
        setBlogUrl('')
    }

    return (
        <div>
            <h2>Create new blog</h2>
            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input
                        id="title"
                        type="text"
                        value={blogTitle}
                        name="Title"
                        placeholder="Title"
                        onChange={(e) => setBlogTitle(e.target.value)}
                    />
                </div>
                <div>
                    author:
                    <input
                        id="author"
                        type="text"
                        value={blogAuthor}
                        name="Author"
                        placeholder="Author"
                        onChange={(e) => setBlogAuthor(e.target.value)}
                    />
                </div>
                <div>
                    url:
                    <input
                        id="url"
                        type="text"
                        value={blogUrl}
                        name="Url"
                        placeholder="Url"
                        onChange={(e) => setBlogUrl(e.target.value)}
                    />
                </div>
                <button id="add-blog-button" type="submit">add blog</button>
            </form>
        </div>
    )
}

export default BlogForm