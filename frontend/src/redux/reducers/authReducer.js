
const initialState = {
    usuario:{userName:''},
}

const authReducer = (state = initialState, action)=>{

    switch(action.type){
       case 'usuario':
            return {
                ...state,
                usuario: action.payload
            }
        case 'logOut':
            return {
                ...initialState
            }
        default:
            return state
    }


}
export default authReducer