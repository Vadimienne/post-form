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
                            {[...Array(5)].map((e, index) => <LoadingBox key={`1-loading-box-${index}`} height="30px"/>)}        
                        </div>
                        <div className='content-box-loading'>
                            <LoadingBox height="50px"/>      
                        </div>
                        <div className='content-box-loading'>
                            <LoadingBox height="50px"/>
                            {[...Array(20)].map((e, index) => <LoadingBox key={`2-loading-box-${index}`} height="30px"/>)}        
                        </div>
                        <div className='content-box-loading'>
                            <LoadingBox height="50px"/>
                            {[...Array(20)].map((e, index) => <LoadingBox key={`3-loading-box-${index}`} height="30px"/>)}        
                        </div>
                        <div className='content-box-loading'>
                            <LoadingBox height="50px"/>       
                        </div>
                    </div>

                    <div className='main-column form-column'>
                        <div className='content-box'>
                            <LoadingBox height="80px"/>
                            <LoadingBox height="340px"/> 
                            <LoadingBox height="560px"/> 
                            <LoadingBox height="340px"/>  
                        </div>
                    </div>
                    <div className="right-column form-column">
                        <div className='content-box-loading'>
                            <LoadingBox height="120px"/>
                            <LoadingBox height="80px"/> 
                        </div>
                        <div className='content-box-loading'>
                            <LoadingBox height="110px"/>
                            <LoadingBox height="170px"/> 
                        </div>
                        <div className='content-box-loading'>
                            <LoadingBox height="90px"/>
                            <LoadingBox height="140px"/> 
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Comp;