import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = (props) => {

  
    const navigate = useNavigate()

    const {inputProps: contentField, reset: resetContent} = useField('text')
    const {inputProps: authorField, reset: resetAuthor} = useField('text')
    const {inputProps: infoField, reset: resetInfo} = useField('text')
    
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: contentField.value,
        author: authorField.value,
        info: infoField.value,
        votes: 0
      })
      navigate('/')
    }
  
    const resetFields = () => {
      resetContent()
      resetAuthor()
      resetInfo()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit} id='new-anecdote-form'>
          <div>
            content
            <input {...contentField}/>
          </div>
          <div>
            author
            <input  {...authorField} />
          </div>
          <div>
            url for more info
            <input  {...infoField} />
          </div>
          <button>create</button>
        </form>
          <button onClick={resetFields}>clear form</button>
      </div>
    )
  
  }


export default CreateNew