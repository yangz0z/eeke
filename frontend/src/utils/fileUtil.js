import axios from 'axios'

export const uploadFile = async (file) => {
    const formData = new FormData()
    formData.append('image', file)

    const res = await axios.post('/api/files/upload', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
    })
    .catch((err) => {
        console.log(err)
    })
    if (res.data.success) {
        return { src: res.data.src, path: res.data.path, filename: res.data.filename }
    }
}

export const deleteFile = async (filename) => {
    if (!filename) return

    const res = await axios.delete(`/api/files/delete/${filename}`).catch((err) => console.log(err))
}