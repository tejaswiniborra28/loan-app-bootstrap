import { LOGIN, REGISTER, CURRENTUSER, APPLYLOAN, LOGOUT,UPDATE } from "./userActionTypes";

const initialState = {
    registeredUsers: [],
    users: [],
    validated: false,
    currentUser: ""
}
const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER: return {
            ...state,
            //RegisteredUser:true
            users: [...state.users, action.payload],
            registeredUsers: [...state.registeredUsers, action.payload.email]

        }
        case LOGIN:
            return {
                ...state,
                validated: state.users.filter(e => e.email === action.payload.email && e.password === action.payload.password).length > 0 ? true : false,
            }
        case CURRENTUSER:
            return {
                ...state,
                currentUser: action.payload
            }
          case APPLYLOAN: return {
            ...state,
             users:state.users.map((item) => (
                item.email===state.currentUser? {...item, loanDetails:{...action.payload,applicationDate:new Date()}}: item
            ))}
            case LOGOUT:
                return {
                    ...state,
                    currentUser: "",
                    validated:false
                }
           case UPDATE: return {
                ...state,
                     users:state.users.map((item) => (
                        item.email===state.currentUser? {...item, AccountDetails: action.payload}: item
                    ))}
       

        default:
            return state
    }
}

export default UserReducer;