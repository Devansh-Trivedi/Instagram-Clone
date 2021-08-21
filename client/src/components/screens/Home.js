import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'
import ReactRoundedImage from "react-rounded-image";
import MyPhoto from "../../images/6.jpg";
import MyPhoto2 from "../../images/1.jpg";
import MyPhoto3 from "../../images/2.jpg";
import MyPhoto4 from "../../images/3.jpg";
import MyPhoto5 from "../../images/4.jpg";
import MyPhoto6 from "../../images/5.jpg";
import MyPhoto7 from "../../images/7.jpg";


const Home  = ()=>{
    const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
       fetch('/allpost',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           setData(result.posts)
       })
    },[])

    const likePost = (id)=>{
          fetch('/like',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId:id
              })
          }).then(res=>res.json())
          .then(result=>{
                   //   console.log(result)
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
          }).catch(err=>{
              console.log(err)
          })
    }
    const unlikePost = (id)=>{
          fetch('/unlike',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId:id
              })
          }).then(res=>res.json())
          .then(result=>{
            //   console.log(result)
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
          }).catch(err=>{
            console.log(err)
        })
    }

    const makeComment = (text,postId)=>{
          fetch('/comment',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId,
                  text
              })
          }).then(res=>res.json())
          .then(result=>{
              console.log(result)
              const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
             })
            setData(newData)
          }).catch(err=>{
              console.log(err)
          })
    }

    const deletePost = (postid)=>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
    }
   return (
       
       <div className="home" style={{paddingTop:"60px"}}>
           <span className="backgroundAnimation loader"></span>
           <div className="card home-card" style={{textAlign:"center"}}>
               <div className="row">
                    <div className="flexbox-container" style={{paddingLeft:"15px",paddingTop:"15px",paddingBottom:"15px"}}>
                        <ReactRoundedImage
                            image={MyPhoto7}
                            roundedColor="white"
                            imageWidth="80"
                            imageHeight="80"
                            roundedSize="16"
                            borderRadius="40"
                            
                        />
                        
                        
                        <ReactRoundedImage
                            image={MyPhoto2}
                            roundedColor="white"
                            imageWidth="80"
                            imageHeight="80"
                            roundedSize="16"
                            borderRadius="40"
                            
                        />
                        <ReactRoundedImage
                            image={MyPhoto3}
                            roundedColor="white"
                            imageWidth="80"
                            imageHeight="80"
                            roundedSize="16"
                            borderRadius="40"
                            
                        />

                        
                    </div>
                    <div style={{position:"fixed",paddingLeft:"500px"}} className="sideRow" >
                        <div className="row" >
                            <div className="col s4 m4 l4">
                                <ReactRoundedImage
                                image={MyPhoto}
                                roundedColor="rgb(245, 240, 241)"
                                imageWidth="80"
                                imageHeight="80"
                                roundedSize="16"
                                borderRadius="40"
                                
                                />
                                
                            </div>
                            <div className="col l4">
                                <div className="row"> 
                                <h6>_kingstonalberto</h6>
                                <h6 style={{color:"grey",fontSize:"14px"}}>Kingston Alberto</h6>
                                </div>
                            </div>
                            <div className="col l2">

                            </div>
                            <div className="col l2">
                                <h6 style={{color:"rgb(75, 170, 233)"}}>switch</h6>
                            </div>
                        
                            
                        </div>
                        <div className="row" >
                            <div className="col l8">
                                <h6 style={{color:"grey",fontSize:"15px"}}>Suggestions For You</h6>
                            </div>
                            <div style={{fontSize:"15px"}} className="col l4">
                                <h6 style={{fontSize:"15px"}}>See All</h6>
                            </div>
                            
                        </div>
                        <div className="row" >
                            <div className="col s4 m4 l4">
                                <ReactRoundedImage
                                image={MyPhoto4}
                                roundedColor="rgb(245, 240, 241)"
                                imageWidth="70"
                                imageHeight="70"
                                roundedSize="16"
                                borderRadius="35"
                                
                                />
                                
                            </div>
                            <div className="col l4">
                                <div className="row"> 
                                <h6>_adityasingh</h6>
                                <h6 style={{color:"grey", fontSize:"12px"}}>Suggested for you</h6>
                                </div>
                            </div>
                            <div className="col l2">

                            </div>
                            <div className="col l2">
                                <h6 style={{color:"rgb(75, 170, 233)",fontSize:"15px"}}>follow</h6>
                            </div>
                        
                            
                        </div>
                        <div className="row" >
                            <div className="col s4 m4 l4">
                            <ReactRoundedImage
                                image={MyPhoto5}
                                roundedColor="rgb(245, 240, 241)"
                                imageWidth="70"
                                imageHeight="70"
                                roundedSize="16"
                                borderRadius="35"
                                
                                />
                                
                            </div>
                            <div className="col l4">
                                <div className="row"> 
                                <h6>_karlMark</h6>
                                <h6 style={{color:"grey", fontSize:"12px"}}>Suggested for you</h6>
                                </div>
                            </div>
                            <div className="col l2">

                            </div>
                            <div className="col l2">
                                <h6 style={{color:"rgb(75, 170, 233)",fontSize:"15px"}}>follow</h6>
                            </div>
                        
                            
                        </div>
                        <div className="row" >
                            <div className="col s4 m4 l4">
                            <ReactRoundedImage
                                image={MyPhoto6}
                                roundedColor="rgb(245, 240, 241)"
                                imageWidth="70"
                                imageHeight="70"
                                roundedSize="16"
                                borderRadius="35"
                                
                                />
                                
                            </div>
                            <div className="col l4">
                                <div className="row"> 
                                <h6>_murphy$peter</h6>
                                <h6 style={{color:"grey", fontSize:"12px"}}>Suggested for you</h6>
                                </div>
                            </div>
                            <div className="col l2">

                            </div>
                            <div className="col l2">
                                <h6 style={{color:"rgb(75, 170, 233)",fontSize:"15px"}}>follow</h6>
                            </div>
                        
                            
                        </div>
                        <div className="row">
                            <div className="col c12">
                                <h6 style={{color:"grey",fontSize:"12px"}}>About . Help . Press . API . Jobs . Privacy . Terms . Locations</h6>
                            </div>
                        </div>
                        <div className="row">
                            
                            <div className="col c12">
                                <h6 style={{color:"grey",fontSize:"12px"}}>Top Accounts . Hashtags . Language . English</h6>
                            </div>                            
                            
                        </div>
                        <div className="row">
                            
                            <div className="col c12">
                                <h6 style={{color:"grey",fontSize:"12px"}}>&#169; INSTAGRAM FROM FACEBOOK</h6>
                            </div>                            
                            
                        </div>
                        
                        
                    </div>
               </div>
               
            </div>
            
            
           {
               
               data.map(item=>{
                   return(
                       <div className="card home-card" key={item._id}>
                            <h5 style={{padding:"5px"}}><Link to={item.postedBy._id !== state._id ? "/profile/"+item.postedBy._id :"/profile"  }>
                                {item.postedBy.name}</Link> {item.postedBy._id == state._id 
                            && <i className="material-icons" style={{
                                float:"right"
                            }} 
                            onClick={()=>deletePost(item._id)}
                            >delete</i>

                            }</h5>
                            <div className="card-image">
                                <img src={item.photo}/>
                            </div>
                            <div className="card-content">
                            <i className="material-icons" style={{color:"red"}}>favorite</i>
                            {item.likes.includes(state._id)
                            ? 
                             <i className="material-icons"
                                    onClick={()=>{unlikePost(item._id)}}
                              >thumb_down</i>
                            : 
                            <i className="material-icons"
                            onClick={()=>{likePost(item._id)}}
                            >thumb_up</i>
                            }
                            
                           
                                <h6>{item.likes.length} likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                {
                                    item.comments.map(record=>{
                                        return(
                                        <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}</span> {record.text}</h6>
                                        )
                                    })
                                }
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,item._id)
                                }}>
                                  <i className="material-icons">insert_emoticon <input type="text" placeholder="add a comment" /></i>
                                    
                                </form>
                                
                            </div>
                        </div> 
                   )
               })
           }
          
          
       </div>
   )
}


export default Home