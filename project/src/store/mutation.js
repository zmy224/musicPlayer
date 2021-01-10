import * as types from  './mutation-types'
const mutations = {
[types.SET_SINGER](state,singer){
    state.singer= singer
},
[types.SET_PLAYING](state,playing){
    state.playing=playing;
},
[types.SET_PLAYLIST](state,playList){
    state.playList=playList;
}
,
[types.SET_FULLSCREEN](state,fullscreen){
    state.fullscreen=fullscreen;
},
[types.SET_SEQUENCELIST](state,sequenceList){
    state.sequenceList=sequenceList;
}
,
[types.SET_MODE](state,mode){
    state.mode=mode;
},
[types.SET_CURRENTINDEX](state,currentIndex){
    state.currentIndex=currentIndex;
}


}

export default mutations