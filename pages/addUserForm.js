import { useReducer, useState } from 'react'
import { BiArchiveIn } from 'react-icons/bi'
import Success from '@/components/success'
import Bug from '@/components/bug'
import { useQueryClient, useMutation, addUser, getUsers } from '@/lib/helper'



const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value
  }
}

export default function AddUserForm() {
  const queryClient = useQueryClient()
  const [formData, setFormData] = useReducer(formReducer, {})
  const addMutation = useMutation(addUser,{
    onSuccess: () => {
      queryClient.prefetchQuery('users',getUsers)
    }
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (Object.keys(formData).length === 0) {
      console.log("No form data")
      return
    }
    let {supplierName, address, phone} = formData;

    const model = {
      supplierName,
      address,
      phone
    }
    
    addMutation.mutate(model)

    if(Object.keys(formData).length>0)return <Bug message={"Error"}></Bug>
    if(addMutation.isLoading) return <div>Loading!</div>
    if(addMutation.isError) return <Bug message={addMutation.error.message}></Bug>
    if(addMutation.isSuccess) return <Success message={"Added"}></Success>
    
    console.log(formData)
    setIsSubmitted(true)
  }

  return (
    <div>
      {isSubmitted ? (
        <Success message={"Data added successfully"}></Success>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="input-type">
            <input type="text" onChange={setFormData} name="supplierName" className="border w-full px-5 py-3 focus:outline-none rounded-md mb-4" placeholder="Supplier Name" />
          </div>
          <div className="input-type">
            <textarea name="address" onChange={setFormData} className="border w-full px-5 py-3 focus:outline-none rounded-md mb-2" placeholder="Address" />
          </div>
          <div className="input-type">
            <input type="tel" onChange={setFormData} name="phone" className="border w-64 px-5 py-3 focus:outline-none rounded-md mb-2" placeholder="Phone" />
          </div>
          <button className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 mb-8">
            Save <span className="px-1"><BiArchiveIn size={24}></BiArchiveIn></span>
          </button>
        </form>
      )}
    </div>
  )
}
