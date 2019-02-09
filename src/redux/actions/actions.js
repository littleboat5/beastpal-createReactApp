import axios from 'axios'; // package that makes Ajax (asynchronous) requests from the browser

export const LOAD_BEASTS = 'LOAD_BEASTS';
export const VIEW_BEAST = 'VIEW_BEAST';
export const CREATE_BEAST = 'CREATE_BEAST';
export const EDIT_BEAST = 'EDIT_BEAST';
export const DELETE_REVIEW = 'DELETE_REVIEW';
export const ADD_REVIEW = 'ADD_REVIEW';
export const SET_USER = 'SET_USER';
export const SET_BEASTOWNER = 'SET_BEASTOWNER';
export const LOGOUT_USER = 'LOGOUT_USER';

// const ROOT_URL = process.env.NODE_ENV === 'production' ? '/api/' : 'http://localhost:5000/api/';
const ROOT_URL = '/api/';

/*=============== Load all beasts ================*/
export function loadBeasts () {
    return (dispatch) => { axios
        .get(`${ROOT_URL}beasts`)
        .then( (res) => { //res now contains the response from the ajax request
            let bbs = res.data;
            dispatch({type:LOAD_BEASTS, payload:bbs});
        })

        .catch( (err) => console.log(err));
    }
}

/*=============== get 1 beast ================*/
export function getBeast (beast_id) {
    return (dispatch) => { axios
        .get(`${ROOT_URL}beasts/${beast_id}`)
        .then((res) => {
            let bb = res.data;
            dispatch({type: VIEW_BEAST, payload: bb});
        })
        .catch((err) => console.log(err));
    }
}
/*=============== get beast for update ================*/
export function getBeast4Update (beast_id) {
    return (dispatch) => { axios
        .get(`${ROOT_URL}beasts/${beast_id}/edit`)
        .then((res) => {
            let bb = res.data;
            dispatch({type: EDIT_BEAST, payload: bb});
        })
        .catch((err) => console.log(err));
    }
}

/*=============== add new beast ================*/
export function addBeast (values, callback) {
    return (dispatch) => { axios
        .post(`${ROOT_URL}beasts`, values)
        .then( ()=>callback() )
        .catch((err) => console.log(err));
    }
}
/*=============== update beast ================*/
export function updateBeast (beast_id, values, callback) {
// console.log(values)
    return (dispatch) => { axios
        .put(`${ROOT_URL}beasts/${beast_id}`, values)
        .then( ()=>callback() )
        .catch((err) => console.log(err));
    }
}
/*=============== delete 1 beast ================*/
export function deleteBeast (beast_id, callback) {
    return (dispatch) => { axios
        .delete(`${ROOT_URL}beasts/${beast_id}`)
        .then( ()=>callback() )
        .catch((err) => console.log(err));
    }
}
/*=============== get a user ================*/
export function getUser (user_id, beastOwner) {
    return (dispatch) => { axios
        .get(`${ROOT_URL}user/${user_id}`)
        .then((res)=>{
          if (beastOwner){
//if getting the beast owner user info, set the beastOwner state in reducer
            dispatch({type: SET_BEASTOWNER, owner: res.data});
          }
          else
            return res.data
        }).catch(err=>console.log(err));
  }
}

/*=============== Login user ================*/
export function login (user_data) {
    return (dispatch) => {
      axios.post(`${ROOT_URL}user`,user_data)
           .then((res)=>{
                let user = res.data;
//                 console.log('==================signin=======')
//                 console.log(user)
//                 console.log('==================signin=======')
 /* Below, we save the user into localStorage so that the next time DOM is rendered,
the user is already authenticated and hence the BeastNew route is allowed.
The check for localStorage.Auth occurs in src/index.js, before the ReactDOM.render
*/
                localStorage.setItem('Auth', JSON.stringify(user));
                dispatch({type: SET_USER, user});  //=== {type: 'SET_USER', user:user}
            })
           .catch((err)=>console.log(err));
    }
}

/*=============== Logout user ================*/
export function logout() {
    return (dispatch) => {
      localStorage.removeItem("Auth"); //remove from computer local memory
      dispatch({type: SET_USER, user: {}} );
    }
}

/*=============== delete 1 review ================*/
export function deleteReview(beast_id, review_id) {
    return (dispatch) => { axios
        .delete(`${ROOT_URL}beasts/${beast_id}/reviews/${review_id}`)
        .then((res) => {
            dispatch({type: DELETE_REVIEW, deletedReview: res.data});
        })
        .catch((err) => console.log(err));
    }
}
/*=============== add 1 review ================*/
export function addReview(beast_id, values) {

  return (dispatch) => { axios
      .post(`${ROOT_URL}beasts/${beast_id}/reviews`, values)
      .then((res) => {
          dispatch({type: ADD_REVIEW, newReview: res.data});
      })
      .catch((err) => console.log(err));
  }
}
