import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const createBlog = jest.fn()

    render(<BlogForm createBlog={createBlog} />)


    const titleInput = screen.getByPlaceholderText('title')
    const authorInput = screen.getByPlaceholderText('author')
    const urlInput = screen.getByPlaceholderText('url')

    const saveButton = screen.getByText('save')

    await userEvent.type(titleInput, 'mockTitle' )
    await userEvent.type(authorInput, 'mockAuthor' )
    await userEvent.type(urlInput, 'mockURL' )
    await userEvent.click(saveButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('mockTitle' )
    expect(createBlog.mock.calls[0][0].author).toBe('mockAuthor')
    expect(createBlog.mock.calls[0][0].url).toBe('mockURL' )
})
