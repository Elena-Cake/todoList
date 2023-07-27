import React, { useState } from 'react';

type PropsType = {
  addItem: (title: string) => void
}

export const AddItemForm: React.FC<PropsType> = ({
  addItem
}) => {

  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState(null as string | null)

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputValue.trim() === '') {
      setError('empty task')
      return
    }
    addItem(inputValue)
    setError(null)
    setInputValue('')
  }

  const onInputValueChange = (e: React.FormEvent<HTMLInputElement>) => {
    setError(null)
    setInputValue(e.currentTarget.value)
  }

  return (

    <form onSubmit={handleAddTask}>
      <input value={inputValue}
        onChange={onInputValueChange}
        className={`${error ? 'error' : ''}`}
      />
      <button >+</button>
      <span className={`error-message`}>{error}</span>
    </form>

  );
}

