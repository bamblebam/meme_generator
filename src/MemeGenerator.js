import React from 'react';

class MemeGenerator extends React.Component{
    constructor(){
        super()
        this.state={
            topText:"",
            bottomText:"",
            randomImg:"https://i.imgflip.com/1bij.jpg",
            allMemeImgs:[]
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }

componentDidMount(){
    fetch("https://api.imgflip.com/get_memes").then(response => response.json()).then(response => {
                                                                                                    const {memes}=response.data
                                                                                                    this.setState({allMemeImgs:memes})
    })
}

handleChange(event){
    const {name,value}=event.target
    this.setState({
        [name]:value
    })
}

handleSubmit(event){
    event.preventDefault()
    const num =Math.floor(Math.random() * this.state.allMemeImgs.length)
    const randomImgMeme=this.state.allMemeImgs[num].url
    this.setState({
        randomImg:randomImgMeme
    })
}

    render(){
        return(
            <div >
                <form className='input-form' onSubmit={this.handleSubmit}>
                    <input name='topText' type='text' placeholder='Top text' value={this.state.topText} onChange={this.handleChange}></input>
                    <input name='bottomText' type='text' placeholder='Bottom text' value={this.state.bottomText} onChange={this.handleChange}></input>
                    <button>Generate</button>
                </form>
            <div className='cover'>
                <div className='meme'>
                <img src={this.state.randomImg} alt=""/>
                <h2 className='top'>{this.state.topText}</h2>
                <h2 className='bottom'>{this.state.bottomText}</h2>
                </div>
            </div>
            </div>
            
        )
    }
}

export default MemeGenerator