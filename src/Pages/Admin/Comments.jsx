import React, { useEffect } from 'react'
import { comments_data } from '../../assets/assets'

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
    <div>
      
    </div>
  )
}

export default Comments
