import React, { useState } from 'react';

type PropsType = {
  title: string
  editTitle: (title: string) => void
}

export const TitleEdit: React.FC<PropsType> = ({
  title, editTitle
}) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [inputValue, setInputValue] = useState('')


  const hendleActivateEditMode = () => {
    setInputValue(title)
    setIsEditMode(true)
  }

  const handleEditTitle = () => {
    if (inputValue.trim() === '' || inputValue === title) {
      setIsEditMode(false)
      return
    }
    editTitle(inputValue)
    setIsEditMode(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEditTitle()
    }
  };

  const onInputValueChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  return isEditMode
    ? <input
      className={isEditMode ? '' : 'title'}
      value={inputValue}
      onChange={onInputValueChange}
      onBlur={handleEditTitle}
      onKeyDown={handleKeyDown}
      autoFocus
    />
    : <span onDoubleClick={hendleActivateEditMode}>{title}</span>

}

