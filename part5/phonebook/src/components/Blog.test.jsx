import {render, screen, fireEvent} from '@testing-library/react'
import Blog from './Blog'
import { expect, test } from 'vitest'
import userEvent from '@testing-library/user-event'

test('renders content', () => {
    const blog = {
        title: 'test title',
        author: 'test author',
    }

    const {container} = render(<Blog blog={blog} />)

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('test title')
    expect(div).toHaveTextContent('test author')
})

test('clicking the view button shows url and likes', async () => {
    const blog = {
        title: 'test title',
        author: 'test author',
        url: 'test url',
        likes: 1,
    }

    const component = render(<Blog blog={blog} />)

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('test url')
    expect(component.container).toHaveTextContent('1')
})
