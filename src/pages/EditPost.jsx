import React, {useState, useEffect} from 'react'
import appwriteservice from '../appwrite/config'
import { Container, PostForm } from '../components/index'
import { useParams, useNavigate } from 'react-router-dom'

function EditPost() {

    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug){
            appwriteservice.getPost(slug).then((post)=>{
                if(post){
                    setPost(post)
                }
            })
        } else {
            navigate('/')
        }
    },[slug, navigate])

  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  ) : null
}

export default EditPost
