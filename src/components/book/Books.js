import React from 'react'
import { useGetBooksQuery } from '../../features/api/apiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { statusChanged } from '../../features/filter/filterSlice'
import Book from './Book'
import Loader from './../../ui/loader/Loader'
import Error from './../../ui/Error'

const Books = () => {
  const dispatch = useDispatch()
  const { status, search } = useSelector((state) => state.filter)
  // fetch books
  const { data: books, isLoading, isError } = useGetBooksQuery()

  // filter books
  const filterByStatus = (book) => {
    if (status === 'Featured') {
      return book.featured
    } else return true
  }
  const filterBySearch = (book) => {
    return book.name.toLowerCase().includes(search.toLowerCase())
  }

  // decide what to render
  let content = null

  if (isLoading) {
    content = <Loader />
  }
  if (!isLoading && isError) {
    content = <Error message='There was an error' />
  }
  if (!isLoading && !isError && books?.length === 0) {
    content = <Error message='No books found!' />
  }
  if (!isLoading && !isError && books?.length > 0) {
    content = books
      .filter(filterByStatus)
      .filter(filterBySearch)
      .map((book) => <Book key={book.id} book={book} />)
  }

  return (
    <div className='order-2 xl:-order-1'>
      <div className='flex items-center justify-between mb-12'>
        <h4 className='mt-2 text-xl font-bold'>Book List</h4>

        <div className='flex items-center space-x-4'>
          <button
            className={`lws-filter-btn ${
              status === 'All' ? 'active-filter' : ''
            }`}
            onClick={() => dispatch(statusChanged('All'))}
          >
            All
          </button>
          <button
            className={`lws-filter-btn ${
              status === 'Featured' ? 'active-filter' : ''
            }`}
            onClick={() => dispatch(statusChanged('Featured'))}
          >
            Featured
          </button>
        </div>
      </div>
      <div className='space-y-6 md:space-y-0 md:grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {content}
      </div>
    </div>
  )
}

export default Books
