import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetBookQuery } from '../features/api/apiSlice'
import EditForm from '../components/EditForm'
import Loader from './../ui/loader/Loader'
import Error from './../ui/Error'

const EditBook = () => {
  const { bookId } = useParams()
  const { data: book, isLoading, isError } = useGetBookQuery(bookId)

  let content = null
  if (isLoading) {
    content = <Loader />
  }
  if (!isLoading && isError) {
    content = <Error message='There was an error!' />
  }
  if (!isLoading && !isError && book?.id) {
    content = <EditForm book={book} />
  }

  return (
    <main className='py-6 2xl:px-6'>
      <div className='container'>
        <div className='p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto'>
          <h4 className='mb-8 text-xl font-bold text-center'>Edit Book</h4>
          {content}
        </div>
      </div>
    </main>
  )
}

export default EditBook
