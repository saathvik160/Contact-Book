import { createStore } from 'redux'


//------Store------


const initialState = {
    contacts: [
        {
            name: 'Alice',
            phone: '9841011111',
            mail: 'alice@gmail.com',
            company: 'ABC Inc.',
            city: 'Athens'
        },
        {
            name: 'Bethany',
            phone: '9841022222',
            mail: 'bethany@gmail.com',
            company: 'XYZ Co. Ltd.',
            city: 'Bangkok'
        },
        {
            name: 'Chris',
            phone: '9841033333',
            mail: 'chris@gmail.com',
            company: 'PQR & Sons',
            city: 'Chennai'
        },
        {
            name: 'David',
            phone: '9841044444',
            mail: 'david@gmail.com',
            company: 'ABC Inc.',
            city: 'Detroit'
        },
        {
            name: 'Emily',
            phone: '9841055555',
            mail: 'emily@gmail.com',
            company: 'XYZ Co. Ltd.',
            city: 'Erangel'
        },
    ]
}

const store = createStore(contactApp, initialState)

export default store;


//------Reducers------


function contactApp (state=initialState, action) {
    switch(action.type) {
        case 'ADD_CONTACT': {
            return Object.assign({}, state, {
                contacts: [
                    ...state.contacts,
                    {
                        name: action.payload.name,
                        phone: action.payload.phone,
                        mail: action.payload.mail,
                        company: action.payload.company,
                        city: action.payload.city
                    }
                ]
            })
        }
        case 'DELETE_CONTACT': {
            return Object.assign({}, state, {
                contacts: [
                    ...state.contacts.filter(contact => contact.phone !== action.payload.phone)
                ]
            })
        }
        case 'EDIT_CONTACT': {
            var contacts_arr = state.contacts;
            var i = 0;
            while (i<contacts_arr.length) {
                if (contacts_arr[i].phone === action.payload.old_phone) {
                    contacts_arr[i].name = action.payload.name;
                    contacts_arr[i].phone = action.payload.phone;
                    contacts_arr[i].mail = action.payload.mail;
                    contacts_arr[i].company = action.payload.company;
                    contacts_arr[i].city = action.payload.city
                }
                i++;
            }
            return Object.assign({}, state, {
                contacts: contacts_arr
            })
        }
        default: {
            return state
        }
    }
}
