
class MusicSearch
{

    constructor(...params){
        this.inputValue = document.querySelector(params[0]);
        this.button = document.querySelector(params[1]);
        this.resultShow = document.querySelector(params[2]);
        this.deletebtn = document.querySelector(params[3]);
        this.hiddenText = document.querySelector(params[4]);
        this.back2Top = document.querySelector(params[5]);
        this.loader = document.querySelector(params[6]);
    }

    getApiResp =(event)=>{
        if(this.inputValue.value.length === 0){
            window.alert('You did not enter a term');
            this.stopLoader();
        } else {
        fetch(`https://itunes.apple.com/search?term=${this.inputValue.value}&entity=song`)
        .then (this.startLoader())
        .then(response=>response.json())
        .then(data => {
            for (let i = 0; i < data.results.length; i++) {
                let name = data.results[i].artistName;
                let img = data.results[i].artworkUrl100;
                let songName = data.results[i].trackName;
                let audio = data.results[i].previewUrl;
                let show = `
                    <div class = "song">
                        <img src="${img}" alt="">
                        <h3> ${name} </h3>
                        <h4> ${songName} </h4>
                        <audio controls class = "play">
                        <source value="" src="${audio}" type="audio/mpeg">
                    </div>
                    `;
            this.resultShow.insertAdjacentHTML("afterbegin", show);
            }
            this.unhideElement();
            this.resetInput();
            this.stopLoader();
                 
        })
                       
        .catch(err => alert('You did not enter a term or we could not find it'));
        this.stopLoader();
    }}

    getDeleted=(event)=>{
        this.resultShow.innerHTML='';
        this.hideElement();
        this.stopLoader();
    }

    unhideElement(){
        this.hiddenText.style.visibility ='';
    }
    hideElement(){
        this.hiddenText.style.visibility ='hidden'; 
    }
    startLoader(){
        this.loader.style.visibility='';
    }
    stopLoader(){
        this.loader.style.visibility='hidden';
    }

    resetInput(){
        this.inputValue.value='';
        this.inputValue.focus();

    }
    goToTop =(event)=>{
        document.documentElement.scrollTop = 0;
    }

    pressEnter=(event)=>{
        if(event.keyCode === 13){
            this.getApiResp();
            this.startLoader();
        }
        
    }

    addListeners(){
        this.button.addEventListener('click', this.getApiResp);
        this.inputValue.addEventListener('keydown', this.pressEnter);
        this.deletebtn.addEventListener('click', this.getDeleted);
        this.back2Top.addEventListener('click', this.goToTop);
    }

    init(){
          this.addListeners();
    }

};




(function(){
    'use strict';

    const music = new MusicSearch('.input-value', '.submitbtn', '#result-show', '.deletebtn', '.hidden-text','#back2Top', '.loader');
    window.addEventListener('load', music.init());
   
   
})();
