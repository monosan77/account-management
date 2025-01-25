import React from 'react'
import ButtonCustomSize from '../Frame/ButtonCustomSize'
import { useRouter } from 'next/navigation'

const Buttons = () => {
  const router = useRouter();
  return (
    <div className="w-full mt-5 flex justify-around ">
        <ButtonCustomSize
          text="保存する"
          type="submit"
          width="100px"
          bgColor={"mainColor"}
          textColor={"white"}
        />
        <ButtonCustomSize
          text="キャンセル"
          type="button"
          width="100px"
          bgColor={"white"}
          textColor={"mainColor"}
          handleClick={() => router.back()}
        />
      </div>
  )
}

export default Buttons
