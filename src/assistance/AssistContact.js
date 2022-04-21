import axios from "axios"; {/*Using Axios to fetch data from Server */}

export class ContactService{
    static serverURL = 'http://localhost:9000';   
    
     static getAllContacts(){
        let dataURL = `${this.serverURL}/contacts`;
        return axios.get(dataURL);
    }


    static getContact(contactId){
        let dataURL= `${this.serverURL}/contacts/${contactId}`
        return axios.get(dataURL);
    }

    static createContact(contact){
        let dataURL =`${this.serverURL}/contacts`;
        return axios.post(dataURL,contact);
    }


    static updateContact(contact,contactId){
        let dataURL=`${this.serverURL}/contacts/${contactId}`;
        return axios.put(dataURL,contact);

    }

    static deleteContact(contactId){
        let dataURL=`${this.serverURL}/contacts/${contactId}`;
        return axios.delete(dataURL);
    }
}