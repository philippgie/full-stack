import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'philipp'
    }

    render(<Blog blog={blog} />)

    const title = screen.getByText('Component testing is done with react-testing-library', {exact:false})
    expect(title).toBeDefined()
    const author = screen.getByText('philipp', {exact:false})
    expect(author).toBeDefined()
})

test('clicking the button shows details', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'philipp',
        likes: 5,
        user:{name:'philipp j.'}
    }

    const mockHandler = jest.fn()

    render(
        <Blog blog={blog} upvote={mockHandler} deleteBlog={mockHandler} showDelete={false} />
    )

    const button = screen.getByText('view')
    await userEvent.click(button)
    const likes = screen.getByText('5', {exact:false})
    expect(likes).toBeDefined()
    const name = screen.getByText('philipp j.', {exact:false})
    expect(name).toBeDefined()
})

test('clicking the upvote button twice calls event handler twice', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'philipp',
        likes: 5,
        user:{name:'philipp j.'}
    }

    const deleteHandler = jest.fn()
    const upvoteHandler = jest.fn()

    render(
        <Blog blog={blog} upvote={upvoteHandler} deleteBlog={deleteHandler} showDelete={false} />
    )

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    const upvoteButton = screen.getByText('upvote')
    await user.click(upvoteButton)
    await user.click(upvoteButton)

    expect(upvoteHandler.mock.calls).toHaveLength(2)
})
