import AddAccountForm from '@/components/AddAccountForm/AddAccountForm'
import Frame from '@/components/Frame/Frame'
import React from 'react'

const AddPage = () => {
  return (
    <Frame title='アカウント追加' width='500px'>
      <AddAccountForm />
    </Frame>
  )
}

export default AddPage
