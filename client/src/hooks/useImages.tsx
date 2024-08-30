import { useEffect, useState } from "react"
import { axiosPrivate } from "../api/axios"

const useImages = (id:string) => {
    const [image, setImage] = useState('')

    useEffect(() => {
        if(id) getImage(id)
    }, [])

    const createUpdateImage = async (id:string) => {
        try{
            const response = await axiosPrivate.patch(`/images/upload-image/${id}`, {image: image, source: id})
            if (response) {
                setImage(response.data.image)
            }
        }catch(error){
            console.log('Cannot create/update image: ' + error)
        }
    }

    const getImage = async (id:string) => {
        try{
            const response = await axiosPrivate.get(`/images/${id}`)
            if(response) setImage(response.data.image)
        } catch (error){
            console.log('Cannot get image: ' + error)
        }
    }

    return {createUpdateImage, getImage, image, setImage}
}

export default useImages