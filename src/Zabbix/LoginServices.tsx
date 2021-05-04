import axios from 'axios';
import loginjson from './login.json';
import Consultas from './Consultas';

const axiosConfig= {headers: {"Content-Type": "application/json"}};

export default class LoginServices {

    async login () {
        return await axios.post(`${process.env.ZABBIX_SERVER}`,
            loginjson, axiosConfig)

            .then(async (res) => {
                console.log("LOGIN RECEIVED: ", res.data.result);
                var tok = res.data.result;
                return tok;
            })
            .catch((err) => {
                console.log("AXIOS ERROR LOGIN: ", err);
                return null;
            }); 
    }
    async logout(token:any) {
        var consulta = new Consultas();
        try {
            const logoutStr = consulta.logout(token);
            var res = await axios.post(`${process.env.ZABBIX_SERVER}`, 
            logoutStr, axiosConfig)            
            console.log("LOGOUT RECEIVED: ", res.data)
        } 
        catch (error) {
            console.log("AXIOS ERROR LOGOUT: ", error);
        }
    }
}