import React from 'react'

const GenderTextBox = ({
  selectedGender,
  onCheckBoxChange,
}) => {
  return (
    <div className='flex mt-2'>
            <div className='form-control'>
                <label className='label gap-2 cursor-pointer' >
                    <span className='label-text'>Male</span>
                    <input type="checkbox" className='checkbox checkbox-warning border-slate-900' 
                    checked={selectedGender === "male"}
                    onChange={()=> onCheckBoxChange("male")}/>
                </label>
            </div>
            <div className='form-control'>
                <label className='label gap-2 cursor-pointer' >
                    <span className='label-text'>Female</span>
                    <input type="checkbox" className='checkbox checkbox-warning border-slate-900' 
                    checked={selectedGender === "female"}
                    onChange={()=>onCheckBoxChange("female")}/>
                </label>
            </div>

    </div>
  )
}

export default GenderTextBox