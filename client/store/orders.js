import axios from 'axios'
import { clearCart } from './index'

const GET_ORDERS = 'GET_ORDERS'
const UPDATE_ORDER = 'UPDATE_ORDER'
const CREATE_ORDER = 'CREATE_ORDER'

const defaultOrder = []

const getOrders = orders => ({type: GET_ORDERS, orders})
const updateOrder = order => ({type: UPDATE_ORDER, order})
const createOrder = order => ({type: CREATE_ORDER, order})

/**
 * THUNK CREATORS
 */
export const fetchOrders = () =>
  dispatch =>
    axios.get('/api/orders')
      .then(res => {
        dispatch(getOrders(res.data))}
    )
      .catch(err => console.log(err))

export function callOrderUpdate(id, updates, history) {

  return function thunk(dispatch) {
    return axios.put(`/api/admin/orders/${id}`, updates)
    .then(res => {
      return res.data})
    .then(update => {
      dispatch(fetchOrders());
    })
    .catch(err => console.error(err));
  };
}

export function createNewOrder(data){
    return function thunk(dispatch){
      return axios.post(`/api/orders`, data)
      .then(res => {
        console.log('here is the res.data ', res.data)
        dispatch(clearCart());
        return res.data})
      .catch(err => console.error(err));
      }
}

export default function (state = defaultOrder, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    case UPDATE_ORDER:
      return action.order
    case CREATE_ORDER:
      return action.order
    default:
      return state
  }
}
