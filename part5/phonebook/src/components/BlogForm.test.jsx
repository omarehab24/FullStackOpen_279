import {render, screen} from '@testing-library/react'
import BlogForm from './BlogForm'
import { expect, test } from 'vitest'
import userEvent from '@testing-library/user-event'

test('BlogForm', async () => {
const createBlog = vi.fn()
const user = userEvent.setup()

render(<BlogForm createBlog={createBlog} />)

const button = screen.getByText('add blog')

const inputs = screen.getAllByRole('textbox')
await user.type(inputs[0], 'test title')
await user.type(inputs[1], 'test author')

await user.click(button)

expect(createBlog.mock.calls).toHaveLength(1)

})
