import React from "react";

import LoadingBox from 'components/LoadingBox.js'

function Comp (props) {

    let lilLoadingBoxes = []
    for (let i = 0; i==10; i++){
        lilLoadingBoxes[i] = <LoadingBox height="70px"/>
    }
    // new Array(10)
    // lilLoadingBoxes = lilLoadingBoxes.map(elem => (
    //     <LoadingBox height="20px"/>
    // ))
    console.log('lilLoadingBoxed:', lilLoadingBoxes)

    return (
        <>
            <form id="article-form-loading">
                <div className='flex-wrapper'>

                    <div className='left-column form-column'>
                        <div className='content-box-loading'>
                            <LoadingBox height="50px"/>
                            {[...Array(5)].map(() => <LoadingBox height="30px"/>)}        
                        </div>
                        <div className='content-box-loading'>
                            <LoadingBox height="50px"/>      
                        </div>
                        <div className='content-box-loading'>
                            <LoadingBox height="50px"/>
                            {[...Array(20)].map(() => <LoadingBox height="30px"/>)}        
                        </div>
                        <div className='content-box-loading'>
                            <LoadingBox height="50px"/>
                            {[...Array(20)].map(() => <LoadingBox height="30px"/>)}        
                        </div>
                        <div className='content-box-loading'>
                            <LoadingBox height="50px"/>       
                        </div>
                    </div>

                    <div className='main-column form-column'>
                        <div className='content-box'>
                            <LoadingBox height="60px"/>
                            <LoadingBox height="340px"/> 
                            <LoadingBox height="560px"/> 
                            <LoadingBox height="340px"/>  
                        </div>
                    </div>
                    <div className="right-column form-column">
                        <div className='content-box-loading'>
                            <LoadingBox height="250px"/> 
                        </div>
                        <div className='content-box-loading'>
                            <LoadingBox height="250px"/> 
                        </div>
                        <div className='content-box-loading'>
                            <LoadingBox height="250px"/> 
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Comp;