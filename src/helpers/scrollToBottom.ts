import {animateScroll} from 'react-scroll'

export const scrollToBottom=(id:string)=>{
setTimeout(() => {
  
  animateScroll.scrollToBottom({
    containerId: id,
    duration:0,
    delay:0,
    smooth:true,
    offset:-50
  })
}, 10);
}

export const scrollToBottomAnimated=(id:string)=>{
setTimeout(() => {
  
  animateScroll.scrollToBottom({
    containerId: id,
    duration:250,
    delay:0,
    smooth:true,
    offset:-50
  })
}, 10);
}