import { useRouter } from 'next/router';
import React from 'react';
import { Container } from 'react-bootstrap';

function EmptyPage() {
const router =useRouter();
  return (
    <div>
        <section className='signUppage emptyPage bg-img'>
            <Container>
                <div className='vh-100 d-flex align-items-center justify-content-center'>
                    <div className='text-center'>
                        <h1>Your movie list is empty</h1>
                        <button className='btn btn-primary ' onClick={()=>{router.push("/createMovie")}}>Add a new movie</button>
                    </div>
                </div>
            </Container>
        </section>
        </div>
  )
}

export default EmptyPage