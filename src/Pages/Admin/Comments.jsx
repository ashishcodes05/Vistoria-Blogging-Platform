import React, { useEffect } from 'react'
import { comments_data } from '../../assets/assets'
import CommentTableItem from '../../Components/CommentTableItem'

const Comments = () => {
    const [comments, setComments] = React.useState([])
    const [filter, setFilter] = React.useState('Not Approved')

    const fetchComments = async () => {
        setComments(comments_data)
    }

    useEffect(() => {
        fetchComments()
    }, [])
  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      <div className='flex items-center justify-between max-w-4xl'>
        <h1 className='text-md font-medium text-gray-600'>Comments</h1>
        <div className='flex items-center gap-2'>
          <button
            onClick={() => setFilter('Not Approved')}
            className={`px-4 py-2 rounded-full hover:scale-102 transition-all ${filter === 'Not Approved' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Not Approved
          </button>
          <button
            onClick={() => setFilter('Approved')}
            className={`px-4 py-2 rounded-full hover:scale-102 transition-all ${filter === 'Approved' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Approved
          </button>
        </div>
      </div>
      <div className='relative h-4/5 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white mt-5'>
        <table className='min-w-full text-sm text-gray-500'>
          <thead className='text-xs text-gray-600 text-left uppercase'>
            <tr className='bg-gray-100'>
              <th className='px-6 py-4'>Blog Title & Comment</th>
              <th className='px-6 py-4 max-sm:hidden'>Date</th>
              <th className='px-6 py-4'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments.filter((comment) => {
              if(filter === "Approved") return comment.isApproved === true;
              else return comment.isApproved === false;
            }).map((comment, index) => <CommentTableItem key={comment._id} comment={comment} index={index + 1} fetchComments={fetchComments} />)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Comments
